import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import { size } from "../config/size";
import { Svg, Path } from "react-native-svg";

const Recent = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{ fontFamily: "Satoshi-Regular", fontSize: size.fontSize(14) }}
      >
        Recent activities
      </Text>
      <View style={{ paddingTop: size.getHeightSize(12) }}>
        {/* Fund */}
        <View style={styles.activityContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.buttonBox}>
              <Svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M9.25 9.25V4.75H10.75V9.25H15.25V10.75H10.75V15.25H9.25V10.75H4.75V9.25H9.25Z"
                  fill="#525466"
                />
              </Svg>
            </View>
            <View style={{ marginLeft: size.getWidthSize(12) }}>
              <Text style={styles.activity}>Funded wallet</Text>
              <Text style={styles.count}>3 days ago</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amount}>+GM86.00</Text>
            <Text style={styles.date}>Sep 21</Text>
          </View>
        </View>

        {/* Sent */}
        <View
          style={[
            styles.activityContainer,
            { marginTop: size.getHeightSize(8) },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.buttonBox}>
              <Svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M2.44226 8.02741C2.05976 7.87366 2.06426 7.64491 2.46776 7.51066L16.7823 2.73916C17.179 2.60716 17.4063 2.82916 17.2953 3.21766L13.2048 17.5322C13.0923 17.9289 12.8485 17.9469 12.667 17.5847L9.25001 10.7499L2.44226 8.02741ZM6.10976 7.87741L10.3368 9.56866L12.6168 14.1302L15.2763 4.82266L6.10901 7.87741H6.10976Z"
                  fill="#525466"
                />
              </Svg>
            </View>
            <View style={{ marginLeft: size.getWidthSize(12) }}>
              <Text style={styles.activity}>Sent Gimme to</Text>
              <Text style={styles.count}>4 days ago</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amount}>-GM46.00</Text>
            <Text style={styles.date}>Sep 22</Text>
          </View>
        </View>

        {/* Withdraw */}
        <View
          style={[
            styles.activityContainer,
            { marginTop: size.getHeightSize(8) },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.buttonBox}>
              <Svg
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10.75 13.129L14.773 9.106L15.8335 10.1665L10 16L4.1665 10.1665L5.227 9.106L9.25 13.129V4H10.75V13.129Z"
                  fill="#525466"
                />
              </Svg>
            </View>
            <View style={{ marginLeft: size.getWidthSize(12) }}>
              <Text style={styles.activity}>Withdrew money</Text>
              <Text style={styles.count}>5 days ago</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.amount}>-GM19.00</Text>
            <Text style={styles.date}>Sep 23</Text>
          </View>
        </View>

        <Pressable>
          <View style={styles.all}>
            <Svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M10.5 2.5C14.6423 2.5 18 5.85775 18 10C18 14.1423 14.6423 17.5 10.5 17.5C6.35775 17.5 3 14.1423 3 10H4.5C4.5 13.3135 7.1865 16 10.5 16C13.8135 16 16.5 13.3135 16.5 10C16.5 6.6865 13.8135 4 10.5 4C8.4375 4 6.618 5.04025 5.53875 6.625H7.5V8.125H3V3.625H4.5V5.5C5.868 3.6775 8.04675 2.5 10.5 2.5ZM11.25 6.25V9.68875L13.6823 12.121L12.621 13.1823L9.75 10.3098V6.25H11.25Z"
                fill="#525466"
              />
            </Svg>

            <Text style={styles.allText}>See all activities</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: size.getWidthSize(24) },

  activityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: size.getHeightSize(9),
  },
  buttonBox: {
    height: size.getHeightSize(40),
    width: size.getWidthSize(40),
    borderWidth: 1,
    borderRadius: 96,
    padding: 10,
    borderColor: "#E2E3E9",
    justifyContent: "center",
    alignItems: "center",
  },

  activity: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
  },

  count: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(12),
    paddingTop: size.getHeightSize(4),
    color: "#525466",
  },

  amount: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(14),
  },

  date: {
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(12),
    paddingTop: size.getHeightSize(4),
    color: "#525466",
  },

  all: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: size.getHeightSize(12),
    marginBottom: size.getHeightSize(24),
    borderRadius: size.getWidthSize(8),
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(12),
    borderWidth: 1,
    borderColor: "#E2E3E9",
    alignItems: "center",
  },

  allText: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(12),
    color: "#525466",
    paddingLeft: size.getWidthSize(8),
  },
});

export default Recent;
