import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { Path, Svg } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";
import { useUserStore } from "@/store/userStore";
import GenericButton from "@/components/GenericButton";
import ListBanksBottomSheet from "@/components/Withdraw/ListBanksBottomSheet";
import { axiosInstance } from "@/services/api";
import { toast } from "sonner-native";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/user";
import Recipients from "@/components/Withdraw/Recipients";
import { router } from "expo-router";
import GenericInputError from "@/components/GenericInputError";

const GetCash = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [accountNumberError, setAccountNumberError] = useState(false);
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);
    const [isBankDetailsLoading, setIsBankDetailsLoading] = useState(false);
    const [isBankOptionsOpen, setIsBankOptionsOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState<number>(0);

    ///....................................
    const { user } = useUserStore();
    const { userId } = user;
    const { data: userData } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retryOnMount: true,
        retry: true,
    });
    ///....................................
    const handleNext = async () => {
        if (!userData) {
            return;
        }
        if (!bankDetails) {
            setAccountNumberError(true);
            return;
        }
        try {
            setIsLoading(true);
            router.push(
                `/screens/(withdraw)/BankAmount?data=${JSON.stringify({
                    sender: userData,
                    recipient: {
                        accountNumber: bankDetails.account_number,
                        accountName: bankDetails.account_name,
                        bankName: selectedBank.name,
                        bankCode: selectedBank.code,
                    },
                })}`
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    ///....................................
    const handleSelectBank = useCallback((bank: any) => {
        setSelectedBank(bank);
        setIsBankOptionsOpen(false);
    }, []);
    ///....................................
    const resolveAccountNumber = useCallback(async () => {
        try {
            setIsBankDetailsLoading(true);
            const { data } = await axiosInstance.get(
                `/gimme-wallet/resolve-account-number?account_number=${accountNumber}&bank_code=${selectedBank.code}`
            );
            setBankDetails(data.data);
        } catch (error) {
            toast.error("Check bank details and try again");
            setBankDetails(null);
        } finally {
            setIsBankDetailsLoading(false);
        }
    }, [accountNumber, selectedBank]);

    ///....................................
    useEffect(() => {
        if (accountNumber) {
            setAccountNumberError(false);
        }
        if (accountNumber.length === 10 && selectedBank) {
            resolveAccountNumber();
        } else {
            setBankDetails(null);
        }
    }, [accountNumber, selectedBank]);

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getHeightSize(24) }}>
                <GenericHeader title="" currency="ngn" />
            </View>

            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <Text style={styles.header}>Withdraw cash</Text>
                    <Text style={styles.subHead}>
                        Withdraw cash to your local bank account
                    </Text>
                </View>

                <View>
                    <View>
                        <Text style={styles.label}>Account number</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedInput == 1 &&
                                    styles.focusedInputContainer,
                                accountNumberError && {
                                    borderColor: "#FAA0A0",
                                },
                            ]}
                        >
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                style={{
                                    width: size.getWidthSize(20),
                                    height: size.getHeightSize(20),
                                }}
                                strokeWidth="1.8"
                                stroke={
                                    focusedInput == 1 ? "#3366FF" : "#8A8A8F"
                                }
                                // class="size-6"
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                                />
                            </Svg>
                            <TextInput
                                onFocus={() => setFocusedInput(1)}
                                onBlur={() => setFocusedInput(0)}
                                style={[styles.input]}
                                keyboardType="phone-pad"
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                                // value={phoneNumber}
                                // onChangeText={setPhoneNumber}
                                placeholder="e.g 123456789"
                            />
                        </View>
                        {accountNumberError && (
                            <GenericInputError text="Check account details and try again" />
                        )}
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Choose bank</Text>
                    <TouchableOpacity
                        style={styles.inputContainer}
                        onPress={() => setIsBankOptionsOpen(true)}
                    >
                        <Svg
                            // xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            style={{
                                width: size.getWidthSize(20),
                                height: size.getHeightSize(20),
                            }}
                            strokeWidth="1.8"
                            stroke="#8A8A8F"
                            // class="size-6"
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                            />
                        </Svg>
                        <Text
                            style={[
                                styles.convertText,
                                { flex: 1, color: "#000" },
                            ]}
                        >
                            {selectedBank
                                ? selectedBank.name
                                : "--Select bank--"}
                        </Text>
                        <Svg
                            // xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            style={{
                                width: size.getWidthSize(20),
                                height: size.getHeightSize(20),
                            }}
                            stroke="#525466"
                            // class="size-6"
                        >
                            <Path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>

                {isBankDetailsLoading ? (
                    <ActivityIndicator
                        style={{
                            alignSelf: "flex-start",
                        }}
                        color="#374BFB"
                        size={size.getWidthSize(16)}
                    />
                ) : (
                    bankDetails && (
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                gap: size.getWidthSize(4),
                            }}
                        >
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="#3366FF"
                                style={{
                                    width: size.getWidthSize(20),
                                    height: size.getHeightSize(20),
                                }}
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </Svg>
                            <Text style={styles.convertText}>
                                {bankDetails.account_name}
                            </Text>
                        </View>
                    )
                )}

                <Recipients />

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
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>

            <ListBanksBottomSheet
                onPress={handleSelectBank}
                onDismiss={() => setIsBankOptionsOpen(false)}
                isOpen={isBankOptionsOpen}
            />
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingHorizontal: size.getWidthSize(24),
        gap: size.getHeightSize(24),
    },

    header: {
        fontFamily: "ClashDisplay-SemiBold",
        color: "rgba(0, 0, 0, 0.9)",
        fontSize: size.fontSize(22),
    },
    subHead: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        marginBottom: size.getHeightSize(6),
        color: "#525466",
    },

    pageName: {
        paddingVertical: size.getHeightSize(14),
        marginLeft: size.getWidthSize(18),
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    img: {
        width: size.getWidthSize(63),
        height: size.getWidthSize(63),
    },

    imgText: {
        fontSize: size.getWidthSize(16),
        fontFamily: "Satoshi-Regular",
        marginTop: size.getHeightSize(4),
    },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getHeightSize(25),
        color: "#0A0B14",
    },

    labelBal: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },

    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: size.getWidthSize(8),
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingHorizontal: size.getWidthSize(10),
        marginTop: size.getHeightSize(4),
        // marginBottom: size.getHeightSize(6),
    },
    focusedInputContainer: {
        borderColor: "#3366FF",
    },

    input: {
        flex: 1,
        height: "100%",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
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
});

export default GetCash;
