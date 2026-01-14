import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SystemConfig {
  restaurantsBoardId: string;
  reservationsBoardId: string;
  tablesBoardId: string;
  customersBoardId: string;
  [key: string]: string;
}

interface SystemStore {
  config: SystemConfig;
  setConfig: (config: Partial<SystemConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: SystemConfig = {
  restaurantsBoardId: '',
  reservationsBoardId: '',
  tablesBoardId: '',
  customersBoardId: '',
};

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      config: defaultConfig,
      setConfig: (newConfig) =>
        set((state) => ({
          config: { ...state.config, ...newConfig },
        })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'system-config',
    }
  )
);
