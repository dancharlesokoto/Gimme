import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Cancel from "@/assets/svg/cancel.svg";
import Finger from "@/assets/svg/finger.svg";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path } from "react-native-svg";
import PinInput from "@/components/PinInupt";
import { toast } from "sonner-native";
import { sendMoney } from "@/services/gimme-wallet";
import CustomRippleButton from "@/components/CustomRippleButton";
import { formatCurrency } from "@/lib/currency";
import GenericHeader from "@/components/GenericHeader";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";

const EnterPin = () => {
    //...
    const [pin, setPin] = useState("");
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    //...
    const data = JSON.parse(useLocalSearchParams().data as string);
    //...
    useEffect(() => {
        (async () => {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            console.log(hasHardware);
            if (hasHardware) {
                console.log(hasHardware);
            }
            setIsBiometricSupported(hasHardware);
        })();
    }, []);

    const handlePress = (value: any) => {
        pin.length < 4 && setPin((prevPin) => prevPin + value);
    };

    const handleDelete = () => {
        setPin((prevPin) => {
            let newPin = prevPin;
            const index = newPin.lastIndexOf("");

            if (index === -1) {
                newPin = newPin.slice(0, -1);
            } else {
                newPin =
                    newPin.substring(0, index - 1) +
                    "" +
                    newPin.substring(index);
            }
            return newPin;
        });
    };

    const handleNext = async (withBiometrics = false) => {
        if (!pin && withBiometrics === false) {
            toast.error("Please enter a pin", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (pin.length !== 4 && withBiometrics === false) {
            toast.error("Pin must be 4 digits", {
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
                withBiometrics,
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
        } catch (error: any | Error) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

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
                await handleNext(true);
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
                    <GenericHeader title="" />
                    <View style={{ alignItems: "center" }}>
                        <View
                            style={{
                                width: size.getWidthSize(64),
                                height: size.getHeightSize(64),
                                borderRadius: size.getWidthSize(100),
                                marginTop: size.getHeightSize(32),
                                borderWidth: 1,
                                borderColor: "#E2E4E9",
                                justifyContent: "center",
                                alignItems: "center",
                                marginHorizontal: "auto",
                            }}
                        >
                            <Svg
                                width="21"
                                height="25"
                                viewBox="0 0 21.6 25.2"
                                fill="none"
                                //   xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M18.6992 9.20005H21.0992C21.4175 9.20005 21.7227 9.32648 21.9477 9.55152C22.1728 9.77656 22.2992 10.0818 22.2992 10.4V24.8C22.2992 25.1183 22.1728 25.4235 21.9477 25.6486C21.7227 25.8736 21.4175 26 21.0992 26H1.89922C1.58096 26 1.27573 25.8736 1.05069 25.6486C0.825647 25.4235 0.699219 25.1183 0.699219 24.8V10.4C0.699219 10.0818 0.825647 9.77656 1.05069 9.55152C1.27573 9.32648 1.58096 9.20005 1.89922 9.20005H4.29922V8.00005C4.29922 6.09049 5.05779 4.25914 6.40805 2.90888C7.75831 1.55862 9.58966 0.800049 11.4992 0.800049C13.4088 0.800049 15.2401 1.55862 16.5904 2.90888C17.9407 4.25914 18.6992 6.09049 18.6992 8.00005V9.20005ZM3.09922 11.6V23.6H19.8992V11.6H3.09922ZM10.2992 16.4H12.6992V18.8H10.2992V16.4ZM5.49922 16.4H7.89922V18.8H5.49922V16.4ZM15.0992 16.4H17.4992V18.8H15.0992V16.4ZM16.2992 9.20005V8.00005C16.2992 6.72701 15.7935 5.50611 14.8933 4.60594C13.9932 3.70576 12.7723 3.20005 11.4992 3.20005C10.2262 3.20005 9.00528 3.70576 8.10511 4.60594C7.20493 5.50611 6.69922 6.72701 6.69922 8.00005V9.20005H16.2992Z"
                                    fill="#375DFB"
                                />
                            </Svg>
                        </View>
                        <Text style={styles.title}>About to pay</Text>
                        <Text style={styles.subtitle}>
                            NGN{" "}
                            {formatCurrency({
                                value: data.amount * 100,
                                currency: "ngn",
                            })}{" "}
                            to{" "}
                            {data.recipient.phone.substring(0, 3) +
                                "***" +
                                data.recipient.phone.substring(7)}
                        </Text>

                        <View style={styles.pinContainer}>
                            <ReEnterPinField
                                code={pin}
                                onChange={setPin}
                                editable={false}
                            />
                        </View>
                    </View>
                </View>
                <View>
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
                                            style={styles.keypadButton}
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

                    <CustomRippleButton
                        onPress={handleNext}
                        contentContainerStyle={styles.pageButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.pageButtonText}>Continue</Text>
                        )}
                    </CustomRippleButton>
                </View>
            </View>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
        justifyContent: "space-between",
    },

    backButton: {
        alignSelf: "flex-start",
    },
    title: {
        fontSize: size.fontSize(20),
        fontFamily: "Satoshi-Bold",
        textAlign: "center",
        marginTop: 8,
    },
    subtitle: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
        textAlign: "center",
        paddingTop: size.getHeightSize(8),
    },

    pinContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: size.getHeightSize(32),
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
        paddingHorizontal: size.getWidthSize(0),
    },

    keypadButton: {
        width: "30%",
        height: size.getHeightSize(70),
        justifyContent: "center",
        alignItems: "center",
    },

    keypadText: {
        fontSize: size.fontSize(20),
        fontFamily: "ClashDisplay-Medium",
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
        width: 72,
        height: 72,
        marginTop: size.getHeightSize(32),
    },

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(12),
        marginTop: size.getHeightSize(24),
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
});

export default EnterPin;
