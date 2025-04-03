import { size } from "@/config/size";
import { Redirect, Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
import Splash from "@/components/Splash";
import { useUserStore } from "@/store/userStore";
import { IMAGE_URL } from "@/services/api";

export default function TabLayout() {
    const { user } = useUserStore();
    const insets = useSafeAreaInsets();

    if (!user.userId) {
        return <Redirect href="/onboarding/main" />;
    }
    if (!user.isVerified) {
        return <Redirect href="/onboarding/Verify" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.text,
                tabBarInactiveTintColor: Colors.lightText,
                tabBarButton: (props: any) => (
                    <TouchableOpacity activeOpacity={0.3} {...props} />
                ),
                tabBarStyle: {
                    height: size.getHeightSize(75) + insets.bottom,
                    elevation: 0,
                    alignItems: "center",
                    paddingTop: size.getHeightSize(10),
                    paddingBottom: insets.bottom,
                    justifyContent: "center",
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
                                source={{
                                    uri:
                                        IMAGE_URL +
                                        "/profile/" +
                                        user.profileImage,
                                }}
                                style={{
                                    width: size.getWidthSize(28),
                                    height: size.getHeightSize(28),
                                    borderRadius: size.getWidthSize(14),
                                }}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
}
