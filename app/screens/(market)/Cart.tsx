import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import Svg, { Path } from "react-native-svg";
import Country from "@/components/Country";
import { router } from "expo-router";
import EmptyContactDetails from "@/components/EmptyContactDetails";
import MarketPlaceHeader from "@/components/MarketPlaceHeader";

export default function Cart() {
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const cartItems = [
      {
        id: "1",
        name: "Nike Sweat Pants",
        price: 10000,
        quantity: 1,
      },
      {
        id: "2",
        name: "Nike Sweat Pants",
        price: 10000,
        quantity: 1,
      },
      {
        id: "3",
        name: "Nike Sweat Pants",
        price: 10000,
        quantity: 1,
      },
    ];

    setCartItems(cartItems);
  }, []);
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <MarketPlaceHeader title="Cart" type="navigation" />
      <View style={styles.container}>
        <View style={{ paddingHorizontal: size.getWidthSize(24) }}>
          <View style={styles.cartItemContainer}>
            <View style={styles.cartItem}>
              <View style={styles.cartItemImage}></View>
              <View
                className="TEXT SECTION"
                style={{ gap: size.getHeightSize(8) }}
              >
                <Text style={styles.cartItemName}>Nike Sweat Pants</Text>
                <Text style={styles.cartItemPrice}>NGN 10,000</Text>
                <View
                  className="QUANTITY CONTROLLER"
                  style={{
                    flexDirection: "row",
                    gap: size.getWidthSize(16),
                    alignItems: "center",
                  }}
                >
                  <Pressable style={styles.quantityControlBtn}>
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M4.75 9.25H15.25V10.75H4.75V9.25Z"
                        fill="#525466"
                      />
                    </Svg>
                  </Pressable>
                  <Text
                    style={{
                      fontFamily: "Satoshi-Bold",
                      fontSize: size.fontSize(16),
                    }}
                  >
                    1
                  </Text>
                  <Pressable style={styles.quantityControlBtn}>
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                        fill="#525466"
                      />
                    </Svg>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.contactDetailsContainer}>
            <Text style={styles.contactDetailsTitle}>Contact details</Text>
            <EmptyContactDetails />
          </View>
        </View>
        {/* end */}

        <View style={styles.actionBtnContainer}>
          <Pressable
            style={styles.activeButton}
            onPress={() => router.push("/screens/(send)/EnterPin")}
          >
            <Text style={styles.activeButtonText}>Pay now</Text>
          </Pressable>
        </View>
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  cartItemContainer: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),
  },

  cartItem: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  cartItemImage: {
    width: size.getWidthSize(100),
    height: size.getWidthSize(100),
    borderRadius: size.getWidthSize(16),
    backgroundColor: "#F6F6FA",
    borderWidth: size.getWidthSize(1),
    borderColor: "#F6F6FA",
  },

  cartItemName: {
    color: "#000000",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(16),
    lineHeight: size.getHeightSize(20),
  },

  cartItemPrice: {
    color: "#868898",
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    lineHeight: size.getHeightSize(20),
  },

  quantityControlBtn: {
    width: size.getWidthSize(32),
    height: size.getWidthSize(32),
    borderRadius: size.getWidthSize(16),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    alignItems: "center",
    justifyContent: "center",
  },

  contactDetailsContainer: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(16),
  },

  contactDetailsTitle: {
    fontFamily: "Satoshi-Bold",
    color: "#0A0B14",
    fontSize: size.fontSize(16),
  },

  actionBtnContainer: {
    paddingVertical: size.getHeightSize(24),
    paddingHorizontal: size.getWidthSize(24),
    borderColor: "#E2E3E9",
    borderWidth: size.getWidthSize(1),
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
});
