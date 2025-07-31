import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Switch,
    ActivityIndicator,
    TextInput,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import CustomRippleButton from "@/components/CustomRippleButton";
import { router, useLocalSearchParams } from "expo-router";
import { toast } from "sonner-native";
import { updateUser } from "@/services/user";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ErrorNotice from "@/assets/svg/errorNotice.svg";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { logoutUser } from "@/services/auth";

export default function SecuritySettings() {
    ///...
    const snapPoints = useMemo(() => [350], []);
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const insets = useSafeAreaInsets();

    //...
    const handleModalToggle = async () => {
        bottomSheetModalRef.current?.present();
    };
    const handleModalClose = () => {
        bottomSheetModalRef.current?.close();
    };
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1} // Backdrop disappears when sheet is fully closed
                appearsOnIndex={0} // Backdrop appears when sheet is opened
                opacity={0.5} // Adjust transparency here
            />
        ),
        []
    );

    //...
    const [isLoading, setIsLoading] = useState(false);

    //...
    const [isBiometricsEnabled, setIsBiometricsEnabled] = useState(false);
    const [isFaceIdEnabled, setIsFaceIdEnabled] = useState(false);

    ///...
    const { pin, userId } = useLocalSearchParams();

    /////
    const [currentPin, setCurrentPin] = useState<any>("");
    const [newPin, setNewPin] = useState<any>("");
    const [confirmNewPin, setConfirmNewPin] = useState<any>("");

    //...
    const handleChangePin = async () => {
        if (
            currentPin.length < 4 ||
            newPin.length < 4 ||
            confirmNewPin.length < 4
        ) {
            toast.error("Pin must be at least 4 characters long", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        if (currentPin !== pin) {
            toast.error("Inncorrect pin", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        if (newPin !== confirmNewPin) {
            toast.error("Pins do not match", {
                duration: 2000,
                dismissible: true,
            });
            return;
        }

        handleModalToggle();
    };

    const handleRequest = async () => {
        try {
            setIsLoading(true);
            const res = await updateUser({
                pin: newPin,
            });
            toast.success(res.message, {
                duration: 2000,
                dismissible: true,
            });
            handleModalClose();
            await new Promise((resolve) => setTimeout(resolve, 500));
            logoutUser();
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
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
                                Enable biometric for for login with registered
                                phone number
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
                                Enable 2FA authentication for additional layer
                                of security
                            </Text>
                        </View>
                        <Switch
                            value={isFaceIdEnabled}
                            trackColor={{ false: "#767577", true: "#374BFB" }}
                            onChange={() =>
                                setIsFaceIdEnabled(!isFaceIdEnabled)
                            }
                        />
                    </View>

                    <View
                        style={{
                            marginTop: size.getHeightSize(16),
                        }}
                    >
                        <Text style={styles.pageTitle}>Change pin</Text>
                        <Text style={styles.pageText}>
                            change your pin or update to a new one
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>Current pin</Text>
                            <TextInput
                                style={styles.formInput}
                                value={currentPin}
                                secureTextEntry={true}
                                onChangeText={(text) => setCurrentPin(text)}
                                placeholder="* * * *"
                            />
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>New pin</Text>
                            <TextInput
                                style={styles.formInput}
                                value={newPin}
                                secureTextEntry={true}
                                onChangeText={(text) => setNewPin(text)}
                                placeholder="* * * *"
                            />
                        </View>

                        <View style={styles.formItem}>
                            <Text style={styles.formLabel}>
                                Confirm New pin
                            </Text>
                            <TextInput
                                style={styles.formInput}
                                value={confirmNewPin}
                                secureTextEntry={true}
                                onChangeText={(text) => setConfirmNewPin(text)}
                                placeholder="****"
                            />
                        </View>
                    </View>

                    <CustomRippleButton
                        onPress={handleChangePin}
                        contentContainerStyle={styles.pageButton}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.pageButtonText}>
                                Update pin
                            </Text>
                        )}
                    </CustomRippleButton>
                </ScrollView>

                <BottomSheetModal
                    enableDynamicSizing={false}
                    enablePanDownToClose
                    ref={bottomSheetModalRef}
                    snapPoints={snapPoints}
                    backdropComponent={renderBackdrop}
                    backgroundStyle={{
                        borderRadius: size.getWidthSize(20),
                        flex: 1,
                    }}
                >
                    <View
                        style={{
                            flex: 1,
                            gap: size.getHeightSize(8),
                            padding: size.getHeightSize(24),
                            paddingBottom: size.getHeightSize(
                                8 + insets.bottom
                            ),
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ flex: 1, gap: size.getHeightSize(8) }}>
                            <ErrorNotice />
                            <Text style={styles.pageText}>
                                Are you sure you want to change your pin?{" "}
                                <Text style={{ color: "#525466" }}>
                                    (You will be logged out after this process)
                                </Text>
                            </Text>
                        </View>
                        <CustomRippleButton
                            onPress={handleRequest}
                            contentContainerStyle={styles.pageButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.pageButtonText}>
                                    Confirm
                                </Text>
                            )}
                        </CustomRippleButton>
                    </View>
                </BottomSheetModal>
            </CustomSafeArea>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
