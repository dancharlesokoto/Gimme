import { axiosInstance } from "./api";

export const getRecipient = async (uid: string) => {
    try {
        const { data } = await axiosInstance.get(
            `/gimme-wallet/get-recipient/?uid=${uid}`
        );
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};

export const sendMoney = async ({
    saveToQuickPayments,
    userId,
    amount,
    remark,
    currency,
    pin,
    withBiometrics,
}: {
    saveToQuickPayments?: boolean;
    userId: string;
    amount: string;
    remark?: string;
    currency?: string;
    pin?: string;
    withBiometrics?: boolean;
}) => {
    try {
        const { data } = await axiosInstance.post("/gimme-wallet/send", {
            saveToQuickPayments,
            userId,
            amount,
            remark,
            currency,
            pin,
            withBiometrics,
        });
        return data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message;
        throw new Error(errorMessage);
    }
};
