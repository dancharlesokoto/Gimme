import { View, Text, StyleSheet, Platform } from "react-native";
import React, { useState } from "react";
import { size } from "@/config/size";
import CurrencyInput from "react-native-currency-input";
import Svg, { Path } from "react-native-svg";

export default function CreateAdStepTwo() {
  const [price, setPrice] = useState(null);
  const [lowerLimit, setLowerLimit] = useState(null);
  const [upperLimit, setUpperLimit] = useState(null);
  return (
    <View>
      <Text style={styles.progressType}>Price and limits</Text>
      <View style={styles.innerSection}>
        <View className="SECTION ONE">
          <Text
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: size.fontSize(16),
              color: "#0A0B14",
            }}
          >
            Set price
          </Text>
          <CurrencyInput
            style={styles.input}
            value={price}
            precision={0}
            delimiter=","
            onChangeValue={(value: any) => setPrice(value)}
            placeholder="1000 - 99,000"
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: size.getWidthSize(4),
            }}
          >
            <Svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                fill="#868898"
              />
            </Svg>

            <Text
              style={{
                fontFamily: "Satoshi-Regular",
                fontSize: size.fontSize(12),
                color: "#525466",
              }}
            >
              Price should be set in terms of local currency
            </Text>
          </View>
        </View>
        <View className="SECTION TWO">
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: size.fontSize(14),
              color: "#0A0B14",
              lineHeight: size.getHeightSize(24),
            }}
          >
            Price state
          </Text>
          <View
            style={[
              styles.largeSelectorContainer,
              {
                flexDirection: "row",
              },
            ]}
          >
            <View style={[styles.largeSelectorItem, { flex: 1 }]}>
              <View
                style={{
                  flex: 1,
                  gap: size.getWidthSize(4),
                }}
              >
                <Text style={styles.largeSelectorText}>Fixed</Text>
                <Text style={styles.largeSelectorSubText}>
                  Will change when you update it
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
            </View>
            <View style={[styles.largeSelectorItem, { flex: 1 }]}>
              <View
                style={{
                  flex: 1,
                  gap: size.getWidthSize(4),
                }}
              >
                <Text style={styles.largeSelectorText}>Floating</Text>
                <Text style={styles.largeSelectorSubText}>
                  Will update with market rates
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
            </View>
          </View>
        </View>

        <View style={styles.horizontalRule}></View>

        <View className="SECTION THREE">
          <Text
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: size.fontSize(16),
              color: "#0A0B14",
            }}
          >
            Trade limit
          </Text>
          <View style={styles.tradeLimitContainer}>
            <View className="item" style={{ flex: 1 }}>
              <CurrencyInput
                style={styles.input}
                value={lowerLimit}
                precision={0}
                delimiter=","
                onChangeValue={(value: any) => setLowerLimit(value)}
                placeholder="Lower limit"
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: size.getWidthSize(4),
                }}
              >
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  //   xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#868898"
                  />
                </Svg>

                <Text
                  style={{
                    fontFamily: "Satoshi-Regular",
                    fontSize: size.fontSize(12),
                    color: "#525466",
                  }}
                >
                  e.g 1,000
                </Text>
              </View>
            </View>
            <View className="item" style={{ flex: 1 }}>
              <CurrencyInput
                style={styles.input}
                value={upperLimit}
                precision={0}
                delimiter=","
                onChangeValue={(value: any) => setUpperLimit(value)}
                placeholder="Upper limit"
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: size.getWidthSize(4),
                }}
              >
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  //   xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#868898"
                  />
                </Svg>

                <Text
                  style={{
                    fontFamily: "Satoshi-Regular",
                    fontSize: size.fontSize(12),
                    color: "#525466",
                  }}
                >
                  e.g. 5,000
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* end */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  progressType: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(16),
    color: "#0A0B14",
  },

  innerSection: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(32),
  },

  input: {
    height: size.getHeightSize(54),
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: size.getWidthSize(12),
    paddingLeft: size.getWidthSize(10),
    marginTop: size.getHeightSize(4),
    marginBottom: size.getHeightSize(4),
    marginRight: size.getWidthSize(1),
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(14),
  },

  largeSelectorContainer: {
    width: "100%",
    gap: size.getWidthSize(16),
  },

  largeSelectorItem: {
    flexDirection: "row",
    borderRadius: size.getWidthSize(12),
    gap: size.getHeightSize(4),
    padding: size.getWidthSize(16),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    backgroundColor: "#FFFFFF",
    ...Platform.select({
      android: {
        elevation: 5,
        shadowColor: "#E4E5E73D",
      },
      ios: {
        shadowColor: "#E4E5E73D",
        shadowOffset: {
          width: 0,
          height: size.getHeightSize(16),
        },
      },
    }),
  },

  largeSelectorText: {
    fontSize: size.fontSize(16),
    fontFamily: "Satoshi-Bold",
    color: "#0A0B14",
  },

  largeSelectorSubText: {
    fontSize: size.fontSize(12),
    fontFamily: "Satoshi-Regular",
    color: "#525466",
  },

  selectorIndicator: {
    width: size.getWidthSize(16),
    height: size.getWidthSize(16),
    borderRadius: size.getWidthSize(100),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
  },

  horizontalRule: {
    width: "100%",
    height: size.getHeightSize(1),
    backgroundColor: "#E6E6E6",
    marginVertical: size.getHeightSize(8),
  },

  tradeLimitContainer: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
  },
});
