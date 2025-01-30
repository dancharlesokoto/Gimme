import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import { size } from "@/config/size";
import { Image } from "expo-image";
import { router } from "expo-router";

export default function MarketPlaceCategories() {
  const CATEGORIES_DATA = [
    {
      id: "1",
      name: "Food",
      icon: require("@/assets/images/foodCat.png"),
    },
    {
      id: "2",
      name: "Gadgets",
      icon: require("@/assets/images/gadgetCat.png"),
    },
    {
      id: "3",
      name: "Fashion",
      icon: require("@/assets/images/fashionCat.png"),
    },
    {
      id: "4",
      name: "Appliance",
      icon: require("@/assets/images/gadgetCat.png"),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        gap: size.getHeightSize(16),
        paddingLeft: size.getWidthSize(24),
        paddingBottom: size.getHeightSize(24),
      }}
    >
      <Text
        style={{
          color: "#0A0B14",
          fontFamily: "Satoshi-Bold",
          fontSize: size.fontSize(16),
        }}
      >
        Categories
      </Text>
      <FlatList
        data={CATEGORIES_DATA}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: size.getHeightSize(16),
        }}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/screens/(market)/CategoryItem",
                params: {
                  name: item.name,
                  categoryId: item.id,
                },
              })
            }
            style={{
              width: size.getWidthSize(87),
              paddingVertical: size.getHeightSize(12),
              paddingHorizontal: size.getWidthSize(12),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F6F6FA",
              borderRadius: size.getWidthSize(16),
              gap: size.getWidthSize(8),
            }}
          >
            <Image
              source={item.icon}
              contentFit="cover"
              style={{
                width: size.getWidthSize(44),
                height: size.getWidthSize(44),
              }}
              alt=""
            />
            <Text
              style={{
                color: "#0A0B14",
                fontSize: size.fontSize(12),
                fontFamily: "Satoshi-Medium",
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
