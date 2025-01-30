import { View, Text, Pressable } from "react-native";
import React from "react";
import { size } from "@/config/size";
import SelectorIcon from "@/assets/svg/selectorIcon.svg";
import ActiveSelectorIcon from "@/assets/svg/activeSelectorIcon.svg";

export default function CustomRadioButton({
  value,
  label,
  onSelect,
  active,
}: {
  value: string;
  label: string;
  onSelect: (value: string) => void;
  active: boolean;
}) {
  const handleClick = () => {
    onSelect(value);
  };
  return (
    <Pressable
      hitSlop={size.getWidthSize(5)}
      onPress={handleClick}
      style={{
        flexDirection: "row",
        alignSelf: "flex-start",
        alignItems: "center",
        gap: size.getWidthSize(8),
      }}
    >
      {active ? <ActiveSelectorIcon /> : <SelectorIcon />}
      <Text
        style={{
          fontFamily: active ? "Satoshi-Bold" : "Satoshi-Regular",
          fontSize: size.fontSize(14),
          color: "#0A0B14",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
