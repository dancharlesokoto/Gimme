import React from "react";
import CustomSafeArea from "../../shared/CustomSafeArea";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { size } from "../../config/size";
import { Svg, Path } from "react-native-svg";
import Img from "../../../assets/receipt.png";
import { useNavigation } from "@react-navigation/native";

const Receipt = () => {
  const navigation = useNavigation();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View
          style={{
            marginTop: size.getHeightSize(53),
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
                d="M14.1001 19.8065L25.1305 8.7749L26.8285 10.4717L14.1001 23.2001L6.46326 15.5633L8.16006 13.8665L14.1001 19.8065Z"
                fill="#38C793"
              />
            </Svg>
          </View>
          <Text style={styles.success}>Funded with NGN 49,500</Text>
        </View>
        <View style={styles.transaction}>
          <Text
            style={{
              fontFamily: "Satoshi-Bold",
              alignSelf: "center",
              fontSize: size.fontSize(16),
              marginBottom: size.getHeightSize(12),
            }}
          >
            Transaction receipt
          </Text>
          <View style={styles.line} />
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: size.getHeightSize(12),
            }}
          >
            <Text style={styles.convertText}>Transaction type</Text>
            <Text style={styles.convertAmount}>Funding</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: size.getHeightSize(12),
            }}
          >
            <Text style={styles.convertText}>You received</Text>
            <Text style={styles.convertAmount}>NGN 49,500</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: size.getHeightSize(12),
            }}
          >
            <Text style={styles.convertText}>Date</Text>
            <Text style={styles.convertAmount}>2024-07-29 08:30:21</Text>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: size.getHeightSize(12),
            }}
          >
            <Text style={styles.convertText}>Mode of payment</Text>
            <Text style={styles.convertAmount}>Airtime</Text>
          </View>
          <View style={styles.line} />
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginVertical: size.getHeightSize(12),
            }}
          >
            <Text style={styles.convertText}>Reference ID</Text>
            <Text style={styles.convertAmount}>2A9104841B9018910C</Text>
          </View>
        </View>
        <Image
          source={Img}
          style={{
            width: "100%",
          }}
        />
        <View style={{ marginTop: size.getHeightSize(48) }}>
          <Pressable
            // onPress={() => navigation.navigate("Receipt")}
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
              Download Receipt
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("HomeScreen")}
            style={{
              backgroundColor: "#F6F6FA",
              height: size.getHeightSize(56),
              borderRadius: size.getHeightSize(16),
              alignItems: "center",
              justifyContent: "center",
              marginTop: size.getHeightSize(12),
            }}
          >
            <Text
              style={{
                fontSize: size.fontSize(18),
                fontFamily: "Satoshi-Bold",
                color: "#525466",
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
  transaction: {
    marginTop: size.getHeightSize(48),
    backgroundColor: "#EFFAF5",
    borderWidth: 1,
    borderColor: "#CBF5E4",
    paddingHorizontal: size.getWidthSize(24),
    paddingVertical: size.getHeightSize(24),
    borderTopLeftRadius: size.getHeightSize(24),
    borderTopRightRadius: size.getHeightSize(24),
  },

  line: {
    height: 1,
    backgroundColor: "#0000001A",
    marginVertical: size.getHeightSize(12),
  },

  convertText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    lineHeight: 20,
    color: "#525466",
  },

  convertAmount: {
    fontSize: 12,
    fontFamily: "Satoshi-Medium",
    lineHeight: 16,
    color: "#0A0B14",
  },
});

export default Receipt;
