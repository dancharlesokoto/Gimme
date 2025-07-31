import { axiosInstance } from "./api";

export type TransactionType = {
    type: string;
    medium: string;
    amount: number;
    senderId: string;
    receiverId: string;
};

export const getTransactions = async () => {
    try {
        const request = await axiosInstance.get("/transaction/all");
        return request.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const createTransaction = async ({
    type,
    medium,
    amount,
    senderId,
    receiverId,
}: TransactionType) => {
    try {
        const request = await axiosInstance.post("/transaction/create", {
            type,
            medium,
            amount,
            senderId,
            receiverId,
        });
        return request.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
