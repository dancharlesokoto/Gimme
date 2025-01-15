import React from "react";
import { Stack } from "expo-router";

export default function p2pLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="P2P"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
