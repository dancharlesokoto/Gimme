import React from "react";
import { Text, View } from "react-native";
import Img from "@/assets/svg/phone.svg";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { Button, TouchableRipple } from "react-native-paper";
import Ripple from "react-native-material-ripple";
import CustomRippleButton from "@/components/CustomRippleButton";

const OnboardingScreen = () => {
    const router = useRouter();
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        paddingTop: size.getHeightSize(60),
                        paddingHorizontal: size.getHeightSize(28),
                        alignItems: "center",
                    }}
                >
                    <Img />
                    <View
                        style={{
                            paddingHorizontal: size.getHeightSize(28),
                            paddingTop: size.getHeightSize(70),
                        }}
                    >
                        <Text
                            style={{
                                width: size.getWidthSize(280),
                                fontSize: size.fontSize(28),
                                lineHeight: size.getHeightSize(32),
                                textAlign: "center",
                                fontFamily: "ClashDisplay-Medium",
                                color: "#0A0B14",
                            }}
                        >
                            Make transactions faster with Gimme
                        </Text>
                        <Text
                            style={{
                                fontSize: size.fontSize(14),
                                fontFamily: "Satoshi-Regular",
                                textAlign: "center",
                                paddingTop: size.getHeightSize(8),
                                color: Colors.lightText,
                            }}
                        >
                            Find the best way to send and receive money for
                            goods and services using your airtime and data.
                        </Text>
                    </View>
                    <View style={{ marginTop: size.getHeightSize(38) }}>
                        {/* button goes here */}
                        <CustomRippleButton
                            onPress={() => router.push("./Signup")}
                            rippleColor="#fff"
                            contentContainerStyle={{
                                backgroundColor: "#374BFB",
                                paddingHorizontal: size.getWidthSize(18),
                                paddingVertical: size.getHeightSize(16),
                            }}
                            style={{
                                borderRadius: size.getWidthSize(16),
                            }}
                        >
                            <Text
                                style={{
                                    color: "#ffffff",
                                    fontSize: size.fontSize(18),
                                    fontFamily: "ClashDisplay-Medium",
                                }}
                            >
                                Create account
                            </Text>
                        </CustomRippleButton>
                    </View>
                    <Text
                        style={{
                            fontSize: size.fontSize(15),
                            textAlign: "center",
                            marginTop: size.getHeightSize(38),
                            textDecorationLine: "underline",
                            fontFamily: "Satoshi-Medium",
                        }}
                        onPress={() => router.push("./Login")} // Make this text clickable
                    >
                        Login, if you already have an account
                    </Text>
                </View>
            </View>
        </CustomSafeArea>
    );
};

export default OnboardingScreen;
