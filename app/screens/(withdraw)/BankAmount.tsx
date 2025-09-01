import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { router, useLocalSearchParams } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import { toast } from "sonner-native";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import GenericButton from "@/components/GenericButton";
import GenericInputError from "@/components/GenericInputError";
import AvatarInitials from "@/components/AvatarInitials";
import { withdrawFiat } from "@/services/gimme-wallet";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";
import PinSelectorBottomSheet from "@/components/Global/PinSelectorBottomSheet";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { fetchUser } from "@/services/user";
import PageLoader from "@/components/PageLoader";

export default function BankAmount() {
    //State.........................................
    const [amount, setAmount] = useState<any>(null);
    const [newAmount, setNewAmount] = useState<any | string>(null);
    const [remark, setRemark] = useState("");
    const [isPinSelectorOpen, setIsPinSelectorOpen] = useState(false);
    const [pin, setPin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [activeInput, setActiveInput] = useState<number | any>(0);
    const [emptyAmount, setEmptyAmount] = useState(false);
    const queryClient = useQueryClient();
    const { userId } = useUserStore().user;

    //constants.....................................
    const {
        data: senderData,
        isError,
        isLoading: isUserLoading,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
    const currency = "ngn"; //Hardcoded for now
    const data = JSON.parse(useLocalSearchParams().data as string);
    const recipientData = data.recipient;

    //Handlers.......................................
    const handleChangeAmount = (value: any) => {
        const _amount = value; //before re-render
        setAmount(value);
        setEmptyAmount(false);
        if (_amount > 2500) {
            setNewAmount(+_amount + +_amount * 0.03 + 100);
        } else {
            setNewAmount(+_amount + +_amount * 0.03);
        }
    };

    //...
    const handleNext = async () => {
        if (!amount) {
            setEmptyAmount(true);

            return;
        }
        if (amount < 100) {
            toast.info("Amount must be at least NGN 100", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        if (newAmount > +senderData.ngnBalance / 100) {
            toast.info("Insufficient funds", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        setIsPinSelectorOpen(true);
    };

    const handleRequest = async (isBiometrics: boolean = false) => {
        try {
            setIsLoading(true);
            const req = await withdrawFiat({
                amount: (+amount * 100).toString(),
                remark: remark,
                bankCode: recipientData.bankCode,
                accountName: recipientData.accountName,
                bankName: recipientData.bankName,
                accountNumber: recipientData.accountNumber,
                pin,
                isBiometrics,
            });
            queryClient.invalidateQueries({ queryKey: ["getUser", userId] });

            toast.success("Successfully sent", {
                duration: 2000,
                dismissible: true,
            });
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });

            router.push(
                `/screens/Receipt?data=${JSON.stringify({
                    type: "withdrawal",
                    amount: amount * 100,
                    date: new Date().toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        dateStyle: "full",
                    }),
                    medium: "fiat",
                    referenceId: req.data.referenceId,
                })}`
            );
        } catch (error: any) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });
            setIsLoading(false);
        }
    };

    const handleBiometricsValidated = useCallback(async () => {
        // console.log("amm: ", amount);
        setIsPinSelectorOpen(false);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
        await handleRequest(true);
    }, [amount, remark]);

    const handleOnDismiss = useCallback((value: boolean) => {
        setPin("");
        setIsPinSelectorOpen(false);
    }, []);

    //Effects.....................................
    useEffect(() => {
        if (pin.length === 4) {
            async function reqFunc() {
                setIsPinSelectorOpen(false);
                await new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(true);
                    }, 1000);
                });
                await handleRequest();
            }
            reqFunc();
        }
    }, [pin]);

    return (
        <CustomSafeArea
            setBottomSafeAreaInset={false}
            topColor="#ffffff"
            bgColor="#ffffff"
        >
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Amount to withdraw" currency={currency} />
            </View>
            {isUserLoading || isError ? (
                <PageLoader />
            ) : (
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
                            <AvatarInitials
                                name={recipientData.accountName}
                                style={{
                                    width: size.getWidthSize(50),
                                    height: size.getHeightSize(50),
                                    borderRadius: size.getWidthSize(1000),
                                }}
                                textStyle={{
                                    fontSize: size.fontSize(14),
                                }}
                            />

                            <View style={{ flex: 1 }}>
                                <Text
                                    style={{
                                        width: "100%",
                                        fontSize: size.fontSize(16),

                                        fontFamily: "Satoshi-Bold",
                                    }}
                                >
                                    {recipientData.accountName}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: size.fontSize(12),
                                        lineHeight: size.getHeightSize(22),
                                        fontFamily: "Satoshi-Regular",
                                    }}
                                >
                                    {recipientData.accountNumber}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: size.fontSize(12),
                                        fontFamily: "Satoshi-Regular",
                                    }}
                                >
                                    {recipientData.bankName}
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
                                <Text style={styles.label}>
                                    Amount to to send
                                </Text>
                                <Text style={styles.labelBal}>
                                    Balance: {currency.toUpperCase()}{" "}
                                    {formatCurrency({
                                        value: senderData.ngnBalance,
                                        currency,
                                    })}
                                </Text>
                            </View>
                            <TextInput
                                keyboardType="number-pad"
                                onFocus={() => setActiveInput(1)}
                                onBlur={() => setActiveInput(0)}
                                style={[
                                    styles.input,
                                    activeInput == 1 && styles.activeInput,
                                    emptyAmount && { borderColor: "#FAA0A0" },
                                ]}
                                value={amount}
                                onChangeText={handleChangeAmount}
                                placeholder="100 - 99,000"
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
                                <Text style={styles.convertText}>
                                    Today’s rate
                                </Text>
                                <Text style={styles.convertAmount}>
                                    NGN 1 = NGN 1
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
                                <Text style={styles.convertAmount}>
                                    3%{" "}
                                    {amount && amount > 2500 ? "+ NGN 100" : ""}
                                </Text>
                            </View>
                            <View style={styles.line} />
                            <View
                                style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}
                            >
                                <Text style={styles.convertText}>Total</Text>
                                <Text style={styles.convertAmount}>
                                    {formatCurrency({
                                        value: newAmount * 100,
                                        currency: "ngn",
                                    })}
                                </Text>
                            </View>
                        </View>
                        <GenericButton
                            onPress={handleNext}
                            text="Proceed"
                            disabled={isLoading}
                            isLoading={isLoading}
                        />
                    </View>
                </ScrollView>
            )}
            <LoadingBottomSheet isLoading={isLoading} text="Withdrawing NGN" />

            <PinSelectorBottomSheet
                pin={pin}
                onBiometricsValidated={handleBiometricsValidated}
                onChangePin={setPin}
                isOpen={isPinSelectorOpen}
                onDismiss={handleOnDismiss}
            />
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

    line: {
        height: 1,
        backgroundColor: "#CDCED5",
        marginVertical: size.getHeightSize(12),
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
});
