import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import CurrencyInput from "react-native-currency-input";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import Country from "@/components/Country";
import Img from "@/assets/images/avatar-2.png";
import CheckBox from "react-native-check-box";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";

export default function EnterAmount() {
  const [amount, setAmount] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const handleNext = () => {
    router.push("/screens/(send)/EnterPin");
  };

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <GenericHeader title="Amount to send" showCountry />

        <View
          style={{
            gap: size.getHeightSize(8),
            paddingVertical: size.getHeightSize(24),
          }}
        >
          <Text
            style={{
              fontSize: size.fontSize(14),
              fontFamily: "Satoshi-Regular",
              lineHeight: 20,
            }}
          >
            Sending to
          </Text>

          <View
            style={{
              borderRadius: size.getWidthSize(12),
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#374BFB",
              paddingHorizontal: size.getWidthSize(12),
              paddingVertical: size.getHeightSize(12),
              flexDirection: "row",
              alignItems: "center",
              gap: size.getWidthSize(20),
              backgroundColor: "#EBEFFF",
            }}
          >
            <Image
              source={Img}
              alt=""
              style={{
                width: size.getWidthSize(40),
                height: size.getHeightSize(40),
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: size.fontSize(16),
                  lineHeight: size.getHeightSize(24),
                  fontFamily: "Satoshi-Bold",
                }}
              >
                @rotimi
              </Text>
              <Text
                style={{
                  fontSize: size.fontSize(16),
                  lineHeight: size.getHeightSize(24),
                  fontFamily: "Satoshi-Regular",
                }}
              >
                08138818591
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            paddingVertical: size.getWidthSize(24),
            gap: size.getWidthSize(24),
          }}
        >
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
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Remark</Text>
            </View>
            <TextInput style={styles.input} placeholder="Reason for sending" />
          </View>

          <View>
            <CheckBox
              style={{ flex: 1 }}
              onClick={() => setIsChecked(!isChecked)}
              isChecked={isChecked}
              rightText={"Save to quick payment list"}
              rightTextStyle={{
                fontFamily: "Satoshi-Regular",
                fontSize: size.fontSize(14),
              }}
              uncheckedCheckBoxColor="#1B1C1D1F"
              checkBoxColor="#374BFB"
            />
          </View>

          <Pressable
            onPress={handleNext}
            style={{
              backgroundColor: "#374BFB",
              height: size.getHeightSize(56),
              marginVertical: size.getHeightSize(16),
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
              Proceed
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  headerContainer: {
    paddingHorizontal: size.getWidthSize(24),
    justifyContent: "space-between",
    flexDirection: "row",
  },

  pageName: {
    paddingVertical: size.getHeightSize(14),
    marginLeft: size.getWidthSize(18),
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
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
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
  },
});
