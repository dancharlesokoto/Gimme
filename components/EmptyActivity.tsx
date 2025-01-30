import { View, Text, Image } from "react-native";
import React from "react";
import noTxn from "@/assets/images/noTxn.png";
import { size } from "@/config/size";

export default function EmptyActivity() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: size.getHeightSize(24),
      }}
    >
      <Image
        source={noTxn}
        style={{
          width: size.getWidthSize(100),
          height: size.getHeightSize(100),
        }}
      />

      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: size.fontSize(14),
          color: "#868898",
        }}
      >
        No transaction or activities yet.
      </Text>
    </View>
  );
}
