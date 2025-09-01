import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useCallback, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import SimpleNotify from "@/components/Global/SimpleNotify";
import QRCode from "react-native-qrcode-svg";
import { fetchUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { Linking } from "react-native";
import PageLoader from "@/components/PageLoader";
import Svg, { Path } from "react-native-svg";
import * as Clipboard from "expo-clipboard";
import { toast } from "sonner-native";
import QRCodeStyled from "react-native-qrcode-styled";

export default function RequestPayment() {
    const { userId } = useUserStore().user;
    const [amount, setAmount] = useState<any>(null);

    const [activeInput, setActiveInput] = useState<number | any>(0);

    function openExternalLink() {
        Linking.openURL(
            "https://gimme.finance/request/" +
                userId +
                `?amount=${amount}&currency=NGN`
        );
    }

    const copyToClipboard = useCallback(async (value: string) => {
        await Clipboard.setStringAsync(value);
        toast.info("Copied to clipboard", {
            duration: 1000,
            dismissible: true,
        });
    }, []);

    const {
        data: userData,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
    return (
        <CustomSafeArea
            setBottomSafeAreaInset={false}
            topColor="#ffffff"
            bgColor="#ffffff"
        >
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="" currency="ngn" />
            </View>
            {isLoading || isError ? (
                <PageLoader />
            ) : (
                <ScrollView
                    contentContainerStyle={styles.container}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View>
                        <Text style={styles.header}>Payment request</Text>
                        <Text style={styles.subHead}>
                            Scan the QR code or share payment request link
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            gap: size.getHeightSize(24),
                        }}
                    >
                        <SimpleNotify
                            title="Note"
                            description="The sender can scan the QR code using the built in Gimme scanner"
                        />
                        <View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Text style={styles.label}>
                                    Amount (Optional)
                                </Text>
                            </View>
                            <TextInput
                                onFocus={() => setActiveInput(1)}
                                onBlur={() => setActiveInput(0)}
                                value={amount}
                                keyboardType="numeric"
                                onChangeText={setAmount}
                                style={[
                                    styles.input,
                                    activeInput == 1 && styles.activeInput,
                                ]}
                                placeholder="1000 - 99,000"
                            />
                        </View>
                        <View style={styles.outerContainer}>
                            <View style={styles.qrContainer}>
                                <View style={styles.topCutout} />
                                <View>
                                    <QRCodeStyled
                                        data={JSON.stringify({
                                            uid: userData.username,
                                            amount: amount,
                                        })}
                                        padding={5}
                                        pieceBorderRadius={"50%"}
                                        outerEyesOptions={{
                                            borderRadius: "40%",
                                        }}
                                        innerEyesOptions={{
                                            borderRadius: "50%",
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        gap: size.getHeightSize(32),
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
        color: "#525466",
    },

    outerContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },

    qrContainer: {
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        height: "auto",
        gap: size.getHeightSize(12),
        paddingHorizontal: size.getWidthSize(40),
        paddingVertical: size.getHeightSize(38),
        position: "relative",
        borderRadius: size.getWidthSize(24),
    },

    topCutout: {
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
        borderRadius: size.getWidthSize(20),
        backgroundColor: "#fff",
        position: "absolute",
        top: -size.getHeightSize(20),
    },

    qrItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: size.getWidthSize(18),
    },

    qrLabel: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        color: "#8E8E93",
    },

    qrText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        color: "#374BFB",
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

    activeInput: {
        borderColor: "#3366FF",
    },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        color: "#0A0B14",
    },

    labelBal: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        color: "#525466",
    },
});
