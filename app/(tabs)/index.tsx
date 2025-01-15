import React, { useEffect } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { Svg, Path } from "react-native-svg";
import noTxn from "@/assets/images/noTxn.png";
import Promotion from "@/components/Promotion";
import QuickPayments from "@/components/QuickPayments";
import WalletCard from "@/components/WalletCard";
import Recent from "@/components/Recent";
import { router } from "expo-router";

const HomeScreen = () => {
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Pressable style={styles.iconButton}>
            <Svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M17.5 16H2.5V14.5H3.25V9.27325C3.25 5.53225 6.2725 2.5 10 2.5C13.7275 2.5 16.75 5.53225 16.75 9.27325V14.5H17.5V16ZM4.75 14.5H15.25V9.27325C15.25 6.361 12.8995 4 10 4C7.1005 4 4.75 6.361 4.75 9.27325V14.5ZM8.125 16.75H11.875C11.875 17.2473 11.6775 17.7242 11.3258 18.0758C10.9742 18.4275 10.4973 18.625 10 18.625C9.50272 18.625 9.02581 18.4275 8.67417 18.0758C8.32254 17.7242 8.125 17.2473 8.125 16.75Z"
                fill="#525466"
              />
            </Svg>
          </Pressable>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          overScrollMode="always"
        >
          <WalletCard />
          <QuickPayments />
          <View
            style={{
              paddingTop: size.getHeightSize(24),
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: size.getWidthSize(24),
            }}
          >
            <View
              style={[
                styles.featureCard,
                { marginRight: size.getWidthSize(12), flex: 1 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Pressable
                    style={[styles.featureIcon, { backgroundColor: "#38C78B" }]}
                    onPress={() => router.push("/screens/(send)/Send")}
                  >
                    <Svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      //       xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M2.45962 7.98628C2.06812 7.85578 2.06437 7.64503 2.46712 7.51078L16.7824 2.73928C17.1791 2.60728 17.4064 2.82928 17.2954 3.21778L13.2049 17.5323C13.0924 17.929 12.8636 17.9425 12.6956 17.566L10.0001 11.5L14.5001 5.50003L8.50012 10L2.45962 7.98628Z"
                        fill="white"
                      />
                    </Svg>
                  </Pressable>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Tap to open</Text>
                </View>
              </View>
              <View
                style={{
                  paddingTop: size.getHeightSize(32),
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.featureText}>Send Gimme to others</Text>
              </View>
            </View>
            <View
              style={[
                styles.featureCard,
                { marginLeft: size.getWidthSize(12), flex: 1 },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Pressable
                    style={[styles.featureIcon, { backgroundColor: "#6E3FF3" }]}
                    onPress={() => router.push("/(tabs)/p2p")}
                  >
                    <Svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      //       xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M12.4375 4.125C12.4375 5.81494 11.4056 7.26394 9.9375 7.87612V7.875C9.9375 4.941 7.559 2.5625 4.62501 2.5625H4.62386C5.23608 1.09441 6.68506 0.0625 8.375 0.0625C10.6187 0.0625 12.4375 1.88134 12.4375 4.125ZM3.375 0.375C1.99429 0.375 0.875 1.49429 0.875 2.875V3.8125H2.125V2.875C2.125 2.18464 2.68464 1.625 3.375 1.625H4.3125V0.375H3.375ZM10.875 8.1875V9.125C10.875 9.81538 10.3154 10.375 9.625 10.375H8.6875V11.625H9.625C11.0057 11.625 12.125 10.5057 12.125 9.125V8.1875H10.875ZM4.625 11.9375C6.86869 11.9375 8.6875 10.1187 8.6875 7.875C8.6875 5.63131 6.86869 3.8125 4.625 3.8125C2.38134 3.8125 0.5625 5.63131 0.5625 7.875C0.5625 10.1187 2.38134 11.9375 4.625 11.9375ZM4.625 6.3125L6.1875 7.875L4.625 9.4375L3.0625 7.875L4.625 6.3125Z"
                        fill="white"
                      />
                    </Svg>
                  </Pressable>
                </View>

                <View style={styles.badge}>
                  <Text style={styles.badgeText}>Tap to open</Text>
                </View>
              </View>
              <View
                style={{
                  paddingTop: size.getHeightSize(32),
                  alignItems: "flex-start",
                }}
              >
                <Text style={styles.featureText}>
                  Swap Gimme with our P2P platform
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              borderRadius: "20px",
              paddingVertical: size.getHeightSize(24),
              paddingHorizontal: size.getWidthSize(24),
            }}
          >
            <Promotion />
          </View>
          <View style={{ marginBottom: size.getHeightSize(45) }}>
            <Image source={noTxn} style={styles.noTxn} />
            <Text
              style={{
                marginTop: size.getHeightSize(20),
                textAlign: "center",
                fontFamily: "Satoshi-Regular",
                fontSize: size.getWidthSize(14),
              }}
            >
              No recent transaction or activities yet.
            </Text>
          </View>
          <Recent />
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: size.getHeightSize(36),
    paddingBottom: size.getHeightSize(6),
    paddingHorizontal: size.getWidthSize(24),
  },

  welcomeText: {
    fontSize: size.fontSize(16),
    fontFamily: "Satoshi-Bold",
  },

  iconButton: {
    height: size.getHeightSize(44),
    width: size.getHeightSize(44),
    padding: size.getHeightSize(12),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E3E9",
    justifyContent: "center",
    alignItems: "center",
  },

  featureCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 15,
    paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(12),
    width: size.getWidthSize(160.5),
  },

  iconContainer: {
    backgroundColor: "#E0E0E0",
    borderRadius: 30,
    padding: 10,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  badge: {
    backgroundColor: "#E2E3E9",
    borderRadius: size.getWidthSize(8),
    paddingHorizontal: size.getWidthSize(4),
    height: size.getHeightSize(20),
    justifyContent: "center",
  },

  badgeText: {
    fontSize: size.fontSize(10),
    color: "#525466",
  },

  featureIcon: {
    height: size.getHeightSize(44),
    width: size.getHeightSize(44),
    padding: size.getHeightSize(12),
    borderRadius: size.getHeightSize(16),
    justifyContent: "center",
    alignItems: "center",
  },

  featureText: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    lineHeight: size.getHeightSize(20),
  },

  noTxn: {
    alignSelf: "center",
    width: size.getHeightSize(108),
    height: size.getHeightSize(108),
  },
});

export default HomeScreen;
