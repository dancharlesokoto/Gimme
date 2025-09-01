import { size } from "@/config/size";
import {
    CameraView,
    useCameraPermissions,
    BarcodeScanningResult,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Path } from "react-native-svg";
import ScanIcon from "@/assets/svg/scan.svg";
import { getRecipient } from "@/services/gimme-wallet";
import LoadingBottomSheet from "@/components/Onboarding/LoadingBottomSheet";

export default function App() {
    const insets = useSafeAreaInsets();
    const [isFlashOn, setIsFlashOn] = useState(false);
    const [isScanned, setIsScanned] = useState(false);
    const [isReqLoading, setReqIsLoading] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
        !permission?.granted && requestPermission();
    }, [permission?.granted]);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}> </Text>
            </View>
        );
    }

    const toggleFlashLight = () => {
        if (isFlashOn) {
            setIsFlashOn(false);
        } else {
            setIsFlashOn(true);
        }
    };

    const handleBarCodeScanned = async (result: BarcodeScanningResult) => {
        if (isReqLoading || isScanned) {
            return;
        }
        const data = JSON.parse(result.data);
        console.log(data);
        try {
            setIsScanned(true);
            setReqIsLoading(true);
            const res = await getRecipient(data?.uid);
            setReqIsLoading(false);
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            router.replace(
                `/screens/(send)/EnterAmount?data=${JSON.stringify(res)}`
            );
        } catch (error) {
            setIsScanned(false);
            await new Promise((resolve) => {
                setTimeout(() => {
                    resolve(true);
                }, 500);
            });
            setReqIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                enableTorch={isFlashOn}
                onBarcodeScanned={handleBarCodeScanned}
                barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
                style={[
                    styles.camera,
                    { paddingBottom: size.getHeightSize(insets.bottom + 32) },
                ]}
            >
                <View></View>
                <ScanIcon
                    stroke={"#fff"}
                    width={size.getWidthSize(300)}
                    height={size.getHeightSize(300)}
                />
                <View style={styles.bottomIconsContainer}>
                    <TouchableOpacity
                        onPress={toggleFlashLight}
                        style={styles.icon}
                    >
                        <Svg
                            // xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="#fff"
                            width={size.getWidthSize(24)}
                            height={size.getHeightSize(24)}
                        >
                            {isFlashOn ? (
                                <Path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                                />
                            ) : (
                                <Path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M11.412 15.655 9.75 21.75l3.745-4.012M9.257 13.5H3.75l2.659-2.849m2.048-2.194L14.25 2.25 12 10.5h8.25l-4.707 5.043M8.457 8.457 3 3m5.457 5.457 7.086 7.086m0 0L21 21"
                                />
                            )}
                        </Svg>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.icon}
                    >
                        <Svg
                            // xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="3"
                            stroke="#fff"
                            width={size.getWidthSize(24)}
                            height={size.getHeightSize(24)}
                        >
                            <Path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            </CameraView>
            <LoadingBottomSheet text="Fetching user" isLoading={isReqLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },

    message: {
        fontSize: size.fontSize(18),
        fontFamily: "Satoshi-Medium",
        color: "#0A0B14",
    },

    camera: {
        flex: 1,
        padding: size.getWidthSize(32),
        alignItems: "center",
        justifyContent: "space-between",
    },
    bottomIconsContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    icon: {
        width: size.getWidthSize(50),
        height: size.getHeightSize(50),
        borderRadius: size.getWidthSize(50),
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
});
