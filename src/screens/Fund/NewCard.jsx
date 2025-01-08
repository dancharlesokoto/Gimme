import React, { useState } from "react";
import CustomSafeArea from "../../shared/CustomSafeArea";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { size } from "../../config/size";
import { Svg, Path } from "react-native-svg";
import Img from "../../../assets/receipt.png";
import { useNavigation } from "@react-navigation/native";

const NewCard = () => {
  const navigation = useNavigation();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View
          style={{
            marginTop: size.getHeightSize(181),
            alignItems: "center",
          }}
        >
          <View style={styles.check}>
            <Svg
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M14.0997 19.8064L25.1301 8.77478L26.8281 10.4716L14.0997 23.2L6.46289 15.5632L8.15969 13.8664L14.0997 19.8064Z"
                fill="#38C793"
              />
            </Svg>
          </View>
          <Text style={styles.success}>New card added </Text>
        </View>
        <View style={{ marginTop: size.getHeightSize(397) }}>
          <Pressable
            onPress={() => navigation.navigate("FundCard")}
            style={{
              backgroundColor: "#374BFB",
              height: size.getHeightSize(56),
              borderRadius: size.getHeightSize(16),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: size.fontSize(18),
                fontFamily: "Satoshi-Bold",
                color: "#ffffff",
                marginLeft: size.getWidthSize(10),
              }}
            >
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  check: {
    borderWidth: 1,
    borderColor: "#E2E4E9",
    width: size.getWidthSize(64),
    height: size.getWidthSize(64),
    borderRadius: size.getWidthSize(96),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
  },
  success: {
    fontSize: size.fontSize(16),
    color: "#000000",
    marginTop: size.getHeightSize(16),
    fontFamily: "Satoshi-Bold",
  },
});

export default NewCard;
