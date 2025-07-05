import { useUserStore } from "@/store/userStore";
import { axiosInstance } from "./api";

export const createUser = async ({
    name,
    phone,
    email,
}: {
    name: string;
    phone: string;
    email: string | null;
}) => {
    if (!name || name.length < 3) {
        throw new Error("Full name is required");
    }
    if (!phone) {
        throw new Error("Phone number is required");
    }
    if (!email) {
        throw new Error("Email is required");
    }

    if (phone.substring(0, 1) === "0") {
        phone = phone.slice(1);
    }
    try {
        const request = await axiosInstance.post("/auth/signup", {
            name,
            phone,
            email,
        });
        return request.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const loginUser = async ({ uid, pin }: { uid: string; pin: string }) => {
    const isPhoneNumber = /^\d+$/.test(uid);

    if (!uid) {
        throw new Error("Phone number  or email is required");
    }

    if (uid.substring(0, 1) == "0") {
        uid = uid.slice(1);
    }
    try {
        const request = await axiosInstance.post("/auth/login", {
            uid,
            pin,
        });
        useUserStore.getState().setUser(request.data);
        return request.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
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
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const resendCode = async ({ userId }: { userId: string }) => {
    if (!userId) {
        throw new Error("Something went wrong");
    }

    try {
        const request = await axiosInstance.post(
            "/auth/resend-verification-code",
            {
                userId,
            }
        );
        return request.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
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
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
