import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import { size } from "../config/size";

const DATA = [
  {
    id: "1",
    name: "Natalia Na...",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  {
    id: "2",
    name: "James brown",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  {
    id: "3",
    name: "Sophia willi...",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  {
    id: "4",
    name: "Arthur taylor",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  {
    id: "5",
    name: "Arthur taylor",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  {
    id: "6",
    name: "Arthur taylor",
    image: require("../../assets/user.png"), // Replace with actual path to image
  },
  // Add more items as needed
];

export default function QuickPayments() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quick payments</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={styles.avatarContainer}>
            <Image source={item.image} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: size.getHeightSize(24),
    paddingLeft: size.getWidthSize(24),
  },
  title: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Regular",
    marginBottom: 10,
  },

  avatarContainer: {
    marginRight: size.getWidthSize(16),
  },
  avatar: {
    width: size.getWidthSize(72),
    height: size.getHeightSize(72),
    borderRadius: 30,
  },
  name: {
    marginTop: size.getHeightSize(4),
    fontSize: size.fontSize(11),
    fontFamily: "Satoshi-Medium",
  },
});
