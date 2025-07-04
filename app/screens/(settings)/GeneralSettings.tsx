import { View, Text, ScrollView, StyleSheet, TextInput } from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import CustomRippleButton from "@/components/CustomRippleButton";
import {
    router,
    useGlobalSearchParams,
    useLocalSearchParams,
} from "expo-router";
import { toast } from "sonner-native";
import { updateUser } from "@/services/user";

export default function GeneralSettings() {
    //...
    const [isLoading, setIsLoading] = useState(false);

    ///.....
    const {
        username: _username,
        phoneNumber: _phoneNumber,
        email: _email,
    } = useLocalSearchParams();

    ///.....
    const [username, setUsername] = useState<any>(_username);
    const [phoneNumber, setPhoneNumber] = useState<any>(_phoneNumber);
    const [email, setEmail] = useState<any>(_email);

    ///....
    const handleUpdate = async () => {
        try {
            setIsLoading(true);
            const res = await updateUser({
                username: username,
                phone: phoneNumber,
                email: email,
            });
            toast.success(res.message, {
                duration: 2000,
                dismissible: true,
            });
            router.back();
        } catch (error: any) {
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
            <ScrollView
                keyboardDismissMode="interactive"
                style={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <GenericHeader title="General settings" />
                <View style={styles.page}>
                    <View style={styles.pageItem}>
                        <View>
                            <Text style={styles.pageTitle}>Display name</Text>
                            <Text style={styles.pageText}>
                                Manage your display name which you see
                            </Text>
                        </View>

                        <View style={styles.pageInputContainer}>
                            <Text style={styles.pageInputLabel}>Username</Text>
                            <View style={styles.pageInput}>
                                <TextInput
                                    placeholder="New username"
                                    style={styles.input}
                                    value={username}
                                    onChangeText={(text) => setUsername(text)}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.pageItem}>
                        <View>
                            <Text style={styles.pageTitle}>
                                Registered phone number
                            </Text>
                            <Text style={styles.pageText}>
                                Top up request will be sent to this number and
                                serves as means for verification
                            </Text>
                        </View>
                        <View style={styles.pageInputContainer}>
                            <Text style={styles.pageInputLabel}>
                                Phone number
                            </Text>
                            <View style={styles.pageInput}>
                                <TextInput
                                    placeholder="New phone number"
                                    style={styles.input}
                                    value={phoneNumber}
                                    onChangeText={(text) =>
                                        setPhoneNumber(text)
                                    }
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.pageItem}>
                        <View>
                            <Text style={styles.pageTitle}>
                                Registered email
                            </Text>
                            <Text style={styles.pageText}>
                                Your registered email which will be used as
                                additional means of verification
                            </Text>
                        </View>
                        <View style={styles.pageInputContainer}>
                            <Text style={styles.pageInputLabel}>Email</Text>
                            <View style={styles.pageInput}>
                                <TextInput
                                    placeholder="New email"
                                    style={styles.input}
                                    value={email}
                                    onChangeText={(text) => setEmail(text)}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                <CustomRippleButton
                    contentContainerStyle={styles.pageButton}
                    disabled={isLoading}
                    onPress={handleUpdate}
                >
                    <Text style={styles.pageButtonText}>Update</Text>
                </CustomRippleButton>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    page: {
        marginVertical: size.getHeightSize(24),
        gap: size.getHeightSize(32),
    },

    pageItem: {
        gap: size.getHeightSize(18),
    },

    pageTitle: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(16),
        lineHeight: size.getHeightSize(24),
        color: "#0A0B14",
    },

    pageText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },

    pageInputContainer: {
        gap: size.getHeightSize(4),
    },

    pageInput: {
        borderRadius: size.getWidthSize(12),
        borderWidth: 1,
        borderColor: "#E2E3E9",
        padding: size.getWidthSize(12),
    },

    input: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#868898",
    },

    pageInputLabel: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
        lineHeight: size.getHeightSize(16),
        letterSpacing: size.getWidthSize(0.5),
        color: "#0A0B14",
    },

    pageButton: {
        borderRadius: size.getWidthSize(16),
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
