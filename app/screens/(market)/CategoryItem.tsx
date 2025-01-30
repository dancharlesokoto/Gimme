import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import MarketPlaceHeader from "@/components/MarketPlaceHeader";
import { useLocalSearchParams } from "expo-router";
import MarketPlaceCategoryItems from "@/components/MarketPlaceCategoryItems";

export default function CategoryItem() {
  const params = useLocalSearchParams();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <MarketPlaceHeader title={params.name} type="navigation" />
      <ScrollView>
        <View style={styles.container}>
          <MarketPlaceCategoryItems />
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: size.getHeightSize(24),
  },
});
