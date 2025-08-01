import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    TextInput,
    ScrollView,
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { size } from "@/config/size";
import { Path, Svg } from "react-native-svg";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import SimpleNotify from "@/components/Global/SimpleNotify";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/services/user";
import PageLoader from "@/components/PageLoader";
import { toast } from "sonner-native";

const FundAirtime = () => {
    ///....
    const { user } = useUserStore();
    const { userId } = user;

    //...
    const [screenRefreshing, setScreenRefreshing] = useState(false);
    const [amountToFund, setAmountToFund] = useState("");
    const [amountToReceive, setAmountToReceive] = useState("");

    //...
    const handleScreenRefresh = () => {
        setScreenRefreshing(true);
        setTimeout(() => {
            refetch();
            setScreenRefreshing(false);
        }, 500);
    };
    const handleFundAccount = () => {
        toast.info("This feature is not available yet", {
            duration: 2000,
            dismissible: true,
        });
    };

    //...
    const {
        data: userData,
        error,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
                <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                    <GenericHeader title={"Fund with airtime"} showCountry />
                </View>
                {isLoading || isError ? (
                    <PageLoader />
                ) : (
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.container}
                        refreshControl={
                            <RefreshControl
                                colors={["#374BFB"]}
                                refreshing={screenRefreshing}
                                onRefresh={handleScreenRefresh}
                            />
                        }
                    >
                        <SimpleNotify
                            title="Funding with airtime"
                            description={`Your airtime on 0${userData.phone.slice(
                                0,
                                3
                            )} *** ${userData.phone.slice(
                                -2
                            )} will be used to fund your account`}
                        />
                        <View>
                            <View>
                                <Text style={styles.label}>Amount to fund</Text>
                                <TextInput
                                    value={amountToFund}
                                    onChangeText={setAmountToFund}
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
                                    flexWrap: "wrap",
                                }}
                            >
                                <Svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    // xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                                        fill="#868898"
                                    />
                                </Svg>
                                <Text
                                    style={[
                                        styles.subInput,
                                        { color: "#525466" },
                                    ]}
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
                                    0.001 GM = 1 AT
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
                                <Text style={styles.convertText}>
                                    Conversion
                                </Text>
                                <Text style={styles.convertAmount}>
                                    x 0.001 GM
                                </Text>
                            </View>
                        </View>

                        <View>
                            <View>
                                <Text style={styles.label}>
                                    Amount to receive
                                </Text>
                                <TextInput
                                    value={amountToReceive}
                                    onChangeText={setAmountToReceive}
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
                                    style={[
                                        styles.subInput,
                                        { color: "#525466" },
                                    ]}
                                >
                                    Equivalent to
                                </Text>
                                <Text
                                    style={[
                                        styles.subInput,
                                        { color: "#525466" },
                                    ]}
                                >
                                    GM 10
                                </Text>
                            </View>
                        </View>
                        <Pressable
                            onPress={handleFundAccount}
                            style={{
                                backgroundColor: "#374BFB",
                                height: size.getHeightSize(56),
                                borderRadius: size.getHeightSize(16),
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                    color: "#ffffff",
                                    marginLeft: size.getWidthSize(10),
                                }}
                            >
                                Fund account
                            </Text>
                        </Pressable>
                    </ScrollView>
                )}
            </CustomSafeArea>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: size.getWidthSize(24),
        flexGrow: 1,
        gap: size.getWidthSize(24),
    },

    pageName: {
        marginLeft: size.getWidthSize(18),
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    pickContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#E2E3E9",
        paddingHorizontal: size.getHeightSize(4),
        paddingVertical: size.getWidthSize(4),
        borderRadius: size.getWidthSize(100),
        width: size.getWidthSize(86),
        alignItems: "center",
        marginVertical: size.getHeightSize(14),
    },

    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
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

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        color: "#0A0B14",
    },

    input: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
        marginTop: size.getHeightSize(4),
        marginBottom: size.getHeightSize(6),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    subInput: {
        fontSize: 14,
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        marginLeft: size.getWidthSize(4),
    },

    convertText: {
        fontSize: 14,
        fontFamily: "Satoshi-Regular",
        lineHeight: 20,
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
export default FundAirtime;
