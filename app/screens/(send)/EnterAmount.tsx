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
import { size } from "@/config/size";
import { router, useLocalSearchParams } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import { IMAGE_URL } from "@/services/api";
import { toast } from "sonner-native";
import Checkbox from "expo-checkbox";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import GenericButton from "@/components/GenericButton";
import GenericInputError from "@/components/GenericInputError";
import AvatarInitials from "@/components/AvatarInitials";
import { Image } from "expo-image";
export default function EnterAmount() {
    //...
    const [amount, setAmount] = useState<"ngn" | "usd" | "gm" | any>(null);
    const [remark, setRemark] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [activeInput, setActiveInput] = useState<number | any>(0);
    const [emptyAmount, setEmptyAmount] = useState(false);

    useEffect(() => {
        if (amount) {
            setEmptyAmount(false);
        }
    }, [amount]);
    // const currency = useCurrencyStore((state: any) => state.currency);
    const currency = "ngn"; //Hardcoded for now

    //....
    const data = JSON.parse(useLocalSearchParams().data as string);
    const recipientData = data.data;
    const senderData = data.sender;
    //...
    const handleNext = async () => {
        if (!amount) {
            setEmptyAmount(true);

            return;
        }
        if (amount < 1000) {
            toast.info("Amount must be at least NGN1,000", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (amount > +senderData.ngnBalance / 100) {
            toast.info("Insufficient funds", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        if (amount > 99000) {
            toast.info("Amount must be at most NGN99,000", {
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
                            <AvatarInitials
                                name={recipientData.fullName}
                                style={{
                                    width: size.getWidthSize(40),
                                    height: size.getHeightSize(40),
                                    borderRadius: size.getWidthSize(1000),
                                }}
                                textStyle={{
                                    fontSize: size.fontSize(14),
                                }}
                            />
                        ) : (
                            <Image
                                source={
                                    IMAGE_URL +
                                    "/profile/" +
                                    recipientData.profileImage
                                }
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
                        <TextInput
                            onFocus={() => setActiveInput(1)}
                            onBlur={() => setActiveInput(0)}
                            style={[
                                styles.input,
                                activeInput == 1 && styles.activeInput,
                                emptyAmount && { borderColor: "#FAA0A0" },
                            ]}
                            value={amount}
                            onChangeText={(value: any) => setAmount(value)}
                            placeholder="1000 - 99,000"
                        />
                        {emptyAmount && (
                            <GenericInputError text="Enter a valid amount" />
                        )}
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
                            onFocus={() => setActiveInput(2)}
                            onBlur={() => setActiveInput(0)}
                            value={remark}
                            onChangeText={setRemark}
                            style={[
                                styles.input,
                                activeInput == 2 && styles.activeInput,
                            ]}
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
                            style={{
                                width: size.getWidthSize(20),
                                height: size.getWidthSize(20),
                                borderWidth: size.getWidthSize(2),
                                borderRadius: size.getWidthSize(4),
                            }}
                            color="#374BFB"
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

                    <GenericButton
                        onPress={handleNext}
                        text="Proceed"
                        disabled={isLoading}
                        isLoading={isLoading}
                    />
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

    activeInput: {
        borderColor: "#3366FF",
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
