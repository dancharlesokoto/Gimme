import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Button from "@/components/Button";
import BackPage from "@/components/BackPage";
import Cancel from "@/assets/svg/cancel.svg";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { createPin, loginUser } from "@/services/auth";
import PinInput from "@/components/PinInupt";

const EnterPin = () => {
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(
        useGlobalSearchParams().userId as string
    );
    const [phone, setPhone] = useState(useGlobalSearchParams().phone as string);
    const { pinConfirm } = useGlobalSearchParams();

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
        if (pin !== pinConfirm) {
            toast.error("Pin do not match", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            const res = await createPin({
                userId: userId as string,
                pin: pin,
            });
            toast.success(res.message, {
                duration: 2000,
                dismissible: true,
            });
            await loginUser({
                uid: phone,
                pin: pin,
            });
            router.replace("/");
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
            <View style={styles.container}>
                <BackPage />
                <View>
                    <Text style={styles.title}>Confirm pin</Text>

                    <View style={styles.pinContainer}>
                        <PinInput code={pin} onChange={setPin} />
                    </View>

                    <View style={styles.keypadContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map(
                            (value, index) =>
                                value !== null ? (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.keypadButton}
                                        onPress={() => handlePress(value)}
                                    >
                                        <Text style={styles.keypadText}>
                                            {value}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.keypadButton}
                                        onPress={handleDelete}
                                    >
                                        <Cancel />
                                    </TouchableOpacity>
                                )
                        )}
                    </View>
                </View>

                <Button
                    width={325}
                    disabled={isLoading}
                    onPress={handleNext}
                    text={
                        isLoading ? (
                            <ActivityIndicator color={"#fff"} />
                        ) : (
                            "Continue"
                        )
                    }
                />
            </View>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    backButton: {
        alignSelf: "flex-start",
    },
    title: {
        fontSize: size.fontSize(20),
        fontFamily: "Satoshi-Bold",
        textAlign: "center",
        marginTop: 95,
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
        paddingBottom: size.getHeightSize(32),
    },

    keypadButton: {
        width: "30%",
        height: size.getHeightSize(77),
        justifyContent: "center",
        alignItems: "center",
    },

    keypadText: {
        fontSize: 24,
        fontFamily: "Satoshi-Medium",
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
});

export default EnterPin;
