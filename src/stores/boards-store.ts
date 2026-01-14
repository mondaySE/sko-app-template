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
  boards: BoardsData;
  loading: boolean;
  error: string | null;
  setBoard: (key: keyof BoardsData, board: Board | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetBoards: () => void;
  
  // Typed accessors - parse raw items into typed objects
  getRestaurants: () => Restaurant[];
  getReservations: () => Reservation[];
  getTables: () => Table[];
  getCustomers: () => Customer[];
}

const defaultBoards: BoardsData = {
  restaurants: null,
  reservations: null,
  tables: null,
  customers: null,
};

export const useBoardsStore = create<BoardsStore>((set, get) => ({
  boards: defaultBoards,
  loading: false,
  error: null,
  setBoard: (key, board) =>
    set((state) => ({
      boards: { ...state.boards, [key]: board },
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  resetBoards: () => set({ boards: defaultBoards, error: null }),
  
  // Typed accessors - these parse raw monday.com data into typed objects
  getRestaurants: () => {
    const board = get().boards.restaurants;
    if (!board) return [];
    return parseRestaurants(board.items_page.items as RawBoardItem[]);
  },
  getReservations: () => {
    const board = get().boards.reservations;
    if (!board) return [];
    return parseReservations(board.items_page.items as RawBoardItem[]);
  },
  getTables: () => {
    const board = get().boards.tables;
    if (!board) return [];
    return parseTables(board.items_page.items as RawBoardItem[]);
  },
  getCustomers: () => {
    const board = get().boards.customers;
    if (!board) return [];
    return parseCustomers(board.items_page.items as RawBoardItem[]);
  },
}));
