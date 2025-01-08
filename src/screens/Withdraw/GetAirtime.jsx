import React from "react";
import CustomSafeArea from "../../shared/CustomSafeArea";
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
import { size } from "../../config/size";
import BackPage from "../../components/BackPage";
import flagIcon from "../../../assets/usa.png";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import Country from "../../components/Country";

const GetAirtime = () => {
  const navigation = useNavigation();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <BackPage page="Withdraw" />
              <Text style={styles.pageName}>Withdraw as airtime</Text>
            </View>
            <Country />
          </View>

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
              <Text style={styles.convertAmount}>0.001 GM = 1 AT</Text>
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
              <Text style={styles.label}>Amount to receive</Text>
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
                Equivalent to
              </Text>
              <Text style={[styles.subInput, { color: "#525466" }]}>GM 10</Text>
            </View>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Receipt")}
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

  pickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E2E3E9",
    paddingHorizontal: size.getHeightSize(4),
    paddingVertical: size.getWidthSize(4),
    borderRadius: size.getWidthSize(100),
    width: size.getWidthSize(86),
    alignItems: "center",
    marginVertical: size.getHeightSize(14),
  },

  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  input: {
    height: 50,
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    marginTop: size.getHeightSize(4),
    marginBottom: size.getHeightSize(6),
    fontSize: 16,
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
