import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import EmptyAdSvg from "@/assets/svg/emptyAd.svg";
import { size } from "@/config/size";
import { router } from "expo-router";

export default function EmptyAd() {
  return (
    <View style={styles.emptyAdsContainer}>
      <EmptyAdSvg />
      <Text
        style={{
          fontFamily: "Satoshi-Bold",
          color: "#0A0B14",
          fontSize: size.fontSize(16),
        }}
      >
        You have no Ad
      </Text>
      <Text
        style={{
          color: "#525466",
          fontSize: size.fontSize(14),
          fontFamily: "Satoshi-Regular",
        }}
      >
        Start buy creating an Ad for either a Sell or a Buy
      </Text>
      <Pressable
        onPress={() => router.push("/screens/(p2p)/CreateAd")}
        style={{
          paddingHorizontal: size.getWidthSize(16),
          paddingVertical: size.getHeightSize(16),
          borderRadius: size.getWidthSize(16),
          backgroundColor: "#374BFB",
        }}
      >
        <Text
          style={{
            fontFamily: "Satoshi-Bold",
            fontSize: size.fontSize(18),
            color: "#FFFFFF",
          }}
        >
          Create Ad
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyAdsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: size.getHeightSize(24),
    gap: size.getWidthSize(16),
  },
});
