import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackPage from "./BackPage";
import { size } from "@/config/size";
import CurrencyToggle from "./Home/CurrencyToggle";
import CurrencyDisplay from "./Home/CurrencyDisplay";

const GenericHeader = ({
    title,
    showCountry = false,
    currency,
    showBackButton = true,
}: {
    title: string;
    showCountry?: boolean;
    currency?: string;
    showBackButton?: boolean;
}) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.left}>
                {showBackButton && <BackPage />}
                <Text style={styles.pageName}>{title}</Text>
            </View>

            {showCountry && (
                <View style={styles.right}>
                    <CurrencyToggle />
                </View>
            )}

            {currency && <CurrencyDisplay _currency={currency} />}
        </View>
    );
};

export default GenericHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: size.getHeightSize(70),
        // paddingVertical: size.getHeightSize(14),
    },

    left: {
        flex: 1,
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
        flex: 1,
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },
});
