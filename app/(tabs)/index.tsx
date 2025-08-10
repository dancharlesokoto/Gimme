import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    RefreshControl,
    Image,
    TouchableOpacity,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Promotion from "@/components/Promotion";
import QuickPayments from "@/components/QuickPayments";
import { router, useFocusEffect } from "expo-router";
import { fetchUser, getBankAccount } from "@/services/user";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import PrimaryOptions from "@/components/Home/PrimaryOptions";
import Todos from "@/components/Home/Todos";
import RewardsCTA from "@/components/Home/RewardsCTA";
import QrIcon from "@/assets/svg/qrIcon.svg";
import NotificationsIcon from "@/assets/svg/notificationsIcon.svg";
import RewardsIcon from "@/assets/svg/rewardsIcon.svg";
import Transactions from "@/components/Home/Transactions";
import WalletCarousel from "@/components/Home/WalletCarousel";
import { IMAGE_URL } from "@/services/api";
import Svg, { Path } from "react-native-svg";

const HomeScreen = React.memo(() => {
    const [screenRefreshing, setScreenRefreshing] = useState(false);
    //Fetch logic..........................
    const { userId } = useUserStore().user;
    const {
        data: userData,
        isError,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery({
        queryKey: ["getUser", userId],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        retryOnMount: true,
        retry: true,
    });

    // Refetch when tab comes into focus
    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    const handleScreenRefresh = () => {
        setScreenRefreshing(true);
        setTimeout(() => {
            refetch();
            setScreenRefreshing(false);
        }, 500);
    };

    //Preloading this data to cache and to avoid long times
    const dva_prefetch = useQuery({
        retry: true,
        queryKey: ["getBankAccount", userId],
        queryFn: getBankAccount,
    });

    return (
        <CustomSafeArea
            topColor="#ffffff"
            bgColor="#ffffff"
            setBottomSafeAreaInset={false}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            gap: size.getWidthSize(8),
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity
                            style={{ display: "none" }}
                            hitSlop={size.getWidthSize(20)}
                            onPress={() => router.push(`/(tabs)/profile`)}
                        >
                            {isLoading || isError ? (
                                <Image
                                    source={require("@/assets/images/user.png")}
                                    alt=""
                                    style={{
                                        width: size.getWidthSize(40),
                                        borderWidth: 1,
                                        borderColor: "#E2E3E9",
                                        height: size.getHeightSize(40),
                                        borderRadius: size.getWidthSize(1000),
                                    }}
                                />
                            ) : (
                                <Image
                                    loadingIndicatorSource={require("@/assets/images/user.png")}
                                    source={{
                                        uri:
                                            IMAGE_URL +
                                            "/profile/" +
                                            userData.profileImage,
                                    }}
                                    alt=""
                                    style={{
                                        width: size.getWidthSize(40),
                                        borderWidth: 1,
                                        borderColor: "#E2E3E9",
                                        height: size.getHeightSize(40),
                                        borderRadius: size.getWidthSize(1000),
                                    }}
                                />
                            )}
                        </TouchableOpacity>

                        <Text style={styles.welcomeText}>Welcome back</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: size.getWidthSize(8),
                            alignItems: "center",
                        }}
                    >
                        <Pressable
                            hitSlop={20}
                            onPress={() =>
                                router.push("/screens/(earn)/Rewards")
                            }
                        >
                            <Svg
                                // xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1"
                                stroke="#525466"
                                width={size.getWidthSize(30)}
                                height={size.getHeightSize(30)}
                            >
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z"
                                />
                                <Path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75ZM13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z"
                                />
                            </Svg>
                        </Pressable>
                        <Pressable
                            hitSlop={20}
                            onPress={() =>
                                router.push("/screens/Notifications")
                            }
                        >
                            <NotificationsIcon
                                width={size.getWidthSize(40)}
                                height={size.getHeightSize(40)}
                            />
                        </Pressable>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            colors={["#374BFB"]}
                            refreshing={screenRefreshing}
                            onRefresh={handleScreenRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    overScrollMode="always"
                >
                    <WalletCarousel
                        userData={userData}
                        isError={isError}
                        isLoading={isLoading}
                    />

                    <Todos />
                    <QuickPayments
                        data={
                            isLoading || isError ? [] : userData.quickPayments
                        }
                    />
                    <PrimaryOptions />

                    <View
                        style={{
                            borderRadius: size.getWidthSize(16),
                            paddingHorizontal: size.getHeightSize(24),
                            paddingBottom: 0,
                        }}
                    >
                        <Promotion />
                    </View>
                    <RewardsCTA />

                    <Transactions isPageRefetching={isRefetching} />
                    {/* <Recent /> */}
                </ScrollView>
            </View>
        </CustomSafeArea>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: size.getWidthSize(12),
        alignItems: "center",
        paddingTop: size.getHeightSize(36),
        paddingBottom: size.getHeightSize(3),
        paddingHorizontal: size.getWidthSize(24),
    },

    welcomeText: {
        flex: 1,
        fontSize: size.fontSize(16),
        fontFamily: "Satoshi-Bold",
        color: "rgba(0, 0, 0, 0.8)",
    },

    iconButton: {
        padding: size.getWidthSize(12),
        borderRadius: size.getWidthSize(16),
        borderWidth: 1,
        borderColor: "#E2E3E9",
        justifyContent: "center",
        alignItems: "center",
    },

    featureCard: {
        backgroundColor: "#F7F7F7",
        borderRadius: size.getWidthSize(15),
        paddingVertical: size.getHeightSize(12),
        paddingHorizontal: size.getWidthSize(12),
        width: size.getWidthSize(160.5),
    },

    iconContainer: {
        backgroundColor: "#E0E0E0",
        borderRadius: size.getWidthSize(30),
        padding: size.getWidthSize(10),
        marginBottom: size.getWidthSize(10),
    },
    cardText: {
        fontSize: size.fontSize(16),
        fontWeight: "bold",
        textAlign: "center",
        marginTop: size.getHeightSize(10),
    },

    badge: {
        backgroundColor: "#E2E3E9",
        borderRadius: size.getWidthSize(8),
        paddingHorizontal: size.getWidthSize(4),
        height: size.getHeightSize(20),
        justifyContent: "center",
    },

    badgeText: {
        fontSize: size.fontSize(10),
        color: "#525466",
    },

    featureIcon: {
        height: size.getHeightSize(44),
        width: size.getHeightSize(44),
        padding: size.getHeightSize(12),
        borderRadius: size.getHeightSize(16),
        justifyContent: "center",
        alignItems: "center",
    },

    featureText: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
    },

    noTxn: {
        alignSelf: "center",
        width: size.getHeightSize(108),
        height: size.getHeightSize(108),
    },
});

export default HomeScreen;
