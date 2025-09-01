import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Easing } from "react-native-reanimated";
import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
    useBottomSheetTimingConfigs,
} from "@gorhom/bottom-sheet";
import { size } from "@/config/size";
import ReEnterPinField from "../Onboarding/ReEnterPinField";
import Cancel from "@/assets/svg/cancel.svg";
import Finger from "@/assets/svg/finger.svg";
import LockSVG from "@/assets/svg/lock.svg";
import useBiometrics from "@/hooks/useBiometrics";

type PinSelectorBottomSheetProps = {
    pin: string;
    isOpen: boolean;
    onDismiss?: (value: boolean) => void;
    onChangePin?: (pin: string) => void;
    onBiometricsValidated?: () => void;
};

const PinSelectorBottomSheet = React.memo(
    ({
        pin,
        isOpen,
        onDismiss,
        onChangePin,
        onBiometricsValidated,
    }: PinSelectorBottomSheetProps) => {
        //Constants...................................
        const {
            isBiometricSupported,
            authenticateBiometrics,
            isAuthenticated,
        } = useBiometrics();
        const animationConfigs = useBottomSheetTimingConfigs({
            duration: 50,
            easing: Easing.circle,
        });
        const snapPoints = useMemo(() => ["80%"], []);
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);

        //Handlers............................
        const handlePress = useCallback(
            (value: any) => {
                if (pin.length < 4) {
                    onChangePin && onChangePin(pin + value);
                }
            },
            [pin, onChangePin]
        );

        const handleDelete = useCallback(() => {
            if (pin.length == 0) {
                return;
            }
            onChangePin && onChangePin(pin.slice(0, -1));
        }, [pin]);

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
        const openModal = () => {
            bottomSheetModalRef.current?.present();
        };

        const handleOnDismiss = useCallback(() => {
            onDismiss && onDismiss(false);
        }, []);

        //Effects...............................
        useEffect(() => {
            if (isAuthenticated) {
                onBiometricsValidated && onBiometricsValidated();
            }
        }, [isAuthenticated]);

        useEffect(() => {
            if (isOpen) {
                openModal();
            } else {
                bottomSheetModalRef.current?.close();
            }
        }, [isOpen]);

        return (
            <BottomSheetModal
                animationConfigs={animationConfigs}
                enableDynamicSizing={false}
                backdropComponent={renderBackdrop}
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={handleOnDismiss}
                // backdropComponent={}
                backgroundStyle={{
                    borderTopLeftRadius: size.getWidthSize(40),
                    borderTopRightRadius: size.getWidthSize(40),
                }}
            >
                <BottomSheetView
                    style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                        paddingHorizontal: size.getWidthSize(24),
                        paddingVertical: size.getHeightSize(18),
                        gap: size.getHeightSize(32),
                    }}
                >
                    <View
                        style={{
                            gap: size.getHeightSize(8),
                        }}
                    >
                        <LockSVG style={styles.user} />
                        <View>
                            <Text style={styles.title}>Authorize</Text>
                            <Text style={styles.subtitle}>
                                Enter you 4-digit pin
                            </Text>
                        </View>
                        <ReEnterPinField code={pin} editable={false} />
                    </View>
                    <View>
                        <Keyboard
                            onPress={handlePress}
                            onDelete={handleDelete}
                            isAuthenticated={isAuthenticated}
                            isBiometricSupported={isBiometricSupported}
                            authenticateBiometrics={authenticateBiometrics}
                        />
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

const Keyboard = React.memo(
    ({
        onPress,
        onDelete,
        isBiometricSupported,
        authenticateBiometrics,
    }: any) => {
        return (
            <View style={styles.keypadContainer}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map(
                    (value, index) => {
                        if (value === null) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.keypadButton}
                                    onPress={() => onDelete && onDelete()}
                                >
                                    <Cancel />
                                </TouchableOpacity>
                            );
                        } else if (value === "") {
                            return (
                                <TouchableOpacity
                                    onPress={() =>
                                        isBiometricSupported &&
                                        authenticateBiometrics()
                                    }
                                    key={index}
                                    style={[styles.keypadButton]}
                                >
                                    <Finger />
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={styles.keypadButton}
                                    onPress={() => onPress && onPress(value)}
                                >
                                    <Text style={styles.keypadText}>
                                        {value}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }
                    }
                )}
            </View>
        );
    }
);

const styles = StyleSheet.create({
    keypadContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: size.getWidthSize(16),
    },

    title: {
        fontSize: size.fontSize(18),
        fontFamily: "ClashDisplay-SemiBold",
        textAlign: "center",
        color: "#0A0B14",
    },
    subtitle: {
        fontSize: size.fontSize(12),
        fontFamily: "Satoshi-Regular",
        textAlign: "center",
        paddingTop: size.getHeightSize(1),
    },

    user: {
        alignSelf: "center",
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
    },

    keypadButton: {
        width: "30%",
        height: size.getHeightSize(70),
        justifyContent: "center",
        alignItems: "center",
    },

    keypadText: {
        fontSize: size.fontSize(16),
        fontFamily: "ClashDisplay-SemiBold",
    },
});

export default PinSelectorBottomSheet;
