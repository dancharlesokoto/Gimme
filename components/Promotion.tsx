import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { size } from "../config/size";
import bg from "@/assets/images/bg.png";

const Promotion = () => {
  return (
    <ImageBackground source={bg} imageStyle={{ borderRadius: 16 }}>
      <View
        style={{
          paddingVertical: size.getHeightSize(24),
          paddingHorizontal: size.getWidthSize(24),
          borderRadius: 16,
        }}
      >
        <Text style={styles.promoText}>
          More features to coming soon to help you use micro transactions in
          more efficient ways.
        </Text>
        <Pressable
          style={[styles.mainButton, { marginTop: size.getHeightSize(8) }]}
        >
          <Text style={styles.mainButtonText}>Read about them</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    height: size.getHeightSize(40),
    width: size.getWidthSize(140),
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#E2E3E9",
    alignItems: "center",
    justifyContent: "center",
  },

  mainButtonText: {
    fontSize: size.fontSize(12),
    fontFamily: "Satoshi-Medium",
    color: "#525466",
  },

  promoText: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    lineHeight: size.getHeightSize(20),
    color: "#ffffff",
  },
});
export default Promotion;
