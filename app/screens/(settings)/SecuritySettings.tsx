import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Switch,
    ActivityIndicator,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import CustomRippleButton from "@/components/CustomRippleButton";

export default function SecuritySettings() {
    //...
    const [isLoading, setIsLoading] = useState(false);

    //...
    const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Security settings" />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.pageCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.pageTitle}>
                            Biometric authentication
                        </Text>
                        <Text style={styles.pageText}>
                            Enable biometric for for login with registered phone
                            number
                        </Text>
                    </View>
                    <Switch
                        value={isBiometricsEnabled}
                        trackColor={{ false: "#767577", true: "#374BFB" }}
                        onChange={() =>
                            setIsBiometricsEnabled(!isBiometricsEnabled)
                        }
                    />
                </View>

                <View style={styles.pageCard}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.pageTitle}>
                            Face ID authentication
                        </Text>
                        <Text style={styles.pageText}>
                            Enable 2FA authentication for additional layer of
                            security
                        </Text>
                    </View>
                    <Switch
                        value={isFaceIdEnabled}
                        trackColor={{ false: "#767577", true: "#374BFB" }}
                        onChange={() => setIsFaceIdEnabled(!isFaceIdEnabled)}
                    />
                </View>

                <View
                    style={{
                        marginTop: size.getHeightSize(16),
                    }}
                >
                    <Text style={styles.pageTitle}>Change password</Text>
                    <Text style={styles.pageText}>
                        change your password or update to a new one
                    </Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>Current password</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="****"
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>New password</Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="****"
                        />
                    </View>

                    <View style={styles.formItem}>
                        <Text style={styles.formLabel}>
                            Confirm New password
                        </Text>
                        <TextInput
                            style={styles.formInput}
                            placeholder="****"
                        />
                    </View>
                </View>

                <CustomRippleButton
                    contentContainerStyle={styles.pageButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.pageButtonText}>Update</Text>
                    )}
                </CustomRippleButton>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: size.getWidthSize(24),
        gap: size.getHeightSize(16),
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

    pageCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: size.getWidthSize(14),
        borderRadius: size.getWidthSize(12),
        padding: size.getWidthSize(16),
        borderWidth: 1,
        borderColor: "#E2E3E9",
    },

    form: {
        gap: size.getHeightSize(16),
        marginVertical: size.getHeightSize(12),
    },

    formItem: {
        gap: size.getHeightSize(4),
    },

    formLabel: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
        lineHeight: size.getHeightSize(16),
        letterSpacing: size.getWidthSize(0.5),
        color: "#0A0B14",
    },

    formInput: {
        height: size.getHeightSize(46),
        borderRadius: size.getWidthSize(12),
        flexDirection: "row",
        alignItems: "center",
        gap: size.getWidthSize(8),
        borderWidth: 1,
        borderColor: "#E2E3E9",
        paddingHorizontal: size.getWidthSize(12),
    },

    pageButton: {
        height: size.getHeightSize(56),
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
