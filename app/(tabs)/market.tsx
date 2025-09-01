import { View, Text, StyleSheet } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import MarketPlace from "@/components/MarketPlace";
import MarketPlaceHeader from "@/components/MarketPlaceHeader";
import CustomRippleButton from "@/components/CustomRippleButton";
import { useAppStore } from "@/store/appStore";
import Icon from "@/assets/svg/marketplaceIcon.svg";
import GenericButton from "@/components/GenericButton";
// import P2PMarket from "@/components/P2PMarket";

const Market = React.memo(() => {
    const { isMarketStarted, setIsMarketStarted } = useAppStore();
    const handleStartShopping = () => {
        setIsMarketStarted(true);
    };
    return (
        <CustomSafeArea
            topColor="#ffffff"
            bgColor="#ffffff"
            setBottomSafeAreaInset={false}
        >
            <View style={styles.container}>
                <MarketPlaceHeader title="Market place" />

                {/* Showing onboarding content  */}
                {isMarketStarted ? (
                    <MarketPlace />
                ) : (
                    <View
                        style={{
                            paddingVertical: size.getHeightSize(36),
                            paddingHorizontal: size.getWidthSize(24),
                            gap: size.getHeightSize(20),
                        }}
                    >
                        <View style={styles.topContent}>
                            <Icon />

                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                }}
                            >
                                Your market place
                            </Text>
                            <Text
                                style={{
                                    fontSize: size.fontSize(16),
                                    fontFamily: "Satoshi-Regular",
                                    textAlign: "center",
                                    color: "#525466",
                                }}
                            >
                                Find and buy goods you want, Quick and smooth
                                transaction ensured.
                            </Text>
                        </View>

                        <View style={styles.lineDash}></View>

                        <View style={styles.mainContent}>
                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M10 2.5C11.1935 2.5 12.3381 2.97411 13.182 3.81802C14.0259 4.66193 14.5 5.80653 14.5 7V7.75H17.5V9.25H16.6248L16.057 16.0623C16.0414 16.2497 15.9559 16.4244 15.8176 16.5518C15.6792 16.6791 15.4981 16.7499 15.31 16.75H4.69C4.50193 16.7499 4.32077 16.6791 4.18242 16.5518C4.04406 16.4244 3.95861 16.2497 3.943 16.0623L3.3745 9.25H2.5V7.75H5.5V7C5.5 5.80653 5.97411 4.66193 6.81802 3.81802C7.66193 2.97411 8.80653 2.5 10 2.5ZM15.1195 9.25H4.87975L5.38 15.25H14.6193L15.1195 9.25ZM10.75 10.75V13.75H9.25V10.75H10.75ZM7.75 10.75V13.75H6.25V10.75H7.75ZM13.75 10.75V13.75H12.25V10.75H13.75ZM10 4C9.23032 4 8.49008 4.29583 7.93239 4.82629C7.3747 5.35676 7.04223 6.08128 7.00375 6.85L7 7V7.75H13V7C13 6.23032 12.7042 5.49008 12.1737 4.93239C11.6432 4.3747 10.9187 4.04223 10.15 4.00375L10 4Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Shop for goods
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Find items you like for purchasing
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M10.75 7.75H16.75L9.25 19V12.25H4L10.75 1V7.75ZM9.25 9.25V6.415L6.649 10.75H10.75V14.0455L13.9473 9.25H9.25Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Fast transactions
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Quick merchant payment within our system
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M5.12489 15.9996C5.74589 15.9996 6.24989 16.5036 6.24989 17.1246C6.24989 17.7456 5.74589 18.2496 5.12489 18.2496C4.50389 18.2496 3.99989 17.7456 3.99989 17.1246C3.99989 16.5036 4.50389 15.9996 5.12489 15.9996ZM14.8749 15.9996C15.4959 15.9996 15.9999 16.5036 15.9999 17.1246C15.9999 17.7456 15.4959 18.2496 14.8749 18.2496C14.2539 18.2496 13.7499 17.7456 13.7499 17.1246C13.7499 16.5036 14.2539 15.9996 14.8749 15.9996ZM2.62889 2.31738L5.49914 5.18838V13.7496H15.9999V15.2496H4.74989C4.33589 15.2496 3.99989 14.9136 3.99989 14.4996V5.80938L1.56689 3.37863L2.62814 2.31738H2.62889ZM12.9999 3.24963C13.4139 3.24963 13.7499 3.58563 13.7499 3.99963V5.49963H15.9946C16.4124 5.49963 16.7499 5.84163 16.7499 6.24588V12.2534C16.7499 12.6659 16.4124 12.9996 15.9946 12.9996H7.00514C6.58739 12.9996 6.24989 12.6576 6.24989 12.2534V6.24588C6.24989 5.83338 6.58739 5.49963 7.00514 5.49963H9.24914L9.24989 3.99963C9.24989 3.58563 9.58589 3.24963 9.99989 3.24963H12.9999ZM8.49989 6.99963H7.74989V11.4996H8.49989V6.99963ZM12.9999 6.99963H9.99989V11.4996H12.9999V6.99963ZM15.2499 6.99963H14.4999V11.4996H15.2499V6.99963ZM12.2499 4.74963H10.7499V5.49963H12.2499V4.74963Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Get your items delivered
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Organised delivery with your merchant
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <GenericButton
                            text="Start shopping"
                            buttonColor="#000"
                            onPress={handleStartShopping}
                        />
                    </View>
                )}
            </View>
        </CustomSafeArea>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    topContent: {
        justifyContent: "center",
        alignItems: "center",
        gap: size.getHeightSize(10),
    },

    lineDash: {
        width: "80%",
        marginHorizontal: "auto",
        borderTopWidth: 0.5,
        borderColor: "#CDCED5",
    },

    mainContent: {},

    item: {
        flexDirection: "row",
        gap: size.getWidthSize(14),
        paddingVertical: size.getHeightSize(16),
    },

    vectorContainer: {
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
        borderRadius: size.getWidthSize(100),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    textContainer: { flex: 1 },

    title: {
        color: "#0A0B14",
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(16),
    },

    subtitle: {
        color: "#525466",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },
});

export default Market;
