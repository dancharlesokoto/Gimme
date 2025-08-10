import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Pressable,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Cancel from "@/assets/svg/cancel.svg";
import Finger from "@/assets/svg/finger.svg";
import User from "@/assets/images/user.png";
import { router, useGlobalSearchParams } from "expo-router";
import { loginUser } from "@/services/auth";
import { toast } from "sonner-native";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";
import GenericHeader from "@/components/GenericHeader";
import GenericButton from "@/components/GenericButton";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";

const EnterPin = () => {
    const [pin, setPin] = useState("");
    // const [displayedPin, setDisplayedPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uid, setUid] = useState(useGlobalSearchParams().uid as string);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

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
            const res = await loginUser({
                uid: uid,
                pin: pin,
            });
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            router.push("/");
        } catch (error: any) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (pin.length === 4) {
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
                await handleNext();
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
                        <Image source={User} style={styles.user} />
                        <Text style={styles.title}>Welcome Back</Text>
                        <Text style={styles.subtitle}>
                            Enter your pin below to enter Gimme
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
                                        <View
                                            key={index}
                                            style={[
                                                styles.keypadButton,
                                                { opacity: 0.4 },
                                            ]}
                                        >
                                            <Finger />
                                        </View>
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
                    <Text style={styles.goBackText}>
                        Not you?{" "}
                        <Text
                            style={{
                                textDecorationLine: "underline",
                                fontFamily: "Satoshi-Bold",
                            }}
                        >
                            Go back
                        </Text>
                    </Text>
                </TouchableOpacity>
                <LoadingBottomSheet isLoading={isLoading} />
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
