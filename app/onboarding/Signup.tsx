import React, { useState } from "react";
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
import GenericHeader from "@/components/GenericHeader";
import CustomRippleButton from "@/components/CustomRippleButton";
import { createUser } from "@/services/auth";
import { toast } from "sonner-native";
import { router } from "expo-router";

export default function Signup() {
    //input field states.........
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    //Page state...........
    const [isLoading, setIsLoading] = useState(false);

    //Handlers........
    const handleCreateAccount = async () => {
        if (!name || !phoneNumber || !email) {
            toast.error("Fill all the fields", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (name.length < 3) {
            toast.error("Full name is required", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (phoneNumber.length < 10) {
            toast.error("Phone number is required", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (email.length < 11) {
            toast.error("Email is required", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            setIsLoading(true);
            const res = await createUser({
                name: name,
                phone: phoneNumber,
                email: email,
            });

            const userId = res.userId;
            !userId &&
                toast.error("An error occured", {
                    duration: 2000,
                    dismissible: true,
                });

            userId &&
                router.push(
                    `/onboarding/Verify?userId=${userId}&phone=${phoneNumber}&email=${email}`
                );
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
                        <Text style={styles.header}>Welcome to Gimme</Text>
                        <Text style={styles.subHead}>
                            Create an account with your phone number to get
                            started.
                        </Text>
                    </View>

                    <View
                        style={{
                            paddingTop: size.getHeightSize(24),
                            gap: size.getHeightSize(16),
                        }}
                    >
                        <View>
                            <Text style={styles.label}>Full name</Text>
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
                                    placeholder="Should match your (NIN or BVN)"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>Phone Number</Text>
                            <View style={styles.inputContainer}>
                                <Svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    //       xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M8.0245 9.0115C8.72825 10.2479 9.75214 11.2717 10.9885 11.9755L11.6515 11.047C11.7581 10.8977 11.9158 10.7927 12.0946 10.7517C12.2734 10.7108 12.4611 10.7369 12.622 10.825C13.6827 11.4047 14.8542 11.7533 16.0592 11.848C16.2473 11.8629 16.4229 11.9482 16.5509 12.0867C16.6789 12.2253 16.75 12.4071 16.75 12.5958V15.9423C16.75 16.1279 16.6812 16.3071 16.5568 16.4449C16.4324 16.5828 16.2612 16.6696 16.0765 16.6885C15.679 16.7297 15.2785 16.75 14.875 16.75C8.455 16.75 3.25 11.545 3.25 5.125C3.25 4.7215 3.27025 4.321 3.3115 3.9235C3.33044 3.73877 3.41724 3.56764 3.55509 3.44323C3.69295 3.31881 3.87205 3.24996 4.05775 3.25H7.40425C7.59292 3.24998 7.77467 3.32106 7.91326 3.44909C8.05185 3.57711 8.13709 3.75267 8.152 3.94075C8.24667 5.14584 8.59531 6.31726 9.175 7.378C9.2631 7.53892 9.28916 7.72656 9.24825 7.9054C9.20734 8.08424 9.1023 8.24188 8.953 8.3485L8.0245 9.0115ZM6.133 8.51875L7.558 7.501C7.15359 6.62807 6.87651 5.70163 6.73525 4.75H4.7575C4.753 4.8745 4.75075 4.99975 4.75075 5.125C4.75 10.717 9.283 15.25 14.875 15.25C15.0002 15.25 15.1255 15.2478 15.25 15.2425V13.2648C14.2984 13.1235 13.3719 12.8464 12.499 12.442L11.4813 13.867C11.0715 13.7078 10.6735 13.5198 10.2902 13.3045L10.2468 13.2797C8.77568 12.4425 7.55746 11.2243 6.72025 9.75325L6.6955 9.70975C6.48018 9.3265 6.29221 8.9285 6.133 8.51875Z"
                                        fill="#868898"
                                    />
                                </Svg>

                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g 08111222101"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.label}>Email Address</Text>
                            <View style={styles.inputContainer}>
                                <Svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    //       xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M3.25 3.75H16.75C16.9489 3.75 17.1397 3.82902 17.2803 3.96967C17.421 4.11032 17.5 4.30109 17.5 4.5V15.5C17.5 15.6989 17.421 15.8897 17.2803 16.0303C17.1397 16.171 16.9489 16.25 16.75 16.25H3.25C3.05109 16.25 2.86032 16.171 2.71967 16.0303C2.57902 15.8897 2.5 15.6989 2.5 15.5V4.5C2.5 4.30109 2.57902 4.11032 2.71967 3.96967C2.86032 3.82902 3.05109 3.75 3.25 3.75ZM16 6.9285L10.054 12.2535L4 6.912V14.75H16V6.9285ZM4.38325 5.25L10.0457 10.2465L15.6265 5.25H4.38325Z"
                                        fill="#868898"
                                    />
                                </Svg>

                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g john@gmail.com"
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        <View style={{ paddingTop: size.getHeightSize(8) }}>
                            <CustomRippleButton
                                contentContainerStyle={styles.pageButton}
                                onPress={handleCreateAccount}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color={"#fff"} />
                                ) : (
                                    <Text style={styles.pageButtonText}>
                                        Continue
                                    </Text>
                                )}
                            </CustomRippleButton>
                        </View>
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
        height: size.getHeightSize(54),
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
        color: "#DF1C36",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    emptyContainer: {
        flexDirection: "row",
        marginBottom: size.getHeightSize(16),
        marginTop: size.getHeightSize(8),
        // backgroundColor: "#FDEDEF",
        padding: size.getWidthSize(8),
        borderRadius: size.getWidthSize(8),
        gap: size.getWidthSize(8),
    },

    pageButton: {
        width: size.getWidthSize(140),
        height: size.getHeightSize(54),
        borderRadius: size.getWidthSize(16),
        padding: size.getWidthSize(16),
        marginTop: size.getHeightSize(12),
        backgroundColor: "#374BFB",
        justifyContent: "center",
        alignItems: "center",
    },

    pageButtonText: {
        fontFamily: "ClashDisplay-Medium",
        fontSize: size.fontSize(16),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});
