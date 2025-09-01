import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import SimpleNotify from "@/components/Global/SimpleNotify";
import { fetchUser } from "@/services/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import PageLoader from "@/components/PageLoader";
import { convertCurrency, formatCurrency } from "@/lib/currency";
import GenericInputError from "@/components/GenericInputError";
import GenericButton from "@/components/GenericButton";
import { sendUsdc } from "@/services/crypto-wallet";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";
import { toast } from "sonner-native";
import PinSelectorBottomSheet from "@/components/Global/PinSelectorBottomSheet";
import { router } from "expo-router";

export default function GetCrypti() {
    const [isLoading, setIsLoading] = useState(false);
    const [isPinSelectorOpen, setIsPinSelectorOpen] = useState(false);
    const [pin, setPin] = useState("");
    const [amount, setAmount] = useState<any>(null);
    const [newAmount, setNewAmount] = useState<any | string>(null);
    const [emptyAmount, setEmptyAmount] = useState(false);
    const [emptyWalletAddress, setEmptyWalletAddress] = useState(false);
    const [activeInput, setActiveInput] = useState<number | any>(0);
    const [address, setAddress] = useState<any>(null);
    const { userId } = useUserStore().user;
    const queryClient = useQueryClient();

    const {
        data: userData,
        isError,
        isLoading: isUserLoading,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    const handleNext = useCallback(async () => {
        if (!amount) {
            setEmptyAmount(true);
            return;
        }

        if (+amount < 5) {
            toast.info("Amount must be at least USDC 5", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        if (!address || address.slice(0, 2) !== "0x") {
            setEmptyWalletAddress(true);
            return;
        }

        if (+amount * 100 > +userData.usdcBalance) {
            toast.info("Insufficient balance", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        setIsPinSelectorOpen(true);
    }, [amount, address, userData]);

    const handleRequest = async (isBiometrics: boolean = false) => {
        try {
            setIsLoading(true);
            await sendUsdc(amount, address, pin, isBiometrics);
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
                    medium: "crypto",
                    currency: "USDC",
                    referenceId: "",
                })}`
            );
        } catch (error: any) {
            console.log(error);
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        } finally {
            setIsLoading(false);
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 1000);
            });
        }
    };

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

    const handleBiometricsValidated = async () => {
        setIsPinSelectorOpen(false);
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
        await handleRequest(true);
    };

    useEffect(() => {
        if (amount) {
            setEmptyAmount(false);
        }
        if (address) {
            setEmptyWalletAddress(false);
        }
    }, [amount, address]);

    useEffect(() => {
        if (amount) {
            setNewAmount(+amount - 1);
        }
    }, [amount]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <CustomSafeArea
                setBottomSafeAreaInset={false}
                topColor="#ffffff"
                bgColor="#ffffff"
            >
                <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                    <GenericHeader title="" currency="usd" />
                </View>
                {isUserLoading || isError ? (
                    <PageLoader />
                ) : (
                    <ScrollView
                        contentContainerStyle={styles.container}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View>
                            <Text style={styles.header}>Send crypto</Text>
                            <Text style={styles.subHead}>
                                Withdraw USD balance as stablecoins (USDC)
                            </Text>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                gap: size.getHeightSize(32),
                            }}
                        >
                            <SimpleNotify
                                title="Note"
                                description="Make sure you are withdrawing to a USDC wallet on the Ethereum network"
                            />

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
                                        Balance: USD{" "}
                                        {formatCurrency({
                                            value: userData.usdcBalance,
                                            currency: "usd",
                                        })}
                                    </Text>
                                </View>
                                <TextInput
                                    onFocus={() => setActiveInput(1)}
                                    onBlur={() => setActiveInput(0)}
                                    keyboardType="number-pad"
                                    style={[
                                        styles.input,
                                        activeInput == 1 && styles.activeInput,
                                        emptyAmount && {
                                            borderColor: "#FAA0A0",
                                        },
                                    ]}
                                    value={amount}
                                    onChangeText={(value: any) =>
                                        setAmount(value)
                                    }
                                    placeholder="5.00 - 5,000"
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
                                    <Text
                                        style={{ fontFamily: "Satoshi-Bold" }}
                                    >
                                        GM{" "}
                                        {convertCurrency({
                                            value: amount * 100,
                                            from: "usd",
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
                                    <Text style={styles.label}>
                                        Wallet Address
                                    </Text>
                                </View>
                                <TextInput
                                    onFocus={() => setActiveInput(2)}
                                    onBlur={() => setActiveInput(0)}
                                    value={address}
                                    onChangeText={setAddress}
                                    style={[
                                        styles.input,
                                        activeInput == 2 && styles.activeInput,
                                        emptyWalletAddress && {
                                            borderColor: "#FAA0A0",
                                        },
                                    ]}
                                    placeholder="e.g 0x12a345s6s7d89"
                                />
                                {emptyWalletAddress && (
                                    <GenericInputError text="Enter a valid wallet address" />
                                )}
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
                                        $ 1 = USDC 1
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                        marginTop: size.getHeightSize(8),
                                    }}
                                >
                                    <Text style={styles.convertText}>
                                        Transaction fee
                                    </Text>
                                    <Text style={styles.convertAmount}>$1</Text>
                                </View>
                                <View style={styles.line} />
                                <View
                                    style={{
                                        justifyContent: "space-between",
                                        flexDirection: "row",
                                    }}
                                >
                                    <Text style={styles.convertText}>
                                        Amount to receive
                                    </Text>
                                    <Text style={styles.convertAmount}>
                                        $
                                        {formatCurrency({
                                            value: newAmount * 100,
                                            currency: "usd",
                                        })}
                                    </Text>
                                </View>
                            </View>

                            <View
                                style={{
                                    flex: 1,
                                    justifyContent: "flex-start",
                                }}
                            >
                                <GenericButton
                                    onPress={handleNext}
                                    text="Proceed"
                                    disabled={isLoading}
                                    isLoading={isLoading}
                                />
                            </View>
                        </View>
                    </ScrollView>
                )}
                <LoadingBottomSheet isLoading={isLoading} text="Sending USDC" />
                <PinSelectorBottomSheet
                    pin={pin}
                    onBiometricsValidated={handleBiometricsValidated}
                    onChangePin={setPin}
                    isOpen={isPinSelectorOpen}
                    onDismiss={setIsPinSelectorOpen}
                />
            </CustomSafeArea>
        </KeyboardAvoidingView>
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

    qrContainer: {
        // alignItems: "center",
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
        color: "#374BFB",
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
