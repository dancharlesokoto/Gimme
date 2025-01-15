import React from "react";
import { Stack } from "expo-router";

export default function WithdrawLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Send"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="SendToUsers"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="OfflineCredit"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="EnterAmount"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="EnterPin"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
