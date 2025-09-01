import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import QuickPayments from "@/components/QuickPayments";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import RecepientLiveSearch from "@/components/Send/RecepientLiveSearch";
import { getRecipient } from "@/services/gimme-wallet";
import GenericButton from "@/components/GenericButton";
import GenericInputError from "@/components/GenericInputError";
import Svg, { Path } from "react-native-svg";

export default function SendToUsers() {
    ///.......
    const [uid, setUid] = useState("");
    const [empty, setEmpty] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (uid) {
            setEmpty(false);
        }
        if (notFound) {
            setNotFound(false);
        }
    }, [uid]);

    const handleNext = async () => {
        if (!uid) {
            setEmpty(true);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getRecipient(uid);
            router.push(
                `/screens/(send)/EnterAmount?data=${JSON.stringify(res)}`
            );
        } catch (error: any | Error) {
            setNotFound(true);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                    <GenericHeader title={"Select recepient"} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ paddingVertical: size.getHeightSize(10) }}>
                        <QuickPayments />
                    </View>

                    <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                        <View>
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Medium",
                                    fontSize: size.fontSize(14),
                                }}
                            >
                                Gimme-ID or Phone number
                            </Text>
                            <View
                                style={[
                                    styles.inputContainer,
                                    empty || notFound
                                        ? { borderColor: "#FAA0A0" }
                                        : {},
                                ]}
                            >
                                <Svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    //       xmlns="http://www.w3.org/2000/svg"
                                >
                                    <Path
                                        d="M4.75 16H15.25V17.5H4.75V16ZM10 14.5C8.4087 14.5 6.88258 13.8679 5.75736 12.7426C4.63214 11.6174 4 10.0913 4 8.5C4 6.9087 4.63214 5.38258 5.75736 4.25736C6.88258 3.13214 8.4087 2.5 10 2.5C11.5913 2.5 13.1174 3.13214 14.2426 4.25736C15.3679 5.38258 16 6.9087 16 8.5C16 10.0913 15.3679 11.6174 14.2426 12.7426C13.1174 13.8679 11.5913 14.5 10 14.5ZM10 13C11.1935 13 12.3381 12.5259 13.182 11.682C14.0259 10.8381 14.5 9.69347 14.5 8.5C14.5 7.30653 14.0259 6.16193 13.182 5.31802C12.3381 4.47411 11.1935 4 10 4C8.80653 4 7.66193 4.47411 6.81802 5.31802C5.97411 6.16193 5.5 7.30653 5.5 8.5C5.5 9.69347 5.97411 10.8381 6.81802 11.682C7.66193 12.5259 8.80653 13 10 13Z"
                                        fill="#868898"
                                    />
                                </Svg>
                                <TextInput
                                    style={[styles.input]}
                                    keyboardType="default"
                                    value={uid}
                                    onChangeText={setUid}
                                    placeholder="username or phone number"
                                />
                            </View>

                            <RecepientLiveSearch uid={uid} />
                            {notFound && (
                                <GenericInputError text="Recipient not found" />
                            )}
                            {empty && (
                                <GenericInputError text="This field cannot be empty" />
                            )}

                            <GenericButton
                                style={{
                                    marginVertical: size.getHeightSize(12),
                                }}
                                onPress={handleNext}
                                text="Proceed"
                                disabled={isLoading}
                                isLoading={isLoading}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
    },

    error: {
        color: "#DF1C36",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    inputContainer: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
        marginTop: size.getHeightSize(4),
        marginBottom: size.getHeightSize(6),
    },

    input: {
        flex: 1,
        height: "100%",
        fontFamily: "Satoshi-Regular",
        paddingLeft: size.getWidthSize(10),
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
        fontFamily: "ClashDisplay-Medium",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});
