import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Country from "./Country";
import Svg, { Path } from "react-native-svg";
import { size } from "@/config/size";
import { router } from "expo-router";
import BackPage from "./BackPage";

export default function MarketPlaceHeader({
  title = "",
  type = "heading",
}: {
  title?: string | any;
  type?: "heading" | "navigation";
}) {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.left}>
        {type === "navigation" && <BackPage />}
        <Text style={styles.pageName}>{title}</Text>
      </View>

      <View style={styles.rightMenu}>
        <TouchableOpacity
          hitSlop={10}
          onPress={() => router.push("/screens/(market)/Cart")}
          style={{ position: "relative" }}
        >
          {/* order count */}
          <View
            style={{
              position: "absolute",
              width: size.getWidthSize(16),
              height: size.getWidthSize(16),
              backgroundColor: "#DF1C36",
              borderRadius: size.getWidthSize(100),
              justifyContent: "center",
              alignItems: "center",
              top: size.getHeightSize(-4),
              right: size.getWidthSize(-4),
              zIndex: 1,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: size.fontSize(10),
                fontFamily: "Satoshi-Medium",
              }}
            >
              1
            </Text>
          </View>
          <Svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M6 15V6H4.5V4.5H6.75C6.94891 4.5 7.13968 4.57902 7.28033 4.71967C7.42098 4.86032 7.5 5.05109 7.5 5.25V14.25H16.8285L18.3285 8.25H9V6.75H19.29C19.404 6.75 19.5165 6.776 19.619 6.826C19.7214 6.87601 19.8111 6.94871 19.8813 7.03859C19.9514 7.12847 20.0001 7.23315 20.0237 7.34468C20.0473 7.45622 20.0452 7.57166 20.0175 7.68225L18.1425 15.1823C18.1019 15.3444 18.0082 15.4884 17.8764 15.5913C17.7446 15.6941 17.5822 15.75 17.415 15.75H6.75C6.55109 15.75 6.36032 15.671 6.21967 15.5303C6.07902 15.3897 6 15.1989 6 15ZM7.5 20.25C7.10218 20.25 6.72064 20.092 6.43934 19.8107C6.15804 19.5294 6 19.1478 6 18.75C6 18.3522 6.15804 17.9706 6.43934 17.6893C6.72064 17.408 7.10218 17.25 7.5 17.25C7.89783 17.25 8.27936 17.408 8.56066 17.6893C8.84197 17.9706 9 18.3522 9 18.75C9 19.1478 8.84197 19.5294 8.56066 19.8107C8.27936 20.092 7.89783 20.25 7.5 20.25ZM16.5 20.25C16.1022 20.25 15.7206 20.092 15.4393 19.8107C15.158 19.5294 15 19.1478 15 18.75C15 18.3522 15.158 17.9706 15.4393 17.6893C15.7206 17.408 16.1022 17.25 16.5 17.25C16.8978 17.25 17.2794 17.408 17.5607 17.6893C17.842 17.9706 18 18.3522 18 18.75C18 19.1478 17.842 19.5294 17.5607 19.8107C17.2794 20.092 16.8978 20.25 16.5 20.25Z"
              fill="#525466"
            />
          </Svg>
        </TouchableOpacity>
        <Country />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: size.getHeightSize(14),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: size.getWidthSize(24),
  },

  pageName: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  left: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  rightMenu: {
    flexDirection: "row",
    gap: size.getWidthSize(24),
    alignItems: "center",
  },
});
