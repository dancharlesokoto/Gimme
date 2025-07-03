import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ErrorNotice from "@/assets/svg/errorNotice.svg";
import { size } from "@/config/size";
import CustomRippleButton from "../CustomRippleButton";
import { router } from "expo-router";

export default function CreateBankAccountCTA() {
    return (
        <View style={styles.container}>
            <ErrorNotice />
            <Text style={styles.mainText}>No bank account found</Text>
            <Text style={styles.subText}>
                Create a dedicated virtual bank account
            </Text>

            <CustomRippleButton
                rippleColor="#fff"
                onPress={() => router.push("/screens/(fund)/CreateBankAccount")}
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
