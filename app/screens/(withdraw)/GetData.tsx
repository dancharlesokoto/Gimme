import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import flagIcon from "@/assets/images/usa.png";
import { Path, Svg } from "react-native-svg";
import Country from "@/components/Country";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";

const GetAirtime = () => {
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <GenericHeader title={"Get data"} showCountry />

          <View style={{ marginTop: size.getHeightSize(24) }}>
            <View>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                style={[styles.input]}
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                placeholder="07012345678"
              />
            </View>
          </View>
          <View style={{ marginTop: size.getHeightSize(12) }}>
            <View>
              <Text style={styles.label}>Amount to withdraw</Text>
              <TextInput
                style={[styles.input]}
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                placeholder="1000 - 99,999"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.subInput, { color: "#525466" }]}>
                Equivalent to GM 0
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: size.getHeightSize(24),
              paddingVertical: size.getHeightSize(24),
              paddingHorizontal: size.getWidthSize(24),
              backgroundColor: "#F6F6FA",
              borderRadius: size.getHeightSize(16),
            }}
          >
            <View
              style={{ justifyContent: "space-between", flexDirection: "row" }}
            >
              <Text style={styles.convertText}>Today’s rate</Text>
              <Text style={styles.convertAmount}>0.001 GM = 1 MB</Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: size.getHeightSize(12),
              }}
            >
              <Text style={styles.convertText}>Transaction fee</Text>
              <Text style={styles.convertAmount}>5%</Text>
            </View>
            <View style={styles.line} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.convertText}>Conversion</Text>
              <Text style={styles.convertAmount}>x 0.001 GM</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.label}>Data to receive</Text>
              <TextInput
                style={[styles.input]}
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                placeholder="0"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.subInput, { color: "#525466" }]}>
                Equivalent to
              </Text>
              <Text style={[styles.subInput, { color: "#525466" }]}>GM 10</Text>
            </View>
          </View>
          <Pressable
            onPress={() => router.push("/screens/Receipt")}
            style={{
              backgroundColor: "#374BFB",
              height: size.getHeightSize(56),
              borderRadius: size.getHeightSize(16),
              alignItems: "center",
              justifyContent: "center",
              marginTop: size.getHeightSize(24),
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
              Withdraw
            </Text>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  pageName: {
    paddingVertical: size.getHeightSize(14),
    marginLeft: size.getWidthSize(18),
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  selectedText: {
    fontSize: size.fontSize(14),
    paddingLeft: size.getWidthSize(8),
    fontFamily: "Satoshi-Regular",
  },

  img: {
    width: size.getWidthSize(63),
    height: size.getWidthSize(63),
  },

  imgText: {
    fontSize: size.getWidthSize(16),
    fontFamily: "Satoshi-Regular",
    marginTop: size.getHeightSize(4),
  },

  mainText: {
    fontSize: size.getWidthSize(16),
    fontFamily: "Satoshi-Bold",
    marginBottom: size.getHeightSize(4),
  },

  subText: {
    color: "#525466",
    fontSize: size.getWidthSize(14),
    fontFamily: "Satoshi-Regular",
  },

  link: {
    marginTop: size.getHeightSize(10),
    fontSize: size.getWidthSize(14),
    color: "#0A0B14",
    fontFamily: "Satoshi-Medium",
    textDecorationLine: "underline",
  },

  label: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  input: {
    height: size.getHeightSize(54),
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    marginTop: size.getHeightSize(4),
    marginBottom: size.getHeightSize(6),
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(14),
  },

  subInput: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    marginLeft: size.getWidthSize(4),
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

  line: {
    height: 1,
    backgroundColor: "#CDCED5",
    marginVertical: size.getHeightSize(12),
  },
});
export default GetAirtime;
