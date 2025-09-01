import GenericHeader from "@/components/GenericHeader";
import SimpleNotify from "@/components/Global/SimpleNotify";
import PageLoader from "@/components/PageLoader";
import { size } from "@/config/size";
import { getBankAccount } from "@/services/user";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { toast } from "sonner-native";
import * as Clipboard from "expo-clipboard";
import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";

export default function FundWithBankTransfer() {
    ///
    const { userId } = useUserStore().user;
    //...

    //Fetch logic..........................
    const {
        data: accountDetails,
        error,
        isError,
        isLoading,
    } = useQuery({
        retry: true,
        queryKey: ["getBankAccount", userId],
        queryFn: getBankAccount,
    });

    //error reactive logic..........................
    useEffect(() => {
        if (isError) {
            toast.error(error?.message);
            router.back();
        }
    }, [isError]);

    ///.....
    const copyToClipboard = useCallback(async (value: string) => {
        await Clipboard.setStringAsync(value);
        toast.info("Copied to clipboard", {
            duration: 1000,
            dismissible: true,
        });
    }, []);

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="" currency="ngn" />
            </View>
            {isLoading || isError ? (
                <PageLoader />
            ) : (
                <View style={styles.container}>
                    <View>
                        <Text style={styles.header}>Bank transfer</Text>
                        <Text style={styles.subHead}>
                            Send funds to your NGN wallet via transfer
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            gap: size.getHeightSize(24),
                        }}
                    >
                        <>
                            <SimpleNotify
                                title="Note"
                                description="All transfer made to this account will reflect on your NGN wallet"
                            />
                            <View style={styles.inner}>
                                <View style={styles.listItem}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.listLabel}>
                                            Account Name
                                        </Text>
                                        <Text
                                            selectable
                                            style={styles.listText}
                                        >
                                            {
                                                accountDetails.data.data
                                                    .account_name
                                            }
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.listItem}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.listLabel}>
                                            Account Number
                                        </Text>
                                        <Text
                                            selectable
                                            style={styles.listText}
                                        >
                                            {
                                                accountDetails.data.data
                                                    .account_number
                                            }
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        hitSlop={size.getWidthSize(20)}
                                        onPress={() =>
                                            copyToClipboard(
                                                accountDetails.data.data
                                                    .account_number
                                            )
                                        }
                                    >
                                        <Svg
                                            width="16"
                                            height="16"
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

                                <View style={styles.listItem}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.listLabel}>
                                            Bank Name
                                        </Text>
                                        <Text
                                            selectable
                                            style={styles.listText}
                                        >
                                            {accountDetails.data.data.bank.name}
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={[
                                        styles.listItem,
                                        {
                                            gap: size.getWidthSize(4),
                                            justifyContent: "flex-start",
                                            width: "100%",
                                        },
                                    ]}
                                >
                                    <TouchableOpacity
                                        hitSlop={size.getWidthSize(20)}
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    "ClashDisplay-Medium",
                                                fontSize: size.fontSize(14),
                                                color: "#374BFB",
                                            }}
                                        >
                                            Share Details
                                        </Text>
                                    </TouchableOpacity>
                                    <Svg
                                        // xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 16 16"
                                        fill="#374BFB"
                                        style={{
                                            width: size.getWidthSize(14),
                                            height: size.getHeightSize(14),
                                        }}
                                    >
                                        <Path
                                            fill-rule="evenodd"
                                            d="M3.5 9.75A2.75 2.75 0 0 1 6.25 7h5.19L9.22 9.22a.75.75 0 1 0 1.06 1.06l3.5-3.5a.75.75 0 0 0 0-1.06l-3.5-3.5a.75.75 0 1 0-1.06 1.06l2.22 2.22H6.25a4.25 4.25 0 0 0 0 8.5h1a.75.75 0 0 0 0-1.5h-1A2.75 2.75 0 0 1 3.5 9.75Z"
                                            clip-rule="evenodd"
                                        />
                                    </Svg>
                                </View>
                            </View>
                        </>
                    </View>
                </View>
            )}
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: size.getHeightSize(24),
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

    inner: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F6FA",
        gap: size.getHeightSize(24),
        paddingVertical: size.getHeightSize(32),
        paddingHorizontal: size.getWidthSize(24),
        borderRadius: size.getWidthSize(16),
    },

    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: size.getWidthSize(18),
    },

    listLabel: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        color: "#8E8E93",
    },

    listText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        color: "#0A0B14",
    },

    mainText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
        color: "#0A0B14",
    },

    subText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(12),
        color: "#525466",
    },
});
