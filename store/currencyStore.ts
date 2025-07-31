import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createJSONStorage, persist } from "zustand/middleware";

export type CurrencyStore = {
    currency: "ngn" | "usd" | "gm";
    setCurrency: (currency: "ngn" | "usd" | "gm") => void;
};

const useCurrencyStore = create(
    persist<CurrencyStore>(
        (set) => ({
            currency: "ngn",
            setCurrency: (currency) => set({ currency }),
        }),
        {
            name: "currency-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useCurrencyStore;
