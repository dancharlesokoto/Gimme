import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Import bottom tab navigator
import { Animated, Easing } from "react-native";
import Splashscreen from "../screens/onboarding/SplashScreen";
import OnboardingOne from "../screens/onboarding/OnboardingOne";
import Create from "../screens/Create";
import Login from "../screens/Login";
import Verify from "../screens/Verify";
import SetPin from "../screens/SetPin";
import ConfirmPin from "../screens/ConfirmPin";
import EnterPin from "../screens/EnterPin";
import Fund from "../screens/Fund/Fund";
import Withdraw from "../screens/Withdraw/Withdraw";
import FundCard from "../screens/Fund/FundCard";
import FundAirtime from "../screens/Fund/FundAirtime";
import Receipt from "../screens/Global/Receipt";
import FundData from "../screens/Fund/FundData";
import GetCash from "../screens/Withdraw/GetCash";
import GetAirtime from "../screens/Withdraw/GetAirtime";
import GetData from "../screens/Withdraw/GetData";
import AddCard from "../screens/Fund/AddCard";
import NewCard from "../screens/Fund/NewCard";
import AddBank from "../screens/Withdraw/AddBank";
import NewBank from "../screens/Withdraw/NewBank";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Create a bottom tab navigator

const Navigation = () => {
  const config = {
    animation: Animated.timing,
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  const closeconfig = {
    animation: "timing",
    config: {
      duration: 200,
      easing: Easing.linear,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        transitionSpec: {
          open: config,
          close: closeconfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        options={{ headerShown: false }}
        component={Splashscreen}
      />
      <Stack.Screen
        name="OnboardingOne"
        options={{ headerShown: false }}
        component={OnboardingOne}
      />
      <Stack.Screen
        name="Create"
        options={{ headerShown: false }}
        component={Create}
      />
      <Stack.Screen
        name="Login"
        options={{ headerShown: false }}
        component={Login}
      />
      <Stack.Screen
        name="Verify"
        options={{ headerShown: false }}
        component={Verify}
      />
      <Stack.Screen
        name="SetPin"
        options={{ headerShown: false }}
        component={SetPin}
      />
      <Stack.Screen
        name="ConfirmPin"
        options={{ headerShown: false }}
        component={ConfirmPin}
      />
      <Stack.Screen
        name="EnterPin"
        options={{ headerShown: false }}
        component={EnterPin}
      />
      <Stack.Screen
        name="BottomTabs"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="Fund"
        options={{ headerShown: false }}
        component={Fund}
      />
      <Stack.Screen
        name="Withdraw"
        options={{ headerShown: false }}
        component={Withdraw}
      />

      <Stack.Screen
        name="FundCard"
        options={{ headerShown: false }}
        component={FundCard}
      />
      <Stack.Screen
        name="FundAirtime"
        options={{ headerShown: false }}
        component={FundAirtime}
      />
      <Stack.Screen
        name="Receipt"
        options={{ headerShown: false }}
        component={Receipt}
      />
      <Stack.Screen
        name="FundData"
        options={{ headerShown: false }}
        component={FundData}
      />
      <Stack.Screen
        name="GetCash"
        options={{ headerShown: false }}
        component={GetCash}
      />
      <Stack.Screen
        name="GetAirtime"
        options={{ headerShown: false }}
        component={GetAirtime}
      />
      <Stack.Screen
        name="GetData"
        options={{ headerShown: false }}
        component={GetData}
      />
      <Stack.Screen
        name="AddCard"
        options={{ headerShown: false }}
        component={AddCard}
      />
      <Stack.Screen
        name="NewCard"
        options={{ headerShown: false }}
        component={NewCard}
      />
      <Stack.Screen
        name="AddBank"
        options={{ headerShown: false }}
        component={AddBank}
      />
      <Stack.Screen
        name="NewBank"
        options={{ headerShown: false }}
        component={NewBank}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
