import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { size } from "@/config/size";
import DepositIcon from "@/assets/svg/depositIcon.svg";

export default function RecentActivities() {
    const activities = useMemo(
        () => [
            {
                name: "Complete registration",
                description: "Finished your registration process",
                amount: "40",
                date: "Sept 21",
            },
        ],
        []
    );
    return (
        <View
            style={{
                gap: size.getHeightSize(12),
            }}
        >
            <Text
                style={{
                    fontFamily: "Satoshi-Regular",
                    color: "#0A0B14",
                    fontSize: size.fontSize(14),
                    lineHeight: size.getHeightSize(20),
                }}
            >
                Recent activities
            </Text>

            <View>
                {activities.map((activity, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            gap: size.getWidthSize(12),
                            justifyContent: "space-between",
                            padding: size.getHeightSize(8),
                            alignItems: "center",
                        }}
                    >
                        <DepositIcon />
                        <View
                            style={{
                                flex: 1,
                                gap: size.getHeightSize(4),
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Medium",
                                    fontSize: size.fontSize(14),
                                    lineHeight: size.getHeightSize(20),
                                    color: "#0A0B14",
                                }}
                            >
                                {activity.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(12),
                                    lineHeight: size.getHeightSize(15),
                                    color: "#525466",
                                }}
                            >
                                {activity.description}
                            </Text>
                        </View>

                        <View
                            style={{
                                alignItems: "flex-end",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(14),
                                    lineHeight: size.getHeightSize(20),
                                    color: "#0A0B14",
                                }}
                            >
                                +GM{activity.amount}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(12),
                                    lineHeight: size.getHeightSize(15),
                                    color: "#525466",
                                }}
                            >
                                {activity.date}
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}
