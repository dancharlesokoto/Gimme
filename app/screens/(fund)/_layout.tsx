import React from "react";
import { Stack } from "expo-router";

export default function FundLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="FundWallet"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="FundWithCard"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="FundWithAirtime"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="FundWithData"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="AddCard"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
