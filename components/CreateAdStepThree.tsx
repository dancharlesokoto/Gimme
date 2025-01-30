import { View, Text, StyleSheet, Platform, Pressable } from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";
import Svg, { G, Mask, Path } from "react-native-svg";
import ActiveSelectorIcon from "@/assets/svg/activeSelectorIcon.svg";

export default function CreateAdStepThree() {
  return (
    <View>
      <Text style={styles.progressType}>Payment method</Text>
      <View style={styles.innerSection}>
        <View
          className="SELECTOR LABEL"
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: size.fontSize(14),
              color: "#0A0B14",
            }}
          >
            Select main bank account
          </Text>
          <Pressable
            style={{
              borderRadius: size.getWidthSize(6),
              borderWidth: size.getWidthSize(1),
              borderColor: "#E2E3E9",
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
                d="M13.5677 3.2502L12.0677 4.7502H4.75V15.2502H15.25V7.93245L16.75 6.43245V16.0002C16.75 16.1991 16.671 16.3899 16.5303 16.5305C16.3897 16.6712 16.1989 16.7502 16 16.7502H4C3.80109 16.7502 3.61032 16.6712 3.46967 16.5305C3.32902 16.3899 3.25 16.1991 3.25 16.0002V4.0002C3.25 3.80128 3.32902 3.61052 3.46967 3.46987C3.61032 3.32921 3.80109 3.2502 4 3.2502H13.5677ZM16.3638 2.5752L17.425 3.6372L10.531 10.5312L9.472 10.5334L9.4705 9.4707L16.3638 2.5752Z"
                fill="#525466"
              />
            </Svg>
          </Pressable>
        </View>

        <View style={styles.optionsContainer}>
          <Pressable style={styles.option}>
            <View style={{ gap: size.getHeightSize(4) }}>
              <Text style={styles.optionText}>Access Bank</Text>
              <Text style={styles.optionSubText}>
                10130481945 . Jeremy Nkuku
              </Text>
            </View>
            <ActiveSelectorIcon />
          </Pressable>
        </View>
        {/* end */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressType: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(16),
    color: "#0A0B14",
  },

  innerSection: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(32),
  },

  optionsContainer: {
    gap: size.getHeightSize(24),
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: size.getWidthSize(12),
    borderWidth: size.getWidthSize(1),
    padding: size.getWidthSize(16),
    borderColor: "#374BFB",
  },

  optionText: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(16),
    color: "#0A0B14",
  },

  optionSubText: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(12),
    color: "#525466",
  },
});
