import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import RewardsBadge from "@/assets/svg/rewardsBadge.svg";
import CustomRippleButton from "@/components/CustomRippleButton";
import Tasks from "@/components/Rewards/Tasks";
import RecentActivities from "@/components/Rewards/RecentActivities";

export default function Rewards() {
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader title="Rewards"></GenericHeader>
                <ScrollView contentContainerStyle={styles.page}>
                    <View style={styles.pageCard}>
                        <View className="TOP" style={styles.pageCardTop}>
                            <RewardsBadge />
                            <View
                                style={{
                                    alignItems: "center",
                                    gap: size.getHeightSize(4),
                                }}
                            >
                                <Text style={styles.pageCardTopText}>
                                    Current reward
                                </Text>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: size.getWidthSize(2),
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#868898",
                                            fontFamily: "Satoshi-Medium",
                                            fontSize: size.fontSize(16),
                                        }}
                                    >
                                        $
                                    </Text>
                                    <Text style={styles.pageCardTopBalance}>
                                        4.00
                                    </Text>
                                </View>
                                <Text style={styles.pageCardTopText}>
                                    ~GM40
                                </Text>
                            </View>
                            <View style={{ width: size.getWidthSize(60) }} />
                        </View>
                        <View className="BOTTOM" style={styles.pageCardBottom}>
                            <CustomRippleButton
                                contentContainerStyle={
                                    styles.pageCardBottomButton
                                }
                            >
                                <Text style={styles.pageCardBottomButtonText}>
                                    Withdraw to wallet
                                </Text>
                            </CustomRippleButton>
                        </View>
                    </View>

                    <Tasks />
                    <RecentActivities />
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    page: {
        gap: size.getHeightSize(24),
        paddingVertical: size.getHeightSize(24),
    },

    pageCard: {
        borderRadius: size.getWidthSize(16),
        padding: size.getWidthSize(24),
        backgroundColor: "#F6F6FA",
        gap: size.getWidthSize(24),
    },

    pageCardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: size.getWidthSize(8),
    },

    pageCardTopText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(12),
        lineHeight: size.getHeightSize(12),
        color: "#525466",
    },

    pageCardTopBalance: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(36),
        lineHeight: size.fontSize(36),
        color: "#0A0B14",
    },

    pageCardBottom: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    pageCardBottomButton: {
        borderRadius: size.getWidthSize(8),
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderColor: "#E2E3E9",
        alignItems: "center",
        justifyContent: "center",
        padding: size.getWidthSize(12),
    },

    pageCardBottomButtonText: {
        fontSize: size.fontSize(12),
        lineHeight: size.getHeightSize(16),
        fontFamily: "Satoshi-Medium",
        color: "#525466",
    },
});
