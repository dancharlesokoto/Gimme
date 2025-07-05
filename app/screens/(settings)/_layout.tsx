import React from "react";
import { Stack } from "expo-router";

export default function WithdrawLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="GeneralSettings"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="SecuritySettings"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="HelpAndSupport"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="AccountTier"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
        </Stack>
    );
}
