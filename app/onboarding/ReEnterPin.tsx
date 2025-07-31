import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import * as LocalAuthentication from "expo-local-authentication";
import { StyleSheet } from "react-native";
import { useUserStore } from "@/store/userStore";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";
import { IMAGE_URL } from "@/services/api";
import Svg, { Path } from "react-native-svg";
import { toast } from "sonner-native";
import { router } from "expo-router";
import { loginUser, logoutUser } from "@/services/auth";
import { Modal } from "react-native";
import CustomRippleButton from "@/components/CustomRippleButton";

export default function ReEnterPin() {
    const user = useUserStore((state) => state.user);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);

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
            const res = await loginUser({
                uid: user.email,
                pin: pin,
            });
            toast.success("Login Successful", {
                duration: 2000,
                dismissible: true,
            });
            router.replace("/");
        } catch (error: any | Error) {
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

    //...
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
                toast.success("Login Successful", {
                    duration: 2000,
                    dismissible: true,
                });
                useUserStore.getState().setIsStale(false);
                router.replace("/");
            } else {
                console.log(
                    "Authentication failed",
                    "Please try again or enter your PIN.",
                    result.error
                );
            }
            setIsLoading(false);
        } else {
            toast.error("Biometrics not available", {
                duration: 2000,
                dismissible: true,
            });
            console.log("Biometrics not available", "Please enter your PIN.");
        }
    };
    return (
        <>
            <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.container}
                >
                    {user.profileImage == "default.png" ||
                    user.profileImage == "" ? (
                        <Image
                            source={require("@/assets/images/user.png")}
                            alt=""
                            style={{
                                width: size.getWidthSize(60),
                                height: size.getHeightSize(60),
                                borderRadius: size.getWidthSize(1000),
                            }}
                        />
                    ) : (
                        <Image
                            loadingIndicatorSource={require("@/assets/images/user.png")}
                            source={{
                                uri:
                                    IMAGE_URL + "/profile/" + user.profileImage,
                            }}
                            alt=""
                            style={{
                                width: size.getWidthSize(88),
                                height: size.getHeightSize(88),
                                borderRadius: size.getWidthSize(1000),
                            }}
                        />
                    )}
                    <View
                        style={{
                            gap: size.getHeightSize(4),
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.heading}>
                            Welcome Back, {user.name.split(" ")[0]}
                        </Text>
                        <Text style={styles.text}>Enter your 4-Digit PIN</Text>
                    </View>
                    <ReEnterPinField code={pin} onChange={setPin} />
                    <View
                        style={{
                            width: "100%",
                            flex: 1,
                            paddingVertical: size.getHeightSize(60),
                            justifyContent: "flex-end",
                            alignItems: "center",
                            gap: size.getHeightSize(16),
                            paddingTop: size.getHeightSize(24),
                        }}
                    >
                        <Text
                            style={{
                                fontFamily: "Satoshi-Regular",
                                color: "#0A0B14",
                                fontSize: size.fontSize(14),
                                textAlign: "center",
                            }}
                        >
                            Log in using biometrics
                        </Text>
                        <TouchableOpacity
                            style={{
                                borderWidth: 1,
                                borderColor: "rgb(180, 180, 210)",
                                width: size.getWidthSize(80),
                                height: size.getWidthSize(80),
                                borderRadius: "100%",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            onPress={authenticateBiometrics}
                        >
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="#374BFB"
                                style={{
                                    width: size.getWidthSize(50),
                                    height: size.getHeightSize(50),
                                }}
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                                />
                            </Svg>
                        </TouchableOpacity>
                        <CustomRippleButton
                            onPress={handleNext}
                            style={{ width: "100%" }}
                            contentContainerStyle={styles.pageButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.pageButtonText}>
                                    Continue
                                </Text>
                            )}
                        </CustomRippleButton>
                        <TouchableOpacity onPress={logoutUser}>
                            <Text style={styles.biometricsText}>
                                Not you?{" "}
                                <Text
                                    style={{
                                        textDecorationLine: "underline",
                                        fontFamily: "Satoshi-Bold",
                                    }}
                                >
                                    Log out
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </CustomSafeArea>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: size.getHeightSize(32),
        paddingHorizontal: size.getWidthSize(24),
        gap: size.getHeightSize(18),
    },

    heading: {
        textAlign: "center",
        fontFamily: "Satoshi-Bold",
        lineHeight: size.getHeightSize(22),
        color: "rgba(0, 0, 0, 0.9)",
        fontSize: size.fontSize(22),
    },

    subHeading: {
        fontFamily: "Satoshi-Regular",
        color: "rgba(0, 0, 0, 0.7)",
        fontSize: size.fontSize(18),
    },

    text: {
        fontFamily: "Satoshi-Regular",
        color: "rgba(0, 0, 0, 0.7)",
        fontSize: size.fontSize(14),
    },

    biometricsText: {
        fontFamily: "Satoshi-Regular",
        color: "rgba(0, 0, 0, 0.8)",
        fontSize: size.fontSize(16),
    },

    pageButton: {
        width: "100%",
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(12),
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
