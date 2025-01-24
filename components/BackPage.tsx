import React from "react";
import { Pressable } from "react-native";
import { Svg, Path } from "react-native-svg";
import { size } from "@/config/size";
import { useRouter } from "expo-router";

const BackPage = ({
  page,
  type = "push",
}: {
  page?: any;
  type?: "push" | "replace";
}) => {
  const router = useRouter();
  const handlePress = () => {
    if (page) {
      if (type === "push") {
        router.push(page);
      } else if (type === "replace") {
        router.replace(page);
      }
    } else {
      router.back();
    }
  };

  return (
    <Pressable onPress={handlePress} hitSlop={size.getWidthSize(10)}>
      <Svg width="30" height="30" viewBox="0 0 24 24" fill="none">
        <Path
          d="M8.871 11.25H18V12.75H8.871L12.894 16.773L11.8335 17.8335L6 12L11.8335 6.1665L12.894 7.227L8.871 11.25Z"
          fill="#525466"
        />
      </Svg>
    </Pressable>
  );
};

export default BackPage;
