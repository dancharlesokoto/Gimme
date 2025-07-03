import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import EmptyNotificationsIcon from "@/assets/svg/emptyNotifications.svg";

export default function Notfications() {
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <GenericHeader title="Notifications"></GenericHeader>
                <ScrollView contentContainerStyle={styles.page}>
                    <EmptyNotificationsIcon />
                    <Text
                        style={{
                            fontFamily: "Satoshi-Regular",
                            fontSize: size.fontSize(14),
                            lineHeight: size.getHeightSize(20),
                            color: "#525466",
                        }}
                    >
                        You have no notification
                    </Text>
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    page: {
        gap: size.getHeightSize(12),
        paddingVertical: size.getHeightSize(24),
        justifyContent: "center",
        alignItems: "center",
    },
});
