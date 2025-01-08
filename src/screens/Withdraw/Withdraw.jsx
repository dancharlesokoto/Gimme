import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { size } from "../../config/size";
import BackPage from "../../components/BackPage";
import CustomSafeArea from "../../shared/CustomSafeArea";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";

const Withdraw = () => {
  const navigation = useNavigation();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <BackPage />
          <Text style={styles.pageName}>Withdraw</Text>
        </View>
        <View style={{ paddingVertical: size.getHeightSize(24) }}>
          <Pressable onPress={() => navigation.navigate("GetCash")}>
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
                    borderRadius: 96,
                    paddingVertical: size.getHeightSize(13),
                    paddingHorizontal: size.getWidthSize(13),
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M1.25 0.25H14.75C14.9489 0.25 15.1397 0.329018 15.2803 0.46967C15.421 0.610322 15.5 0.801088 15.5 1V13C15.5 13.1989 15.421 13.3897 15.2803 13.5303C15.1397 13.671 14.9489 13.75 14.75 13.75H1.25C1.05109 13.75 0.860322 13.671 0.71967 13.5303C0.579018 13.3897 0.5 13.1989 0.5 13V1C0.5 0.801088 0.579018 0.610322 0.71967 0.46967C0.860322 0.329018 1.05109 0.25 1.25 0.25V0.25ZM14 7H2V12.25H14V7ZM14 4V1.75H2V4H14Z"
                      fill="#374BFB"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Get cash</Text>
                  <Text style={styles.actionSubText}>
                    Receive cash for your funds
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
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                    fill="#525466"
                  />
                </Svg>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("GetAirtime")}>
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
                    backgroundColor: "#FEF4EB",
                    borderRadius: 96,
                    paddingVertical: size.getHeightSize(13),
                    paddingHorizontal: size.getWidthSize(13),
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M5.0245 6.0115C5.72825 7.24786 6.75214 8.27175 7.9885 8.9755L8.6515 8.047C8.75812 7.8977 8.91576 7.79266 9.0946 7.75175C9.27344 7.71084 9.46108 7.7369 9.622 7.825C10.6827 8.40469 11.8542 8.75333 13.0593 8.848C13.2473 8.8629 13.4229 8.94815 13.5509 9.08674C13.6789 9.22533 13.75 9.40708 13.75 9.59575V12.9423C13.75 13.1279 13.6812 13.3071 13.5568 13.4449C13.4324 13.5828 13.2612 13.6696 13.0765 13.6885C12.679 13.7297 12.2785 13.75 11.875 13.75C5.455 13.75 0.25 8.545 0.25 2.125C0.25 1.7215 0.27025 1.321 0.3115 0.9235C0.330441 0.738773 0.417238 0.567641 0.555092 0.443225C0.692946 0.31881 0.872054 0.24996 1.05775 0.25H4.40425C4.59292 0.249976 4.77467 0.321064 4.91326 0.449088C5.05185 0.577112 5.1371 0.752668 5.152 0.94075C5.24667 2.14584 5.59531 3.31726 6.175 4.378C6.2631 4.53892 6.28916 4.72656 6.24825 4.9054C6.20734 5.08424 6.1023 5.24188 5.953 5.3485L5.0245 6.0115V6.0115ZM3.133 5.51875L4.558 4.501C4.15359 3.62807 3.87651 2.70163 3.73525 1.75H1.7575C1.753 1.8745 1.75075 1.99975 1.75075 2.125C1.75 7.717 6.283 12.25 11.875 12.25C12.0002 12.25 12.1255 12.2477 12.25 12.2425V10.2648C11.2984 10.1235 10.3719 9.84641 9.499 9.442L8.48125 10.867C8.0715 10.7078 7.67351 10.5198 7.29025 10.3045L7.24675 10.2797C5.77568 9.44254 4.55746 8.22432 3.72025 6.75325L3.6955 6.70975C3.48018 6.32649 3.29221 5.9285 3.133 5.51875V5.51875Z"
                      fill="#F28B2C"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Get airtime</Text>
                  <Text style={styles.actionSubText}>
                    Receive airtime for your funds
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
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.79584 4.9992L0.0833435 1.2867L1.14384 0.226196L5.91684 4.9992L1.14384 9.7722L0.0833435 8.7117L3.79584 4.9992Z"
                    fill="#525466"
                  />
                </Svg>
              </View>
            </View>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("GetData")}>
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
                    borderWidth: 1,
                    borderColor: "#E2E3E9",
                    borderRadius: 96,
                    paddingVertical: size.getHeightSize(13),
                    paddingHorizontal: size.getWidthSize(13),
                    height: size.getHeightSize(40),
                    width: size.getWidthSize(40),
                  }}
                >
                  <Svg
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M1.75 7.375C1.75 7.60975 2.09575 8.0185 2.8975 8.41975C3.9355 8.93875 5.40775 9.25 7 9.25C8.59225 9.25 10.0645 8.93875 11.1025 8.41975C11.9042 8.0185 12.25 7.60975 12.25 7.375V5.74675C11.0125 6.51175 9.12025 7 7 7C4.87975 7 2.9875 6.511 1.75 5.74675V7.375ZM12.25 9.49675C11.0125 10.2618 9.12025 10.75 7 10.75C4.87975 10.75 2.9875 10.261 1.75 9.49675V11.125C1.75 11.3597 2.09575 11.7685 2.8975 12.1697C3.9355 12.6887 5.40775 13 7 13C8.59225 13 10.0645 12.6887 11.1025 12.1697C11.9042 11.7685 12.25 11.3597 12.25 11.125V9.49675ZM0.25 11.125V3.625C0.25 1.76125 3.2725 0.25 7 0.25C10.7275 0.25 13.75 1.76125 13.75 3.625V11.125C13.75 12.9887 10.7275 14.5 7 14.5C3.2725 14.5 0.25 12.9887 0.25 11.125ZM7 5.5C8.59225 5.5 10.0645 5.18875 11.1025 4.66975C11.9042 4.2685 12.25 3.85975 12.25 3.625C12.25 3.39025 11.9042 2.9815 11.1025 2.58025C10.0645 2.06125 8.59225 1.75 7 1.75C5.40775 1.75 3.9355 2.06125 2.8975 2.58025C2.09575 2.9815 1.75 3.39025 1.75 3.625C1.75 3.85975 2.09575 4.2685 2.8975 4.66975C3.9355 5.18875 5.40775 5.5 7 5.5Z"
                      fill="#525466"
                    />
                  </Svg>
                </View>
                <View style={{ marginLeft: size.getWidthSize(14) }}>
                  <Text style={styles.actionText}>Get data bundle</Text>
                  <Text style={styles.actionSubText}>
                    Receive data bundle for your funds
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
                  xmlns="http://www.w3.org/2000/svg"
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
