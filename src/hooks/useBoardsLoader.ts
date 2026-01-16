import { useEffect, useRef } from 'react';
import mondaySdk from 'monday-sdk-js';
import { useSystemStore } from '@/stores/system-store';
import { useBoardsStore, type Board, type BoardsData } from '@/stores/boards-store';
import settingsConfig from '../../settings-config.json';

const monday = mondaySdk();

interface BoardSetting {
  type: string;
  label: string;
  name: string;
  section: string;
  description?: string;
}

// Type for monday.api() response that may include GraphQL errors
interface MondayApiResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

const boardKeyMap: Record<string, keyof BoardsData> = {
  restaurantsBoardId: 'restaurants',
  reservationsBoardId: 'reservations',
  tablesBoardId: 'tables',
  customersBoardId: 'customers',
};

const BOARD_QUERY = `
  query GetBoard($boardId: [ID!]!) {
    boards(ids: $boardId) {
      id
      name
      columns {
        id
        title
        type
      }
      items_page(limit: 500) {
        items {
          id
          name
          column_values {
            id
            text
            value
            ... on BoardRelationValue {
              linked_items {
                id
                name
              }
            }
            ... on MirrorValue {
              display_value
              mirrored_items {
                linked_item {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  }
`;

async function fetchBoard(boardId: string, signal?: AbortSignal): Promise<Board> {
  // Check if already aborted before starting
  if (signal?.aborted) {
    throw new Error('Request aborted');
  }

  const response = await monday.api(BOARD_QUERY, {
    variables: { boardId: [boardId] },
  }) as MondayApiResponse<{ boards: Board[] }>;

  // Check if aborted after the request completes
  if (signal?.aborted) {
    throw new Error('Request aborted');
  }

  if (response.errors) {
    throw new Error(response.errors[0]?.message || 'Failed to fetch board');
  }

  if (!response.data?.boards?.[0]) {
    throw new Error('Board not found');
  }

  return response.data.boards[0];
}

export function useBoardsLoader() {
  const { config } = useSystemStore();
  const { setBoard, setLoading, setError } = useBoardsStore();
  const prevConfigRef = useRef<string>('');

  useEffect(() => {
    const boardSettings = (settingsConfig.settings as BoardSetting[]).filter(
      (s) => s.section === 'Boards'
    );

    // Create a config fingerprint to detect changes
    const configFingerprint = JSON.stringify(
      Object.fromEntries(boardSettings.map(s => [s.name, config[s.name]]))
    );

    // Skip if config hasn't changed
    if (configFingerprint === prevConfigRef.current) return;

    // Check if we have at least one board ID
    const hasAnyBoardId = boardSettings.some((setting) => config[setting.name]);
    
    if (!hasAnyBoardId) return;

    // Create AbortController to cancel pending requests if config changes
    const abortController = new AbortController();

    async function loadBoards() {
      setLoading(true);
      setError(null);

      // Build list of boards to fetch (only those with IDs configured)
      const boardsToFetch = boardSettings
        .filter((setting) => config[setting.name])
        .map((setting) => ({
          setting,
          boardId: config[setting.name]!,
          boardKey: boardKeyMap[setting.name],
          description: setting.description || setting.label,
        }));

      // Fetch all boards in parallel for better performance
      const results = await Promise.allSettled(
        boardsToFetch.map(({ boardId }) => 
          fetchBoard(boardId, abortController.signal)
        )
      );

      // Don't update state if aborted
      if (abortController.signal.aborted) return;

      // Process results and update store
      const failedBoards: string[] = [];
      
      results.forEach((result, index) => {
        const { boardKey, description } = boardsToFetch[index];
        
        if (result.status === 'fulfilled') {
          setBoard(boardKey, result.value);
        } else {
          console.error(`Failed to fetch ${description}:`, result.reason);
          setBoard(boardKey, null);
          failedBoards.push(description);
        }
      });

      if (failedBoards.length > 0) {
        setError(`Failed to load: ${failedBoards.join(', ')}`);
      }

      setLoading(false);
      
      // Only update fingerprint AFTER successful completion
      // This ensures aborted requests don't prevent retries in StrictMode
      prevConfigRef.current = configFingerprint;
      
      // Log typed data after fetching is complete
      const store = useBoardsStore.getState();
      console.log('=== Typed Board Data ===');
      console.log('Restaurants:', store.restaurants);
      console.log('Reservations:', store.reservations);
      console.log('Tables:', store.tables);
      console.log('Customers:', store.customers);
    }

    loadBoards();

    // Cleanup: abort pending requests when config changes or component unmounts
    return () => {
      abortController.abort();
    };
  }, [config, setBoard, setLoading, setError]);
}
