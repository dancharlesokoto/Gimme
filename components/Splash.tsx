import { View, Text, Image } from "react-native";
import React from "react";
import SplashIcon from "@/assets/images/splash.png";
import { size } from "@/config/size";

export default function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#374BFB",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={SplashIcon}
        style={{
          width: size.getWidthSize(100),
          height: size.getHeightSize(100),
          objectFit: "contain",
        }}
      />
    </View>
  );
}
