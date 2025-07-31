import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { size } from "@/config/size";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";

export default function PrimaryOptions() {
    return (
        <View
            style={{
                paddingBottom: size.getHeightSize(24),
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: size.getWidthSize(24),
            }}
        >
            <Pressable
                onPress={() => router.push("/screens/(send)/Send")}
                style={[
                    styles.featureCard,
                    { marginRight: size.getWidthSize(12), flex: 1 },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={[
                            styles.featureIcon,
                            { backgroundColor: "#38C78B" },
                        ]}
                    >
                        <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            //       xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M2.45962 7.98628C2.06812 7.85578 2.06437 7.64503 2.46712 7.51078L16.7824 2.73928C17.1791 2.60728 17.4064 2.82928 17.2954 3.21778L13.2049 17.5323C13.0924 17.929 12.8636 17.9425 12.6956 17.566L10.0001 11.5L14.5001 5.50003L8.50012 10L2.45962 7.98628Z"
                                fill="white"
                            />
                        </Svg>
                    </View>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Tap to open</Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: size.getHeightSize(32),
                        alignItems: "flex-start",
                    }}
                >
                    <Text style={styles.featureText}>
                        Send money to other Gimme users
                    </Text>
                </View>
            </Pressable>
            <Pressable
                onPress={() => router.push("/screens/(fund)/Convert")}
                style={[
                    styles.featureCard,
                    { marginLeft: size.getWidthSize(12), flex: 1 },
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View
                        style={[
                            styles.featureIcon,
                            { backgroundColor: "#6E3FF3" },
                        ]}
                    >
                        <Svg
                            width="13"
                            height="12"
                            viewBox="0 0 13 12"
                            fill="none"
                            //       xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M12.4375 4.125C12.4375 5.81494 11.4056 7.26394 9.9375 7.87612V7.875C9.9375 4.941 7.559 2.5625 4.62501 2.5625H4.62386C5.23608 1.09441 6.68506 0.0625 8.375 0.0625C10.6187 0.0625 12.4375 1.88134 12.4375 4.125ZM3.375 0.375C1.99429 0.375 0.875 1.49429 0.875 2.875V3.8125H2.125V2.875C2.125 2.18464 2.68464 1.625 3.375 1.625H4.3125V0.375H3.375ZM10.875 8.1875V9.125C10.875 9.81538 10.3154 10.375 9.625 10.375H8.6875V11.625H9.625C11.0057 11.625 12.125 10.5057 12.125 9.125V8.1875H10.875ZM4.625 11.9375C6.86869 11.9375 8.6875 10.1187 8.6875 7.875C8.6875 5.63131 6.86869 3.8125 4.625 3.8125C2.38134 3.8125 0.5625 5.63131 0.5625 7.875C0.5625 10.1187 2.38134 11.9375 4.625 11.9375ZM4.625 6.3125L6.1875 7.875L4.625 9.4375L3.0625 7.875L4.625 6.3125Z"
                                fill="white"
                            />
                        </Svg>
                    </View>

                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Tap to open</Text>
                    </View>
                </View>
                <View
                    style={{
                        paddingTop: size.getHeightSize(32),
                        alignItems: "flex-start",
                    }}
                >
                    <Text style={styles.featureText}>
                        Convert your NGN, USD and GM coupons
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    featureCard: {
        backgroundColor: "#F7F7F7",
        borderRadius: 15,
        paddingVertical: size.getHeightSize(12),
        paddingHorizontal: size.getWidthSize(12),
        width: size.getWidthSize(160.5),
    },

    iconContainer: {
        backgroundColor: "#E0E0E0",
        borderRadius: 30,
        padding: 10,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
    },

    badge: {
        backgroundColor: "#E2E3E9",
        borderRadius: size.getWidthSize(8),
        paddingHorizontal: size.getWidthSize(4),
        height: size.getHeightSize(20),
        justifyContent: "center",
    },

    badgeText: {
        fontSize: size.fontSize(10),
        color: "#525466",
    },

    featureIcon: {
        height: size.getHeightSize(44),
        width: size.getHeightSize(44),
        padding: size.getHeightSize(12),
        borderRadius: size.getHeightSize(16),
        justifyContent: "center",
        alignItems: "center",
    },

    featureText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
    },
});
