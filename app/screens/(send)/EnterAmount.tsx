import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    Pressable,
} from "react-native";
import React, { useState } from "react";
import CurrencyInput from "react-native-currency-input";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { router, useLocalSearchParams } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import { IMAGE_URL } from "@/services/api";
import CustomRippleButton from "@/components/CustomRippleButton";
import { toast } from "sonner-native";
import Checkbox from "expo-checkbox";
import useCurrencyStore from "@/store/currencyStore";
import { convertCurrency, formatCurrency } from "@/lib/currency";
export default function EnterAmount() {
    //...
    const [amount, setAmount] = useState<"ngn" | "usd" | "gm" | any>(null);
    const [remark, setRemark] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    // const currency = useCurrencyStore((state: any) => state.currency);
    const currency = "ngn"; //Hardcoded for now

    //....
    const data = JSON.parse(useLocalSearchParams().data as string);
    const recipientData = data.data;
    const senderData = data.sender;
    //...
    const handleNext = async () => {
        if (!amount) {
            toast.error("Please enter an amount", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (amount < 1000) {
            toast.error("Amount must be at least NGN1,000", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (amount > +senderData.ngnBalance / 100) {
            toast.error("Insufficient funds", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (amount > 99000) {
            toast.error("Amount must be at most NGN99,000", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        try {
            router.push(
                `/screens/(send)/EnterPin?data=${JSON.stringify({
                    saveToQuickPayments: isChecked,
                    currency,
                    recipient: recipientData,
                    amount,
                    remark,
                })}`
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
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Amount to send" currency={currency} />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View
                    style={{
                        gap: size.getHeightSize(8),
                        paddingVertical: size.getHeightSize(24),
                    }}
                >
                    <Text
                        style={{
                            fontSize: size.fontSize(14),
                            fontFamily: "Satoshi-Regular",
                            lineHeight: 20,
                        }}
                    >
                        Sending to
                    </Text>

                    <View
                        style={{
                            borderRadius: size.getWidthSize(12),
                            borderWidth: 1,
                            borderStyle: "dashed",
                            borderColor: "#374BFB",
                            paddingHorizontal: size.getWidthSize(12),
                            paddingVertical: size.getHeightSize(12),
                            flexDirection: "row",
                            alignItems: "center",
                            gap: size.getWidthSize(20),
                            backgroundColor: "#EBEFFF",
                        }}
                    >
                        {recipientData.profileImage == "default.png" ||
                        recipientData.profileImage == "" ? (
                            <Image
                                source={require("@/assets/images/user.png")}
                                alt=""
                                style={{
                                    width: size.getWidthSize(40),
                                    height: size.getHeightSize(40),
                                    borderRadius: size.getWidthSize(1000),
                                }}
                            />
                        ) : (
                            <Image
                                loadingIndicatorSource={require("@/assets/images/user.png")}
                                source={{
                                    uri:
                                        IMAGE_URL +
                                        "/profile/" +
                                        recipientData.profileImage,
                                }}
                                alt=""
                                style={{
                                    width: size.getWidthSize(40),
                                    height: size.getHeightSize(40),
                                    borderRadius: size.getWidthSize(1000),
                                }}
                            />
                        )}
                        <View style={{ flex: 1 }}>
                            <Text
                                style={{
                                    width: "100%",
                                    fontSize: size.fontSize(16),
                                    lineHeight: size.getHeightSize(24),
                                    fontFamily: "Satoshi-Bold",
                                }}
                            >
                                {recipientData.fullName}
                            </Text>
                            <Text
                                style={{
                                    fontSize: size.fontSize(14),
                                    lineHeight: size.getHeightSize(24),
                                    fontFamily: "Satoshi-Regular",
                                }}
                            >
                                0{recipientData.phone}
                            </Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        paddingVertical: size.getWidthSize(24),
                        gap: size.getWidthSize(24),
                    }}
                >
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.label}>Amount to to send</Text>
                            <Text style={styles.labelBal}>
                                Balance: {currency.toUpperCase()}{" "}
                                {formatCurrency({
                                    value: senderData.ngnBalance,
                                    currency,
                                })}
                            </Text>
                        </View>
                        <CurrencyInput
                            style={styles.input}
                            value={amount}
                            precision={0}
                            delimiter=","
                            onChangeValue={(value: any) => setAmount(value)}
                            placeholder="1000 - 99,000"
                        />
                        <Text
                            style={{
                                fontFamily: "Satoshi-Regular",
                                fontSize: size.fontSize(12),
                            }}
                        >
                            Equivalent to{" "}
                            <Text style={{ fontFamily: "Satoshi-Bold" }}>
                                GM{" "}
                                {convertCurrency({
                                    value: amount * 100,
                                    from: "ngn",
                                    to: "gm",
                                })}
                            </Text>
                        </Text>
                    </View>

                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.label}>Remark</Text>
                        </View>
                        <TextInput
                            value={remark}
                            onChangeText={setRemark}
                            style={styles.input}
                            placeholder="Reason for sending"
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            gap: size.getWidthSize(8),
                        }}
                    >
                        <Checkbox
                            // style={styles.checkbox}
                            value={isChecked}
                            onValueChange={setIsChecked}
                        />
                        <Pressable onPress={() => setIsChecked(!isChecked)}>
                            <Text style={styles.label}>
                                Save to quick payment list
                            </Text>
                        </Pressable>
                    </View>

                    <CustomRippleButton
                        onPress={handleNext}
                        contentContainerStyle={styles.pageButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.pageButtonText}>Proceed</Text>
                        )}
                    </CustomRippleButton>
                </View>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
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
