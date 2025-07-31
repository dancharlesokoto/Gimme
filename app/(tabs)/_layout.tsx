import { size } from "@/config/size";
import { Redirect, router, Tabs, usePathname } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { AppState, Image, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeIcon from "@/assets/svg/tabs/home.svg";
import CardsIcon from "@/assets/svg/tabs/cards.svg";
import MarketIcon from "@/assets/svg/tabs/market.svg";
import ActivitiesIcon from "@/assets/svg/tabs/activities.svg";
import { Colors } from "@/constants/Colors";

import ActiveHome from "../../assets/svg/tabs/activeHome.svg";
import ActiveCards from "../../assets/svg/tabs/activeCards.svg";
import ActiveMarket from "../../assets/svg/tabs/activeMarket.svg";
import ActiveActivities from "../../assets/svg/tabs/activeActivities.svg";
import { useUserStore } from "@/store/userStore";
import { IMAGE_URL } from "@/services/api";

export default function TabLayout() {
    const user = useUserStore((state) => state.user);
    const isStale = useUserStore((state) => state.isStale);
    const insets = useSafeAreaInsets();
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                console.log("Current state:", appState.current);
                console.log("Next state:", nextAppState);

                if (
                    appState.current === "active" &&
                    nextAppState.match(/inactive|background/)
                ) {
                    useUserStore.getState().setIsStale(true);
                    console.log("🔒 App is going to background or closed");
                    // You can trigger logout, save data, or other cleanup here
                }

                if (nextAppState === "active") {
                    console.log("📲 App has come to the foreground");
                }

                appState.current = nextAppState;
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    if (!user.userId) {
        return <Redirect href="/onboarding/main" />;
    }

    if (isStale) {
        return <Redirect href="/onboarding/ReEnterPin" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.text,
                tabBarInactiveTintColor: Colors.lightText,
                animation: "shift",
                tabBarButton: (props: any) => (
                    <TouchableOpacity activeOpacity={0.3} {...props} />
                ),
                tabBarStyle: {
                    height: size.getHeightSize(80) + insets.bottom,
                    elevation: 0,
                    alignItems: "center",
                    paddingTop: size.getHeightSize(8),
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
                name="cards"
                options={{
                    headerShown: false,
                    title: "Cards",
                    tabBarIcon({ focused }: { focused: boolean }) {
                        return focused ? (
                            <ActiveCards
                                width={size.getWidthSize(24)}
                                height={size.getHeightSize(24)}
                            />
                        ) : (
                            <CardsIcon
                                width={size.getWidthSize(24)}
                                height={size.getHeightSize(24)}
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
                                width={size.getWidthSize(30)}
                                height={size.getHeightSize(30)}
                            />
                        ) : (
                            <MarketIcon
                                width={size.getWidthSize(30)}
                                height={size.getHeightSize(30)}
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
                        if (
                            !user.profileImage ||
                            user.profileImage === "default.png"
                        ) {
                            return (
                                <Image
                                    source={require("@/assets/images/user.png")}
                                    style={{
                                        width: size.getWidthSize(28),
                                        height: size.getHeightSize(28),
                                        borderRadius: size.getWidthSize(14),
                                    }}
                                />
                            );
                        } else {
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
                        }
                    },
                }}
            />
        </Tabs>
    );
}
