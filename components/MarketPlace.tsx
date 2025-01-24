import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  RefreshControl,
} from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import MarketPlaceCategories from "./MarketPlaceCategories";
import MarketPlaceRecommended from "./MarketPlaceRecommended";

export default function MarketPlace() {
  const [screenRefreshing, setScreenRefreshing] = React.useState(false);
  const handleScreenRefresh = () => {
    setScreenRefreshing(true);
    setTimeout(() => {
      setScreenRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M9.25 2.5C12.976 2.5 16 5.524 16 9.25C16 12.976 12.976 16 9.25 16C5.524 16 2.5 12.976 2.5 9.25C2.5 5.524 5.524 2.5 9.25 2.5ZM9.25 14.5C12.1502 14.5 14.5 12.1502 14.5 9.25C14.5 6.349 12.1502 4 9.25 4C6.349 4 4 6.349 4 9.25C4 12.1502 6.349 14.5 9.25 14.5ZM15.6137 14.5532L17.7355 16.6742L16.6742 17.7355L14.5532 15.6137L15.6137 14.5532Z"
              fill="#868898"
            />
          </Svg>
          <TextInput
            placeholder="Search on market place"
            style={{
              flex: 1,
              color: "#868898",
              fontSize: size.fontSize(14),
              fontFamily: "Satoshi-Regular",
            }}
          />
          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            // xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M8.5 14.5H11.5V13H8.5V14.5ZM3.25 5.5V7H16.75V5.5H3.25ZM5.5 10.75H14.5V9.25H5.5V10.75Z"
              fill="#868898"
            />
          </Svg>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={["#374BFB"]}
            refreshing={screenRefreshing}
            onRefresh={handleScreenRefresh}
          />
        }
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <MarketPlaceCategories />
        <MarketPlaceRecommended />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: size.getHeightSize(24),
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    height: size.getHeightSize(40),
    borderRadius: size.getWidthSize(12),
    gap: size.getWidthSize(4),
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#E2E3E9",
    paddingHorizontal: size.getWidthSize(10),
  },
});
