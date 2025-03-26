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

export const loginUser = async ({
  phone,
  pin,
}: {
  phone: string;
  pin: string;
}) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  if (phone.substring(0, 1) === "0") {
    phone = "+234" + phone.slice(1);
  }
  try {
    const request = await axiosInstance.post("/auth/login", {
      phone,
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
  phone,
  code,
}: {
  phone: string;
  code: string;
}) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }
  if (!code) {
    throw new Error("Code is required");
  }

  if (phone.substring(0, 1) === "0") {
    phone = "+234" + phone.slice(1);
  }
  try {
    const request = await axiosInstance.post("/auth/verify-phone", {
      phone,
      code,
    });
    return request.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
  }
};
