import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  Image,
} from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function CreateAdStepFour() {
  return (
    <View>
      <Text style={styles.progressType}>Ad preview</Text>
      <View style={styles.innerSection}>
        <View style={styles.itemCard}>
          <View style={styles.merchantInfo}>
            <Image
              style={{
                width: size.getWidthSize(40),
                height: size.getHeightSize(40),
                objectFit: "cover",
                borderRadius: 1000,
              }}
              source={require("@/assets/images/avatar-1.png")}
              alt=""
            />

            <View>
              <Text
                style={{
                  fontSize: size.fontSize(14),
                  fontFamily: "Satoshi-Medium",
                  color: "#0A0B14",
                  lineHeight: size.getHeightSize(24),
                }}
              >
                Angela Jolie
              </Text>
              <Text
                style={{
                  fontSize: size.fontSize(12),
                  fontFamily: "Satoshi-Regular",
                  color: "#525466",
                  lineHeight: size.getHeightSize(14),
                }}
              >
                59 transactions . 80% completion rate
              </Text>
            </View>
          </View>

          <View style={styles.orderInfo}>
            <Text
              style={{
                fontSize: size.fontSize(12),
                fontFamily: "Satoshi-Regular",
                color: "#525466",
              }}
            >
              Available{" "}
              <Text style={{ fontFamily: "Satoshi-Bold" }}>100 GM</Text>
            </Text>
            <Text
              style={{
                fontSize: size.fontSize(12),
                fontFamily: "Satoshi-Regular",
                color: "#525466",
              }}
            >
              Order limit{" "}
              <Text style={{ fontFamily: "Satoshi-Bold" }}>
                NGN5,000 - NGN10,000
              </Text>
            </Text>
          </View>

          <View style={styles.actionInfo}>
            <Text
              style={{
                fontSize: size.fontSize(16),
                fontFamily: "Satoshi-Bold",
                color: "#0A0B14",
              }}
            >
              NGN100
            </Text>
            <Pressable
              style={{
                width: size.getWidthSize(103),
                height: size.getHeightSize(32),
                borderRadius: size.getWidthSize(8),
                padding: size.getWidthSize(6),
                backgroundColor: "#38C78B",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Satoshi-Medium",
                  fontSize: size.fontSize(12),
                  color: "#fff",
                }}
              >
                Buy
              </Text>
            </Pressable>
          </View>
        </View>
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

  itemCard: {
    borderWidth: 1,
    borderColor: "#E2E3E9",
    gap: size.getHeightSize(16),
    borderRadius: size.getWidthSize(12),
    padding: size.getWidthSize(16),
  },

  merchantInfo: {
    flexDirection: "row",
    paddingVertical: size.getHeightSize(8),
    gap: size.getWidthSize(12),
    alignItems: "center",
  },

  orderInfo: {
    gap: size.getWidthSize(8),
  },

  actionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
