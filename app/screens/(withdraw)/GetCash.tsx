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
import ListBanksBottomSheet from "@/components/Fund/ListBanksBottomSheet";
import { axiosInstance } from "@/services/api";
import { formatCurrency } from "@/lib/currency";
import { withdrawFiat } from "@/services/gimme-wallet";
import { toast } from "sonner-native";

const GetCash = () => {
    const [isloading, setIsloading] = useState(false);
    const [amount, setAmount] = useState<any | string>(null);
    const [newAmount, setNewAmount] = useState<any | string>(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [bankDetails, setBankDetails] = useState<any>(null);
    const [isBankDetailsLoading, setIsBankDetailsLoading] = useState(false);
    const [isBankOptionsOpen, setIsBankOptionsOpen] = useState(false);
    const [focusedInput, setFocusedInput] = useState<number>(0);

    ///....................................
    const { user } = useUserStore();
    const { userId } = user;
    ///....................................
    const handleNext = async () => {
        try {
            setIsloading(true);
            const { data } = await withdrawFiat({
                amount: (+newAmount * 100).toString(),
                remark: "test",
                bankCode: selectedBank.code,
                accountName: bankDetails.account_name,
                bankName: selectedBank.code,
                accountNumber: bankDetails.account_number,
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false);
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

    useEffect(() => {
        if (!amount) return;
        const _amount =
            amount <= 2500
                ? +amount + +amount * 0.03
                : +amount + +amount * 0.03 + 100;
        setNewAmount(_amount);
    }, [amount]);
    ///....................................
    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            resolveAccountNumber();
        } else {
            setBankDetails(null);
        }
    }, [accountNumber, selectedBank]);
    ///....................................

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
                                    focusedInput == 1 ? "#3366FF" : "#e2e3e9"
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
                    </View>
                </View>

                <View>
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
                                stroke="#e2e3e9"
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
                                stroke="green"
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

                <View>
                    <View>
                        <Text style={styles.label}>Amount</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                focusedInput == 2 &&
                                    styles.focusedInputContainer,
                            ]}
                        >
                            <TextInput
                                onFocus={() => setFocusedInput(2)}
                                onBlur={() => setFocusedInput(0)}
                                style={[styles.input]}
                                keyboardType="phone-pad"
                                value={amount}
                                onChangeText={setAmount}
                                // value={phoneNumber}
                                // onChangeText={setPhoneNumber}
                                placeholder="1,000 - 99,999"
                            />
                        </View>
                    </View>
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
                        <Text style={styles.convertText}>Today’s rate</Text>
                        <Text style={styles.convertAmount}>NGN 1 = NGN 1</Text>
                    </View>
                    <View
                        style={{
                            justifyContent: "space-between",
                            flexDirection: "row",
                            marginTop: size.getHeightSize(12),
                        }}
                    >
                        <Text style={styles.convertText}>Transaction fee</Text>
                        <Text style={styles.convertAmount}>
                            3% {amount && amount > 2500 ? "+ NGN 100" : ""}
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
                        isLoading={isloading}
                        textColor={bankDetails && amount ? "#fff" : "#525466"}
                        buttonColor={
                            bankDetails && amount ? "#3366FF" : "#E2E3E9"
                        }
                        disabled={!bankDetails || !amount}
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
        lineHeight: size.getHeightSize(20),
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
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        paddingBottom: size.getHeightSize(35),
        paddingHorizontal: size.getWidthSize(21),
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: size.getWidthSize(16),
        paddingHorizontal: size.getWidthSize(24),
        paddingVertical: size.getHeightSize(24),
        width: "100%",
    },

    modalHead: {
        fontSize: size.fontSize(18),
        fontFamily: "Satoshi-Bold",
        lineHeight: size.getWidthSize(24),
    },
});

export default GetCash;
