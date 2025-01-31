import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import { router, usePathname } from "expo-router";
import { Menu } from "react-native-paper";
import { TouchableHighlight } from "react-native";
import Popover from "react-native-popover-view";

export default function P2PMarket({ ...props }) {
  const BUY_DATA = [
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

  const SELL_DATA = [
    {
      id: "1",
      name: "James brown",
      image: require("@/assets/images/avatar-2.png"), // Replace with actual path to image
      price: 110,
      transactionCount: 87,
      completionRate: "70%",
      availableTokens: 80000,
      minOrder: 10,
      maxOrder: 200,
    },
    {
      id: "2",
      name: "Natalia Natasha",
      image: require("@/assets/images/avatar-1.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 59,
      completionRate: "80%",
      availableTokens: 800000,
      minOrder: 50,
      maxOrder: 2000,
    },
    {
      id: "3",
      name: "Sophia willis",
      image: require("@/assets/images/userAvatar.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 167,
      completionRate: "90%",
      availableTokens: 100,
      minOrder: 20,
      maxOrder: 200,
    },
    {
      id: "4",
      name: "Natalia Natasha",
      image: require("@/assets/images/avatar-1.png"), // Replace with actual path to image
      price: 100,
      transactionCount: 59,
      completionRate: "80%",
      availableTokens: 1000000,
      minOrder: 500,
      maxOrder: 20000,
    },
    {
      id: "5",
      name: "James brown",
      image: require("@/assets/images/avatar-2.png"), // Replace with actual path to image
      price: 110,
      transactionCount: 87,
      completionRate: "70%",
      availableTokens: 100000,
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
      availableTokens: 7000000,
      minOrder: 5000,
      maxOrder: 20000,
    },
  ];

  const [currentAsset, setCurrentAsset] = useState<"cash" | "airtime" | "data">(
    "cash"
  );

  const [currentFilter, setCurrentFilter] = useState<
    "all" | "verified" | "unverified"
  >("all");

  const [isFilterSelectorPopoverOpen, setIsFilterSelectorPopoverOpen] =
    useState(false);

  const [isAssetSelectorOpen, setIsAssetSelectorOpen] = useState(false);

  const ASSET_MENU = [
    {
      label: "Cash",
      value: "cash",
    },
    {
      label: "Airtime",
      value: "airtime",
    },
    {
      label: "Data",
      value: "data",
    },
  ];

  const FILTER_MENU = [
    {
      label: "All ads",
      value: "all",
    },
    {
      label: "Verified merchants",
      value: "verified",
    },
    {
      label: "Unverified merchants",
      value: "unverified",
    },
  ];

  const pathname = usePathname();
  useEffect(() => {
    handleTouchEnd();
  }, [pathname]);

  const handleTouchEnd = () => {
    setIsFilterSelectorPopoverOpen(false);
    setIsAssetSelectorOpen(false);
  };

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

        {/* popover for asset selector */}
        <Menu
          elevation={0}
          contentStyle={styles.popover}
          anchorPosition="bottom"
          visible={isAssetSelectorOpen} // Control visibility
          onDismiss={() => setIsAssetSelectorOpen(false)} // Close menu when dismissed
          anchor={
            <Pressable
              style={styles.assetSelector}
              onPress={() => {
                setIsAssetSelectorOpen(true);
              }}
            >
              <Text
                style={{
                  fontSize: size.fontSize(14),
                  fontFamily: "Satoshi-Regular",
                  color: "#525466",
                }}
              >
                {ASSET_MENU.find((item) => item.value === currentAsset)?.label}
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
            </Pressable>
          } // Anchor element
        >
          {ASSET_MENU.map((item: any, index) => (
            <TouchableHighlight
              underlayColor="#F6F6FA"
              key={index}
              onPress={() => {
                setIsAssetSelectorOpen(false);
                setCurrentAsset(item.value);
              }}
              style={
                currentAsset === item.value
                  ? styles.popoverItemSelected
                  : styles.popoverItem
              }
            >
              <Text
                style={
                  currentAsset === item.value
                    ? styles.popoverTextSelected
                    : styles.popoverText
                }
              >
                {item.label}
              </Text>
            </TouchableHighlight>
          ))}
        </Menu>

        {/* popover for filter selector */}
        <Menu
          elevation={0}
          contentStyle={styles.popover}
          anchorPosition="bottom"
          visible={isFilterSelectorPopoverOpen} // Control visibility
          onDismiss={() => setIsFilterSelectorPopoverOpen(false)} // Close menu when dismissed
          anchor={
            <Pressable
              style={styles.filterSelector}
              onPress={() => {
                setIsFilterSelectorPopoverOpen(true);
              }}
            >
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
            </Pressable>
          } // Anchor element
        >
          {FILTER_MENU.map((item: any, index) => (
            <TouchableHighlight
              underlayColor="#F6F6FA"
              key={index}
              onPress={() => {
                setIsFilterSelectorPopoverOpen(false);
                setCurrentFilter(item.value);
              }}
              style={
                currentFilter === item.value
                  ? styles.popoverItemSelected
                  : styles.popoverItem
              }
            >
              <Text
                style={
                  currentFilter === item.value
                    ? styles.popoverTextSelected
                    : styles.popoverText
                }
              >
                {item.label}
              </Text>
            </TouchableHighlight>
          ))}
        </Menu>
      </View>

      <FlatList
        onTouchEnd={handleTouchEnd}
        onScroll={handleTouchEnd}
        data={P2PType === "buy" ? BUY_DATA : SELL_DATA}
        contentContainerStyle={{
          gap: size.getHeightSize(16),
          paddingBottom: size.getHeightSize(300),
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
                  {item.availableTokens.toLocaleString()}
                  {P2PType === "buy" ? " GM" : " NGN"}
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
                onPress={() =>
                  router.push(
                    P2PType === "buy"
                      ? "/screens/(p2p)/BuyOrder"
                      : "/screens/(p2p)/SellOrder"
                  )
                }
              >
                <Text
                  style={{
                    fontFamily: "Satoshi-Medium",
                    fontSize: size.fontSize(12),
                    color: "#fff",
                  }}
                >
                  {P2PType === "buy" ? "Buy" : "Sell"}
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
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(24),
    flexDirection: "row",
    gap: size.getWidthSize(4),
    position: "relative",
  },

  P2PTypeSelector: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: size.getWidthSize(6),
    paddingVertical: size.getHeightSize(4),
    gap: size.getWidthSize(4),
    backgroundColor: "#F6F6FA",
    borderRadius: size.getWidthSize(10),
  },

  typeItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: size.getWidthSize(6),
    paddingHorizontal: size.getWidthSize(20),
    paddingVertical: size.getHeightSize(4),
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
    gap: size.getWidthSize(4),
    flexShrink: 1,
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

  popover: {
    width: size.getWidthSize(175),
    backgroundColor: "#FFFFFF",
    padding: size.getWidthSize(8),
    marginTop: size.getHeightSize(8),
    borderWidth: size.getWidthSize(1),
    gap: size.getHeightSize(4),
    borderColor: "#CDCED5",
    borderRadius: size.getWidthSize(8),
  },

  popoverItem: {
    borderRadius: size.getWidthSize(4),
    padding: size.getWidthSize(12),
  },

  popoverItemSelected: {
    backgroundColor: "#F6F6FA",
    borderRadius: size.getWidthSize(4),
    padding: size.getWidthSize(12),
  },

  popoverText: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Regular",
    color: "#0A0B14",
  },

  popoverTextSelected: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Bold",
    color: "#0A0B14",
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
