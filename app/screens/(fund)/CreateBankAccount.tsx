import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import GenericHeader from "@/components/GenericHeader";
import CustomRippleButton from "@/components/CustomRippleButton";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { createBankAccount } from "@/services/user";
import { toast } from "sonner-native";
import { router } from "expo-router";

const Create = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { userId } = useUserStore().user;
    const { email } = useUserStore().user;

    const { data, mutateAsync, isPending, isSuccess, isError, error } =
        useMutation({
            mutationKey: ["createBankAccount", firstName, lastName, userId],
            mutationFn: async () =>
                await createBankAccount({ userId, email, firstName, lastName }),
        });

    //Reactive success logic.......
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message, {
                duration: 2000,
                dismissible: true,
            });
            router.back();
        }
    }, [isSuccess]);

    //Reactive error logic.......
    useEffect(() => {
        if (isError) {
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
        }
    }, [isError]);

    const handleCreateAccount = async () => {
        if (!firstName || !lastName) {
            toast.error("Please fill in all fields", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }
        await mutateAsync();
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <GenericHeader title="Create Bank Account" />

                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.subHead}>
                            Create a dedicated virtual bank account to fund your
                            wallet.
                        </Text>
                    </View>

                    <View style={{ paddingTop: size.getHeightSize(24) }}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder="e.g John"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <Text style={styles.label}>Last Name</Text>
                        <TextInput
                            style={[styles.input]}
                            placeholder="e.g Doe"
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize="none"
                        />

                        <View style={{ paddingTop: size.getHeightSize(8) }}>
                            <CustomRippleButton
                                style={{
                                    borderRadius: size.getWidthSize(16),
                                    alignSelf: "flex-start",
                                }}
                                contentContainerStyle={{
                                    backgroundColor: "#374BFB",
                                    paddingHorizontal: size.getWidthSize(16),
                                    paddingVertical: size.getHeightSize(16),
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                                onPress={handleCreateAccount}
                                disabled={isPending}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: size.getWidthSize(8),
                                    }}
                                >
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontFamily: "Satoshi-Bold",
                                            fontSize: size.fontSize(18),
                                            opacity: isPending ? 0 : 1,
                                        }}
                                    >
                                        Create Bank .Account
                                    </Text>
                                    {isPending && (
                                        <ActivityIndicator
                                            style={{
                                                width: "100%",
                                                position: "absolute",
                                                left: 0,
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            color={"#fff"}
                                        />
                                    )}
                                </View>
                            </CustomRippleButton>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    header: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(20),
    },
    subHead: { fontFamily: "Satoshi-Regular", fontSize: size.fontSize(14) },

    label: {
        fontSize: 14,
        fontFamily: "Satoshi-Medium",
        lineHeight: 30,
    },

    input: {
        height: size.getHeightSize(54),
        borderColor: "#E2E3E9",
        fontFamily: "Satoshi-Regular",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingLeft: size.getWidthSize(10),
        marginBottom: size.getHeightSize(16),
        fontSize: size.fontSize(14),
    },

    errorContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: size.getHeightSize(16),
        marginTop: size.getHeightSize(-10),
    },

    error: {
        color: "#DF1C36",
        paddingLeft: size.getWidthSize(4),
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    empty: {
        color: "#DF1C36",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },

    emptyContainer: {
        flexDirection: "row",
        marginBottom: size.getHeightSize(16),
        marginTop: size.getHeightSize(8),
        // backgroundColor: "#FDEDEF",
        padding: size.getWidthSize(8),
        borderRadius: size.getWidthSize(8),
        gap: size.getWidthSize(8),
    },
});

export default Create;
