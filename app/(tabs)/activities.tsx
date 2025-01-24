import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";

export default function Activities() {
  const [currentFilter, setCurrentFilter] = useState<
    "sending" | "receiving" | any
  >("sending");

  const FILTER_DATA = [
    { label: "Sending", value: "sending" },
    { label: "Receiving", value: "receiving" },
    { label: "Receiving", value: "receiving" },
    { label: "Receiving", value: "receiving" },

    { label: "Receiving", value: "receiving" },
  ];

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <Text style={styles.pageName}>Activities</Text>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.menuBar}>
            <View style={styles.menuBarInner}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={FILTER_DATA}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => setCurrentFilter(item.value)}
                    style={[
                      styles.menuBarToggleBtn,
                      currentFilter === item.value &&
                        styles.menuBarToggleBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.menuBarToggleText,
                        currentFilter !== item.value && { color: "#868898" },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
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
    width: "100%",
    flexDirection: "row",
    gap: size.getWidthSize(16),
    position: "relative",
  },

  menuBarInner: {
    width: "100%",
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
  },

  menuBarToggleBtnActive: {
    flex: 1,
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
