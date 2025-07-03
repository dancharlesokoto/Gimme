import { View, Text } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";

export default function Notice({
    children = "",
}: {
    children: React.ReactNode;
}) {
    return (
        <View
            style={{
                padding: size.getHeightSize(14),
                paddingBottom: size.getHeightSize(16),
                flexDirection: "row",
                gap: size.getWidthSize(12),
                borderRadius: size.getWidthSize(12),
                backgroundColor: "#F6F6FA",
            }}
        >
            <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
            >
                <Path
                    d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 9.25V13.75H10.75V9.25H9.25ZM9.25 6.25V7.75H10.75V6.25H9.25Z"
                    fill="#525466"
                />
            </Svg>

            <Text
                style={{
                    color: "#525466",
                    fontSize: size.fontSize(14),
                    fontFamily: "Satoshi-Regular",
                    flex: 1,
                }}
            >
                {children}
            </Text>
        </View>
    );
}
