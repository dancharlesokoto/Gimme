import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import { toast } from "sonner-native";
import { useGlobalSearchParams, useLocalSearchParams } from "expo-router";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import CustomRippleButton from "@/components/CustomRippleButton";
import { setUsername as setUsernameApi } from "@/services/auth";

export default function SetUsername() {
    const { userId, phone, email }: any = useGlobalSearchParams();
    console.log(userId, phone, email);

    //.....................................
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState("");
    //.....................................
    const handleNext = async () => {
        if (username.length < 3) {
            toast.error("Enter a username of at least 3 characters", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        // Exclude certain characters from the username
        // For example, disallow spaces and special characters except underscore and dot
        const invalidChars = /[^a-zA-Z0-9_.]/;
        if (invalidChars.test(username)) {
            toast.error("Invalid characters in username", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const res = await setUsernameApi({
                userId: userId,
                username: username,
            });
            // toast.success(res.message, {
            //     duration: 2000,
            //     dismissible: true,
            // });
            router.push(`/onboarding/KYC?userId=${userId}&phone=${phone}`);
        } catch (error: any) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
        }
    };
    //......................................
    const handleSkip = () => {
        try {
            router.push(
                `/onboarding/Verify?userId=${userId}&phone=${phone}&email=${email}`
            );
        } catch (error: any) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        }
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <GenericHeader title="" />

                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.header}>
                            What should we call you?
                        </Text>
                        <Text style={styles.subHead}>
                            Enter a username to get started.
                        </Text>
                    </View>

                    <View
                        style={{
                            paddingTop: size.getHeightSize(24),
                            gap: size.getHeightSize(16),
                        }}
                    >
                        <View>
                            {/* <Text style={styles.label}>Username</Text> */}
                            <View style={styles.inputContainer}>
                                <Svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    //       xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M4.75 16H15.25V17.5H4.75V16ZM10 14.5C8.4087 14.5 6.88258 13.8679 5.75736 12.7426C4.63214 11.6174 4 10.0913 4 8.5C4 6.9087 4.63214 5.38258 5.75736 4.25736C6.88258 3.13214 8.4087 2.5 10 2.5C11.5913 2.5 13.1174 3.13214 14.2426 4.25736C15.3679 5.38258 16 6.9087 16 8.5C16 10.0913 15.3679 11.6174 14.2426 12.7426C13.1174 13.8679 11.5913 14.5 10 14.5ZM10 13C11.1935 13 12.3381 12.5259 13.182 11.682C14.0259 10.8381 14.5 9.69347 14.5 8.5C14.5 7.30653 14.0259 6.16193 13.182 5.31802C12.3381 4.47411 11.1935 4 10 4C8.80653 4 7.66193 4.47411 6.81802 5.31802C5.97411 6.16193 5.5 7.30653 5.5 8.5C5.5 9.69347 5.97411 10.8381 6.81802 11.682C7.66193 12.5259 8.80653 13 10 13Z"
                                        fill="#868898"
                                    />
                                </Svg>
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g jondoe54"
                                    value={username}
                                    onChangeText={setUsername}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            gap: size.getHeightSize(8),
                            flex: 1,
                            justifyContent: "flex-end",
                        }}
                    >
                        <CustomRippleButton
                            onPress={handleNext}
                            contentContainerStyle={styles.pageButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.pageButtonText}>
                                    Proceed
                                </Text>
                            )}
                        </CustomRippleButton>
                        <CustomRippleButton
                            onPress={handleSkip}
                            contentContainerStyle={[
                                styles.pageButton,
                                { backgroundColor: "#E2E3E9" },
                            ]}
                            disabled={isLoading}
                        >
                            <Text
                                style={[
                                    styles.pageButtonText,
                                    { color: "rgb(99, 102, 110)" },
                                ]}
                            >
                                Skip
                            </Text>
                        </CustomRippleButton>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
        paddingBottom: size.getHeightSize(24),
    },

    header: {
        fontFamily: "ClashDisplay-SemiBold",
        color: "rgba(0, 0, 0, 0.9)",
        fontSize: size.fontSize(22),
    },
    subHead: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        color: "#8E8E93",
    },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getHeightSize(30),
    },

    inputContainer: {
        width: "100%",
        flexDirection: "row",
        height: size.getHeightSize(48),
        alignItems: "center",
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
    },
    input: {
        flex: 1,
        height: "100%",
        fontFamily: "Satoshi-Regular",
        paddingLeft: size.getWidthSize(10),
        fontSize: size.fontSize(14),
    },

    pageButton: {
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
