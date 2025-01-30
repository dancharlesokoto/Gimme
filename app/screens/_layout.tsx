import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function ScreensLayout() {
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
      <Stack.Screen
        name="(p2p)"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="(send)"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="(settings)"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="Receipt"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
