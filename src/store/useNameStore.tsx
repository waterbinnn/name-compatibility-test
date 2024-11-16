import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface NameStore {
  name1: string;
  name2: string;
  setName1: (name1: string) => void;
  setName2: (name2: string) => void;
}

export const useNameStore = create<NameStore>()(
  persist(
    (set) => ({
      name1: '',
      name2: '',
      setName1: (name1) => set((state) => ({ ...state, name1 })),
      setName2: (name2) => set((state) => ({ ...state, name2 })),
    }),
    {
      name: 'NAMES',
    }
  )
);
