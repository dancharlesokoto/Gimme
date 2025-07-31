import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import Notice from "@/components/Global/Notice";
import CustomRippleButton from "@/components/CustomRippleButton";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";

export default function KYC() {
    /////....
    const [isLoading, setIsLoading] = useState(false);
    //...
    const [userId, setUserId] = useState(
        useGlobalSearchParams().userId as string
    );
    const [phone, setPhone] = useState(useGlobalSearchParams().phone as string);
    //..

    const handleVerifyKYC = async () => {
        toast.error("This feature is not available yet", {
            duration: 2000,
            dismissible: true,
        });
    };
    //...
    const handleSkip = async () => {
        router.push(`/onboarding/SetPin?userId=${userId}&phone=${phone}`);
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader title="" />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className="content"
                    contentContainerStyle={{
                        paddingVertical: size.getHeightSize(24),
                        gap: size.getHeightSize(32),
                    }}
                >
                    <View style={{ gap: size.getHeightSize(8) }}>
                        <Text style={styles.pageTitle}>Provide KYC</Text>
                        <Text style={styles.pageText}>
                            Please provide your NIN and BVN so you can use the
                            features of Gimme without any restriction.{" "}
                        </Text>
                    </View>

                    {/* space */}

                    <View style={{ gap: size.getHeightSize(8) }}>
                        <Text
                            style={[
                                styles.pageTitle,
                                {
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(14),
                                },
                            ]}
                        >
                            BVN
                        </Text>
                        <View style={styles.inputContainer}>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M5.5 10H14.5V7H11.5V4H5.5V10ZM4 10V3.24625C4 2.83375 4.33375 2.5 4.747 2.5H12.25L16 6.25V10H17.5V11.5H2.5V10H4ZM3.25 13H4.75V17.5H3.25V13ZM15.25 13H16.75V17.5H15.25V13ZM12.25 13H13.75V17.5H12.25V13ZM9.25 13H10.75V17.5H9.25V13ZM6.25 13H7.75V17.5H6.25V13Z"
                                    fill="#868898"
                                />
                            </Svg>
                            <TextInput
                                placeholder="e.g 11111111111"
                                keyboardType="phone-pad"
                                style={{
                                    flex: 1,
                                    fontFamily: "Satoshi-Medium",
                                    fontSize: size.fontSize(12),
                                }}
                            />
                        </View>
                        <Notice>
                            Dial{" "}
                            <Text style={{ textDecorationLine: "underline" }}>
                                5650#
                            </Text>{" "}
                            on your phone using the SIM card associated with
                            your BVN. Service costs NGN20.
                        </Notice>
                    </View>

                    {/* space */}

                    <View style={{ gap: size.getHeightSize(8) }}>
                        <Text
                            style={[
                                styles.pageTitle,
                                {
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(14),
                                },
                            ]}
                        >
                            NIN
                        </Text>
                        <View style={styles.inputContainer}>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M5.5 10H14.5V7H11.5V4H5.5V10ZM4 10V3.24625C4 2.83375 4.33375 2.5 4.747 2.5H12.25L16 6.25V10H17.5V11.5H2.5V10H4ZM3.25 13H4.75V17.5H3.25V13ZM15.25 13H16.75V17.5H15.25V13ZM12.25 13H13.75V17.5H12.25V13ZM9.25 13H10.75V17.5H9.25V13ZM6.25 13H7.75V17.5H6.25V13Z"
                                    fill="#868898"
                                />
                            </Svg>
                            <TextInput
                                placeholder="e.g 111111111112"
                                keyboardType="phone-pad"
                                style={{
                                    flex: 1,
                                    fontFamily: "Satoshi-Medium",
                                    fontSize: size.fontSize(12),
                                }}
                            />
                        </View>
                        <Notice>
                            Dial{" "}
                            <Text style={{ textDecorationLine: "underline" }}>
                                *346#
                            </Text>{" "}
                            on your registered phone number to get your NIN.
                            Service costs NGN20. or Visit{" "}
                            <Text style={{ textDecorationLine: "underline" }}>
                                nimc.gov.ng/sms-service
                            </Text>
                        </Notice>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: size.getHeightSize(8),
                        }}
                    >
                        <CustomRippleButton
                            disabled={isLoading}
                            onPress={handleVerifyKYC}
                            style={{
                                width: size.getWidthSize(140),
                                borderRadius: size.getWidthSize(16),
                                backgroundColor: "#374BFB",
                                alignSelf: "flex-start",
                            }}
                            contentContainerStyle={{
                                padding: size.getWidthSize(16),
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                    color: "#ffffff",
                                }}
                            >
                                Verify
                            </Text>
                        </CustomRippleButton>
                        <CustomRippleButton
                            onPress={handleSkip}
                            disabled={isLoading}
                            style={{
                                borderRadius: size.getWidthSize(16),
                                backgroundColor: "#F6F6FA",
                                alignSelf: "flex-start",
                            }}
                            contentContainerStyle={{
                                padding: size.getWidthSize(16),
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                    color: "##525466",
                                }}
                            >
                                Do it later
                            </Text>
                        </CustomRippleButton>
                    </View>
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

    pageTitle: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(20),
        lineHeight: size.getHeightSize(24),
        color: "#0A0B14",
    },

    pageText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },

    inputContainer: {
        flexDirection: "row",
        gap: size.getWidthSize(16),
        height: size.getHeightSize(52),
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(12),
    },
});
