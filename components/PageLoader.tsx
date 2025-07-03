import { size } from "@/config/size";
import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PageLoader() {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
            }}
        >
            <ActivityIndicator
                style={{
                    marginTop: -size.getHeightSize(insets.top),
                }}
                size="large"
                color="#374BFB"
            />
        </View>
    );
}
