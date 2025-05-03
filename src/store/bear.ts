import { create } from "zustand";

interface BearState {
  bears: number;
  increasePopulation: () => void;
  increase: (by: number) => void;
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increasePopulation: () =>
    set((state: BearState) => ({ bears: state.bears + 1 })),
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

export default useBearStore;
