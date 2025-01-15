import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BackPage from "./BackPage";
import { size } from "@/config/size";
import Country from "./Country";

const GenericHeader = ({
  title,
  showCountry = false,
}: {
  title: string;
  showCountry?: boolean;
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.left}>
        <BackPage />
        <Text style={styles.pageName}>{title}</Text>
      </View>

      {showCountry && (
        <View style={styles.right}>
          <Country />
        </View>
      )}
    </View>
  );
};

export default GenericHeader;

const styles = StyleSheet.create({
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
});
