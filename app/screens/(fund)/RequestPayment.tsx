import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";

export default function RequestPayment() {
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
                <GenericHeader title="Request payment" />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            ></ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: size.getHeightSize(32),
        paddingHorizontal: size.getWidthSize(24),
    },
});
