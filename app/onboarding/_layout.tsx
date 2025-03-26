import React from "react";
import { Redirect, Stack } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function OnboardingLayout() {
  const { user } = useUserStore();
  if (user.userId) {
    if (user.isVerified) return <Redirect href="/(tabs)" />;
    return <Redirect href="/onboarding/Verify" />;
  }
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
