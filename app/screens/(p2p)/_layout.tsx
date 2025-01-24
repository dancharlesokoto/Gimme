import React from "react";
import { Stack } from "expo-router";

export default function p2pLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Orders"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="BuyOrder"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="ProcessBuyOrder"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="SellOrder"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="ProcessSellOrder"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="MyAds"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />

      <Stack.Screen
        name="CreateAd"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
