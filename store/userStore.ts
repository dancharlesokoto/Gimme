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
    isStale: boolean;
    setIsStale: (value: boolean) => void;
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
            isStale: true,
            setIsStale: (value) => set({ isStale: value }),
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
                    isStale: true,
                }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
