import React, { useCallback, useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { size } from "@/config/size";
import GenericHeader from "@/components/GenericHeader";
import GenericButton from "@/components/GenericButton";
import { convertCurrency } from "@/lib/currency";
import Svg, { Path } from "react-native-svg";
import ListNetworksBottomSheet from "@/components/Withdraw/ListNetworksBottomSheet";
import GenericInputError from "@/components/GenericInputError";
import RadioButton from "@/components/Global/RadioButton";
import { buyAirtime } from "@/services/topup";

const GetAirtime = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [topupType, setTopupType] = useState("airtime");

    ///......
    const [phoneError, setPhoneError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    //......
    useEffect(() => {
        if (phoneNumber) {
            setPhoneError(false);
        }
        if (amount) {
            setAmountError(false);
        }
    }, [phoneNumber, amount]);
    const [network, setNetwork] = useState<
        "mtn" | "glo" | "airtel" | "9mobile"
    >("mtn");

    const [activeInput, setActiveInput] = useState(0);
    const [isNetworkOptionsOpen, setIsNetworkOptionsOpen] = useState(false);

    const handleNext = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setPhoneError(true);
            return;
        }
        if (!amount || +amount < 100) {
            setAmountError(true);
            return;
        }

        try {
            setIsLoading(true);
            const { data } = await buyAirtime(amount, phoneNumber, network);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectNetwork = useCallback((network: any) => {
        setNetwork(network.code);
        setIsNetworkOptionsOpen(false);
    }, []);

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View
                style={{
                    paddingHorizontal: size.getWidthSize(24),
                }}
            >
                <GenericHeader title="" currency="ngn" />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <View>
                    <Text style={styles.header}>Mobile topup</Text>
                    <Text style={styles.subHead}>
                        Top up airtime & data using your Gimme balance
                    </Text>
                </View>
                <View>
                    <View>
                        <Text style={styles.label}>Phone number</Text>
                        <View
                            style={[
                                styles.inputContainer,
                                activeInput == 1 &&
                                    styles.focusedInputContainer,
                                phoneError && { borderColor: "red" },
                            ]}
                        >
                            <TextInput
                                onFocus={() => setActiveInput(1)}
                                onBlur={() => setActiveInput(0)}
                                style={[styles.input]}
                                keyboardType="phone-pad"
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="e.g 07012345678"
                            />
                        </View>
                        {phoneError && (
                            <GenericInputError text="Please enter a valid phone number" />
                        )}
                    </View>
                </View>

                <View>
                    <Text style={styles.label}>Choose network</Text>
                    <TouchableOpacity
                        style={styles.inputContainer}
                        onPress={() => setIsNetworkOptionsOpen(true)}
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
                            {network.toUpperCase() ?? "--Select bank--"}
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

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: size.getWidthSize(20),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: size.getWidthSize(8),
                            marginVertical: size.getHeightSize(4),
                        }}
                    >
                        <RadioButton
                            status={
                                topupType === "airtime"
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() => setTopupType("airtime")}
                        />
                        <Text
                            onPress={() => setTopupType("airtime")}
                            style={styles.radioText}
                        >
                            Airtime
                        </Text>
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: size.getWidthSize(8),
                        }}
                    >
                        <RadioButton
                            status={
                                topupType === "data" ? "checked" : "unchecked"
                            }
                            onPress={() => setTopupType("data")}
                        />
                        <Text
                            onPress={() => setTopupType("data")}
                            style={styles.radioText}
                        >
                            Data
                        </Text>
                    </View>
                </View>

                <View>
                    <View>
                        <Text style={styles.label}>Amount </Text>
                        <View
                            style={[
                                styles.inputContainer,
                                activeInput == 2 &&
                                    styles.focusedInputContainer,
                                amountError && { borderColor: "red" },
                            ]}
                        >
                            <TextInput
                                onFocus={() => setActiveInput(2)}
                                onBlur={() => setActiveInput(0)}
                                style={[styles.input]}
                                keyboardType="phone-pad"
                                value={amount}
                                onChangeText={setAmount}
                                placeholder="100 - 50,000"
                            />
                        </View>
                        {amountError && (
                            <GenericInputError text="Please enter a valid amount" />
                        )}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text style={[styles.subInput, { color: "#525466" }]}>
                            Equivalent to GM{" "}
                            {convertCurrency({
                                value: +amount * 100,
                                from: "ngn",
                                to: "gm",
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
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </View>
            </ScrollView>

            <ListNetworksBottomSheet
                onPress={handleSelectNetwork}
                onDismiss={() => setIsNetworkOptionsOpen(false)}
                isOpen={isNetworkOptionsOpen}
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

    selectedText: {
        fontSize: size.fontSize(14),
        paddingLeft: size.getWidthSize(8),
        fontFamily: "Satoshi-Regular",
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

    mainText: {
        fontSize: size.getWidthSize(16),
        fontFamily: "Satoshi-Bold",
        marginBottom: size.getHeightSize(4),
    },

    subText: {
        color: "#525466",
        fontSize: size.getWidthSize(14),
        fontFamily: "Satoshi-Regular",
    },

    link: {
        marginTop: size.getHeightSize(10),
        fontSize: size.getWidthSize(14),
        color: "#0A0B14",
        fontFamily: "Satoshi-Medium",
        textDecorationLine: "underline",
    },

    radioText: {
        fontSize: size.fontSize(14),
        fontFamily: "ClashDisplay-Medium",
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        color: "#0A0B14",
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
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: size.getHeightSize(24),
        marginLeft: size.getWidthSize(4),
    },

    convertText: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },

    convertAmount: {
        fontSize: 12,
        fontFamily: "Satoshi-Medium",
        lineHeight: 16,
        color: "#0A0B14",
    },

    line: {
        height: 1,
        backgroundColor: "#CDCED5",
        marginVertical: size.getHeightSize(12),
    },
});
export default GetAirtime;
