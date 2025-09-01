import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Cancel from "@/assets/svg/cancel.svg";
import Finger from "@/assets/svg/finger.svg";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { createPin, loginUser } from "@/services/auth";
import GenericHeader from "@/components/GenericHeader";
import CustomRippleButton from "@/components/CustomRippleButton";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";
import { Image } from "expo-image";
import User from "@/assets/images/user.png";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";

const EnterPin = () => {
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { userId, phone, pinConfirm }: any = useGlobalSearchParams();

    const handlePress = (value: any) => {
        pin.length < 4 && setPin((prevPin) => prevPin + value);
    };

    const handleDelete = () => {
        if (pin.length == 0) {
            return;
        }
        setPin((prevPin) => prevPin.slice(0, -1));
    };

    const handleNext = useCallback(async () => {
        if (pin.length !== 4) {
            toast.error("Please enter a four-digit pin", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (pin !== pinConfirm) {
            toast.error("Pin do not match", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            await createPin({
                userId: userId as string,
                pin: pin,
            });

            await loginUser({
                uid: phone,
                pin: pin,
            });
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            router.replace("/");
        } catch (error: any) {
            toast.error("An error occured! please try again", {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            setIsLoading(false);
        }
    }, [pin, userId, phone]);

    useEffect(() => {
        if (pin.length === 4) {
            handleNext();
        }
    }, [pin]);

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View>
                    <GenericHeader title="" showBackButton={false} />
                    <View style={{ alignItems: "center" }}>
                        <Image source={User} style={styles.user} />
                        <Text style={styles.title}>Confirm pin</Text>
                        <Text style={styles.subtitle}>
                            Comfirm your a pin below to continue
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
                        Something went wrong?{" "}
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
