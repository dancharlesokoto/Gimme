import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { size } from "@/config/size";

export default function CreateAdStepOne() {
  return (
    <View>
      <Text style={styles.progressType}>Trade type</Text>
      <View style={styles.innerSection}>
        <View className="SECTION ONE">
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: size.fontSize(14),
              color: "#0A0B14",
              lineHeight: size.getHeightSize(24),
            }}
          >
            What type of Ad are you creating?
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
                <Text style={styles.largeSelectorText}>Buy Ad</Text>
                <Text style={styles.largeSelectorSubText}>
                  Customers buy assets from you
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
                <Text style={styles.largeSelectorText}>Sell Ad</Text>
                <Text style={styles.largeSelectorSubText}>
                  Customers sell assets to you
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
            </View>
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
            What kind of asset are you trading for?
          </Text>
          <View style={styles.largeSelectorContainer}>
            <View style={styles.largeSelectorItem}>
              <View
                style={{
                  flex: 1,
                  gap: size.getWidthSize(4),
                }}
              >
                <Text style={styles.largeSelectorText}>Cash</Text>
                <Text style={styles.largeSelectorSubText}>
                  You will trade assets for Gimme token
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
            </View>
            <View style={styles.largeSelectorItem}>
              <View
                style={{
                  flex: 1,
                  gap: size.getWidthSize(4),
                }}
              >
                <Text style={styles.largeSelectorText}>Airtime</Text>
                <Text style={styles.largeSelectorSubText}>
                  You will trade assets for Airtime
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
            </View>

            <View style={styles.largeSelectorItem}>
              <View
                style={{
                  flex: 1,
                  gap: size.getWidthSize(4),
                }}
              >
                <Text style={styles.largeSelectorText}>Data bundle</Text>
                <Text style={styles.largeSelectorSubText}>
                  You will trade assets for Data bundle
                </Text>
              </View>
              <View style={styles.selectorIndicator}></View>
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
});
