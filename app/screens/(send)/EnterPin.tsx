import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Cancel from "@/assets/svg/cancel.svg";
import Finger from "@/assets/svg/finger.svg";
import { router, useLocalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";
import GenericHeader from "@/components/GenericHeader";
import { useUserStore } from "@/store/userStore";
import LockSVG from "@/assets/svg/lock.svg";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";
import { sendMoney, withdrawFiat } from "@/services/gimme-wallet";
import { formatCurrency } from "@/lib/currency";

const EnterPin = () => {
    ///....................................
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    ///....................................
    const { user } = useUserStore();
    const data = JSON.parse(useLocalSearchParams().data as string);
    ///....................................
    const hasHardware = useCallback(async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (hasHardware) {
            console.log(hasHardware);
        }
        setIsBiometricSupported(hasHardware);
    }, []);
    ///....................................
    useEffect(() => {
        hasHardware();
    }, []);

    const handlePress = (value: any) => {
        pin.length < 4 && setPin((prevPin) => prevPin + value);
    };

    const handleDelete = () => {
        if (pin.length == 0) {
            return;
        }
        setPin((prevPin) => prevPin.slice(0, -1));
    };

    const handleNext = async () => {
        if (pin.length !== 4) {
            toast.error("Please enter a four-digit pin", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            const res = await sendMoney({
                saveToQuickPayments: data.saveToQuickPayments,
                userId: data.recipient.userId,
                amount: data.amount.toString(),
                currency: data.currency,
                remark: data.remark,
                pin,
                withBiometrics: true,
            });
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            router.push(
                `/screens/Receipt?data=${JSON.stringify({
                    type: res.data.type,
                    amount: res.data.amount,
                    date: new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        dateStyle: "full",
                    }),
                    medium: res.data.medium,
                    referenceId: res.data.referenceId,
                })}`
            );
        } catch (error: any) {
            setPin("");
            toast.error("An error occurred, Check if you have been debited", {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (pin.length === 4 && !isLoading) {
            handleNext();
        }
    }, [pin]);

    const authenticateBiometrics = async () => {
        if (isBiometricSupported) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Face ID or Touch ID",
                fallbackLabel: "Enter PIN",
                cancelLabel: "Cancel",
                disableDeviceFallback: false,
                requireConfirmation: true,
            });

            if (result.success) {
                try {
                    setIsLoading(true);
                    const res = await sendMoney({
                        saveToQuickPayments: data.saveToQuickPayments,
                        userId: data.recipient.userId,
                        amount: data.amount.toString(),
                        currency: data.currency,
                        remark: data.remark,
                        pin,
                        withBiometrics: true,
                    });
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(true);
                        }, 500);
                    });
                    router.push(
                        `/screens/Receipt?data=${JSON.stringify({
                            type: res.data.type,
                            amount: res.data.amount,
                            date: new Date().toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                dateStyle: "full",
                            }),
                            medium: res.data.medium,
                            referenceId: res.data.referenceId,
                        })}`
                    );
                } catch (error: any) {
                    toast.error(
                        "An error occurred, Check if you have been debited",
                        {
                            duration: 2000,
                            dismissible: true,
                        }
                    );
                } finally {
                    setIsLoading(false);
                }
            } else {
                console.log(
                    "Authentication failed",
                    "Please try again or enter your PIN.",
                    result.error
                );
            }
        } else {
            console.log("Biometrics not available", "Please enter your PIN.");
        }
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View>
                    <GenericHeader title="" showBackButton={false} />
                    <View style={{ alignItems: "center" }}>
                        {/* <Image source={User} style={styles.user} /> */}
                        <LockSVG style={styles.user} />
                        <Text style={styles.title}>Transfer</Text>
                        <Text style={styles.subtitle}>
                            NGN{" "}
                            {formatCurrency({
                                value: data.amount * 100,
                                currency: "ngn",
                            })}{" "}
                            to {data.recipient.phone}
                        </Text>

                        <View style={styles.pinContainer}>
                            <ReEnterPinField
                                code={pin}
                                onChange={setPin}
                                editable={false}
                            />
                            {/* <PinInput
                            code={pin}
                            onChange={setPin}
                            protectedField={true}
                        /> */}
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.keypadContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map(
                            (value, index) => {
                                if (value === null) {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.keypadButton}
                                            onPress={handleDelete}
                                        >
                                            <Cancel />
                                        </TouchableOpacity>
                                    );
                                } else if (value === "") {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={[styles.keypadButton]}
                                            onPress={authenticateBiometrics}
                                        >
                                            <Finger />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            style={styles.keypadButton}
                                            onPress={() => handlePress(value)}
                                        >
                                            <Text style={styles.keypadText}>
                                                {value}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                }
                            }
                        )}
                    </View>
                </View>

                {/* <GenericButton
                    text="Continue"
                    onPress={handleNext}
                    isLoading={isLoading}
                /> */}
                <TouchableOpacity onPress={() => router.back()}>
                    <Text style={styles.goBackText}></Text>
                </TouchableOpacity>
                <LoadingBottomSheet isLoading={isLoading} text="Sending" />
            </View>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: size.getHeightSize(24),
        paddingBottom: size.getHeightSize(48),
        paddingHorizontal: size.getWidthSize(24),
        justifyContent: "space-between",
    },

    backButton: {
        alignSelf: "flex-start",
    },
    title: {
        fontSize: size.fontSize(20),
        fontFamily: "ClashDisplay-SemiBold",
        // textAlign: "center",
        marginTop: size.getHeightSize(8),
        color: "#0A0B14",
    },
    subtitle: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
        // textAlign: "center",
        paddingTop: size.getHeightSize(1),
    },

    pinContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: size.getHeightSize(24),
        gap: size.getWidthSize(8),
    },

    pinBox: {
        flex: 1,
        height: size.getHeightSize(64),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E3E9",
    },

    keypadContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: size.getWidthSize(12),
    },

    keypadButton: {
        width: "30%",
        height: size.getHeightSize(80),
        justifyContent: "center",
        alignItems: "center",
    },

    keypadText: {
        fontSize: size.fontSize(20),
        fontFamily: "ClashDisplay-SemiBold",
    },
    firstPinBox: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },

    lastPinBox: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    },

    pinText: {
        fontSize: 24,
        fontWeight: "bold",
    },

    continueButton: {
        backgroundColor: "#3366FF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: size.getHeightSize(32),
    },

    continueText: {
        color: "#fff",
        fontSize: 16,
    },
    user: {
        alignSelf: "center",
        width: size.getWidthSize(72),
        height: size.getWidthSize(72),
        marginTop: size.getHeightSize(24),
    },

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(12),
        marginVertical: size.getHeightSize(24),
        padding: size.getWidthSize(16),
        backgroundColor: "#374BFB",
        justifyContent: "center",
        alignItems: "center",
    },

    pageButtonText: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(18),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },

    goBackText: {
        fontFamily: "Satoshi-Regular",
        textAlign: "center",
        paddingBottom: size.getHeightSize(12),
        color: "rgba(0, 0, 0, 0.8)",
        fontSize: size.fontSize(16),
    },
});

export default EnterPin;
