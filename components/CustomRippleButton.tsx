import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";

export default function CustomRippleButton({
  children,
  onPress,
  rippleColor,
  rippleDuration = 400,
  style,
  contentContainerStyle,
  disabled,
}: {
  children: React.ReactNode;
  onPress?: () => void;
  rippleColor?: string;
  disabled?: boolean;
  rippleDuration?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable disabled={disabled} style={[style, { overflow: "hidden" }]}>
      <Ripple
        rippleDuration={rippleDuration}
        onPress={() => onPress && onPress()}
        rippleColor={rippleColor}
        style={contentContainerStyle}
      >
        {children}
      </Ripple>
    </Pressable>
  );
}
