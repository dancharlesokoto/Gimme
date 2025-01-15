import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { Path, Svg } from "react-native-svg";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";

const Withdraw = () => {
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <GenericHeader title={"Send Gimme"} />
        <View style={{ paddingVertical: size.getHeightSize(24) }}>
          <Pressable onPress={() => router.push("/screens/(send)/SendToUsers")}>
            <View style={styles.fundContainer}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#EBEFFF",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 16 16"
                    fill="none"
                    width={size.getWidthSize(16)}
                    height={size.getHeightSize(16)}
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM8 14C9.5913 14 11.1174 13.3679 12.2426 12.2426C13.3679 11.1174 14 9.5913 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM4.25 8H5.75C5.75 8.59674 5.98705 9.16903 6.40901 9.59099C6.83097 10.0129 7.40326 10.25 8 10.25C8.59674 10.25 9.16903 10.0129 9.59099 9.59099C10.0129 9.16903 10.25 8.59674 10.25 8H11.75C11.75 8.99456 11.3549 9.94839 10.6517 10.6517C9.94839 11.3549 8.99456 11.75 8 11.75C7.00544 11.75 6.05161 11.3549 5.34835 10.6517C4.64509 9.94839 4.25 8.99456 4.25 8Z"
                      fill="#374BFB"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Other Gimme users</Text>
                  <Text style={styles.actionSubText}>
                    Send Gimme to other Gimme users
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingRight: size.getWidthSize(10),
                }}
              >
                <Svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                    fill="#525466"
                  />
                </Svg>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => router.push("/screens/(send)/SendToUsers")}>
            <View
              style={[
                styles.fundContainer,
                {
                  paddingTop: size.getHeightSize(12),
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: 100,
                    borderWidth: size.getWidthSize(1),
                    borderColor: "#E2E3E9",
                    justifyContent: "center",
                    alignItems: "center",
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 14 17"
                    width={size.getWidthSize(14)}
                    height={size.getHeightSize(16)}
                    fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M6 10.5V12C4.80653 12 3.66193 12.4741 2.81802 13.318C1.97411 14.1619 1.5 15.3065 1.5 16.5H0C0 14.9087 0.632141 13.3826 1.75736 12.2574C2.88258 11.1321 4.4087 10.5 6 10.5ZM6 9.75C3.51375 9.75 1.5 7.73625 1.5 5.25C1.5 2.76375 3.51375 0.75 6 0.75C8.48625 0.75 10.5 2.76375 10.5 5.25C10.5 7.73625 8.48625 9.75 6 9.75ZM6 8.25C7.6575 8.25 9 6.9075 9 5.25C9 3.5925 7.6575 2.25 6 2.25C4.3425 2.25 3 3.5925 3 5.25C3 6.9075 4.3425 8.25 6 8.25ZM10.5 16.125L8.29575 17.2838L8.7165 14.8298L6.93375 13.0912L9.39825 12.7327L10.5 10.5L11.6025 12.7327L14.0662 13.0912L12.2835 14.8298L12.7035 17.2838L10.5 16.125Z"
                      fill="#525466"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Merchant</Text>
                  <Text style={styles.actionSubText}>
                    Pay merchants using Gimme
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingRight: size.getWidthSize(10),
                }}
              >
                <Svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                    fill="#525466"
                  />
                </Svg>
              </View>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.push("/screens/(send)/OfflineCredit")}
          >
            <View
              style={[
                styles.fundContainer,
                {
                  paddingTop: size.getHeightSize(12),
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "#EFFAF5",
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 14 16"
                    fill="none"
                    width={size.getWidthSize(14)}
                    height={size.getHeightSize(16)}
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M7.5 10.689V12.2565C6.82119 12.0165 6.09471 11.9429 5.38155 12.0418C4.6684 12.1408 3.9894 12.4094 3.40157 12.8252C2.81375 13.2409 2.33426 13.7916 2.00337 14.4311C1.67249 15.0705 1.49986 15.78 1.5 16.5L1.93842e-07 16.4993C-0.000232586 15.5834 0.209191 14.6797 0.612224 13.8573C1.01526 13.0349 1.6012 12.3157 2.32516 11.7548C3.04912 11.1939 3.89188 10.8061 4.78887 10.6212C5.68585 10.4364 6.61325 10.4593 7.5 10.6883V10.689ZM6 9.75C3.51375 9.75 1.5 7.73625 1.5 5.25C1.5 2.76375 3.51375 0.75 6 0.75C8.48625 0.75 10.5 2.76375 10.5 5.25C10.5 7.73625 8.48625 9.75 6 9.75ZM6 8.25C7.6575 8.25 9 6.9075 9 5.25C9 3.5925 7.6575 2.25 6 2.25C4.3425 2.25 3 3.5925 3 5.25C3 6.9075 4.3425 8.25 6 8.25ZM12 12.75H14.25V14.25H12V16.875L8.25 13.5L12 10.125V12.75Z"
                      fill="#2D9F70"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Offline Credit</Text>
                  <Text style={styles.actionSubText}>
                    Send money offline to non-gimme users
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  paddingRight: size.getWidthSize(10),
                }}
              >
                <Svg
                  width="6"
                  height="10"
                  viewBox="0 0 6 10"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                    fill="#525466"
                  />
                </Svg>
              </View>
            </View>
          </Pressable>
        </View>
      </View>
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

  fundContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(17),
  },

  actionText: { fontFamily: "Satoshi-Bold", fontSize: size.fontSize(16) },
  actionSubText: { fontFamily: "Satoshi-Regular", fontSize: size.fontSize(12) },
});

export default Withdraw;
