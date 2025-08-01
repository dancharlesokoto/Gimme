import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";
import { convertCurrency } from "@/lib/currency";
import ConvertCurrencyDisplay from "@/components/Convert/ConvertCurrencyDisplay";
import CurrencyInput from "react-native-currency-input";
import CustomRippleButton from "@/components/CustomRippleButton";
import { toast } from "sonner-native";

export default function Convert() {
    const [isLoading, setIsLoading] = useState(false);
    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [fromCurrency, setFromCurrency] = useState<"usd" | "ngn" | "gm">(
        "ngn"
    );
    const [toCurrency, setToCurrency] = useState<"usd" | "ngn" | "gm">("gm");

    useEffect(() => {
        setToAmount(
            convertCurrency({
                value: fromCurrency == "gm" ? fromAmount : +fromAmount * 100,
                from: fromCurrency,
                to: toCurrency,
            })
        );
    }, [fromAmount]);

    useEffect(() => {
        setToAmount(
            convertCurrency({
                value: fromCurrency == "gm" ? fromAmount : +fromAmount * 100,
                from: fromCurrency,
                to: toCurrency,
            })
        );
    }, [toCurrency, fromCurrency]);

    const handleNext = async () => {
        toast.info("This feature is not available yet", {
            duration: 2000,
            dismissible: true,
        });
    };

    return (
        <CustomSafeArea
            topColor="#ffffff"
            bgColor="#ffffff"
            setBottomSafeAreaInset={false}
        >
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Convert assets" />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.container}
            >
                <View style={styles.conversionContainer}>
                    <View style={styles.conversionItem}>
                        <View style={styles.left}>
                            <Text style={styles.title}>You pay</Text>
                            <TextInput
                                placeholder="0"
                                value={fromAmount}
                                keyboardType="phone-pad"
                                onChangeText={(value: any) =>
                                    setFromAmount(value)
                                }
                                style={styles.input}
                            />
                            <Text></Text>
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
                                <TouchableOpacity style={styles.subButton}>
                                    <Text style={styles.subButtonText}>
                                        50%
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.subButton}>
                                    <Text style={styles.subButtonText}>
                                        Max
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.iconWrapper}>
                        <View style={styles.iconInner}>
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{
                                    width: size.getWidthSize(18),
                                    height: size.getHeightSize(18),
                                }}
                                strokeWidth="3.5"
                                stroke="#fff"
                                // class="size-6"
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                            </Svg>
                        </View>
                    </View>
                    <View style={styles.conversionItem}>
                        <View style={styles.left}>
                            <Text style={styles.title}>You receive</Text>
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

                <CustomRippleButton
                    onPress={handleNext}
                    contentContainerStyle={styles.pageButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.pageButtonText}>Continue</Text>
                    )}
                </CustomRippleButton>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: size.getWidthSize(24),
        justifyContent: "space-between",
    },

    headerContainer: {
        flexDirection: "row",
        paddingVertical: size.getHeightSize(16),
        justifyContent: "space-between",
        alignItems: "center",
    },

    page: {
        flex: 1,
    },

    conversionContainer: {
        gap: size.getHeightSize(12),
    },

    iconWrapper: {
        width: size.getWidthSize(50),
        height: size.getHeightSize(50),
        borderRadius: size.getWidthSize(999),
        backgroundColor: "#fff",
        position: "relative",
        zIndex: 2,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: -size.getHeightSize(30),
    },

    iconInner: {
        backgroundColor: "#6495ED",
        width: size.getWidthSize(30),
        borderRadius: size.getWidthSize(999),
        height: size.getHeightSize(30),
        alignItems: "center",
        justifyContent: "center",
    },

    conversionItem: {
        borderRadius: size.getWidthSize(12),
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
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(16),
        color: "#525466",
    },

    input: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(26),
        color: "#525466",
    },

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(12),
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
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(18),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});
