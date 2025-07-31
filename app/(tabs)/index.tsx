import React, { useEffect, useState } from "react";
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
import RewardsIcon from "@/assets/svg/rewardsIcon.svg";
import PrimaryOptions from "@/components/Home/PrimaryOptions";
import Todos from "@/components/Home/Todos";
import RewardsCTA from "@/components/Home/RewardsCTA";
import NotificationsIcon from "@/assets/svg/notificationsIcon.svg";
import useCurrencyStore from "@/store/currencyStore";
import Transactions from "@/components/Home/Transactions";
import WalletCarousel from "@/components/Home/WalletCarousel";
import { IMAGE_URL } from "@/services/api";
import ContentLoader, { Rect } from "react-content-loader/native";
import { toast } from "sonner-native";

const HomeScreen = () => {
    const [screenRefreshing, setScreenRefreshing] = useState(false);
    const currency = useCurrencyStore((state: any) => state.currency);
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
    const {
        data: accountDetails,
        error: accountError,
        isError: accountIsError,
        isLoading: accountIsLoading,
    } = useQuery({
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

                        <Text style={styles.welcomeText}>
                            {!isLoading && !isError ? (
                                "Welcome, " + userData.fullName.split(" ")[0]
                            ) : (
                                <ContentLoader
                                    style={{
                                        height: size.getHeightSize(15),
                                        paddingVertical: size.getHeightSize(5),
                                    }}
                                    viewBox="0 0 100 15"
                                    foregroundColor="#fff"
                                    backgroundColor="#E2E3E9"
                                >
                                    <Rect
                                        y="1"
                                        rx="5"
                                        ry="5"
                                        width="90"
                                        height="15"
                                    />
                                </ContentLoader>
                            )}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: size.getWidthSize(8),
                            alignItems: "center",
                        }}
                    >
                        {/* <Pressable
                            hitSlop={20}
                            onPress={() =>
                                router.push("/screens/(earn)/Rewards")
                            }
                        >
                            <RewardsIcon />
                        </Pressable> */}
                        <Pressable
                            hitSlop={20}
                            onPress={() =>
                                router.push("/screens/Notifications")
                            }
                        >
                            <NotificationsIcon />
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
                    <QuickPayments />
                    <PrimaryOptions />

                    <View
                        style={{
                            borderRadius: "20px",
                            padding: size.getHeightSize(24),
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
};

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
        fontSize: size.fontSize(18),
        fontFamily: "Satoshi-Medium",
    },

    iconButton: {
        padding: size.getWidthSize(12),
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E2E3E9",
        justifyContent: "center",
        alignItems: "center",
    },

    featureCard: {
        backgroundColor: "#F7F7F7",
        borderRadius: 15,
        paddingVertical: size.getHeightSize(12),
        paddingHorizontal: size.getWidthSize(12),
        width: size.getWidthSize(160.5),
    },

    iconContainer: {
        backgroundColor: "#E0E0E0",
        borderRadius: 30,
        padding: 10,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
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
