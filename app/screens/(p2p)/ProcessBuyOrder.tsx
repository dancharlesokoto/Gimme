import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import BackPage from "@/components/BackPage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function ProcessBuyOrder() {
  const [hasSentMoney, setHasSentMoney] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  const [isFundsReleased, setIsFundsReleased] = useState(false);

  useEffect(() => {
    if (isFundsReleased) {
      router.push("/screens/Receipt");
    }
  }, [isFundsReleased]);
  const pickImage = async () => {
    setIsUploadLoading(true);
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
    setIsUploadLoading(false);
  };

  const cancelImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setHasSentMoney(true);
    setTimeout(() => {
      setIsFundsReleased(true);
    }, 3000);
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
          {hasSentMoney ? (
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

              <View>
                <Text style={styles.contentTitle}>
                  Waiting for Seller to release funds
                </Text>
              </View>
              <View style={styles.orderInforContainer}>
                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>You will receive</Text>
                  <Text style={styles.orderInfoValue}>GM 15.00</Text>
                </View>

                <View style={styles.horizontalRule}></View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Rate</Text>
                  <Text style={styles.orderInfoValue}>NGN 100</Text>
                </View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Buy amount</Text>
                  <Text style={styles.orderInfoValue}>15,000</Text>
                </View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Payment type</Text>
                  <Text style={[styles.orderInfoValue]}>Bank transfer</Text>
                </View>

                <View style={styles.horizontalRule}></View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Seller detail</Text>
                  <Text
                    style={[
                      styles.orderInfoValue,
                      { color: "#38C78B", textDecorationLine: "underline" },
                    ]}
                  >
                    081127227
                  </Text>
                </View>
              </View>

              <Pressable
                style={{
                  height: size.getHeightSize(56),
                  borderRadius: size.getHeightSize(16),
                  alignItems: "center",
                  justifyContent: "center",
                  gap: size.getWidthSize(4),
                  borderWidth: size.getWidthSize(1),
                  borderColor: "#E2E3E9",
                  marginVertical: size.getHeightSize(16),
                }}
                onPress={handleNext}
              >
                <Text
                  style={{
                    fontFamily: "Satoshi-Bold",
                    fontSize: size.fontSize(18),
                    color: "#525466",
                  }}
                >
                  Need help?
                </Text>
              </Pressable>
            </View>
          ) : (
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

              <View>
                <Text style={styles.contentNumber}>1/</Text>
                <Text style={styles.contentTitle}>
                  Go to your bank app and complete payment to the account detail
                  bellow
                </Text>
              </View>
              <View style={styles.orderInforContainer}>
                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>You pay</Text>
                  <Text style={styles.orderInfoValue}>NGN 15,000</Text>
                </View>

                <View style={styles.horizontalRule}></View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Account name</Text>
                  <Text style={styles.orderInfoValue}>John Doe</Text>
                </View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Account number</Text>
                  <Text style={styles.orderInfoValue}>812499000</Text>
                </View>

                <View style={styles.orderInfoItem}>
                  <Text style={styles.orderInfoLabel}>Bank name</Text>
                  <Text style={[styles.orderInfoValue]}>Opay</Text>
                </View>
              </View>
              <View style={styles.reminderContainer}>
                <Text
                  style={{
                    color: "#0A0B14",
                    fontFamily: "Satoshi-Medium",
                    fontSize: size.fontSize(14),
                  }}
                >
                  Reminder
                </Text>
                <Text
                  style={{
                    fontFamily: "Satoshi-Regular",
                    fontSize: size.fontSize(14),
                    color: "#525466",
                  }}
                >
                  Avoiding using terms like crypto related words in the
                  narration
                </Text>
              </View>
              <View>
                <Text style={styles.contentNumber}>2/</Text>
                <Text style={styles.contentTitle}>Have you paid?</Text>
                <Text
                  style={{
                    fontFamily: "Satoshi-Regular",
                    fontSize: size.getWidthSize(14),
                    color: "#525466",
                  }}
                >
                  Upload your payment receipt and notify the seller
                </Text>
              </View>

              {images.length > 0 && (
                <View style={styles.imageContainer}>
                  {images.map((image, index) => (
                    <View style={styles.imageItem} key={index}>
                      <Image
                        source={{ uri: image }}
                        resizeMode="cover"
                        style={{
                          width: size.getWidthSize(91),
                          height: size.getWidthSize(84),
                          borderRadius: size.getWidthSize(8),
                          borderWidth: size.getWidthSize(1),
                          borderColor: "#CDCED5",
                        }}
                      />
                      <Svg
                        hitSlop={20}
                        style={{
                          position: "absolute",
                          right: size.getWidthSize(-4),
                          top: size.getWidthSize(-4),
                          elevation: 200,
                          shadowColor: "red",
                        }}
                        onPress={() => cancelImage(index)}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        //   xmlns="http://www.w3.org/2000/svg"
                      >
                        <Rect width="20" height="20" rx="6" fill="#0A0B14" />
                        <Path
                          d="M9.99998 9.04535L13.3412 5.7041L14.2957 6.65855L10.9544 9.9998L14.2957 13.3411L13.3412 14.2955L9.99998 10.9543L6.65873 14.2955L5.70428 13.3411L9.04553 9.9998L5.70428 6.65855L6.65873 5.7041L9.99998 9.04535Z"
                          fill="white"
                        />
                      </Svg>
                    </View>
                  ))}
                  <Pressable style={styles.addImageBtn} onPress={pickImage}>
                    <Svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M18.5 18.5V9.5H21.5V18.5H30.5V21.5H21.5V30.5H18.5V21.5H9.5V18.5H18.5Z"
                        fill="#868898"
                      />
                    </Svg>
                  </Pressable>
                </View>
              )}

              {images.length > 0 ? (
                <Pressable style={styles.activeButton} onPress={handleNext}>
                  <Text style={styles.activeButtonText}>Notify seller</Text>
                </Pressable>
              ) : (
                <Pressable style={styles.activeButton} onPress={pickImage}>
                  {!isUploadLoading ? (
                    <Text style={styles.activeButtonText}>Upload receipt</Text>
                  ) : (
                    <ActivityIndicator
                      color={"white"}
                      size="small"
                      animating={isUploadLoading}
                    />
                  )}
                </Pressable>
              )}
              {/* end */}
            </View>
          )}
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
