import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import Svg, { Path } from "react-native-svg";
import { Link } from "expo-router";
import EmptyAd from "@/components/EmptyAd";

export default function MyAds() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [adType, setAdType] = useState<"sell" | "buy">("sell");
  const OPTIONS_MENU = [
    {
      label: "Chats",
      value: "chats",
    },
    {
      label: "My ads",
      value: "myads",
    },
    {
      label: "Disputes",
      value: "disputes",
    },
  ];

  const handleTouchEnd = () => {
    setIsOptionsOpen(false);
  };
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <BackPage />
            <Text style={styles.pageName}>My ads</Text>
          </View>
          <View style={styles.right}>
            <Pressable
              onPress={() => {
                setIsOptionsOpen(!isOptionsOpen);
              }}
            >
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                // xmlns="http:?//www.w3.org/2000/svg"
              >
                <Path
                  d="M12 5.25C11.175 5.25 10.5 5.925 10.5 6.75C10.5 7.575 11.175 8.25 12 8.25C12.825 8.25 13.5 7.575 13.5 6.75C13.5 5.925 12.825 5.25 12 5.25ZM12 15.75C11.175 15.75 10.5 16.425 10.5 17.25C10.5 18.075 11.175 18.75 12 18.75C12.825 18.75 13.5 18.075 13.5 17.25C13.5 16.425 12.825 15.75 12 15.75ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
                  fill="#525466"
                />
              </Svg>
            </Pressable>

            {/* popover for options */}
            <View
              style={[
                styles.popover,
                {
                  width: size.getWidthSize(150),
                  right: size.getWidthSize(5),
                },
                isOptionsOpen ? { display: "flex" } : { display: "none" },
              ]}
            >
              {OPTIONS_MENU.map((item: any, index) => (
                <Pressable style={styles.popoverItem} key={index}>
                  {item.url ? (
                    <Link href={item.url}>
                      <Text style={styles.popoverText}>{item.label}</Text>
                    </Link>
                  ) : (
                    <Text style={styles.popoverText}>{item.label}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          </View>
        </View>
        <View style={styles.content} onTouchEnd={handleTouchEnd}>
          <View style={styles.menuBar}>
            <View style={styles.menuBarInner}>
              <Pressable
                hitSlop={size.getWidthSize(20)}
                onPress={() => setAdType("sell")}
                style={[
                  styles.menuBarToggleBtn,
                  adType === "sell" && styles.menuBarToggleBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.menuBarToggleText,
                    adType === "buy" && { color: "#868898" },
                  ]}
                >
                  Sell
                </Text>
              </Pressable>
              <Pressable
                hitSlop={size.getWidthSize(20)}
                onPress={() => setAdType("buy")}
                style={[
                  styles.menuBarToggleBtn,
                  adType === "buy" && styles.menuBarToggleBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.menuBarToggleText,
                    adType === "sell" && { color: "#868898" },
                  ]}
                >
                  Buy
                </Text>
              </Pressable>
            </View>
          </View>
          <EmptyAd />
          {/* end */}
        </View>
        {/* end */}
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

  popover: {
    position: "absolute",
    top: size.getHeightSize(50),
    width: size.getWidthSize(195),
    zIndex: 100,
    backgroundColor: "#fff",
    borderRadius: size.getWidthSize(8),
    borderWidth: size.getWidthSize(0.6),
    gap: size.getWidthSize(4),
    borderColor: "#CDCED5",
    padding: size.getWidthSize(8),
    ...Platform.select({
      android: {
        elevation: 60,
        shadowColor: "#585C5F",
      },
      ios: {
        shadowColor: "#585C5F",
        shadowOffset: {
          width: 0,
          height: size.getHeightSize(16),
        },
        shadowRadius: 10,
      },
    }),
  },

  popoverItem: {
    borderRadius: size.getWidthSize(4),
    padding: size.getWidthSize(8),
  },

  popoverItemSelected: {
    backgroundColor: "#F6F6FA",
    borderRadius: size.getWidthSize(4),
    padding: size.getWidthSize(8),
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

  content: {
    height: "100%",
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),
    paddingBottom: size.getHeightSize(100),
  },

  menuBar: {
    flexDirection: "row",
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
    paddingHorizontal: size.getWidthSize(16),
    paddingVertical: size.getHeightSize(4),
    borderRadius: size.getWidthSize(6),
    alignItems: "center",
    justifyContent: "center",
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
});
