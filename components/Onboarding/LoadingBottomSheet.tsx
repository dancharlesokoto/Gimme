import { Text } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { size } from "@/config/size";
import Loader from "@/assets/svg/loadingInfinity.svg";
import { ActivityIndicator } from "react-native-paper";

type LoadingBottomSheetProps = {
    isLoading: boolean;
};
const LoadingBottomSheet = React.memo(
    ({ isLoading }: LoadingBottomSheetProps) => {
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
                    borderRadius: size.getWidthSize(30),
                    flex: 1,
                }}
            >
                <BottomSheetView
                    style={{
                        height: "100%",
                        display: "flex",
                        gap: size.getHeightSize(8),
                        flexDirection: "column",
                        paddingHorizontal: size.getWidthSize(20),
                        paddingVertical: size.getHeightSize(8),
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <ActivityIndicator
                        color="#374BFB"
                        size={size.getHeightSize(40)}
                    />
                    <Text
                        style={{
                            fontSize: size.fontSize(16),
                            fontFamily: "Satoshi-Bold",
                            textAlign: "center",
                        }}
                    >
                        Signing you in.
                    </Text>
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

export default LoadingBottomSheet;
