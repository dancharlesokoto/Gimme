import { axiosInstance } from "./api";

export const getCryptoWallet = async () => {
    try {
        const { data } = await axiosInstance.get("/crypto-wallet");
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
