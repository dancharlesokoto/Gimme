import { axiosInstance } from "./api";

export const buyAirtime = async (
    amount: string,
    phone: string,
    network: string
) => {
    try {
        const { data } = await axiosInstance.post("/airtime/buy", {
            amount,
            phone,
            network,
        });
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
