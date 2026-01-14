import { useEffect, useRef } from 'react';
import mondaySdk from 'monday-sdk-js';
import { toast } from 'sonner';
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

const boardKeyMap: Record<string, keyof BoardsData> = {
  restaurantsBoardId: 'restaurants',
  ordersBoardId: 'orders',
  tablesBoardId: 'tables',
  customersBoardId: 'customers',
};

async function fetchBoard(boardId: string): Promise<Board> {
  const query = `
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
            }
          }
        }
      }
    }
  `;

  const response = await monday.api(query, {
    variables: { boardId: [boardId] },
  });

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
  const { setBoard, setLoading } = useBoardsStore();
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

    prevConfigRef.current = configFingerprint;

    async function loadBoards() {
      setLoading(true);

      for (const setting of boardSettings) {
        const boardId = config[setting.name];
        const boardKey = boardKeyMap[setting.name];
        const description = setting.description || setting.label;

        if (!boardId) {
          toast.warning(`${setting.label} not set`, {
            style: { background: '#f97316', color: 'white', border: 'none' },
          });
          continue;
        }

        try {
          const board = await fetchBoard(boardId);
          setBoard(boardKey, board);
          toast.success(`${description} board successfully fetched`, {
            style: { background: '#22c55e', color: 'white', border: 'none' },
          });
        } catch (error) {
          console.error(`Failed to fetch ${description}:`, error);
          setBoard(boardKey, null);
          toast.error(`${description} board failed to fetch`, {
            style: { background: '#ef4444', color: 'white', border: 'none' },
          });
        }
      }

      setLoading(false);
    }

    loadBoards();
  }, [config, setBoard, setLoading]);
}
