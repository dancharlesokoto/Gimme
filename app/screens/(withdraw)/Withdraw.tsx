import React, { useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { Path, Svg } from "react-native-svg";
import { Href, router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
//Icons...
import useCurrencyStore from "@/store/currencyStore";

type DataType = {
    usd: {
        icon: React.ReactNode;
        title: string;
        description: string;
        link: Href;
    }[];
    ngn: {
        icon: React.ReactNode;
        title: string;
        description: string;
        link: Href;
    }[];
    gm: {
        icon: React.ReactNode;
        title: string;
        description: string;
        link: Href;
    }[];
};

const DATA: DataType = {
    usd: [
        {
            icon: (
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                        width: size.getWidthSize(20),
                        height: size.getHeightSize(20),
                    }}
                    strokeWidth="1.8"
                    stroke="#374BFB"
                    // class="size-6"
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                </Svg>
            ),
            title: "Withdraw to crypto",
            description: "Send your USD balance as stablecoin to a USDC wallet",
            link: "/screens/(fund)/FundWithCrypto",
        },
        {
            icon: (
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                        width: size.getWidthSize(18),
                        height: size.getHeightSize(18),
                    }}
                    strokeWidth="1.8"
                    stroke="#525466"
                    // class="size-6"
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </Svg>
            ),
            title: "Convert funds",
            description:
                "Convert funds from your USD wallet to your other wallets",
            link: "/screens/(fund)/Convert",
        },
    ],
    ngn: [
        {
            icon: (
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                        width: size.getWidthSize(20),
                        height: size.getHeightSize(20),
                    }}
                    strokeWidth="1.8"
                    stroke="#374BFB"
                    // class="size-6"
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                    />
                </Svg>
            ),
            title: "Withdraw to bank",
            description:
                "Send funds from your NGN wallet to your local bank account",
            link: "/screens/(withdraw)/GetCash",
        },
        {
            icon: (
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                        width: size.getWidthSize(18),
                        height: size.getHeightSize(18),
                    }}
                    strokeWidth="1.8"
                    stroke="#525466"
                    // class="size-6"
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                </Svg>
            ),
            title: "Convert funds",
            description:
                "Convert funds from your NGN wallet to your other wallets",
            link: "/screens/(fund)/Convert",
        },
        {
            icon: (
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{
                        width: size.getWidthSize(17),
                        height: size.getHeightSize(17),
                    }}
                    strokeWidth="1.8"
                    stroke="#F18B2C"
                    // class="size-6"
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                </Svg>
            ),
            title: "Get airtime & data bundle",
            description: "Top up your airtime and data",
            link: "/screens/(withdraw)/GetAirtime",
        },
    ],
    gm: [],
};
const Withdraw = () => {
    ///........................................
    const currency = useCurrencyStore((state) => state.currency);

    //........................................
    const data = DATA[currency] ?? [];

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader
                    title={`Withdraw ${
                        currency && currency.toUpperCase()
                    } balance`}
                    showCountry
                />
                <View style={{ paddingVertical: size.getHeightSize(24) }}>
                    {data.map((item, index: any) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => router.push(item.link)}
                        >
                            <View style={styles.fundContainer}>
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        gap: size.getWidthSize(8),
                                        alignItems: "center",
                                    }}
                                >
                                    <View
                                        style={{
                                            borderRadius: 999,
                                            backgroundColor:
                                                index == 0
                                                    ? "#EBEFFF"
                                                    : index == 1
                                                    ? "#FFFFFF"
                                                    : "#FEF4EB",
                                            borderWidth:
                                                index == 1
                                                    ? size.getWidthSize(1)
                                                    : 0,
                                            borderColor: "#E2E3E9",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            height: size.getWidthSize(40),
                                            width: size.getWidthSize(40),
                                        }}
                                    >
                                        {item.icon}
                                    </View>
                                    <View
                                        style={{
                                            flex: 1,
                                        }}
                                    >
                                        <Text style={styles.actionText}>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.actionSubText}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        alignItems: "center",
                                        paddingRight: size.getWidthSize(10),
                                    }}
                                >
                                    <Svg
                                        width="6"
                                        height="10"
                                        viewBox="0 0 6 10"
                                        fill="none"
                                        //   xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </CustomSafeArea>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    pageName: {
        paddingVertical: size.getHeightSize(14),
        marginLeft: size.getWidthSize(18),
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    fundContainer: {
        flexDirection: "row",
        gap: size.getWidthSize(8),
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: size.getHeightSize(17),
    },

    actionText: { fontFamily: "Satoshi-Bold", fontSize: size.fontSize(16) },
    actionSubText: {
        fontFamily: "Satoshi-Regular",
        color: "#525466",
        fontSize: size.fontSize(12),
    },
});

export default Withdraw;
