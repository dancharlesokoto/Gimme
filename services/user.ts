import { axiosInstance } from "./api";

export const fetchUser = async (userId: string) => {
    try {
        const request = await axiosInstance.get(`/user/${userId}`);
        return request.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};
