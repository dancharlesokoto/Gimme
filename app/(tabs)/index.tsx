import React, { useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    ScrollView,
    RefreshControl,
    TouchableOpacity,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Promotion from "@/components/Promotion";
import QuickPayments from "@/components/QuickPayments";
import { router, useFocusEffect } from "expo-router";
import {
    fetchUser,
    getBankAccount,
    getWithdrawalBankAccounts,
} from "@/services/user";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import PrimaryOptions from "@/components/Home/PrimaryOptions";
import Todos from "@/components/Home/Todos";
import RewardsCTA from "@/components/Home/RewardsCTA";
import QrIcon from "@/assets/svg/qrIcon.svg";
import NotificationsIcon from "@/assets/svg/notificationsIcon.svg";

import Transactions from "@/components/Home/Transactions";
import WalletCarousel from "@/components/Home/WalletCarousel";
import { IMAGE_URL } from "@/services/api";
import AvatarInitials from "@/components/AvatarInitials";
import { Image } from "expo-image";

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
        refetchInterval: 1000 * 60 * 5,
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
    useQuery({
        retry: true,
        queryKey: ["getBankAccount", userId],
        queryFn: getBankAccount,
    });

    //preloading this data to cache and to avoid long times
    useQuery({
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: true,
        queryKey: ["withdrawalBanks", userId],
        queryFn: () => getWithdrawalBankAccounts(),
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
                                <AvatarInitials
                                    name=""
                                    style={{
                                        width: size.getWidthSize(45),
                                        height: size.getHeightSize(45),
                                    }}
                                />
                            ) : userData.profileImage == "default.png" ? (
                                <AvatarInitials
                                    name={userData.fullName}
                                    textStyle={{
                                        fontSize: size.fontSize(12),
                                    }}
                                    style={{
                                        width: size.getHeightSize(45),
                                        height: size.getHeightSize(45),
                                    }}
                                />
                            ) : (
                                <View
                                    style={{
                                        borderRadius: size.getWidthSize(30),
                                        width: size.getWidthSize(45),
                                        height: size.getHeightSize(45),
                                        borderWidth: 1,
                                        borderColor: "#374BFB",
                                        borderStyle: "dotted",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                >
                                    <Image
                                        contentFit="cover"
                                        source={`${IMAGE_URL}/profile/${userData.profileImage}`}
                                        style={{
                                            borderRadius: size.getWidthSize(30),
                                            width: size.getWidthSize(35),
                                            height: size.getWidthSize(35),
                                        }}
                                    />
                                </View>
                            )}
                        </TouchableOpacity>

                        {!isLoading && !isError && (
                            <View
                                style={{
                                    justifyContent: "center",
                                }}
                            >
                                <Text style={styles.welcomeText}>
                                    Welcome back,
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <Text style={[styles.welcomeName]}>
                                        {userData.fullName.split(" ")[0]}{" "}
                                    </Text>
                                    <Text
                                        style={{ fontSize: size.fontSize(12) }}
                                    ></Text>
                                </View>
                            </View>
                        )}
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            gap: size.getWidthSize(12),
                            alignItems: "center",
                        }}
                    >
                        <Pressable
                            hitSlop={5}
                            onPress={() => router.push("/screens/QrScanner")}
                        >
                            <QrIcon
                                strokeWidth={1.2}
                                color={"#010101"}
                                width={size.getWidthSize(32)}
                                height={size.getHeightSize(30)}
                            />
                        </Pressable>
                        <Pressable
                            hitSlop={5}
                            style={{
                                position: "relative",
                            }}
                            onPress={() =>
                                router.push("/screens/Notifications")
                            }
                        >
                            <NotificationsIcon
                                width={size.getWidthSize(35)}
                                height={size.getHeightSize(35)}
                            />
                            <View
                                style={{
                                    position: "absolute",
                                    top: size.getHeightSize(0),
                                    right: size.getWidthSize(2),
                                    width: size.getWidthSize(8),
                                    height: size.getHeightSize(8),
                                    borderRadius: size.getWidthSize(10),
                                    backgroundColor: "#374BFB",
                                }}
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
                    contentContainerStyle={{
                        gap: size.getHeightSize(24),
                    }}
                    showsVerticalScrollIndicator={false}
                    overScrollMode="always"
                >
                    <WalletCarousel
                        userData={userData}
                        isError={isError}
                        isLoading={!userData}
                    />

                    <Todos />

                    <PrimaryOptions />
                    <QuickPayments
                        data={
                            isLoading || isError ? [] : userData.quickPayments
                        }
                    />
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
        paddingTop: size.getHeightSize(24),
        paddingBottom: size.getHeightSize(12),
        paddingHorizontal: size.getWidthSize(24),
    },

    welcomeText: {
        lineHeight: size.fontSize(20),
        fontSize: size.fontSize(12),
        fontFamily: "Satoshi-Medium",
        color: "rgba(0, 0, 0, 0.6)",
    },

    welcomeName: {
        lineHeight: size.fontSize(17),
        fontSize: size.fontSize(17),
        fontFamily: "ClashDisplay-Medium",
        color: "rgba(0, 0, 0, 1)",
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
