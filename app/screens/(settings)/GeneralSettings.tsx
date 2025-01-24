import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";

export default function GeneralSettings() {
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <GenericHeader title="General settings" />
      </ScrollView>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },
});
