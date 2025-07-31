import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { Svg, Path } from "react-native-svg";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { verifyPhone } from "@/services/auth";
import PinInput from "@/components/PinInupt";
import CustomRippleButton from "@/components/CustomRippleButton";
import GenericHeader from "@/components/GenericHeader";
import ReEnterPin from "./ReEnterPin";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";

const Verify = () => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState(useGlobalSearchParams().phone as string);
    const [email, setEmail] = useState(useGlobalSearchParams().email as string);
    const [userId, setUserId] = useState(
        useGlobalSearchParams().userId as string
    );

    const phoneNumber = `${phone.substring(0, 3)}***${phone.slice(-4)}`;
    const [timeLeft, setTimeLeft] = useState(59);
    const [isTimeGone, setIsTimeGone] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((time) => {
                if (time <= 1) {
                    clearInterval(interval);
                    return 0;
                }

                return time - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    const handleResendCode = async () => {};

    const handleVerify = async () => {
        if (code.length !== 4) {
            toast.error("Please enter a four-digit code", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            const res = await verifyPhone({
                userId: userId,
                code: code,
            });
            toast.success(res.message, {
                duration: 2000,
                dismissible: true,
            });
            router.push(
                `/onboarding/SetUsername?userId=${userId}&phone=${phone}&email=${email}`
            );

            // router.push(`/onboarding/SetPin?userId=${userId}&phone=${phone}`);
        } catch (error: any) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <GenericHeader title="" />
                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.header}>Account Verification</Text>
                        <Text style={styles.subHead}>
                            Please enter the verification code sent to {`\n`}
                            <Text
                                style={{
                                    color: "#0A0B14",
                                    fontFamily: "Satoshi-Medium",
                                }}
                            >
                                ({email})
                            </Text>
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        {/* <PinInput
                            code={code}
                            onChange={setCode}
                            editable={true}
                        /> */}
                        <ReEnterPinField
                            code={code}
                            onChange={setCode}
                            editable={true}
                        />
                    </View>
                    <View style={styles.countdown}>
                        <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <Path
                                d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM10 16C11.5913 16 13.1174 15.3679 14.2426 14.2426C15.3679 13.1174 16 11.5913 16 10C16 8.4087 15.3679 6.88258 14.2426 5.75736C13.1174 4.63214 11.5913 4 10 4C8.4087 4 6.88258 4.63214 5.75736 5.75736C4.63214 6.88258 4 8.4087 4 10C4 11.5913 4.63214 13.1174 5.75736 14.2426C6.88258 15.3679 8.4087 16 10 16ZM10.75 10H13.75V11.5H9.25V6.25H10.75V10Z"
                                fill="#0A0B14"
                            />
                        </Svg>
                        <Text style={styles.count}>
                            00:{timeLeft} to resend code
                        </Text>
                    </View>

                    <CustomRippleButton
                        onPress={handleVerify}
                        disabled={isLoading}
                        style={{
                            borderRadius: size.getWidthSize(16),
                            alignSelf: "flex-start",
                        }}
                        contentContainerStyle={{
                            padding: size.getWidthSize(14),
                            backgroundColor: "#374BFB",
                            paddingHorizontal: size.getWidthSize(16),
                            paddingVertical: size.getHeightSize(16),
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: size.fontSize(18),
                                fontFamily: "Satoshi-Bold",
                                color: "#ffffff",
                                opacity: isLoading ? 0 : 1,
                            }}
                        >
                            Verify Code
                        </Text>
                        {isLoading && (
                            <ActivityIndicator
                                style={{
                                    width: "100%",
                                    position: "absolute",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                color={"#fff"}
                            />
                        )}
                    </CustomRippleButton>
                    {isTimeGone && (
                        <CustomRippleButton
                            disabled={isLoading}
                            onPress={handleResendCode}
                        >
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                    color: "#ffffff",
                                }}
                            >
                                Resend code
                            </Text>
                        </CustomRippleButton>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },
    header: {
        fontFamily: "ClashDisplay-SemiBold",
        fontSize: size.fontSize(22),
    },
    subHead: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        maxWidth: size.getWidthSize(345),
        color: "#8E8E93",
        flexWrap: "wrap",
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: size.getHeightSize(32),
        gap: size.getWidthSize(8),
    },
    box: {
        flex: 1,
        height: size.getHeightSize(64),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E2E3E9",
    },
    firstBox: {
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    lastBox: {
        borderTopRightRadius: 12,
        borderBottomRightRadius: 12,
    },
    input: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000000",
        width: "100%",
        height: "100%",
    },
    countdown: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 16,
        paddingBottom: 24,
    },
    count: {
        marginLeft: 8,
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
    },
});

export default Verify;
