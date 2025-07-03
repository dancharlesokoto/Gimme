import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { Path, Svg } from "react-native-svg";
import { router } from "expo-router";
import CurrencyInput from "react-native-currency-input";
import GenericHeader from "@/components/GenericHeader";
import AddCardCTA from "@/components/Fund/AddCardCTA";
import SelectCardCTA from "@/components/Fund/SelectCardCTA";

const FundCard = () => {
    const [amount, setAmount] = useState(null);
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader title={"Fund with card"} showCountry />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <AddCardCTA />
                    <SelectCardCTA />
                    <View>
                        <View>
                            <Text style={styles.label}>Amount to fund</Text>
                            <CurrencyInput
                                style={styles.input}
                                value={amount}
                                precision={0}
                                delimiter=","
                                onChangeValue={(value: any) => setAmount(value)}
                                placeholder="1000 - 99,000"
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                //   xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                                    fill="#868898"
                                />
                            </Svg>
                            <Text
                                style={[styles.subInput, { color: "#525466" }]}
                            >
                                For amount above NGN 100,000
                            </Text>

                            <Text
                                style={[
                                    styles.subInput,
                                    {
                                        color: "#374BFB",
                                        textDecorationLine: "underline",
                                    },
                                ]}
                            >
                                contact support team
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            marginVertical: size.getHeightSize(24),
                            paddingVertical: size.getHeightSize(24),
                            paddingHorizontal: size.getWidthSize(24),
                            backgroundColor: "#F6F6FA",
                            borderRadius: size.getHeightSize(16),
                        }}
                    >
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.convertText}>Today's rate</Text>
                            <Text style={styles.convertAmount}>
                                0.001 GM = NGN 1
                            </Text>
                        </View>
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                marginTop: size.getHeightSize(12),
                            }}
                        >
                            <Text style={styles.convertText}>
                                Transaction fee
                            </Text>
                            <Text style={styles.convertAmount}>5%</Text>
                        </View>
                        <View style={styles.line} />
                        <View
                            style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                            }}
                        >
                            <Text style={styles.convertText}>Conversion</Text>
                            <Text style={styles.convertAmount}>x 0.001 GM</Text>
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text style={styles.label}>Amount to receive</Text>
                            <TextInput
                                style={[styles.input]}
                                keyboardType="phone-pad"
                                // value={phoneNumber}
                                // onChangeText={setPhoneNumber}
                                placeholder="1000 - 99,999"
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={[styles.subInput, { color: "#525466" }]}
                            >
                                Equivalent to
                            </Text>
                            <Text
                                style={[styles.subInput, { color: "#525466" }]}
                            >
                                GM 10
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        onPress={() => router.push("/screens/Receipt")}
                        style={{
                            backgroundColor: "#374BFB",
                            height: size.getHeightSize(56),
                            borderRadius: size.getHeightSize(16),
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: size.getHeightSize(24),
                            marginBottom: size.getHeightSize(100), //Remove this after integration
                        }}
                    >
                        <Text
                            style={{
                                fontSize: size.fontSize(18),
                                fontFamily: "Satoshi-Bold",
                                color: "#ffffff",
                            }}
                        >
                            Fund account
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    pageName: {
        paddingVertical: size.getHeightSize(14),
        marginLeft: size.getWidthSize(18),
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    selectedText: {
        fontSize: size.fontSize(14),
        paddingLeft: size.getWidthSize(8),
        fontFamily: "Satoshi-Regular",
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

    input: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
        marginTop: size.getHeightSize(4),
        marginBottom: size.getHeightSize(6),
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
    },

    subInput: {
        fontSize: 14,
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getWidthSize(20),
        marginLeft: size.getWidthSize(4),
    },

    convertText: {
        fontSize: 14,
        fontFamily: "Satoshi-Regular",
        lineHeight: size.getWidthSize(20),
        color: "#525466",
    },

    convertAmount: {
        fontSize: size.fontSize(12),
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getWidthSize(16),
        color: "#0A0B14",
    },

    line: {
        height: 1,
        backgroundColor: "#CDCED5",
        marginVertical: size.getHeightSize(12),
    },

    mainButton: {
        flex: 1,
        padding: 16,
        backgroundColor: "#374BFB",
        marginRight: 10,
        alignItems: "center",
        paddingVertical: size.getHeightSize(16),
        borderRadius: size.getHeightSize(16),
    },

    mainButtonText: {
        fontSize: size.fontSize(18),
        fontFamily: "Satoshi-Bold",
        color: "#525466",
    },
});

export default FundCard;
