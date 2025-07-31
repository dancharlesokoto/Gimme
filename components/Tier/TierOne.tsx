import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";

export default function TierOne() {
    return (
        <View
            style={{
                padding: size.getWidthSize(8),
                paddingTop: size.getHeightSize(16),
                borderRadius: size.getWidthSize(12),
                backgroundColor: "#F6F6FA",
                gap: size.getHeightSize(8),
            }}
        >
            <Text style={styles.pageTitle}>Tier progress</Text>
            <View style={styles.item}>
                <Text style={styles.pageTitle}>Tier 1</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: size.getWidthSize(8),
                    }}
                >
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="24" height="24" rx="12" fill="#EBEFFF" />
                        <Path
                            d="M8.625 12H15.375V9.75H13.125V7.5H8.625V12ZM7.5 12V6.93469C7.5 6.62531 7.75031 6.375 8.06025 6.375H13.6875L16.5 9.1875V12H17.625V13.125H6.375V12H7.5ZM6.9375 14.25H8.0625V17.625H6.9375V14.25ZM15.9375 14.25H17.0625V17.625H15.9375V14.25ZM13.6875 14.25H14.8125V17.625H13.6875V14.25ZM11.4375 14.25H12.5625V17.625H11.4375V14.25ZM9.1875 14.25H10.3125V17.625H9.1875V14.25Z"
                            fill="#2532A7"
                        />
                    </Svg>

                    <Text style={styles.pageText}>Provide you BVN</Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: size.getWidthSize(8),
                    }}
                >
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="24" height="24" rx="12" fill="#EBEFFF" />
                        <Path
                            d="M8.625 12H15.375V9.75H13.125V7.5H8.625V12ZM7.5 12V6.93469C7.5 6.62531 7.75031 6.375 8.06025 6.375H13.6875L16.5 9.1875V12H17.625V13.125H6.375V12H7.5ZM6.9375 14.25H8.0625V17.625H6.9375V14.25ZM15.9375 14.25H17.0625V17.625H15.9375V14.25ZM13.6875 14.25H14.8125V17.625H13.6875V14.25ZM11.4375 14.25H12.5625V17.625H11.4375V14.25ZM9.1875 14.25H10.3125V17.625H9.1875V14.25Z"
                            fill="#2532A7"
                        />
                    </Svg>
                    <Text style={styles.pageText}>Provide your NIN</Text>
                </View>
            </View>
            <View style={styles.item}>
                <Text style={styles.pageTitle}>Tier 1 benefits</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: size.getWidthSize(8),
                    }}
                >
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="24" height="24" rx="12" fill="#EBEFFF" />
                        <Path
                            d="M10.8752 13.7843L16.0457 8.61328L16.8416 9.40866L10.8752 15.3751L7.29541 11.7953L8.09079 11L10.8752 13.7843Z"
                            fill="#2532A7"
                        />
                    </Svg>
                    <Text style={styles.pageText}>
                        Daily transaction up to NGN 100,000
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: size.getWidthSize(8),
                    }}
                >
                    <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="24" height="24" rx="12" fill="#EBEFFF" />
                        <Path
                            d="M10.8752 13.7843L16.0457 8.61328L16.8416 9.40866L10.8752 15.3751L7.29541 11.7953L8.09079 11L10.8752 13.7843Z"
                            fill="#2532A7"
                        />
                    </Svg>
                    <Text style={styles.pageText}>
                        Have access to use our features
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageTitle: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#0A0B14",
    },

    pageText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(12),
        color: "#525466",
    },

    item: {
        borderRadius: size.getWidthSize(12),
        backgroundColor: "#FFFFFF",
        padding: size.getWidthSize(16),
        gap: size.getHeightSize(14),
    },
});
