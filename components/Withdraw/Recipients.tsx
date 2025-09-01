import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { Image } from "expo-image";
import { getWithdrawalBankAccounts } from "@/services/user";
import banks from "@/lib/banks.json";

import { size } from "@/config/size";
import AvatarInitials from "../AvatarInitials";
import { router } from "expo-router";
import EmptyNotificationsIcon from "@/assets/svg/emptyNotifications.svg";

type Data = {
    receiver: DataItem[];
};

type DataItem = {
    userId: string;
    fullName: string;
    profileIMage: any;
};

const Recipients = React.memo(() => {
    const { userId } = useUserStore().user;

    const { data } = useQuery({
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: true,
        queryKey: ["withdrawalBanks", userId],
        queryFn: () => getWithdrawalBankAccounts(),
    });
    const getImage = () => {
        banks.filter((item) => item.code === data.data[0].bankName);
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    borderTopWidth: 0.8,
                    borderColor: "#e2e3e9",
                    marginVertical: size.getHeightSize(18),
                }}
            ></View>
            <Text style={styles.title}>Recent recipients</Text>
            {/* <Text>{JSON.stringify(data)}</Text> */}
            {!data || data.data.length == 0 ? (
                <View style={{ marginVertical: size.getHeightSize(12) }}>
                    <EmptyNotificationsIcon />
                </View>
            ) : (
                <FlatList
                    data={data.data}
                    contentContainerStyle={{
                        marginTop: size.getHeightSize(8),
                        gap: size.getWidthSize(25),
                    }}
                    renderItem={({ item }: { item: any }) => (
                        <Pressable
                            onPress={() =>
                                router.push(
                                    `/screens/(withdraw)/BankAmount?data=${JSON.stringify(
                                        {
                                            sender: data.sender,
                                            recipient: item,
                                        }
                                    )}`
                                )
                            }
                            style={styles.avatarContainer}
                        >
                            <View style={[styles.avatar]}>
                                <AvatarInitials
                                    name={item.accountName}
                                    textStyle={{
                                        fontSize: size.fontSize(12),
                                    }}
                                />
                                {/* <Image
                                contentFit="contain"
                                source={
                                    banks.filter(
                                        (x) => x.code === item.bankCode
                                    )[0].logo
                                }
                                style={styles.logo}
                            /> */}
                            </View>

                            <View>
                                <Text style={[styles.name, { color: "#000" }]}>
                                    {item.accountName}
                                </Text>
                                <Text style={[styles.name]}>
                                    {item.bankName}
                                </Text>
                                <Text style={styles.name}>
                                    {item.accountNumber}
                                </Text>
                            </View>
                        </Pressable>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        paddingBottom: size.getHeightSize(24),
    },
    title: {
        fontSize: size.fontSize(14),
        color: "#0A0B14",
        fontFamily: "ClashDisplay-Medium",
        marginBottom: size.getWidthSize(10),
    },

    avatarContainer: {
        justifyContent: "center",
        gap: size.getWidthSize(4),
        // alignItems: "center",
    },
    avatar: {
        width: size.getWidthSize(60),
        height: size.getHeightSize(60),
        borderRadius: size.getHeightSize(30),
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        position: "relative",
        borderStyle: "dashed",
        borderColor: "#3366FF",
    },
    logo: {
        position: "absolute",
        width: size.getWidthSize(20),
        height: size.getHeightSize(20),
        right: -size.getWidthSize(5),
        bottom: -size.getWidthSize(5),
        borderRadius: size.getHeightSize(200),
    },
    name: {
        fontSize: size.fontSize(11),
        color: "#525466",
        // textAlign: "center",
        fontFamily: "Satoshi-Medium",
    },
});

export default Recipients;
