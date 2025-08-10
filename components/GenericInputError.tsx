import { size } from "@/config/size";
import React from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

type GenericInputErrorProps = {
    text: string;
};

export default function GenericInputError({ text }: GenericInputErrorProps) {
    return (
        <View style={styles.errorContainer}>
            <Svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                //   xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#DF1C36"
                />
            </Svg>
            <Text style={styles.error}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
    },

    error: {
        color: "#DF1C36",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },
});
