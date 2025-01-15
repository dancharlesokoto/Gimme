import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";

export default function P2PMarket() {
  const DATA = [
    {
      id: "1",
      name: "Natalia Natasha",
      image: require("@/assets/images/avatar-1.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 59,
      completionRate: "80%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
    {
      id: "2",
      name: "James brown",
      image: require("@/assets/images/avatar-2.png"), // Replace with actual path to image
      price: 110,
      transactionCount: 87,
      completionRate: "70%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
    {
      id: "3",
      name: "Sophia willis",
      image: require("@/assets/images/userAvatar.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 167,
      completionRate: "90%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
    {
      id: "4",
      name: "Natalia Natasha",
      image: require("@/assets/images/avatar-1.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 59,
      completionRate: "80%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
    {
      id: "5",
      name: "James brown",
      image: require("@/assets/images/avatar-2.png"), // Replace with actual path to image
      price: 110,
      transactionCount: 87,
      completionRate: "70%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
    {
      id: "6",
      name: "Sophia willis",
      image: require("@/assets/images/userAvatar.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 167,
      completionRate: "90%",
      availableTokens: 100,
      minOrder: 5000,
      maxOrder: 20000,
    },
  ];

  const [P2PType, setP2PType] = useState<"buy" | "sell">("buy");
  return (
    <View>
      <View style={styles.menuBar}>
        <View style={styles.P2PTypeSelector}>
          <Pressable
            onPress={() => setP2PType("buy")}
            style={[styles.typeItem, P2PType === "buy" && styles.activeType]}
          >
            <Text
              style={[
                styles.typeText,
                P2PType === "buy" && styles.activeTypeText,
              ]}
            >
              Buy
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setP2PType("sell")}
            style={[styles.typeItem, P2PType === "sell" && styles.activeType]}
          >
            <Text
              style={[
                styles.typeText,
                P2PType === "sell" && styles.activeTypeText,
              ]}
            >
              Sell
            </Text>
          </Pressable>
        </View>

        <View style={styles.assetSelector}>
          <Text
            style={{
              fontSize: size.fontSize(14),
              fontFamily: "Satoshi-Regular",
              color: "#525466",
            }}
          >
            Cash
          </Text>
          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10.0001 11.3785L13.7126 7.66602L14.7731 8.72652L10.0001 13.4995L5.22705 8.72652L6.28755 7.66602L10.0001 11.3785Z"
              fill="#868898"
            />
          </Svg>
        </View>

        <View style={styles.filterSelector}>
          <Svg
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M8.5 15H11.5V13.5H8.5V15ZM3.25 6V7.5H16.75V6H3.25ZM5.5 11.25H14.5V9.75H5.5V11.25Z"
              fill="#525466"
            />
          </Svg>

          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M10.0001 11.3785L13.7126 7.66602L14.7731 8.72652L10.0001 13.4995L5.22705 8.72652L6.28755 7.66602L10.0001 11.3785Z"
              fill="#868898"
            />
          </Svg>
        </View>
      </View>

      <FlatList
        data={DATA}
        contentContainerStyle={{
          gap: size.getHeightSize(16),
          paddingBottom: size.getHeightSize(200),
        }}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.merchantInfo}>
              <Image
                style={{
                  width: size.getWidthSize(40),
                  height: size.getHeightSize(40),
                  objectFit: "cover",
                  borderRadius: 1000,
                }}
                source={item.image}
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
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: size.fontSize(12),
                    fontFamily: "Satoshi-Regular",
                    color: "#525466",
                    lineHeight: size.getHeightSize(14),
                  }}
                >
                  {item.transactionCount} transactions . {item.completionRate}{" "}
                  completion rate
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
                <Text style={{ fontFamily: "Satoshi-Bold" }}>
                  {item.availableTokens}GM
                </Text>
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
                  {item.minOrder.toLocaleString()} -{" "}
                  {item.maxOrder.toLocaleString()}
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
                NGN{item.price}
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
            {/* end */}
          </View>
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menuBar: {
    paddingVertical: size.getHeightSize(24),
    flexDirection: "row",
    gap: size.getWidthSize(10),
  },

  P2PTypeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: size.getWidthSize(160),
    height: size.getHeightSize(40),
    gap: size.getWidthSize(10),
    paddingHorizontal: size.getWidthSize(7),
    paddingVertical: size.getHeightSize(7),
    backgroundColor: "#F6F6FA",
    borderRadius: size.getWidthSize(10),
  },

  typeItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: size.getWidthSize(6),
  },

  activeType: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0000001A",
  },

  typeText: {
    color: "#868898",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(14),
  },

  activeTypeText: {
    color: "#0A0B14",
  },

  assetSelector: {
    flex: 1,
    gap: size.getWidthSize(5),
    height: size.getHeightSize(40),
    flexDirection: "row",
    borderRadius: size.getWidthSize(12),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2E3E9",
    paddingHorizontal: size.getWidthSize(16),
  },

  filterSelector: {
    flex: 1,
    gap: size.getWidthSize(5),
    height: size.getHeightSize(40),
    flexDirection: "row",
    borderRadius: size.getWidthSize(12),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#E2E3E9",
    padding: size.getWidthSize(10),
  },

  mainSection: { flex: 1 },

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
