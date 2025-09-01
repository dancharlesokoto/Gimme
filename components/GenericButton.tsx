import {
    Text,
    StyleSheet,
    ActivityIndicator,
    StyleProp,
    ViewStyle,
} from "react-native";
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
    active?: boolean;
    style?: StyleProp<ViewStyle>;
};

export default function GenericButton({
    onPress,
    disabled,
    text,
    children,
    isLoading,
    textColor,
    buttonColor,
    style,
    active,
}: ButtonProps) {
    return (
        <CustomRippleButton
            onPress={onPress}
            contentContainerStyle={[
                styles.pageButton,
                buttonColor && { backgroundColor: buttonColor },
                active === false && { backgroundColor: "#E2E3E9" },
                style,
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
                            active === false && { color: "#525466" },
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
