import React, { useEffect, useRef } from "react";
import { Text, View, Image, Animated, Easing } from "react-native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { StackActions } from "@react-navigation/native";
import CustomSafeArea from "../../shared/CustomSafeArea";
import { useNavigation } from "@react-navigation/native";
import SplashIcon from "../../../assets/splash.png";

const Splashscreen = () => {
  const { navigate, dispatch } = useNavigation();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    setTimeout(() => {
      dispatch(StackActions.replace("OnboardingOne"));
    }, 2000);
  }, [scaleAnim, dispatch]);

  const config = {
    animation: Animated.timing,
    config: {
      duration: 1000,
      easing: Easing.linear,
    },
  };

  return (
    <CustomSafeArea
      topColor="#161E64"
      bgColor="#161E64"
      screenOptions={{
        gestureEnabled: false,
        transitionSpec: {
          open: config,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            width: 100,
            height: 75,
            transform: [{ scale: scaleAnim }], // Apply the scaling animation
          }}
        >
          <Image
            source={SplashIcon}
            style={{
              height: "100%",
              width: "100%",
            }}
            resizeMode="cover"
          />
        </Animated.View>
      </View>
    </CustomSafeArea>
  );
};

export default Splashscreen;
