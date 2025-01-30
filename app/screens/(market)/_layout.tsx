import React from "react";
import { Stack } from "expo-router";

export default function MarketLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="Cart"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="AddContactDetails"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="CategoryItem"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="ProductItem"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}
