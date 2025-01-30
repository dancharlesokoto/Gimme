import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import BackPage from "@/components/BackPage";
import { router } from "expo-router";

export default function ProcessSellOrder() {
  const [hasReceivedMoney, setHasReceivedMoney] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setHasReceivedMoney(true);
    }, 3000);
  }, []);

  const releaseFunds = () => {
    router.push("/screens/Receipt");
  };

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <BackPage />
            <Text style={styles.pageName}>Order</Text>
          </View>
          <View style={styles.right}>
            <Pressable
              hitSlop={size.getWidthSize(20)}
              onPress={() => router.push("/screens/(p2p)/ChatConversation")}
            >
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                //   xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M3.00001 12C3.00001 7.0293 7.02931 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21H3.00001L5.63611 18.3639C4.79914 17.5291 4.13539 16.5371 3.683 15.445C3.23061 14.3529 2.9985 13.1821 3.00001 12ZM7.34521 19.2H12C13.424 19.2 14.8161 18.7777 16.0001 17.9866C17.1841 17.1954 18.107 16.0709 18.6519 14.7553C19.1969 13.4397 19.3395 11.992 19.0617 10.5953C18.7838 9.19869 18.0981 7.91577 17.0912 6.90883C16.0842 5.90189 14.8013 5.21616 13.4047 4.93835C12.008 4.66053 10.5603 4.80312 9.24469 5.34807C7.92906 5.89302 6.80457 6.81586 6.01343 7.99989C5.22228 9.18393 4.80001 10.576 4.80001 12C4.80001 13.9368 5.56591 15.7485 6.90871 17.0913L8.18131 18.3639L7.34521 19.2ZM8.40001 12.9H15.6C15.6 13.8548 15.2207 14.7705 14.5456 15.4456C13.8705 16.1207 12.9548 16.5 12 16.5C11.0452 16.5 10.1296 16.1207 9.45442 15.4456C8.77929 14.7705 8.40001 13.8548 8.40001 12.9Z"
                  fill="#0A0B14"
                />
              </Svg>
            </Pressable>
            <Pressable
              onPress={() => router.push("/screens/(p2p)/CancelOrder")}
            >
              <Text
                style={{
                  fontSize: size.fontSize(16),
                  fontFamily: "Satoshi-Bold",
                  color: "#525466",
                }}
              >
                Cancel order
              </Text>
            </Pressable>
          </View>
        </View>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.countDown}>
              <Svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                //   xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM8.6 8V5H7.4V9.2H11V8H8.6Z"
                  fill="#F28B2C"
                />
              </Svg>
              <Text style={styles.countDownText}>Time left: 13:09s</Text>
            </View>

            {hasReceivedMoney ? (
              <View
                style={{
                  alignItems: "center",
                  gap: size.getHeightSize(16),
                }}
              >
                <Svg
                  width="49"
                  height="48"
                  viewBox="0 0 49 48"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Rect x="0.5" width="48" height="48" rx="24" fill="#EFFAF6" />
                  <Path
                    d="M22.6998 26.8548L30.9726 18.5811L32.2461 19.8537L22.6998 29.4L16.9722 23.6724L18.2448 22.3998L22.6998 26.8548Z"
                    fill="#2D9F75"
                  />
                </Svg>

                <Text
                  style={{
                    fontFamily: "Satoshi-Bold",
                    fontSize: size.fontSize(14),
                    color: "#0A0B14",
                  }}
                >
                  Merchant has marked this order as Paid
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.contentNumber}>1/</Text>
                <Text style={styles.contentTitle}>
                  Await payment from the merchant.
                </Text>
              </View>
            )}
            <View style={styles.orderInforContainer}>
              <View style={styles.orderInfoItem}>
                <Text style={styles.orderInfoLabel}>You will receive</Text>
                <Text style={styles.orderInfoValue}> NGN 15,000</Text>
              </View>

              <View style={styles.horizontalRule}></View>

              <View style={styles.orderInfoItem}>
                <Text style={styles.orderInfoLabel}>Account name</Text>
                <Text style={styles.orderInfoValue}>John Doe</Text>
              </View>

              <View style={styles.orderInfoItem}>
                <Text style={styles.orderInfoLabel}>Bank name</Text>
                <Text style={[styles.orderInfoValue]}>Opay</Text>
              </View>

              {hasReceivedMoney && (
                <View style={styles.paymentEvidenceContainer}>
                  <Text
                    style={{
                      fontFamily: "Satoshi-Medium",
                      fontSize: size.getWidthSize(14),
                      color: "#0A0B14",
                    }}
                  >
                    Payment evidence
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: size.getWidthSize(8),
                    }}
                  >
                    <View style={styles.paymentEvidenceItem}></View>
                    <View style={styles.paymentEvidenceItem}></View>
                  </View>
                </View>
              )}
            </View>
            <View>
              <Text style={styles.contentNumber}>2/</Text>
              <Text style={styles.contentTitle}>
                Payment received? Release funds
              </Text>
              <Text
                style={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: size.getWidthSize(14),
                  color: "#525466",
                }}
              >
                Once you have confirmed the receipt of the exact amount release
                the funds
              </Text>
            </View>

            <Pressable style={styles.activeButton} onPress={releaseFunds}>
              <Text style={styles.activeButtonText}>Release funds</Text>
            </Pressable>
            {/* end */}
          </View>
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(14),
  },

  left: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  right: {
    flexDirection: "row",
    gap: size.getWidthSize(16),
    alignItems: "center",
  },

  pageName: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  content: {
    flex: 1,
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),

    paddingBottom: size.getHeightSize(100),
  },

  contentNumber: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
    color: "#CDCED5",
  },

  contentTitle: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
    color: "#0A0B14",
  },

  horizontalRule: {
    width: "100%",
    height: size.getHeightSize(1),
    backgroundColor: "#E6E6E6",
    marginVertical: size.getHeightSize(8),
  },

  countDown: {
    alignSelf: "flex-start",
    borderRadius: size.getWidthSize(6),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    paddingVertical: size.getHeightSize(4),
    paddingHorizontal: size.getWidthSize(8),
    gap: size.getWidthSize(4),
    flexDirection: "row",
  },

  countDownText: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.getWidthSize(12),
    color: "#525466",
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

  paymentEvidenceContainer: {
    borderRadius: size.getWidthSize(12),
    borderWidth: 1,
    borderColor: "#F6F6FA",
    padding: size.getWidthSize(12),
    backgroundColor: "#ffffff",
    gap: size.getHeightSize(16),
  },

  paymentEvidenceItem: {
    width: size.getWidthSize(91),
    height: size.getHeightSize(84),
    borderRadius: size.getWidthSize(8),
    borderWidth: 1,
    borderColor: "#CDCED5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E2E3E9",
  },

  reminderContainer: {
    borderRadius: size.getWidthSize(16),
    borderWidth: 1,
    borderColor: "#F6F6FA",
    padding: size.getWidthSize(24),
    backgroundColor: "#F6F6FA",
    gap: size.getHeightSize(12),
  },

  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: size.getWidthSize(16),
  },

  imageItem: {
    alignSelf: "flex-start",
    position: "relative",
  },

  addImageBtn: {
    width: size.getWidthSize(91),
    height: size.getWidthSize(84),
    backgroundColor: "#F6F6FA",
    borderRadius: size.getWidthSize(8),
    alignItems: "center",
    justifyContent: "center",
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
    color: "#FFFFFF",
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
