import React, { useCallback, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Finger from "@/assets/svg/finger.svg";
import Cancel from "@/assets/svg/cancel.svg";
import { router, useGlobalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import GenericHeader from "@/components/GenericHeader";
import ReEnterPinField from "@/components/Onboarding/ReEnterPinField";
import CustomRippleButton from "@/components/CustomRippleButton";

const SetPin = () => {
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userId, setUserId] = useState(
        useGlobalSearchParams().userId as string
    );

    const [phone, setPhone] = useState(useGlobalSearchParams().phone as string);
    const handlePress = useCallback((value: any) => {
        pin.length < 4 && setPin((prevPin) => prevPin + value);
    }, []);

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
        router.push(
            `/onboarding/ConfirmPin?userId=${userId}&pinConfirm=${pin}&phone=${phone}`
        );
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View>
                    <GenericHeader title="" />
                    <View style={{ alignItems: "center" }}>
                        <Text style={styles.title}>Set up your Pin</Text>
                        <Text style={styles.subtitle}>
                            This pin will be used to login and complete
                            transactions
                        </Text>

                        <View style={styles.pinContainer}>
                            <ReEnterPinField
                                code={pin}
                                onChange={setPin}
                                editable={false}
                            />
                            {/* <PinInput
                            code={pin}
                            protectedField={true}
                            onChange={setPin}
                        /> */}
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.keypadContainer}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map(
                            (value, index) =>
                                value === null ? (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.keypadButton}
                                        onPress={handleDelete}
                                    >
                                        <Cancel />
                                    </TouchableOpacity>
                                ) : value === "" ? (
                                    <TouchableOpacity
                                        key={index}
                                        disabled={true}
                                        style={[
                                            styles.keypadButton,
                                            { opacity: 0.4 },
                                        ]}
                                        onPress={() => {}}
                                    >
                                        <Finger />
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.keypadButton}
                                        onPress={() => handlePress(value)}
                                    >
                                        <Text style={styles.keypadText}>
                                            {value}
                                        </Text>
                                    </TouchableOpacity>
                                )
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
        marginTop: size.getHeightSize(50),
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
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});

export default SetPin;
