import React from "react";
import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="main"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="Signup"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="Verify"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="SetPin"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="ConfirmPin"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="EnterPin"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
