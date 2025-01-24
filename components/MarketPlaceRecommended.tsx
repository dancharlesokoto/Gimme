import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { size } from "@/config/size";

export default function MarketPlaceRecommended() {
  const RECOMMENDED_DATA = [
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
    {
      id: "5",
      name: "Nike",
      price: 30000,
    },
    {
      id: "6",
      name: "Nike",
      price: 30000,
    },
    {
      id: "7",
      name: "Nike",
      price: 30000,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        gap: size.getHeightSize(16),
        paddingHorizontal: size.getWidthSize(24),
      }}
    >
      <Text
        style={{
          color: "#0A0B14",
          fontFamily: "Satoshi-Bold",
          fontSize: size.fontSize(16),
        }}
      >
        Recommeded
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          rowGap: size.getWidthSize(12),
          columnGap: size.getWidthSize(8),
        }}
      >
        {RECOMMENDED_DATA.map((item) => (
          <View
            key={item.id}
            style={{
              width: "48%",
              gap: size.getWidthSize(12),
            }}
          >
            <View
              style={{
                flex: 1,
                height: size.getHeightSize(167),
                backgroundColor: "#F6F6FA",
                paddingVertical: size.getHeightSize(12),
                paddingHorizontal: size.getWidthSize(12),
                borderRadius: size.getWidthSize(16),
              }}
            ></View>
            <View style={{ gap: size.getHeightSize(4) }}>
              <Text
                style={{
                  fontSize: size.fontSize(14),
                  color: "#000000",
                  fontFamily: "Satoshi-Medium",
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: size.fontSize(12),
                  color: "#868898",
                  fontFamily: "Satoshi-Regular",
                }}
              >
                NGN {item.price.toLocaleString()}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
