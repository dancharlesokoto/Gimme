import React from "react";
import { Stack } from "expo-router";

export default function WithdrawLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Withdraw"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="AddBank"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="GetCash"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="GetAirtime"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="GetData"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
