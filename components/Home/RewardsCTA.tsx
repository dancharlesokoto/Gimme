import { View, Text, Pressable } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import { router } from "expo-router";

export default function RewardsCTA() {
    return (
        <View
            style={{
                paddingHorizontal: size.getWidthSize(24),
            }}
        >
            <View
                className="item"
                style={{
                    backgroundColor: "#F6F6FA",
                    padding: size.getWidthSize(4),
                    paddingBottom: size.getHeightSize(8),
                    borderRadius: size.getWidthSize(16),
                    alignItems: "center",
                }}
            >
                <View
                    className="inner"
                    style={{
                        borderRadius: size.getWidthSize(16),
                        paddingVertical: size.getHeightSize(16),
                        paddingHorizontal: size.getWidthSize(12),
                        backgroundColor: "#FFFFFF",
                        flexDirection: "row",
                        gap: size.getWidthSize(16),
                        alignItems: "center",
                    }}
                >
                    <Svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="30" height="30" rx="15" fill="#F28B2C" />
                        <Path
                            d="M15 11.25C16.5913 11.25 18.1174 11.8822 19.2426 13.0074C20.3679 14.1326 21 15.6587 21 17.25C21 18.8413 20.3679 20.3674 19.2426 21.4927C18.1174 22.6179 16.5913 23.25 15 23.25C13.4087 23.25 11.8826 22.6179 10.7574 21.4927C9.63214 20.3674 9 18.8413 9 17.25C9 15.6587 9.63214 14.1326 10.7574 13.0074C11.8826 11.8822 13.4087 11.25 15 11.25ZM15 13.875L14.0078 15.885L11.79 16.2075L13.395 17.7713L13.0162 19.9808L15 18.9375L16.9838 19.98L16.605 17.7713L18.21 16.2068L15.9922 15.8843L15 13.875ZM15.75 7.49927L19.5 7.50002V9.75002L18.4777 10.6035C17.6295 10.1585 16.7033 9.88114 15.75 9.78677V7.50002V7.49927ZM14.25 7.49927V9.78677C13.297 9.881 12.3711 10.1581 11.523 10.6028L10.5 9.75002V7.50002L14.25 7.49927Z"
                            fill="white"
                        />
                    </Svg>
                    <View style={{ flex: 1, gap: size.getHeightSize(4) }}>
                        <Text
                            style={{
                                fontFamily: "Satoshi-Medium",
                                fontSize: size.fontSize(14),
                                lineHeight: size.getHeightSize(20),
                            }}
                        >
                            Earn tokens for using Gimme
                        </Text>
                        <Text
                            style={{
                                fontFamily: "Satoshi-Regular",
                                fontSize: size.fontSize(12),
                                lineHeight: size.getHeightSize(14.4),
                                color: "#0A0B14",
                            }}
                        >
                            Finish registration, Complete transactions, Setup
                            KYC and many more to earn
                        </Text>
                    </View>
                </View>
                <Pressable
                    onPress={() => router.push("/screens/(earn)/Rewards")}
                    style={{
                        padding: size.getWidthSize(12),
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Satoshi-Medium",
                            fontSize: size.fontSize(14),
                            lineHeight: size.getHeightSize(20),
                        }}
                    >
                        View Rewards
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
