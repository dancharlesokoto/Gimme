import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useUserStore } from "@/store/userStore";
import useSessionTimeout from "@/hooks/useSessionTimeout";

export default function ScreensLayout() {
    const { isStale } = useSessionTimeout();

    if (isStale) {
        return <Redirect href="/onboarding/ReEnterPin" />;
    }
    return (
        <Stack>
            <Stack.Screen
                name="(fund)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="(withdraw)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="(market)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            {/* <Stack.Screen
                name="(p2p)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            /> */}
            <Stack.Screen
                name="(send)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="(settings)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="(earn)"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="Receipt"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
            <Stack.Screen
                name="Notifications"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />

            <Stack.Screen
                name="QrScanner"
                options={{ headerShown: false, animation: "ios_from_right" }}
            />
        </Stack>
    );
}
