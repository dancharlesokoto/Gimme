import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { size } from "@/config/size";

export default function CreateAdProgress({ step = 1 }: { step?: number }) {
  return (
    <View style={styles.stepProgressContainer}>
      <View
        style={[
          styles.stepProgressBar,
          step >= 1 && styles.activeStepProgressBar,
        ]}
      ></View>
      <View
        style={[
          styles.stepProgressBar,
          step >= 2 && styles.activeStepProgressBar,
        ]}
      ></View>
      <View
        style={[
          styles.stepProgressBar,
          step >= 3 && styles.activeStepProgressBar,
        ]}
      ></View>
      <View
        style={[
          styles.stepProgressBar,
          step === 4 && styles.activeStepProgressBar,
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  stepProgressContainer: {
    paddingVertical: size.getHeightSize(16),
    flexDirection: "row",
    gap: size.getWidthSize(2),
  },

  stepProgressBar: {
    flex: 1,
    height: size.getHeightSize(8),
    borderRadius: size.getWidthSize(8),
    backgroundColor: "#E2E2E9",
  },

  activeStepProgressBar: {
    flex: 1,
    height: size.getHeightSize(8),
    borderRadius: size.getWidthSize(8),
    backgroundColor: "#38C78B",
  },
});
