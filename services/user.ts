import { axiosInstance } from "./api";
import { useUserStore } from "@/store/userStore";

export const fetchUser = async (userId: string) => {
    try {
        const request = await axiosInstance.get(`/user/details`);
        return request.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            useUserStore.getState().resetUser();
            throw new Error("User not found");
        }
        const errorMessage = error.response?.data?.message || error.message;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
};

export const updateUser = async ({
    pin,
    username,
    phone,
    email,
}: {
    pin?: string;
    username?: string;
    phone?: string;
    email?: string;
}) => {
    if (phone?.substring(0, 1) === "0") {
        phone = phone.slice(1);
    }
    try {
        const request = await axiosInstance.patch(`/user/update`, {
            userId: useUserStore.getState().user.userId,
            pin,
            username,
            phone,
            email,
        });
        return request.data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            useUserStore.getState().resetUser();
            throw new Error("User not found");
        }
        const errorMessage = error.response?.data?.message || error.message;
        console.log(errorMessage);
        throw new Error(errorMessage);
    }
};

export const createBankAccount = async ({
    userId,
    email,
    firstName,
    lastName,
    phone,
}: {
    userId: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
}) => {
    try {
        const { data } = await axiosInstance.post("/user/bank-account", {
            userId,
            email,
            firstName,
            lastName,
            phone,
        });
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const getBankAccountStatus = async () => {
    try {
        const { data } = await axiosInstance.get("/user/bank-account-status");
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const getBankAccount = async () => {
    try {
        const { data } = await axiosInstance.get("/user/bank-account?");
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const getWithdrawalBankAccounts = async () => {
    try {
        const { data } = await axiosInstance.get(
            "/user/withdrawal-bank-account"
        );
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
