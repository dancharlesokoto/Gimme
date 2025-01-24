import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { act, useState } from "react";
import { ScrollView } from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import CurrencyInput from "react-native-currency-input";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function BuyOrder() {
  const [amount, setAmount] = useState(null);

  const handleContinue = () => {
    if (amount) {
      router.push("/screens/(p2p)/ProcessBuyOrder");
    } else {
    }
  };
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <GenericHeader title="Buy Order" showCountry />
        <View style={styles.content}>
          <View style={styles.amountSection}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.amountTitle}>Amount you need</Text>
              <Text style={styles.amountTitleSubtext}>Use Max</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontFamily: "Satoshi-Regular",
                  color: "#868898",
                  fontSize: size.fontSize(14),
                }}
              >
                GM
              </Text>
              <CurrencyInput
                placeholder="0.00"
                onChangeValue={(value: any) => setAmount(value)}
                value={amount}
                placeholderTextColor={"#868898"}
                precision={0}
                delimiter=","
                style={{
                  fontFamily: "Satoshi-Medium",
                  color: "#000",
                  flex: 1,
                  fontSize: size.getWidthSize(14),
                }}
              />
            </View>
            <View style={styles.disclaimerOrderLimitContainer}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z"
                  fill="#868898"
                />
              </Svg>
              <Text style={styles.disclaimerOrderLimitText}>
                Order limit NGN 5,000 - NGN 10,000
              </Text>
            </View>
          </View>

          <View style={styles.orderInforContainer}>
            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoLabel}>Buy with</Text>
              <Text style={styles.orderInfoValue}>NGN 0.0</Text>
            </View>

            <View style={styles.horizontalRule}></View>

            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoLabel}>Payment window</Text>
              <Text style={styles.orderInfoValue}>15 mins</Text>
            </View>

            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoLabel}>Merchant</Text>
              <Text style={styles.orderInfoValue}>0812499000</Text>
            </View>

            <View style={styles.orderInfoItem}>
              <Text style={styles.orderInfoLabel}>Status</Text>
              <Text style={[styles.orderInfoValue, { color: "#38C78B" }]}>
                Online
              </Text>
            </View>
          </View>

          <View style={styles.tradingTermsContainer}>
            <Text
              style={{
                color: "#0A0B14",
                fontFamily: "Satoshi-Medium",
                fontSize: size.fontSize(14),
              }}
            >
              Trading terms
            </Text>
            <Text
              style={{
                fontFamily: "Satoshi-Regular",
                fontSize: size.fontSize(14),
                color: "#525466",
              }}
            >
              Terms of trading will be written here so that anyone trading will
              understand what the terms are about.
            </Text>
          </View>

          <Pressable
            style={amount ? styles.activeButton : styles.inactiveButton}
            onPress={handleContinue}
          >
            <Text
              style={
                amount ? styles.activeButtonText : styles.inactiveButtonText
              }
            >
              Continue
            </Text>
          </Pressable>
          {/* end */}
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

  content: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),
  },

  amountSection: {
    gap: size.getHeightSize(5),
  },

  amountTitle: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    color: "#0A0B14",
    lineHeight: size.getHeightSize(20),
  },

  amountTitleSubtext: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(12),
    color: "#525466",
    lineHeight: size.getHeightSize(20),
  },

  inputContainer: {
    flexDirection: "row",
    gap: size.getWidthSize(8),
    alignItems: "center",
    borderRadius: size.getWidthSize(12),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(10),
  },

  disclaimerOrderLimitContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  disclaimerOrderLimitText: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(12),
    color: "#525466",
  },

  horizontalRule: {
    width: "100%",
    height: size.getHeightSize(1),
    backgroundColor: "#E6E6E6",
    marginVertical: size.getHeightSize(8),
  },

  orderInforContainer: {
    backgroundColor: "#F6F6FA",
    borderWidth: 1,
    borderColor: "#F6F6FA",
    borderRadius: size.getWidthSize(16),
    padding: size.getHeightSize(24),
    gap: size.getHeightSize(12),
  },

  orderInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  orderInfoLabel: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Regular",
    lineHeight: size.getHeightSize(20),
    color: "#525466",
  },

  orderInfoValue: {
    fontSize: size.fontSize(12),
    fontFamily: "Satoshi-Medium",
    lineHeight: size.getHeightSize(16),
    color: "#0A0B14",
  },

  tradingTermsContainer: {
    borderRadius: size.getWidthSize(16),
    borderWidth: 1,
    borderColor: "#F6F6FA",
    padding: size.getWidthSize(24),
    backgroundColor: "#F6F6FA",
    gap: size.getHeightSize(12),
  },

  activeButton: {
    backgroundColor: "#374BFB",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  activeButtonText: {
    color: "#F6F6FA",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },

  inactiveButton: {
    backgroundColor: "#F6F6FA",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveButtonText: {
    color: "#CDCED5",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },
});
