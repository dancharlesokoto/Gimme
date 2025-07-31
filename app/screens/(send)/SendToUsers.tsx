import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Pressable,
    ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";

import { size } from "@/config/size";
import QuickPayments from "@/components/QuickPayments";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";
import RecepientLiveSearch from "@/components/Send/RecepientLiveSearch";
import { toast } from "sonner-native";
import { getRecipient } from "@/services/gimme-wallet";
import CustomRippleButton from "@/components/CustomRippleButton";

export default function SendToUsers() {
    ///.......
    const [uid, setUid] = useState("");
    const [empty, setEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (uid) {
            setEmpty(false);
        }
    }, [uid]);

    const handleNext = async () => {
        if (!uid) {
            setEmpty(true);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getRecipient(uid);
            router.push(
                `/screens/(send)/EnterAmount?data=${JSON.stringify(res)}`
            );
        } catch (error: any | Error) {
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
                                value={uid}
                                onChangeText={setUid}
                                placeholder="@username or phone number"
                            />
                            <RecepientLiveSearch uid={uid} />
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

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(16),
        marginTop: size.getHeightSize(24),
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
