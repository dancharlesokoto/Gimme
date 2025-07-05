import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";

export default function HelpAndSupport() {
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Help and support" />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View>
                    <Text style={styles.pageTitle}>App version</Text>
                    <Text style={styles.pageText}>Version 1.0.0</Text>
                </View>

                <View>
                    <Text style={styles.pageTitle}>Support</Text>
                    <Text style={styles.pageText}>
                        Need additional help or more inquires contact our help
                        lines{" "}
                        <Text style={{ color: "#374BFB" }}>
                            (+234 909 1224 234)
                        </Text>{" "}
                        or email us{" "}
                        <Text
                            style={{
                                color: "#374BFB",
                            }}
                        >
                            support@gimme.com
                        </Text>
                    </Text>
                </View>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: size.getWidthSize(24),
        gap: size.getHeightSize(24),
    },

    pageTitle: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(16),
        lineHeight: size.getHeightSize(24),
        color: "#0A0B14",
    },

    pageText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#525466",
    },
});
