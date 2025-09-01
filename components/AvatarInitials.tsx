import {
    View,
    Text,
    StyleSheet,
    StyleProp,
    ViewStyle,
    TextStyle,
} from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";

type AvatarInitialsProps = {
    name: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

export default function AvatarInitials({
    name,
    style,
    textStyle,
}: AvatarInitialsProps) {
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, textStyle]}>
                {name.split(" ").map((item, index) => (
                    <Text
                        key={index}
                        style={[styles.text, textStyle && textStyle]}
                    >
                        {item.charAt(0)}
                    </Text>
                ))}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
        borderRadius: size.getWidthSize(1000),
        backgroundColor: "#F6F6FA",
        borderWidth: 0.5,
        borderColor: "#e2e3e9",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: size.fontSize(16),
        fontFamily: "Satoshi-Bold",
        color: "#0A0B14",
    },
});
