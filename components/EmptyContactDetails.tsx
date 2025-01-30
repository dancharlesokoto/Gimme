import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Icon from "@/assets/svg/emptyContactDetails.svg";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function EmptyContactDetails() {
  return (
    <View style={styles.container}>
      <Icon />
      <Text
        style={{
          fontFamily: "Satoshi-Regular",
          fontSize: size.fontSize(14),
          color: "#0A0B14",
        }}
      >
        You have no contact information for delivery
      </Text>
      <Pressable
        onPress={() => router.push("/screens/(market)/AddContactDetails")}
        style={{
          backgroundColor: "#374BFB",
          height: size.getHeightSize(44),
          borderRadius: size.getWidthSize(12),
          flexDirection: "row",
          gap: size.getWidthSize(4),
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: size.getWidthSize(12),
        }}
      >
        <Svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          // xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
            fill="white"
          />
        </Svg>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: size.fontSize(12),
            fontFamily: "Satoshi-Medium",
          }}
        >
          Add contact details
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: size.getHeightSize(24),
    paddingHorizontal: size.getWidthSize(16),
    borderWidth: size.getWidthSize(1),
    borderColor: "#F6F6FA",
    borderRadius: size.getWidthSize(16),
    gap: size.getHeightSize(12),
    backgroundColor: "#F6F6FA",
    alignItems: "center",
  },
});
