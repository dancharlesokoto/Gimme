import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { size } from "@/config/size";
import { Svg, Path } from "react-native-svg";
import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import useCurrencyStore from "@/store/currencyStore";

export const currencies = [
    {
        label: "NGN",
        value: "ngn",
        name: "Nigerian Naira",
        icon: require("@/assets/images/ngr.png"),
    },
    {
        label: "USD",
        value: "usd",
        name: "United States Dollar",
        icon: require("@/assets/images/usa.png"),
    },
    {
        label: "GM",
        value: "gm",
        name: "Gimme Coupon",
        icon: require("@/assets/images/icon.png"),
    },
];

const CurrencyToggle = React.memo(
    ({
        toggle = false,
        hidden = false,
    }: {
        toggle?: any | null;
        hidden?: boolean;
    }) => {
        ///....

        const _currencyState = useCurrencyStore((state: any) => state.currency);
        const [currencyState, setCurrecyState] = useState(_currencyState);
        //...
        const snapPoints = useMemo(() => ["40%/"], []);
        //...
        const changeCurrencyState = useCurrencyStore(
            (state: any) => state.setCurrency
        );
        //...
        const bottomSheetModalRef = useRef<BottomSheetModal>(null);
        //...
        const handleChangeCurrency = (value: string) => {
            setCurrecyState(value);
            changeCurrencyState(value);
        };
        // callbacks..
        const handleModalToggle = async () => {
            bottomSheetModalRef.current?.present();
        };
        useEffect(() => {
            if (toggle) {
                handleModalToggle();
            }
        }, [toggle]);

        ///....
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

        return (
            <>
                <Pressable
                    style={[
                        styles.pickContainer,
                        hidden && { display: "none" },
                    ]}
                    onPress={handleModalToggle}
                >
                    <Image
                        source={
                            currencies.find(
                                (item) => item.value === currencyState
                            )?.icon
                        }
                        style={{
                            borderRadius: 1000,
                            width: size.getWidthSize(20),
                            height: size.getWidthSize(20),
                        }}
                    />
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Text style={styles.selectedText}>
                            {
                                currencies.find(
                                    (item) => item.value === currencyState
                                )?.label
                            }
                        </Text>
                        <Svg
                            width="21"
                            height="20"
                            viewBox="0 0 21 20"
                            fill="none"
                            //   xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M10.5001 10.879L14.2126 7.1665L15.2731 8.227L10.5001 13L5.72705 8.227L6.78755 7.1665L10.5001 10.879Z"
                                fill="#525466"
                            />
                        </Svg>
                    </View>
                </Pressable>

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
                    <BottomSheetView
                        style={{
                            flex: 1,
                            paddingHorizontal: size.getWidthSize(20),
                            paddingVertical: size.getHeightSize(8),
                        }}
                    >
                        <BottomSheetFlatList
                            data={currencies}
                            keyExtractor={(item) => item.value}
                            contentContainerStyle={{
                                flex: 1,
                                gap: size.getWidthSize(24),
                            }}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() =>
                                        handleChangeCurrency(item.value)
                                    }
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        gap: size.getWidthSize(8),
                                    }}
                                >
                                    <Image
                                        source={item.icon}
                                        style={{
                                            borderRadius: 1000,
                                            width: size.getWidthSize(40),
                                            height: size.getHeightSize(40),
                                        }}
                                    />
                                    <View
                                        style={{
                                            flex: 1,
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <View>
                                            <Text
                                                style={{
                                                    fontFamily: "Satoshi-Bold",
                                                    fontSize: size.fontSize(14),
                                                }}
                                            >
                                                {item.label}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        "Satoshi-Regular",
                                                    color: "#868898",
                                                    fontSize: size.fontSize(12),
                                                }}
                                            >
                                                {item.name}
                                            </Text>
                                        </View>

                                        <View
                                            style={{
                                                width: size.getWidthSize(24),
                                                height: size.getWidthSize(24),
                                                borderRadius:
                                                    size.getWidthSize(1000),
                                                backgroundColor:
                                                    item.value === currencyState
                                                        ? "blue"
                                                        : "#E2E3E9",
                                                borderColor: "#E2E3E9",
                                                borderWidth:
                                                    size.getWidthSize(8),
                                            }}
                                        ></View>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </BottomSheetView>
                </BottomSheetModal>
            </>
        );
    }
);

const styles = StyleSheet.create({
    pickContainer: {
        gap: size.getHeightSize(0),
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#E2E3E9",
        paddingHorizontal: size.getWidthSize(8),
        paddingVertical: size.getHeightSize(8),
        borderRadius: size.getWidthSize(100),
        // width: size.getWidthSize(86),
    },

    dropdownButton: {
        flexDirection: "row",
        alignItems: "center",
    },

    selectedText: {
        fontSize: size.fontSize(14),
        paddingLeft: size.getWidthSize(8),
        fontFamily: "Satoshi-Regular",
    },

    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        width: "80%",
    },

    modalItem: {
        padding: 10,
    },
    modalItemText: {
        fontSize: 18,
    },
});

export default CurrencyToggle;
