import { View, Text, StyleProp, ViewStyle, TextStyle } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";

export default function CustomRippleButton({
  children,
  onPress,
  rippleColor,
  rippleDuration = 400,
  style,
  contentContainerStyle,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  rippleColor?: string;
  rippleDuration?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <View style={[style, { overflow: "hidden" }]}>
      <Ripple
        rippleDuration={rippleDuration}
        onPress={() => onPress && onPress()}
        rippleColor={rippleColor}
        style={contentContainerStyle}
      >
        {children}
      </Ripple>
    </View>
  );
}
