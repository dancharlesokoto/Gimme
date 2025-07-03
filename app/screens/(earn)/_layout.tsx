import React from "react";
import { Stack } from "expo-router";

export default function EarnLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="Rewards"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
        </Stack>
    );
}
