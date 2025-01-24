import { create } from "zustand";

const useCurrencyStore = create((set) => ({
  currency: "ngn",
  setCurrency: (currency: string) => set(() => ({ currency: currency })),
}));

export default useCurrencyStore;
