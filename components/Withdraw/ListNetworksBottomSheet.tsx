import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { size } from "@/config/size";
import { Image } from "expo-image";
type ListNetworksBottomSheetProps = {
    isOpen: boolean;
    onDismiss?: () => void;
    onPress?: (bank: any) => void;
};

const NETWORKS = [
    {
        name: "MTN",
        code: "mtn",
        logo: require("@/assets/images/networks/mtn.webp"),
    },
    {
        name: "Globacom",
        code: "glo",
        logo: require("@/assets/images/networks/glo.webp"),
    },
    {
        name: "Airtel",
        code: "airtel",
        logo: require("@/assets/images/networks/airtel.webp"),
    },

    {
        name: "9mobile",
        code: "9mobile",
        logo: require("@/assets/images/networks/9mobile.webp"),
    },
];

const ListNetworksBottomSheet = React.memo(
    ({ isOpen, onDismiss, onPress }: ListNetworksBottomSheetProps) => {
        ///.......................
        const snapPoints = useMemo(() => [size.getHeightSize(350)], []);
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);

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

        useEffect(() => {
            if (isOpen) {
                openModal();
            } else {
                bottomSheetModalRef.current?.close();
            }
        }, [isOpen]);
        ///.......................

        return (
            <BottomSheetModal
                enableHandlePanningGesture={false}
                enableContentPanningGesture={false}
                enableDynamicSizing={false}
                // enablePanDownToClose
                ref={bottomSheetModalRef}
                snapPoints={snapPoints}
                onDismiss={() => onDismiss && onDismiss()}
                backdropComponent={renderBackdrop}
                backgroundStyle={{
                    borderTopLeftRadius: size.getWidthSize(20),
                    borderTopRightRadius: size.getWidthSize(20),
                }}
            >
                <BottomSheetView
                    style={{
                        flex: 1,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        paddingHorizontal: size.getWidthSize(24),
                        paddingVertical: size.getHeightSize(12),
                        gap: size.getHeightSize(24),
                    }}
                >
                    <BottomSheetFlatList
                        nestedScrollEnabled={true}
                        data={NETWORKS}
                        keyExtractor={(item, i) => i.toString()}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        style={{
                            flex: 1,
                        }}
                        contentContainerStyle={{
                            gap: size.getWidthSize(16),
                        }}
                        renderItem={({ item }: { item: any }) => (
                            <TouchableOpacity
                                hitSlop={size.getWidthSize(20)}
                                onPress={() =>
                                    onPress &&
                                    onPress({
                                        name: item.name,
                                        code: item.code,
                                    })
                                }
                                style={{
                                    height: size.getHeightSize(40),
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: size.getWidthSize(12),
                                }}
                            >
                                {item.logo && (
                                    <Image
                                        contentFit="cover"
                                        source={item.logo}
                                        style={{
                                            width: size.getWidthSize(32),
                                            height: size.getHeightSize(32),
                                            borderRadius:
                                                size.getWidthSize(100),
                                        }}
                                    />
                                )}
                                <Text
                                    style={{
                                        fontFamily: "Satoshi-Bold",
                                        color: "#525252",
                                    }}
                                >
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        );
    }
);

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: size.getWidthSize(8),
        height: size.getHeightSize(48),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        borderRadius: size.getWidthSize(12),
        paddingHorizontal: size.getWidthSize(12),

        marginBottom: size.getHeightSize(6),
    },

    input: {
        flex: 1,
        height: "100%",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },
});

export default ListNetworksBottomSheet;
