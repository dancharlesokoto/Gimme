import { View, Text } from "react-native";
import React from "react";
import { size } from "@/config/size";
import { FlatList } from "react-native";

export default function SimilarProducts() {
  const SIMILAR_DATA = [
    {
      id: "1",
      name: "Nike",
      price: 30000,
    },
    {
      id: "2",
      name: "Nike",
      price: 30000,
    },
    {
      id: "3",
      name: "Nike",
      price: 30000,
    },
    {
      id: "4",
      name: "Nike",
      price: 30000,
    },
  ];
  return (
    <View
      style={{
        paddingLeft: size.getWidthSize(24),
        paddingVertical: size.getHeightSize(24),
        gap: size.getHeightSize(16),
      }}
    >
      <Text
        style={{
          color: "#0A0B14",
          fontFamily: "Satoshi-Bold",
          fontSize: size.fontSize(16),
        }}
      >
        Other similar products
      </Text>

      <FlatList
        contentContainerStyle={{ gap: size.getWidthSize(12) }}
        data={SIMILAR_DATA}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={() => (
          <View style={{ width: size.getWidthSize(160) }}>
            <View
              style={{
                height: size.getHeightSize(167),
                borderRadius: size.getWidthSize(16),
                backgroundColor: "#F6F6FA",
              }}
            ></View>
          </View>
        )}
      />
    </View>
  );
}
