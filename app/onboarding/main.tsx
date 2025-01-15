import React from "react";
import { Text, View } from "react-native";
import Img from "@/assets/svg/phone.svg";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";

const OnboardingScreen = () => {
  const router = useRouter();
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingTop: size.getHeightSize(97),
            paddingHorizontal: size.getHeightSize(28),
            alignItems: "center",
          }}
        >
          <Img />
          <View
            style={{
              paddingHorizontal: size.getHeightSize(28),
              paddingTop: size.getHeightSize(70),
            }}
          >
            <Text
              style={{
                fontSize: size.fontSize(28),
                // fontWeight: "700",
                textAlign: "center",
                fontFamily: "Satoshi-Bold",
                color: Colors.text,
              }}
            >
              Make transactions faster with Gimme
            </Text>
            <Text
              style={{
                fontSize: size.fontSize(14),
                fontFamily: "Satoshi-Regular",
                textAlign: "center",
                paddingTop: size.getHeightSize(8),
                color: Colors.lightText,
              }}
            >
              Find the best way to send and receive money for goods and services
              using your airtime and data.
            </Text>
          </View>
          <View style={{ marginTop: size.getHeightSize(38) }}>
            <Button
              text="Create account"
              width={166}
              onPress={() => router.push("./Signup")}
            />
          </View>
          <Text
            style={{
              fontSize: size.fontSize(15),
              textAlign: "center",
              paddingTop: size.getHeightSize(38),
              textDecorationLine: "underline",
              fontFamily: "Satoshi-Medium",
            }}
            onPress={() => router.push("./Login")} // Make this text clickable
          >
            Login, if you already have an account
          </Text>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default OnboardingScreen;
