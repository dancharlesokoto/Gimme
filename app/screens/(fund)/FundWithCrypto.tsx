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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import SimpleNotify from "@/components/Global/SimpleNotify";
import { getCryptoWallet } from "@/services/crypto-wallet";
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
        toast.success("Copied to clipboard", {
            duration: 1000,
            dismissible: true,
        });
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Fund with stablecoin" />
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
                    <SimpleNotify
                        title="Funding with crypto"
                        description={`Only send USDC on the Ethereum network to this address`}
                    />

                    <View>
                        <View style={styles.qrContainer}>
                            <View
                                style={{
                                    borderRadius: size.getWidthSize(12),
                                    backgroundColor: "white",
                                    padding: size.getWidthSize(16),
                                }}
                            >
                                <QRCode
                                    value={userData.cryptoWalletAddress}
                                    size={size.getWidthSize(180)}
                                />
                            </View>
                            <View style={styles.qrItem}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.qrLabel}>
                                        USDC Address
                                    </Text>
                                    <Text style={styles.qrText}>
                                        {userData.cryptoWalletAddress}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    hitSlop={size.getWidthSize(20)}
                                    onPress={() =>
                                        copyToClipboard(
                                            userData.cryptoWalletAddress
                                        )
                                    }
                                >
                                    <Svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M4.99998 4.4V2.6C4.99998 2.44087 5.06319 2.28826 5.17571 2.17574C5.28823 2.06321 5.44085 2 5.59998 2H12.8C12.9591 2 13.1117 2.06321 13.2242 2.17574C13.3368 2.28826 13.4 2.44087 13.4 2.6V11C13.4 11.1591 13.3368 11.3117 13.2242 11.4243C13.1117 11.5368 12.9591 11.6 12.8 11.6H11V13.4C11 13.7312 10.73 14 10.3958 14H3.20418C3.12505 14.0005 3.04661 13.9853 2.97337 13.9554C2.90012 13.9254 2.83352 13.8813 2.77737 13.8256C2.72123 13.7698 2.67665 13.7035 2.64621 13.6305C2.61576 13.5575 2.60005 13.4791 2.59998 13.4L2.60178 5C2.60178 4.6688 2.87178 4.4 3.20598 4.4H4.99998ZM3.80178 5.6L3.79998 12.8H9.79998V5.6H3.80178ZM6.19998 4.4H11V10.4H12.2V3.2H6.19998V4.4Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.qrItem}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.qrLabel}>Network</Text>
                                    <Text style={styles.qrText}>
                                        Ethereum (ERC-20)
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.qrItem}>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.qrLabel}>Fee</Text>
                                    <Text style={styles.qrText}>
                                        No funding fee will be deducted
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View>
                        {/* <CustomRippleButton
                        onPress={() =>
                            copyToClipboard(userData.cryptoWalletAddress)
                        }
                        contentContainerStyle={styles.pageButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.pageButtonText}>
                                Copy Address
                            </Text>
                        )}
                    </CustomRippleButton> */}
                    </View>
                </ScrollView>
            )}
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: size.getHeightSize(32),
        paddingHorizontal: size.getWidthSize(24),
    },

    qrContainer: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6FA",
        gap: size.getHeightSize(24),
        paddingVertical: size.getHeightSize(32),
        paddingHorizontal: size.getWidthSize(24),
        borderRadius: size.getWidthSize(16),
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
