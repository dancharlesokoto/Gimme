import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import ErrorNotice from "@/assets/svg/errorNotice.svg";
import { size } from "@/config/size";
import CustomRippleButton from "../CustomRippleButton";

import { toast } from "sonner-native";
import { createBankAccount } from "@/services/user";
import { useUserStore } from "@/store/userStore";

export default function CreateBankAccountCTA({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    ///.....
    const [isLoading, setIsLoading] = useState(false);

    //..
    const name = useUserStore.getState().user.name;
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ")[name.split(" ").length - 1];

    const handleCreateBanknAccount = async () => {
        try {
            setIsLoading(true);
            await createBankAccount({
                userId: useUserStore.getState().user.userId,
                email: useUserStore.getState().user.email,
                phone: useUserStore.getState().user.phone,
                firstName,
                lastName,
            });
            onSuccess();
            toast.success("Bank Account created successfully");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <ErrorNotice />
            <Text style={styles.mainText}>No bank account found</Text>
            <Text style={styles.subText}>
                Create a dedicated virtual bank account
            </Text>

            <CustomRippleButton
                rippleColor="#fff"
                disabled={isLoading}
                onPress={handleCreateBanknAccount}
                style={{ width: "100%" }}
                contentContainerStyle={{
                    backgroundColor: "#374BFB",
                    height: size.getHeightSize(56),
                    marginVertical: size.getHeightSize(16),
                    borderRadius: size.getHeightSize(16),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text
                        style={{
                            fontSize: size.fontSize(18),
                            fontFamily: "Satoshi-Bold",
                            color: "#ffffff",
                            marginLeft: size.getWidthSize(10),
                        }}
                    >
                        Create account
                    </Text>
                )}
            </CustomRippleButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    mainText: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(18),
        lineHeight: size.getHeightSize(24),
        color: "#000000",
    },

    subText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#525466",
        marginTop: size.getHeightSize(8),
    },
});
