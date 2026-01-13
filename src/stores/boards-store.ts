import { create } from 'zustand';

export interface BoardItem {
  id: string;
  name: string;
  column_values: Array<{
    id: string;
    text: string;
    value: string | null;
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
  orders: Board | null;
  tables: Board | null;
  customers: Board | null;
}

interface BoardsStore {
  boards: BoardsData;
  loading: boolean;
  setBoard: (key: keyof BoardsData, board: Board | null) => void;
  setLoading: (loading: boolean) => void;
  resetBoards: () => void;
}

const defaultBoards: BoardsData = {
  restaurants: null,
  orders: null,
  tables: null,
  customers: null,
};

export const useBoardsStore = create<BoardsStore>((set) => ({
  boards: defaultBoards,
  loading: false,
  setBoard: (key, board) =>
    set((state) => ({
      boards: { ...state.boards, [key]: board },
    })),
  setLoading: (loading) => set({ loading }),
  resetBoards: () => set({ boards: defaultBoards }),
}));
