import { size } from "@/config/size";
import React from "react";
import { ActivityIndicator } from "react-native";
import { View } from "react-native";

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
            <ActivityIndicator size="large" color="#374BFB" />
        </View>
    );
}
