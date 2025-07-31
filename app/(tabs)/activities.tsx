import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import EmptyActivity from "@/components/EmptyActivity";

export default function Activities() {
    const [currentFilter, setCurrentFilter] = useState<
        "sending" | "receiving" | any
    >("sending");

    const FILTER_DATA = [
        { label: "Sending", value: "sending" },
        { label: "Receiving", value: "receiving" },
        { label: "Withdraw", value: "withdraw" },
        { label: "Funding", value: "funding" },
        { label: "P2P", value: "p2p" },
    ];

    return (
        <CustomSafeArea
            topColor="#ffffff"
            bgColor="#ffffff"
            setBottomSafeAreaInset={false}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.left}>
                        <Text style={styles.pageName}>Activities</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarInner}>
                            {FILTER_DATA.map((item: any, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => setCurrentFilter(item.value)}
                                    style={[
                                        styles.menuBarToggleBtn,
                                        currentFilter === item.value &&
                                            styles.menuBarToggleBtnActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.menuBarToggleText,
                                            currentFilter !== item.value && {
                                                color: "#868898",
                                            },
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    <EmptyActivity />
                </View>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: size.getHeightSize(14),
    },

    left: {
        flexDirection: "row",
        gap: size.getWidthSize(16),
        alignItems: "center",
    },

    right: {
        flexDirection: "row",
        gap: size.getWidthSize(16),
        alignItems: "center",
    },

    pageName: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    content: {
        flex: 1,
        paddingVertical: size.getHeightSize(24),
        gap: size.getHeightSize(24),
        paddingBottom: size.getHeightSize(100),
    },

    menuBar: {
        gap: size.getWidthSize(16),
    },

    menuBarInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: size.getWidthSize(6),
        paddingVertical: size.getHeightSize(4),
        backgroundColor: "#F6F6FA",
        borderRadius: size.getWidthSize(10),
    },

    menuBarToggleBtn: {
        paddingVertical: size.getHeightSize(6),
        paddingHorizontal: size.getWidthSize(6),
        borderRadius: size.getWidthSize(6),
        justifyContent: "center",
        alignItems: "center",
    },

    menuBarToggleBtnActive: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#0000001A",
    },

    menuBarToggleText: {
        color: "#0A0B14",
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
    },
});
