import { size } from "@/config/size";
import { Redirect, router, Stack, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, View } from "react-native";

import HomeIcon from "@/assets/svg/home.svg";
import P2PIcon from "@/assets/svg/p2p.svg";
import MarketIcon from "@/assets/svg/market.svg";
import ActivitiesIcon from "@/assets/svg/activities.svg";
import ProfileIcon from "@/assets/images/user.png";
import { Colors } from "@/constants/Colors";

import ActiveHome from "../../assets/svg/activeHome.svg";
import ActiveP2P from "../../assets/svg/activeP2p.svg";
import ActiveMarket from "../../assets/svg/activeMarket.svg";
import ActiveActivities from "../../assets/svg/activeActivities.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Splash from "@/components/Splash";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [userAuthToken, setUserAuthToken] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    async function checkUserSession() {
      try {
        const user = await AsyncStorage.getItem("USER_AUTH_TOKEN");
        if (user) {
          setUserAuthToken(JSON.parse(user));
        } else {
          setUserAuthToken(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    checkUserSession();
  }, [pathname]);

  if (isLoading) {
    return <Splash />;
  }

  if (!userAuthToken) {
    return <Redirect href="/onboarding/main" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.text,
        tabBarInactiveTintColor: Colors.lightText,
        tabBarStyle: {
          height: size.getHeightSize(85),
          paddingBottom: size.getHeightSize(20),
          paddingTop: size.getHeightSize(20),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon({ focused }: { focused: boolean }) {
            return focused ? (
              <ActiveHome
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            ) : (
              <HomeIcon
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="p2p"
        options={{
          headerShown: false,
          title: "P2P",
          tabBarIcon({ focused }: { focused: boolean }) {
            return focused ? (
              <ActiveP2P
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            ) : (
              <P2PIcon
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          headerShown: false,
          title: "Market Place",
          tabBarIcon({ focused }: { focused: boolean }) {
            return focused ? (
              <ActiveMarket
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            ) : (
              <MarketIcon
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          headerShown: false,
          title: "Activities",
          tabBarIcon({ focused }: { focused: boolean }) {
            return focused ? (
              <ActiveActivities
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            ) : (
              <ActivitiesIcon
                width={size.getWidthSize(28)}
                height={size.getHeightSize(28)}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon(props) {
            return (
              <Image
                source={ProfileIcon}
                style={{
                  width: size.getWidthSize(28),
                  height: size.getHeightSize(28),
                }}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
