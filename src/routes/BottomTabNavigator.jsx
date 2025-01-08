import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
// Import your screens
import HomeScreen from "../screens/HomeScreen";
import P2P from "../screens/P2P/P2P";
import Market from "../screens/Market/Market";
import Activities from "../screens/Activities/Activities";
import Profile from "../screens/Profile/Profile";
import HomeIcon from "../../assets/svg/home.svg";
import P2PIcon from "../../assets/svg/p2p.svg";
import MarketIcon from "../../assets/svg/market.svg";
import ActivitiesIcon from "../../assets/svg/activities.svg";

import ActiveHome from "../../assets/svg/activeHome.svg";
import ActiveP2P from "../../assets/svg/activeP2p.svg";
import ActiveMarket from "../../assets/svg/activeMarket.svg";
import ActiveActivities from "../../assets/svg/activeActivities.svg";
import ProfileIcon from "../../assets/user.png";
import { size } from "../config/size";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let IconComponent;

          // Determine which icon component to use based on the route name and focus state
          if (route.name === "Home") {
            IconComponent = focused ? (
              <ActiveHome width={28} height={28} />
            ) : (
              <HomeIcon width={28} height={28} />
            );
          } else if (route.name === "P2P") {
            IconComponent = focused ? (
              <ActiveP2P width={28} height={28} />
            ) : (
              <P2PIcon width={28} height={28} />
            );
          } else if (route.name === "Market") {
            IconComponent = focused ? (
              <ActiveMarket width={28} height={28} />
            ) : (
              <MarketIcon width={28} height={28} />
            );
          } else if (route.name === "Activities") {
            IconComponent = focused ? (
              <ActiveActivities width={28} height={28} />
            ) : (
              <ActivitiesIcon width={28} height={28} />
            );
          } else if (route.name === "Profile") {
            IconComponent = (
              <Image source={ProfileIcon} style={{ width: 28, height: 28 }} />
            );
          }

          return IconComponent;
        },
        tabBarActiveTintColor: "#374BFB", // Active icon color
        tabBarInactiveTintColor: "gray", // Inactive icon color
        tabBarStyle: {
          height: size.getHeightSize(85),
          paddingBottom: size.getHeightSize(20),
          paddingTop: size.getHeightSize(20),
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="P2P" component={P2P} options={{ headerShown: false }} />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
