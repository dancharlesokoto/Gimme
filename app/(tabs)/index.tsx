import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import { Svg, Path } from "react-native-svg";
import noTxn from "@/assets/images/noTxn.png";
import Promotion from "@/components/Promotion";
import QuickPayments from "@/components/QuickPayments";
import WalletCard from "@/components/WalletCard";
import Recent from "@/components/Recent";
import { router, useFocusEffect } from "expo-router";
import { User } from "@/types/User";
import { fetchUser } from "@/services/user";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner-native";
import RewardsIcon from "@/assets/svg/rewardsIcon.svg";
import PrimaryOptions from "@/components/Home/PrimaryOptions";
import Todos from "@/components/Home/Todos";
import RewardsCTA from "@/components/Home/RewardsCTA";
import NotificationsIcon from "@/assets/svg/notificationsIcon.svg";

const HomeScreen = () => {
    const [screenRefreshing, setScreenRefreshing] = useState(false);
    //Fetch logic..........................
    const { userId } = useUserStore().user;
    const {
        data: userData,
        isError,
        error,
        isLoading,
        isRefetching,
        refetch,
    } = useQuery({
        queryKey: ["userData", userId],
        retry: true,
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    // Refetch when tab comes into focus
    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    //Error reactive logic..........................
    useEffect(() => {
        isError &&
            toast.error(error.message, {
                duration: 2000,
                dismissible: true,
            });
    }, [error]);

    const handleScreenRefresh = () => {
        setScreenRefreshing(true);
        setTimeout(() => {
            refetch();
            setScreenRefreshing(false);
        }, 500);
    };

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.welcomeText}>Welcome back</Text>
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
                            <RewardsIcon />
                        </Pressable>
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
                    <WalletCard
                        balance={isLoading || isError ? null : userData.balance}
                    />
                    <QuickPayments />
                    {!isLoading && !isError && userData.isKYC ? (
                        <PrimaryOptions />
                    ) : (
                        <Todos />
                    )}
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
                    <View style={{ marginBottom: size.getHeightSize(45) }}>
                        <Image source={noTxn} style={styles.noTxn} />
                        <Text
                            style={{
                                marginTop: size.getHeightSize(20),
                                textAlign: "center",
                                fontFamily: "Satoshi-Regular",
                                fontSize: size.getWidthSize(14),
                            }}
                        >
                            No recent transaction or activities yet.
                        </Text>
                    </View>
                    <Recent />
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
        alignItems: "center",
        paddingTop: size.getHeightSize(36),
        paddingBottom: size.getHeightSize(6),
        paddingHorizontal: size.getWidthSize(24),
    },

    welcomeText: {
        fontSize: size.fontSize(16),
        fontFamily: "Satoshi-Bold",
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
