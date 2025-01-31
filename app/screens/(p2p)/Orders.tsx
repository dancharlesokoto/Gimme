import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import BackPage from "@/components/BackPage";
import { FlatList } from "react-native";
import { router, usePathname } from "expo-router";
import { Menu } from "react-native-paper";
import CustomRippleButton from "@/components/CustomRippleButton";

export default function Orders() {
  const [orderType, setOrderType] = useState("pending");

  const [currentFilter, setCurrentFilter] = useState<
    "all" | "verified" | "unverified"
  >("all");

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const [isFilterSelectorPopoverOpen, setIsFilterSelectorPopoverOpen] =
    useState(false);

  const pathname = usePathname();
  useEffect(() => {
    handleTouchEnd();
  }, []);

  const handleTouchEnd = () => {
    setIsFilterSelectorPopoverOpen(false);
    setIsOptionsOpen(false);
  };

  const OPTIONS_MENU = [
    {
      label: "Chats",
      value: "chats",
      url: "/screens/(p2p)/Chats",
    },
    {
      label: "My ads",
      value: "myads",
      url: "/screens/(p2p)/MyAds",
    },
    {
      label: "Disputes",
      value: "disputes",
    },
  ];

  const PENDING_DATA = [
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
  ];

  const COMPLETED_DATA = [
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

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <BackPage />
            <Text style={styles.pageName}>Orders</Text>
          </View>
          <View style={styles.right}>
            {/* popover for options */}
            <Menu
              elevation={0}
              contentStyle={styles.popover}
              anchorPosition="bottom"
              visible={isOptionsOpen} // Control visibility
              onDismiss={() => setIsOptionsOpen(false)} // Close menu when dismissed
              anchor={
                <CustomRippleButton
                  style={{ borderRadius: size.getWidthSize(8) }}
                  onPress={() => setIsOptionsOpen(true)}
                >
                  <Svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M12 5.25C11.175 5.25 10.5 5.925 10.5 6.75C10.5 7.575 11.175 8.25 12 8.25C12.825 8.25 13.5 7.575 13.5 6.75C13.5 5.925 12.825 5.25 12 5.25ZM12 15.75C11.175 15.75 10.5 16.425 10.5 17.25C10.5 18.075 11.175 18.75 12 18.75C12.825 18.75 13.5 18.075 13.5 17.25C13.5 16.425 12.825 15.75 12 15.75ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
                      fill="#525466"
                    />
                  </Svg>
                </CustomRippleButton>
              } // Anchor element
            >
              {OPTIONS_MENU.map((item: any, index) => (
                <TouchableHighlight
                  underlayColor="#F6F6FA"
                  key={index}
                  onPress={() => {
                    setIsOptionsOpen(false);
                    router.push(item.url);
                  }}
                  style={styles.popoverItem}
                >
                  <Text style={styles.popoverText}>{item.label}</Text>
                </TouchableHighlight>
              ))}
            </Menu>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.menuBar}>
            <View style={styles.menuBarInner}>
              <Pressable
                onPress={() => setOrderType("pending")}
                style={[
                  styles.menuBarToggleBtn,
                  orderType === "pending" && styles.menuBarToggleBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.menuBarToggleText,
                    orderType !== "pending" && { color: "#868898" },
                  ]}
                >
                  Pending
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setOrderType("completed")}
                style={[
                  styles.menuBarToggleBtn,
                  orderType === "completed" && styles.menuBarToggleBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.menuBarToggleText,
                    orderType !== "completed" && { color: "#868898" },
                  ]}
                >
                  Completed
                </Text>
              </Pressable>
            </View>

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

          <View onTouchEnd={handleTouchEnd} style={{ height: "100%" }}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              onScroll={handleTouchEnd}
              data={orderType === "completed" ? COMPLETED_DATA : PENDING_DATA}
              contentContainerStyle={{
                gap: size.getHeightSize(16),
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
                        {item.transactionCount} transactions .{" "}
                        {item.completionRate} completion rate
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
                        {orderType === "pending" ? " GM" : " NGN"}
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
                      onPress={() =>
                        router.push("/screens/(p2p)/ChatConversation")
                      }
                      style={{
                        width: size.getWidthSize(103),
                        height: size.getHeightSize(32),
                        borderRadius: size.getWidthSize(8),
                        padding: size.getWidthSize(6),
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: size.getWidthSize(1),
                        borderColor: "#E2E3E9",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Satoshi-Medium",
                          fontSize: size.fontSize(12),
                          color: "#525466",
                        }}
                      >
                        Chat
                      </Text>
                    </Pressable>
                  </View>
                  {/* end */}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(14),
  },

  left: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  right: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  pageName: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  content: {
    flex: 1,
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),
    paddingBottom: size.getHeightSize(100),
  },

  menuBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: size.getWidthSize(16),
    position: "relative",
  },

  menuBarInner: {
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

  menuBarToggleBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(4),
    borderRadius: size.getWidthSize(6),
  },

  menuBarToggleBtnActive: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#0000001A",
  },

  menuBarToggleText: {
    color: "#0A0B14",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(14),
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

  activeButton: {
    backgroundColor: "#374BFB",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  activeButtonText: {
    color: "#FFFFFF",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },

  inactiveButton: {
    backgroundColor: "#F6F6FA",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveButtonText: {
    color: "#CDCED5",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },
});
