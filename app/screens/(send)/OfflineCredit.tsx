import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { size } from "@/config/size";
import { Path, Svg } from "react-native-svg";
import { router } from "expo-router";
import CheckBox from "react-native-check-box";
import CurrencyInput from "react-native-currency-input";
import GenericHeader from "@/components/GenericHeader";

const OfflineCredit = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <GenericHeader title={"Offline credit"} />
          <View
            style={{
              marginVertical: size.getHeightSize(14),
              paddingVertical: size.getHeightSize(16.5),
              paddingHorizontal: size.getWidthSize(16.5),
              backgroundColor: "#EBEFFF",
              borderRadius: size.getHeightSize(16),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM7.25 7.25V11.75H8.75V7.25H7.25ZM7.25 4.25V5.75H8.75V4.25H7.25Z"
                  fill="#374BFB"
                />
              </Svg>
              <View
                style={{
                  marginLeft: size.getWidthSize(12),
                  width: size.getWidthSize(220),
                }}
              >
                <Text style={styles.mainText}>Offline credit</Text>
                <Text style={styles.subText}>
                  The receiver will get an offline token they will use to
                  retrieve the money you send from a merchant, internet cafe, or
                  POS agent.
                </Text>
              </View>
            </View>

            <View>
              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.99999 8.93955L13.7125 5.22705L14.773 6.28755L11.0605 10.0001L14.773 13.7126L13.7125 14.7731L9.99999 11.0606L6.28749 14.7731L5.22699 13.7126L8.93949 10.0001L5.22699 6.28755L6.28749 5.22705L9.99999 8.93955Z"
                  fill="#525466"
                />
              </Svg>
            </View>
          </View>

          <View
            style={{
              paddingVertical: size.getWidthSize(24),
              gap: size.getWidthSize(24),
            }}
          >
            <View>
              <View>
                <Text style={styles.label}>Recipient phone number</Text>
                <TextInput
                  style={[styles.input]}
                  keyboardType="phone-pad"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  placeholder="Phone number"
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#868898"
                  />
                </Svg>
                <Text style={[styles.subInput, { color: "#525466" }]}>
                  Ensure you are sending to the correct phone number
                </Text>
              </View>
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>Amount to to send</Text>
                <Text style={styles.labelBal}>Balance: NGN 150,000</Text>
              </View>
              <CurrencyInput
                style={styles.input}
                value={amount}
                precision={0}
                delimiter=","
                onChangeValue={(value: any) => setAmount(value)}
                placeholder="1000 - 99,000"
              />
              <Text
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: size.fontSize(12),
                }}
              >
                Equivalent to{" "}
                <Text style={{ fontFamily: "Satoshi-Bold" }}>GM 0</Text>
              </Text>
            </View>

            <View>
              <CheckBox
                onClick={() => setIsChecked(!isChecked)}
                isChecked={isChecked}
                rightText="Save to quick payment list"
                rightTextStyle={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: size.fontSize(14),
                }}
                uncheckedCheckBoxColor="#1B1C1D1F"
                checkBoxColor="#374BFB"
              />
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
                Proceed
              </Text>
            </Pressable>
          </View>
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
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  labelBal: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#525466",
  },

  input: {
    height: size.getHeightSize(54),
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: size.getWidthSize(12),
    paddingLeft: size.getWidthSize(10),
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
export default OfflineCredit;
