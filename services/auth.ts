import { useUserStore } from "@/store/userStore";
import { axiosInstance } from "./api";

export const createUser = async ({
    phone,
    email,
}: {
    phone: string;
    email: string | null;
}) => {
    if (!phone) {
        throw new Error("Phone number is required");
    }
    if (!email) {
        throw new Error("Email is required");
    }

    if (phone.substring(0, 1) === "0") {
        phone = "+234" + phone.slice(1);
    }
    try {
        const request = await axiosInstance.post("/auth/signup", {
            phone,
            email,
        });
        return request.data;
    } catch (error: any) {
        console.log(error);
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};

export const loginUser = async ({ uid, pin }: { uid: string; pin: string }) => {
    const isPhoneNumber = /^\d+$/.test(uid);

    if (!uid) {
        throw new Error("Phone number  or email is required");
    }

    if (isPhoneNumber && uid.substring(0, 1) === "0") {
        uid = "+234" + uid.slice(1);
    }
    try {
        const request = await axiosInstance.post("/auth/login", {
            uid,
            pin,
        });
        useUserStore.getState().setUser(request.data);
        return request.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};

export const verifyPhone = async ({
    userId,
    code,
}: {
    userId: string;
    code: string;
}) => {
    if (!userId) {
        throw new Error("Something went wrong");
    }
    if (!code) {
        throw new Error("Code is required");
    }

    try {
        const request = await axiosInstance.post("/auth/verify-phone", {
            userId,
            code,
        });
        return request.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};

export const createPin = async ({
    userId,
    pin,
}: {
    userId: string;
    pin: string;
}) => {
    if (!userId) {
        throw new Error("Something went wrong");
    }
    if (!pin) {
        throw new Error("Pin is required");
    }
    try {
        const request = await axiosInstance.post("/auth/set-pin", {
            userId,
            pin,
        });
        return request.data;
    } catch (error: any) {
        if (error.response?.data?.message) {
            throw new Error(error.response.data.message);
        }
    }
};
