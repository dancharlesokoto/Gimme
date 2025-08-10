import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";

type AvatarInitialsProps = {
    name: string;
    style?: any;
    textStyle?: any;
};

export default function AvatarInitials({
    name,
    style,
    textStyle,
}: AvatarInitialsProps) {
    const _firstName = name.split(" ")[0];
    const _lastName = name.split(" ")[1];
    return (
        <View style={[styles.container, style]}>
            <Text style={[styles.text, textStyle]}>
                {_firstName.charAt(0)}
                {_lastName.charAt(0)}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
        borderRadius: size.getWidthSize(1000),
        backgroundColor: "#E2E3E9",
        justifyContent: "center",
        alignItems: "center",
    },

    text: {
        fontSize: size.fontSize(20),
        fontFamily: "Satoshi-Bold",
        color: "#0A0B14",
    },
});
