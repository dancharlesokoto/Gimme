export interface User {
    id?: number;
    userId: string;
    email?: string;
    username: string;
    phone: string | null;
    pin?: string | null;
    fullName?: string | null;
    profileImage?: string | null;
    balance: string | number | any;
    verificationCode?: string | null;
    isVerified?: boolean;
    role?: "user" | "merchant";
    createdAt?: Date;
    updatedAt?: Date | null;
    lastLogin?: Date | null;
}
//
