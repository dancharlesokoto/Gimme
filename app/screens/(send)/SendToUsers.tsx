import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import BackPage from "@/components/BackPage";
import { size } from "@/config/size";
import QuickPayments from "@/components/QuickPayments";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";
import RecepientLiveSearch from "@/components/Send/RecepientLiveSearch";

export default function SendToUsers() {
    const [username, setUsername] = useState("");
    const [empty, setEmpty] = useState(false);

    useEffect(() => {
        if (username) {
            setEmpty(false);
            if (!username.startsWith("@")) {
                setUsername("@" + username);
            }
        }
    }, [username]);

    const handleSend = () => {
        if (!username) {
            setEmpty(true);
            return;
        }
        router.push("/screens/(send)/EnterAmount");
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                    <GenericHeader title={"Select recepient"} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ paddingVertical: size.getHeightSize(10) }}>
                        <QuickPayments />
                    </View>

                    <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                        <View>
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Medium",
                                    fontSize: size.fontSize(14),
                                }}
                            >
                                Gimme-ID or Phone number
                            </Text>
                            <TextInput
                                style={[styles.input]}
                                keyboardType="default"
                                value={username}
                                onChangeText={setUsername}
                                placeholder="@username or phone number"
                            />
                            <RecepientLiveSearch uid={username} />
                            {empty && (
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
                                        This field cannot be empty
                                    </Text>
                                </View>
                            )}
                            <Pressable
                                onPress={handleSend}
                                style={{
                                    backgroundColor: "#374BFB",
                                    height: size.getHeightSize(56),
                                    marginVertical: size.getHeightSize(16),
                                    borderRadius: size.getHeightSize(16),
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: size.fontSize(18),
                                        fontFamily: "Satoshi-Bold",
                                        color: "#ffffff",
                                        marginLeft: size.getWidthSize(10),
                                    }}
                                >
                                    Proceed
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        paddingHorizontal: size.getWidthSize(24),
        justifyContent: "space-between",
        flexDirection: "row",
    },

    pageName: {
        paddingVertical: size.getHeightSize(14),
        marginLeft: size.getWidthSize(18),
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
    },

    error: {
        color: "#DF1C36",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    input: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
        marginTop: size.getHeightSize(4),
        marginBottom: size.getHeightSize(6),
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
    },
});
