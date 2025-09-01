import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { size } from "@/config/size";
import { StyleSheet } from "react-native";

const RadioButton = React.memo(
    ({ status, onPress }: { status?: string; onPress?: () => void }) => {
        return (
            <TouchableOpacity
                hitSlop={10}
                style={styles.container}
                onPress={onPress}
            >
                <View
                    style={[
                        styles.inner,
                        status === "checked" && { backgroundColor: "#3366ff" },
                    ]}
                ></View>
            </TouchableOpacity>
        );
    }
);

const styles = StyleSheet.create({
    container: {
        width: size.getWidthSize(22),
        height: size.getHeightSize(22),
        borderWidth: size.getWidthSize(1),
        borderColor: "#E2E3E9", //"#3366FF",
        borderRadius: size.getWidthSize(5),
        justifyContent: "center",
        alignItems: "center",
    },

    inner: {
        width: size.getWidthSize(12),
        height: size.getHeightSize(12),
        borderRadius: size.getWidthSize(4),
    },
});

export default RadioButton;
