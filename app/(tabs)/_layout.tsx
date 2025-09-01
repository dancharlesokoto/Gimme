import { size } from "@/config/size";
import { Redirect, Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
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
import { Image } from "expo-image";
import useSessionTimeout from "@/hooks/useSessionTimeout";
import AvatarInitials from "@/components/AvatarInitials";

export default function TabLayout() {
    const user = useUserStore((state) => state.user);
    const insets = useSafeAreaInsets();
    const { isStale } = useSessionTimeout();

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
                tabBarActiveTintColor: "#374BFB",
                tabBarInactiveTintColor: Colors.lightText,
                tabBarLabelStyle: {
                    fontFamily: "Satoshi-Medium",
                    fontSize: size.fontSize(11),
                },
                tabBarButton: (props: any) => (
                    <TouchableOpacity activeOpacity={0.9} {...props} />
                ),
                tabBarStyle: {
                    height: size.getHeightSize(80) + insets.bottom,
                    elevation: 0,
                    alignItems: "center",
                    paddingTop: size.getHeightSize(8),
                    paddingBottom: insets.bottom,
                    justifyContent: "center",
                },
                lazy: false,
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
                    title: "Marketplace",
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
                    tabBarIcon({ focused }) {
                        if (
                            !user.profileImage ||
                            user.profileImage === "default.png"
                        ) {
                            return (
                                <View
                                    style={{
                                        width: size.getWidthSize(30),
                                        height: size.getHeightSize(30),
                                        borderWidth: size.getWidthSize(1),
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: size.getWidthSize(100),
                                        borderColor: focused
                                            ? "#374BFB"
                                            : "#E2E3E9",
                                    }}
                                >
                                    <AvatarInitials
                                        name={user.name}
                                        textStyle={{
                                            fontSize: size.fontSize(12),
                                        }}
                                        style={{
                                            width: size.getWidthSize(22),
                                            height: size.getHeightSize(22),
                                        }}
                                    />
                                </View>
                            );
                        } else {
                            return (
                                <View
                                    style={{
                                        width: size.getWidthSize(30),
                                        height: size.getHeightSize(30),
                                        borderWidth: size.getWidthSize(1),
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderRadius: size.getWidthSize(100),
                                        borderColor: focused
                                            ? "#374BFB"
                                            : "#E2E3E9",
                                    }}
                                >
                                    <Image
                                        source={
                                            IMAGE_URL +
                                            "/profile/" +
                                            user.profileImage
                                        }
                                        contentFit="cover"
                                        style={{
                                            width: size.getWidthSize(22),
                                            height: size.getHeightSize(22),
                                            borderRadius:
                                                size.getWidthSize(100),
                                        }}
                                    />
                                </View>
                            );
                        }
                    },
                }}
            />
        </Tabs>
    );
}
