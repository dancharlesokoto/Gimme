import { create } from "zustand";

interface UserStore {
  user: {
    userId: string;
    name: string;
    email: string;
    isVerified: boolean;
    phone: string;
  };
  setUser: (user: UserStore["user"]) => void;
  resetUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: {
    userId: "",
    name: "",
    email: "",
    isVerified: false,
    phone: "",
  },
  setUser: (user) => set({ user }),
  resetUser: () =>
    set({
      user: { userId: "", name: "", email: "", isVerified: false, phone: "" },
    }),
}));
