import { useUserStore } from "@/store/userStore";
import axios from "axios";

// const BASE_URL = "http://localhost:3000/api/v1";
// export const IMAGE_URL = "http://localhost:3000/api/v1/image";

export const BASE_URL = "http://192.168.190.127:3000/api/v1";
export const IMAGE_URL = "http://192.168.190.127:3000/api/v1/image";

// export const BASE_URL = "https://gimme-api.vercel.app/api/v1";
// export const IMAGE_URL = "https://gimme-api.vercel.app/api/v1/image";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = useUserStore.getState().user.token ?? null;
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
