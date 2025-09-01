import { ActivityIndicator, Text, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { size } from "@/config/size";
import { Image } from "expo-image";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    Easing,
    withRepeat,
    withTiming,
} from "react-native-reanimated";

type LoadingBottomSheetProps = {
    isLoading: boolean;
    text?: string;
};
const LoadingBottomSheet = React.memo(
    ({ isLoading, text }: LoadingBottomSheetProps) => {
        ///.......................
        const snapPoints = useMemo(() => ["40%"], []);
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);
        ///.......................
        useEffect(() => {
            if (isLoading) {
                bottomSheetModalRef.current?.present();
            } else {
                bottomSheetModalRef.current?.close();
            }
        }, [isLoading]);

        const scale = useSharedValue(1);

        useEffect(() => {
            scale.value = withRepeat(
                withTiming(1.2, {
                    duration: 400,
                    easing: Easing.inOut(Easing.ease),
                }),
                -1, // -1 = infinite loop
                true // reverse (goes back to 1)
            );
        }, []);

        // Animated style
        const animatedStyle = useAnimatedStyle(() => {
            return {
                transform: [{ scale: scale.value }],
            };
        });
        ///.......................

        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    pressBehavior={"none"}
                    disappearsOnIndex={-1} // Backdrop disappears when sheet is fully closed
                    appearsOnIndex={0} // Backdrop appears when sheet is opened
                    opacity={0.5} // Adjust transparency here
                />
            ),
            []
        );
        return (
            <BottomSheetModal
                enableDynamicSizing={false}
                // enablePanDownToClose
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    borderRadius: size.getWidthSize(20),
                    flex: 1,
                }}
            >
                <BottomSheetView
                    style={{
                        height: "100%",
                        display: "flex",
                        gap: size.getHeightSize(16),
                        flexDirection: "column",
                        paddingHorizontal: size.getWidthSize(20),
                        paddingVertical: size.getHeightSize(8),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Animated.View style={animatedStyle}>
                        <Image
                            contentFit="contain"
                            source={require("@/assets/images/logo.png")}
                            style={{
                                width: size.getWidthSize(40),
                                height: size.getHeightSize(40),
                            }}
                        />
                    </Animated.View>

                    <Text
                        style={{
                            fontSize: size.fontSize(16),
                            fontFamily: "Satoshi-Bold",
                            textAlign: "center",
                        }}
                    >
                        {text ? text : "Signing you in."}
                    </Text>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

export default LoadingBottomSheet;
