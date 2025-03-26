import React from "react";
import { Pressable, Text } from "react-native";
import { size } from "../config/size";

const Button = ({
  width,
  text,
  disabled,
  onPress,
}: {
  width: number;
  text: string | React.ReactNode;
  disabled?: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: "#374BFB",
        height: size.getHeightSize(56),
        width: size.getWidthSize(width),
        borderRadius: size.getWidthSize(16),
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: size.fontSize(18),
          fontFamily: "Satoshi-Bold",
          color: "#ffffff",
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
