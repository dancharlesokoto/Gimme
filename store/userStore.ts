import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
    user: {
        userId: string;
        email: string;
        name: string;
        profileImage: string;
        token: string;
        isVerified: boolean;
    };
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
                profileImage: "",
                token: "",
                isVerified: false,
            },
            setUser: (user) => set({ user }),
            resetUser: () =>
                set({
                    user: {
                        userId: "",
                        email: "",
                        name: "",
                        profileImage: "",
                        token: "",
                        isVerified: false,
                    },
                }),
        }),
        {
            name: "user-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
