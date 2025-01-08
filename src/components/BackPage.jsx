import React from "react";
import { Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";
import { size } from "../config/size";
import { useNavigation } from "@react-navigation/native";

const BackPage = ({ page }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (page) {
      navigation.navigate(page);
    } else {
      navigation.goBack();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ paddingVertical: size.getHeightSize(14) }}
    >
      <Svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M8.871 11.25H18V12.75H8.871L12.894 16.773L11.8335 17.8335L6 12L11.8335 6.1665L12.894 7.227L8.871 11.25Z"
          fill="#525466"
        />
      </Svg>
    </Pressable>
  );
};

export default BackPage;
