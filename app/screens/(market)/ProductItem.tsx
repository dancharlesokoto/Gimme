import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import MarketPlaceHeader from "@/components/MarketPlaceHeader";
import { useLocalSearchParams } from "expo-router";
import SimilarProducts from "@/components/SimilarProducts";
import Svg, { Path } from "react-native-svg";

export default function ProductItem() {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(10000);
  const [checkoutPrice, setCheckoutPrice] = useState(price);
  const params = useLocalSearchParams();

  useEffect(() => {
    setCheckoutPrice(price * quantity);
  }, [quantity]);

  const handleIncreaseQty = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <MarketPlaceHeader type="navigation" />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.productInfoContainer}>
            <View style={styles.productImage}></View>

            <View style={styles.productInfo}>
              <View style={{ gap: size.getWidthSize(8) }}>
                <Text style={styles.productInfoName}>Nike Sweat Pants</Text>
                <Text style={styles.productInfoPrice}>NGN 10,000</Text>
              </View>

              <View style={styles.availabilityStatus}>
                <Text
                  style={{
                    fontSize: size.fontSize(11),
                    color: "#6E3B0C",
                    fontFamily: "Satoshi-Regular",
                  }}
                >
                  4 in stock
                </Text>
              </View>
            </View>

            <View>
              <Text style={styles.productInfoDescription}>
                Clean grade 4 Sweat pants in grey, 4 available in stock for
                quick grab. Size 10 (Uk)
              </Text>
            </View>

            <Pressable style={styles.shareButton}>
              <Text
                style={{
                  fontSize: size.fontSize(12),
                  color: "#525466",
                  fontFamily: "Satoshi-Medium",
                }}
              >
                Share product
              </Text>
            </Pressable>

            {/* end */}
          </View>

          <SimilarProducts />
        </View>
      </ScrollView>

      <View style={styles.addToCartContainer}>
        <View style={styles.incrementorContainer}>
          <Pressable
            style={styles.incrementorButton}
            onPress={handleDecreaseQty}
          >
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
            >
              <Path d="M4.75 9.25H15.25V10.75H4.75V9.25Z" fill="#525466" />
            </Svg>
          </Pressable>
          <Text
            style={{
              fontFamily: "Satoshi-Bold",
              fontSize: size.fontSize(16),
              color: "#000000",
            }}
          >
            {quantity}
          </Text>
          <Pressable
            style={styles.incrementorButton}
            onPress={handleIncreaseQty}
          >
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                fill="#525466"
              />
            </Svg>
          </Pressable>
        </View>
        <Pressable style={styles.addToCartButton}>
          <Text
            style={{
              fontFamily: "Satoshi-Medium",
              fontSize: size.fontSize(12),
              color: "#FFFFFF",
            }}
          >
            Add to cart - NGN {checkoutPrice}
          </Text>
        </Pressable>
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: size.getHeightSize(24),
  },

  productInfoContainer: {
    paddingHorizontal: size.getWidthSize(24),
    gap: size.getHeightSize(24),
  },

  productImage: {
    height: size.getHeightSize(224),
    borderRadius: size.getWidthSize(16),
    backgroundColor: "#F6F6FA",
  },

  productInfo: {
    flexDirection: "row",
    gap: size.getWidthSize(8),
    justifyContent: "space-between",
  },

  productInfoName: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(16),
    color: "#000000",
  },

  productInfoPrice: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    color: "#868898",
  },

  availabilityStatus: {
    paddingVertical: size.getHeightSize(2),
    paddingHorizontal: size.getWidthSize(8),
    borderRadius: size.getWidthSize(999),
    backgroundColor: "#FFDFC2",
    alignSelf: "flex-start",
  },

  productInfoDescription: {
    fontSize: size.fontSize(14),
    color: "#525466",
    fontFamily: "Satoshi-Regular",
  },

  shareButton: {
    padding: size.getWidthSize(12),
    borderRadius: size.getWidthSize(8),
    backgroundColor: "#F6F6FA",
    alignSelf: "flex-start",
  },

  addToCartContainer: {
    padding: size.getWidthSize(24),
    borderTopWidth: size.getHeightSize(1),
    flexDirection: "row",
    borderColor: "#E2E3E9",
    alignItems: "center",
    justifyContent: "space-between",
  },

  incrementorContainer: {
    gap: size.getWidthSize(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  incrementorButton: {
    width: size.getWidthSize(32),
    height: size.getWidthSize(32),
    borderRadius: size.getWidthSize(100),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    alignItems: "center",
    justifyContent: "center",
  },

  addToCartButton: {
    padding: size.getWidthSize(12),
    borderRadius: size.getWidthSize(8),
    backgroundColor: "#374BFB",
  },
});
