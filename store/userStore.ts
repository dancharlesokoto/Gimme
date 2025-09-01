import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
    user: {
        userId: string;
        email: string;
        name: string;
        phone: string;
        profileImage: string;
        paystackCustomerId: string;
        paystackVirtualAccountId: string;
        token: string;
        isVerified: boolean;
    };
    lastStale: any;
    setLastStale: (lastStale: any) => void;
    setUser: (user: UserStore["user"]) => void;
    resetUser: () => void;
}

export const useUserStore = create(
    persist<UserStore>(
        (set) => ({
            user: {
                userId: "",
                email: "",
                name: "",
                phone: "",
                profileImage: "",
                paystackCustomerId: "",
                paystackVirtualAccountId: "",
                token: "",
                isVerified: false,
            },
            lastStale: null,
            setLastStale: (value) => set({ lastStale: value }),
            setUser: (user) => set({ user }),
            resetUser: () =>
                set({
                    user: {
                        userId: "",
                        email: "",
                        name: "",
                        phone: "",
                        profileImage: "",
                        paystackCustomerId: "",
                        paystackVirtualAccountId: "",
                        token: "",
                        isVerified: false,
                    },
                    lastStale: null,
                }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
