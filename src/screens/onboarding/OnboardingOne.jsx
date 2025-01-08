import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import Img from "../../../assets/svg/phone.svg";
import CustomSafeArea from "../../shared/CustomSafeArea";
import { size } from "../../config/size";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAppFonts } from "../../hooks/useAppFont";

const OnboardingOne = () => {
  const navigation = useNavigation();
  const isFontsLoaded = useAppFonts();
  // if (!isFontsLoaded) return null;

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
              }}
            >
              Make transactions faster with Gimme
            </Text>
            <Text
              style={{
                fontSize: size.fontSize(14),
                fontFamily: "Satoshi-Medium",
                textAlign: "center",
                paddingTop: size.getHeightSize(8),
              }}
            >
              Find the best way to send and receive money for goods and services
              using your airtime and data.
            </Text>
          </View>
          <View style={{ marginTop: size.getHeightSize(38) }}>
            <Button
              text="Create account"
              width="166"
              onPress={() => navigation.navigate("Create")}
            />
          </View>
          <Text
            style={{
              fontSize: size.fontSize(14),
              textAlign: "center",
              paddingTop: size.getHeightSize(38),
              textDecorationLine: "underline",
              fontFamily: "Satoshi-Medium",
            }}
            onPress={() => navigation.navigate("Login")} // Make this text clickable
          >
            Login, if you already have an account
          </Text>
        </View>
      </View>
    </CustomSafeArea>
  );
};

export default OnboardingOne;
