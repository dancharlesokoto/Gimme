import { fonts } from "@/constants/Fonts";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import "@/global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Satoshi-Bold": fonts.BOLD,
    "Satoshi-Regular": fonts.REGULAR,
    "Satoshi-Medium": fonts.MEDIUM,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView>
        <PaperProvider>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen
                name="(tabs)"
                options={{ headerShown: false, animation: "ios_from_right" }}
              />
              <Stack.Screen
                name="onboarding"
                options={{ headerShown: false, animation: "ios_from_right" }}
              />
              <Stack.Screen
                name="screens"
                options={{ headerShown: false, animation: "ios_from_right" }}
              />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="dark" hidden />
          </BottomSheetModalProvider>
        </PaperProvider>
      </GestureHandlerRootView>
    </>
  );
}
