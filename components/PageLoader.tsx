import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function PageLoader() {
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
