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
import Button from "@/components/Button";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { verifyPhone } from "@/services/auth";
import PinInput from "@/components/PinInupt";

const Verify = () => {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState(useGlobalSearchParams().phone as string);
    const [userId, setUserId] = useState(
        useGlobalSearchParams().userId as string
    );
    const phoneNumber = `${phone.substring(0, 3)}***${phone.slice(-4)}`;
    const [timeLeft, setTimeLeft] = useState(59);

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
            router.push(`/onboarding/SetPin?userId=${userId}&phone=${phone}`);
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
                    <Pressable
                        onPress={() => router.back()}
                        style={{ paddingVertical: size.getHeightSize(14) }}
                    >
                        <Svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <Path
                                d="M8.871 11.25H18V12.75H8.871L12.894 16.773L11.8335 17.8335L6 12L11.8335 6.1665L12.894 7.227L8.871 11.25Z"
                                fill="#525466"
                            />
                        </Svg>
                    </Pressable>
                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.header}>Account Verification</Text>
                        <Text style={styles.subHead}>
                            Please enter the verification code sent to (
                            {phoneNumber})
                        </Text>
                    </View>
                    <View style={styles.textContainer}>
                        {/* {pin.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.box,
                                    index === 0 && styles.firstBox,
                                    index === pin.length - 1 && styles.lastBox,
                                ]}
                            >
                                <TextInput
                                    style={styles.input}
                                    keyboardType="numeric"
                                    maxLength={1}
                                    ref={(ref) =>
                                        (inputRefs.current[index] = ref)
                                    }
                                    onChangeText={(text) =>
                                        handleChange(text, index)
                                    }
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    value={pin[index]}
                                />
                            </View>
                        ))} */}
                        <PinInput code={code} onChange={setCode} />
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
                    <Button
                        disabled={code.length !== 4 || isLoading}
                        text={
                            isLoading ? (
                                <ActivityIndicator color={"#fff"} />
                            ) : (
                                "Verify Code"
                            )
                        }
                        width={133}
                        onPress={handleVerify}
                    />
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
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(28),
    },
    subHead: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        maxWidth: size.getWidthSize(345),
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
