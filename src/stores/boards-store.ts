import { create } from 'zustand';
import type {
  Restaurant,
  Reservation,
  Table,
  Customer,
  RawBoardItem,
} from '../types/monday-boards';
import {
  parseRestaurants,
  parseReservations,
  parseTables,
  parseCustomers,
} from '../types/monday-boards';

// Re-export typed interfaces for convenience
export type { Restaurant, Reservation, Table, Customer } from '../types/monday-boards';

export interface BoardItem {
  id: string;
  name: string;
  column_values: Array<{
    id: string;
    text: string;
    value: string | null;
    linked_items?: Array<{
      id: string;
      name: string;
    }>;
  }>;
}

export interface Board {
  id: string;
  name: string;
  columns: Array<{
    id: string;
    title: string;
    type: string;
  }>;
  items_page: {
    items: BoardItem[];
  };
}

export interface BoardsData {
  restaurants: Board | null;
  reservations: Board | null;
  tables: Board | null;
  customers: Board | null;
}

interface BoardsStore {
  // Raw board data from monday.com API
  boards: BoardsData;
  
  // Cached typed/parsed data (stable references to prevent re-renders)
  restaurants: Restaurant[];
  reservations: Reservation[];
  tables: Table[];
  customers: Customer[];
  
  // Loading and error state
  loading: boolean;
  error: string | null;
  
  // Actions
  setBoard: (key: keyof BoardsData, board: Board | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetBoards: () => void;
}

const defaultBoards: BoardsData = {
  restaurants: null,
  reservations: null,
  tables: null,
  customers: null,
};

export const useBoardsStore = create<BoardsStore>((set) => ({
  boards: defaultBoards,
  
  // Initialize typed data as empty arrays (stable references)
  restaurants: [],
  reservations: [],
  tables: [],
  customers: [],
  
  loading: false,
  error: null,
  
  setBoard: (key, board) =>
    set((state) => {
      // Update raw board data
      const newBoards = { ...state.boards, [key]: board };
      
      // Parse and cache typed data based on which board was updated
      const updates: Partial<BoardsStore> = { boards: newBoards };
      
      if (key === 'restaurants') {
        updates.restaurants = board 
          ? parseRestaurants(board.items_page.items as RawBoardItem[])
          : [];
      } else if (key === 'reservations') {
        updates.reservations = board
          ? parseReservations(board.items_page.items as RawBoardItem[])
          : [];
      } else if (key === 'tables') {
        updates.tables = board
          ? parseTables(board.items_page.items as RawBoardItem[])
          : [];
      } else if (key === 'customers') {
        updates.customers = board
          ? parseCustomers(board.items_page.items as RawBoardItem[])
          : [];
      }
      
      return updates;
    }),
    
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetBoards: () => set({ 
    boards: defaultBoards, 
    restaurants: [],
    reservations: [],
    tables: [],
    customers: [],
    error: null 
  }),
}));
