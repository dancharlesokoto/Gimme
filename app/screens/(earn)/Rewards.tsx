import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Modal,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import RewardsBadge from "@/assets/svg/rewardsBadge.svg";
import CustomRippleButton from "@/components/CustomRippleButton";
import Tasks from "@/components/Rewards/Tasks";
import RecentActivities from "@/components/Rewards/RecentActivities";
import Svg, { Path } from "react-native-svg";

export default function Rewards() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleModalClose = () => {
        setModalVisible(false);
    };
    return (
        <>
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
                                <View
                                    style={{ width: size.getWidthSize(60) }}
                                />
                            </View>
                            <View
                                className="BOTTOM"
                                style={styles.pageCardBottom}
                            >
                                <CustomRippleButton
                                    onPress={() => setModalVisible(true)}
                                    contentContainerStyle={
                                        styles.pageCardBottomButton
                                    }
                                >
                                    <Text
                                        style={styles.pageCardBottomButtonText}
                                    >
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
            <Modal
                visible={modalVisible}
                animationType="slide"
                presentationStyle="overFullScreen"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Bold",
                                    fontSize: size.fontSize(18),
                                    lineHeight: size.getHeightSize(24),
                                    color: "#0A0B14",
                                }}
                            >
                                Withdraw reward
                            </Text>
                            <TouchableOpacity
                                onPress={handleModalClose}
                                style={{
                                    flexDirection: "row",
                                    gap: size.getWidthSize(2),
                                    alignItems: "center",
                                    borderRadius: size.getWidthSize(8),
                                    padding: size.getWidthSize(6),
                                    borderWidth: 1,
                                    borderColor: "#E2E3E9",
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
                                        d="M10.0001 8.93955L13.7126 5.22705L14.7731 6.28755L11.0606 10.0001L14.7731 13.7126L13.7126 14.7731L10.0001 11.0606L6.28755 14.7731L5.22705 13.7126L8.93955 10.0001L5.22705 6.28755L6.28755 5.22705L10.0001 8.93955Z"
                                        fill="#525466"
                                    />
                                </Svg>

                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>

                        {/* space */}
                        <CustomRippleButton
                            contentContainerStyle={{
                                borderRadius: size.getWidthSize(16),
                                padding: size.getWidthSize(16),
                                backgroundColor: "#374BFB",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Bold",
                                    fontSize: size.fontSize(18),
                                    lineHeight: size.getHeightSize(24),
                                    color: "#FFFFFF",
                                }}
                            >
                                Withdraw
                            </Text>
                        </CustomRippleButton>
                    </View>
                </View>
            </Modal>
        </>
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

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: size.getWidthSize(24),
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalContent: {
        width: "100%",
        gap: size.getWidthSize(24),
        borderRadius: size.getWidthSize(16),
        padding: size.getWidthSize(24),
        backgroundColor: "#FFFFFF",
    },
});
