import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import PageLoader from "@/components/PageLoader";
import { toast } from "sonner-native";
import * as Clipboard from "expo-clipboard";
import QRCode from "react-native-qrcode-svg";
import QRCodeStyled from "react-native-qrcode-styled";
import Svg, { Path } from "react-native-svg";
import SimpleNotify from "@/components/Global/SimpleNotify";
import { router } from "expo-router";
import { fetchUser } from "@/services/user";

export default function FundWithCrypto() {
    ///....
    const { user } = useUserStore();
    const { userId } = user;

    //...
    const [screenRefreshing, setScreenRefreshing] = useState(false);
    //...
    const {
        data: userData,
        error,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
    //...
    const handleScreenRefresh = () => {
        setScreenRefreshing(true);
        setTimeout(() => {
            refetch();
            setScreenRefreshing(false);
        }, 500);
    };
    //...
    useEffect(() => {
        if (isError) {
            toast.error(error?.message);
            router.back();
        }
    }, [isError]);

    //...

    const copyToClipboard = async (value: string) => {
        await Clipboard.setStringAsync(value);
        toast.info("Copied to clipboard", {
            duration: 1000,
            dismissible: true,
        });
    };
    return (
        <CustomSafeArea
            setBottomSafeAreaInset={false}
            topColor="#ffffff"
            bgColor="#ffffff"
        >
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="" currency="usd" />
            </View>

            {isLoading || isError ? (
                <PageLoader />
            ) : (
                <ScrollView
                    contentContainerStyle={[styles.container]}
                    refreshControl={
                        <RefreshControl
                            colors={["#374BFB"]}
                            refreshing={screenRefreshing}
                            onRefresh={handleScreenRefresh}
                        />
                    }
                >
                    <View>
                        <Text style={styles.header}>Fund with crypto</Text>
                        <Text style={styles.subHead}>
                            Send funds to your USD wallet through crypto
                        </Text>
                    </View>
                    <SimpleNotify
                        title="Note"
                        description={`Only send USDC on the Ethereum network to this address`}
                    />

                    <View style={styles.outerContainer}>
                        <View style={styles.qrContainer}>
                            <View style={styles.topCutout} />
                            <View>
                                <QRCodeStyled
                                    data={userData.cryptoWalletAddress}
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

                            <View style={{ flex: 1 }}>
                                <Text style={styles.qrText}>
                                    {userData.cryptoWalletAddress}
                                </Text>
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
        width: size.getWidthSize(200),
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
        textAlign: "center",
        color: "#0A0B14",
    },

    warnText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        textAlign: "center",
        color: "#525466",
    },

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(12),
        marginTop: size.getHeightSize(8),
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
