import { Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { size } from "@/config/size";
import CustomRippleButton from "./CustomRippleButton";

type ButtonProps = {
    onPress?: () => void;
    disabled?: boolean;
    text?: string;
    children?: React.ReactNode;
    isLoading?: boolean;
    textColor?: string;
    buttonColor?: string;
};

export default function GenericButton({
    onPress,
    disabled,
    text,
    children,
    isLoading,
    textColor,
    buttonColor,
}: ButtonProps) {
    return (
        <CustomRippleButton
            onPress={onPress}
            contentContainerStyle={[
                styles.pageButton,
                buttonColor && { backgroundColor: buttonColor },
            ]}
            disabled={disabled}
        >
            {isLoading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <>
                    <Text
                        style={[
                            styles.pageButtonText,
                            textColor && { color: textColor },
                        ]}
                    >
                        {text && text}
                    </Text>
                    {children}
                </>
            )}
        </CustomRippleButton>
    );
}

const styles = StyleSheet.create({
    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(16),
        marginTop: size.getHeightSize(24),
        padding: size.getWidthSize(16),
        backgroundColor: "#374BFB",
        justifyContent: "center",
        alignItems: "center",
    },

    pageButtonText: {
        fontFamily: "ClashDisplay-Medium",
        fontSize: size.fontSize(15),
        lineHeight: size.getHeightSize(24),
        color: "#fff",
    },
});
