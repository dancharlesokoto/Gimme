import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import ConvertCurrencyDisplay from "@/components/Convert/ConvertCurrencyDisplay";
import { toast } from "sonner-native";
import GenericButton from "@/components/GenericButton";
import { CurrencyType } from "@/lib/types";
import { fetchUser } from "@/services/user";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { useLocalSearchParams } from "expo-router";
import PageLoader from "@/components/PageLoader";

export default function Convert() {
    ///......................................
    const optionalBaseCurrency = useLocalSearchParams()
        .currency as CurrencyType;
    const { userId } = useUserStore().user;
    ///......................................
    const [fromAmount, setFromAmount] = useState<string | any>("");
    const [toAmount, setToAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState<CurrencyType>(
        optionalBaseCurrency ?? "ngn"
    );
    const [toCurrency, setToCurrency] = useState<CurrencyType>("gm");

    ///......................................
    const {
        data: userData,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retryOnMount: true,
        retry: true,
    });

    ///......................................
    const convertedAmount = useMemo(() => {
        return convertCurrency({
            value: fromCurrency == "gm" ? fromAmount : +fromAmount * 100,
            from: fromCurrency,
            to: toCurrency,
        });
    }, [fromAmount, fromCurrency, toCurrency]);

    ///......................................
    useEffect(() => {
        setToAmount(convertedAmount);
    }, [fromAmount]);

    useEffect(() => {
        setFromAmount(null);
    }, [toCurrency, fromCurrency]);

    const setMax = () => {
        const _amount =
            fromCurrency == "ngn"
                ? userData.ngnBalance
                : fromCurrency == "usd"
                ? userData.usdcBalance
                : userData.gmBalance;
        const _formatted =
            fromCurrency == "gm" ? _amount : (+_amount / 100).toString();
        setFromAmount(_formatted);
    };

    const setHalf = () => {
        const _amount =
            fromCurrency == "ngn"
                ? userData.ngnBalance
                : fromCurrency == "usd"
                ? userData.usdcBalance
                : userData.gmBalance;
        const _formatted =
            fromCurrency == "gm" ? _amount : (+_amount / 100).toString();
        setFromAmount((+_formatted / 2).toString());
    };
    const handleNext = async () => {
        toast.info("This feature is not available yet", {
            duration: 2000,
            dismissible: true,
        });
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="" />
            </View>
            {isLoading || isError ? (
                <PageLoader />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.container}
                >
                    <View>
                        <Text style={styles.header}>Convert assets</Text>
                        <Text style={styles.subHead}>
                            Convert assets from one wallet to another
                        </Text>
                    </View>

                    <View style={styles.conversionContainer}>
                        <View style={styles.conversionItem}>
                            <View style={styles.left}>
                                <Text style={styles.title}>
                                    Amount to convert
                                </Text>
                                <TextInput
                                    placeholder="0"
                                    value={fromAmount}
                                    keyboardType="phone-pad"
                                    onChangeText={(value: any) =>
                                        setFromAmount(value)
                                    }
                                    style={styles.input}
                                />
                                <Text style={styles.title}>
                                    Bal:{" "}
                                    {fromCurrency == "usd"
                                        ? "$" +
                                          formatCurrency({
                                              value: userData.usdcBalance,
                                              currency: "usd",
                                          })
                                        : fromCurrency == "ngn"
                                        ? "₦" +
                                          formatCurrency({
                                              value: userData.ngnBalance,
                                              currency: "ngn",
                                          })
                                        : formatCurrency({
                                              value: userData.gmBalance,
                                              currency: "gm",
                                          }) + " GM"}
                                </Text>
                            </View>
                            <View style={styles.right}>
                                <ConvertCurrencyDisplay
                                    onChange={setFromCurrency}
                                    currency={fromCurrency}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: size.getWidthSize(4),
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={setHalf}
                                        style={styles.subButton}
                                    >
                                        <Text style={styles.subButtonText}>
                                            50%
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={setMax}
                                        style={styles.subButton}
                                    >
                                        <Text style={styles.subButtonText}>
                                            Max
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* <View style={styles.iconWrapper}>
                            <View style={styles.iconInner}>
                                <Svg
                                    // xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    style={{
                                        width: size.getWidthSize(16),
                                        height: size.getHeightSize(16),
                                    }}
                                    strokeWidth="3"
                                    stroke="#525466"
                                    // class="size-6"
                                >
                                    <Path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                    />
                                </Svg>
                            </View>
                        </View> */}
                        <View style={styles.conversionItem}>
                            <View style={styles.left}>
                                <Text style={styles.title}>
                                    Amount you'll receive
                                </Text>
                                <TextInput
                                    editable={false}
                                    placeholder="0"
                                    value={toAmount}
                                    onChangeText={setToAmount}
                                    style={styles.input}
                                />
                                <Text></Text>
                            </View>
                            <View style={styles.right}>
                                <ConvertCurrencyDisplay
                                    onChange={setToCurrency}
                                    currency={toCurrency}
                                />
                            </View>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            justifyContent: "flex-end",
                            paddingVertical: size.getHeightSize(24),
                        }}
                    >
                        <GenericButton
                            onPress={handleNext}
                            text="Continue"
                            textColor={+toAmount > 0 ? "#fff" : "#525466"}
                            buttonColor={+toAmount > 0 ? "#3366FF" : "#E2E3E9"}
                            isLoading={isLoading}
                            disabled={isLoading || +toAmount <= 0}
                        />
                    </View>
                </ScrollView>
            )}
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
        gap: size.getHeightSize(24),
        // justifyContent: "space-between",
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

    page: {
        flex: 1,
    },

    conversionContainer: {
        gap: size.getHeightSize(12),
    },

    iconWrapper: {
        width: size.getWidthSize(45),
        height: size.getHeightSize(45),
        borderRadius: size.getWidthSize(10),
        backgroundColor: "#fff",
        position: "relative",
        zIndex: 2,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: -size.getHeightSize(30),
    },

    iconInner: {
        backgroundColor: "#f6f6fa",
        width: size.getWidthSize(30),
        borderRadius: size.getWidthSize(5),
        height: size.getHeightSize(30),
        alignItems: "center",
        justifyContent: "center",
    },

    conversionItem: {
        borderRadius: size.getWidthSize(8),
        flexDirection: "row",
        minHeight: size.getHeightSize(120),
        backgroundColor: "#F6F6FA",
        padding: size.getWidthSize(16),
        gap: size.getWidthSize(12),
    },

    left: {
        gap: size.getHeightSize(4),
        flex: 1,
        justifyContent: "space-between",
    },
    right: {
        gap: size.getHeightSize(4),
        justifyContent: "center",
        alignItems: "flex-end",
    },

    title: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        color: "#525466",
    },

    input: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(26),
        color: "#525466",
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

    subButton: {
        paddingHorizontal: size.getWidthSize(10),
        paddingVertical: size.getHeightSize(4),
        borderRadius: size.getWidthSize(100),
        backgroundColor: "#E2E3E9",
    },

    subButtonText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(10),
        color: "#525466",
    },

    pageButtonText: {
        fontFamily: "Cabinet-Medium",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});
