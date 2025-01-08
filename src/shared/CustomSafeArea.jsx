import { StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CustomSafeArea = ({
  children,
  bottomSafeAreaInset,
  topColor,
  bgColor,
}) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: topColor ? topColor : "#161E64",
        paddingTop: top,
        paddingBottom: bottomSafeAreaInset ? bottom : 0,
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: bgColor ? bgColor : "#161E64", // Provide a fallback for the false case
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CustomSafeArea;

const styles = StyleSheet.create({});
