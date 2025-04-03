import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { Svg, Path } from "react-native-svg";
import { size } from "@/config/size";
import Button from "@/components/Button";
import BackPage from "@/components/BackPage";
import { router } from "expo-router";
import CustomRippleButton from "@/components/CustomRippleButton";
import { loginUser } from "@/services/auth";

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [inputError, setInputError] = useState(false);
    const [emptyInput, setEmptyInput] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const isPhoneNumberValid = () => {
        if (phoneNumber.trim().length >= 10) {
            return true;
        } else {
            return false;
        }
    };

    // checks if necessary fields have been corrected in order to remove the error message
    useEffect(() => {
        if (phoneNumber.length > 0) {
            setEmptyInput(false);
        }
        if (isPhoneNumberValid() === true) {
            setInputError(false);
        }
    }, [phoneNumber]);

    // checks the phone number is valid or not upon button click to display erro messages
    const handleLogin = async () => {
        if (phoneNumber.trim().length < 1) {
            setEmptyInput(true);
            return;
        }
        if (isPhoneNumberValid() === false) {
            setInputError(true);
            return;
        }

        router.push(`/onboarding/EnterPin?uid=${phoneNumber}`);
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <BackPage />

                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.header}>Welcome back</Text>
                        <Text style={styles.subHead}>
                            Login with your phone number or email address
                        </Text>
                    </View>

                    <View
                        style={{
                            paddingTop: size.getHeightSize(32),
                            gap: size.getHeightSize(4),
                        }}
                    >
                        <Text style={styles.label}>
                            Phone Number or email address
                        </Text>
                        <TextInput
                            style={[
                                styles.input,
                                inputError && { borderColor: "#DF1C36" },
                                emptyInput && { borderColor: "#DF1C36" },
                            ]}
                            keyboardType="phone-pad"
                            placeholder="e.g 08111222101"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />
                        {inputError ? (
                            <View style={styles.errorContainer}>
                                <Svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    //   xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                                        fill="#DF1C36"
                                    />
                                </Svg>
                                <Text style={styles.error}>
                                    Phone number or email is incorrect
                                </Text>
                            </View>
                        ) : emptyInput ? (
                            <View style={styles.errorContainer}>
                                <Svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    //   xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                                        fill="#DF1C36"
                                    />
                                </Svg>
                                <Text style={styles.error}>
                                    Phone number or email cannot be empty
                                </Text>
                            </View>
                        ) : null}

                        <View style={{ paddingTop: size.getHeightSize(24) }}>
                            <CustomRippleButton
                                style={{
                                    borderRadius: size.getWidthSize(16),
                                    alignSelf: "flex-start",
                                }}
                                contentContainerStyle={{
                                    backgroundColor: "#374BFB",
                                    paddingHorizontal: size.getWidthSize(16),
                                    paddingVertical: size.getHeightSize(16),
                                }}
                                onPress={handleLogin}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: size.getWidthSize(8),
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontFamily: "Satoshi-Bold",
                                            fontSize: size.fontSize(18),
                                            color: "#fff",
                                        }}
                                    >
                                        Continue
                                    </Text>
                                    {isLoading && (
                                        <ActivityIndicator color={"#fff"} />
                                    )}
                                </View>
                            </CustomRippleButton>
                        </View>
                    </View>
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
        fontSize: size.fontSize(20),
    },
    subHead: { fontFamily: "Satoshi-Regular", fontSize: size.fontSize(14) },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
    },

    input: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        fontFamily: "Satoshi-Regular",
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 10,
        marginBottom: 16,
        fontSize: size.fontSize(14),
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
        marginTop: size.getHeightSize(-10),
    },

    error: {
        color: "#DF1C36",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    empty: {
        color: "#0A0B14",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    emptyContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
        marginTop: size.getHeightSize(8),
        backgroundColor: "#FDEDEF",
        padding: size.getWidthSize(8),
        borderRadius: 8,
    },
});

export default Login;
