import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppStore {
    isP2PStarted: boolean;
    isMarketStarted: boolean;
    setIsP2PStarted: (isP2PStarted: boolean) => void;
    setIsMarketStarted: (isMarketStarted: boolean) => void;
}

export const useAppStore = create(
    persist<AppStore>(
        (set) => ({
            isP2PStarted: false,
            isMarketStarted: false,
            setIsP2PStarted: (isP2PStarted) => set({ isP2PStarted }),
            setIsMarketStarted: (isMarketStarted) => set({ isMarketStarted }),
        }),
        {
            name: "app-storage", // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => AsyncStorage), // (optional) by default the 'localStorage' is used
        }
    )
);
