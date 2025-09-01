import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import EmptyActivity from "@/components/EmptyActivity";
import { getTransactions } from "@/services/transactions";
import { useUserStore } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { formatCurrency } from "@/lib/currency";

//Icons......
import WithdrawIcon from "@/assets/svg/withdrawIcon.svg"; //...
import DepositIcon from "@/assets/svg/depositIcon.svg";
import SendIcon from "@/assets/svg/sendIcon.svg";
import ReceivedIcon from "@/assets/svg/receivedIcon.svg";

export default function Activities() {
    const { userId } = useUserStore().user;
    const [currentFilter, setCurrentFilter] = useState<
        "sending" | "receiving" | any
    >("all");
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["transactions", userId],
        queryFn: async () => await getTransactions(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
        retry: true,
    });

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    const FILTER_DATA = useMemo(
        () => [
            { label: "All", value: "all" },
            { label: "Sending", value: "sending" },
            { label: "Receiving", value: "receiving" },
            { label: "Withdraw", value: "withdraw" },
            { label: "Funding", value: "funding" },
        ],
        []
    );

    return (
        <CustomSafeArea
            topColor="#ffffff"
            bgColor="#ffffff"
            setBottomSafeAreaInset={false}
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.left}>
                        <Text style={styles.pageName}>Activities</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <View style={styles.menuBar}>
                        <View style={styles.menuBarInner}>
                            {FILTER_DATA.map((item: any, index) => (
                                <Pressable
                                    key={index}
                                    onPress={() => setCurrentFilter(item.value)}
                                    style={[
                                        styles.menuBarToggleBtn,
                                        currentFilter === item.value &&
                                            styles.menuBarToggleBtnActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.menuBarToggleText,
                                            currentFilter !== item.value && {
                                                color: "#868898",
                                            },
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                    {isLoading || isError ? (
                        <EmptyActivity />
                    ) : (
                        <FlatList
                            data={data.data}
                            style={{ flex: 1 }}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                gap: size.getHeightSize(24),
                                paddingBottom: size.getHeightSize(24),
                                paddingHorizontal: size.getWidthSize(24),
                            }}
                            keyExtractor={(_, i) => i.toString()}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: size.getWidthSize(12),
                                        justifyContent: "space-between",

                                        alignItems: "center",
                                    }}
                                >
                                    {item.type == "withdrawal" && (
                                        <WithdrawIcon />
                                    )}
                                    {item.type == "deposit" && <DepositIcon />}
                                    {item.type == "transfer" &&
                                        item.senderId == userId && <SendIcon />}
                                    {item.type == "transfer" &&
                                        item.receiverId == userId && (
                                            <ReceivedIcon />
                                        )}
                                    <View
                                        style={{
                                            flex: 1,
                                            gap: size.getHeightSize(4),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Satoshi-Medium",
                                                fontSize: size.fontSize(14),
                                                lineHeight:
                                                    size.getHeightSize(20),
                                                color: "#0A0B14",
                                            }}
                                        >
                                            {item.type == "deposit" &&
                                                "Funded wallet"}
                                            {item.type == "withdrawal" &&
                                                "Withdrawal"}
                                            {item.type == "transfer" &&
                                                item.senderId == userId &&
                                                "Sent money"}
                                            {item.type == "transfer" &&
                                                item.receiverId == userId &&
                                                "Received money"}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily: "Satoshi-Regular",
                                                fontSize: size.fontSize(12),
                                                lineHeight:
                                                    size.getHeightSize(15),
                                                color: "#525466",
                                            }}
                                        >
                                            {(() => {
                                                const now = new Date();
                                                const created = new Date(
                                                    item.createdAt
                                                );
                                                const diffMs =
                                                    now.getTime() -
                                                    created.getTime();
                                                const diffSec = Math.floor(
                                                    diffMs / 1000
                                                );
                                                const diffMin = Math.floor(
                                                    diffSec / 60
                                                );
                                                const diffHour = Math.floor(
                                                    diffMin / 60
                                                );
                                                const diffDay = Math.floor(
                                                    diffHour / 24
                                                );
                                                const diffWeek = Math.floor(
                                                    diffDay / 7
                                                );

                                                if (diffWeek > 0) {
                                                    {
                                                        new Date(
                                                            item.createdAt
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        );
                                                    }
                                                } else if (diffDay > 0) {
                                                    return `${diffDay}d ago`;
                                                } else if (diffHour > 0) {
                                                    return `${diffHour}h ago`;
                                                } else if (diffMin > 0) {
                                                    return `${diffMin}m ago`;
                                                } else {
                                                    return "just now";
                                                }
                                            })()}
                                        </Text>
                                    </View>

                                    <View
                                        style={{
                                            alignItems: "flex-end",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                fontFamily: "Satoshi-Regular",
                                                fontSize: size.fontSize(12),
                                                lineHeight:
                                                    size.getHeightSize(15),
                                                color: "#525466",
                                            }}
                                        >
                                            {item.type == "deposit" && "+"}
                                            {item.type == "withdrawal" && "-"}
                                            {item.type == "transfer" &&
                                                item.senderId == userId &&
                                                "-"}
                                            {item.type == "transfer" &&
                                                item.receiverId == userId &&
                                                "+"}
                                            {item.currency}{" "}
                                            {formatCurrency({
                                                value: item.amount,
                                                currency: item.currency,
                                            })}
                                        </Text>

                                        <Text
                                            style={{
                                                fontFamily: "Satoshi-Regular",
                                                fontSize: size.fontSize(12),
                                                lineHeight:
                                                    size.getHeightSize(15),
                                                color:
                                                    item.status == "pending"
                                                        ? "#C2630A"
                                                        : item.status ==
                                                          "successful"
                                                        ? "#2D9F70"
                                                        : "#AF1D30",
                                            }}
                                        >
                                            {item.status}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                    )}
                </View>
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: size.getHeightSize(14),
        paddingHorizontal: size.getWidthSize(24),
    },

    left: {
        flexDirection: "row",
        gap: size.getWidthSize(16),
        alignItems: "center",
    },

    right: {
        flexDirection: "row",
        gap: size.getWidthSize(16),
        alignItems: "center",
    },

    pageName: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.getWidthSize(16),
    },

    content: {
        flex: 1,
        paddingTop: size.getHeightSize(24),
        gap: size.getHeightSize(24),
    },

    menuBar: {
        gap: size.getWidthSize(16),
        paddingHorizontal: size.getWidthSize(24),
    },

    menuBarInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: size.getWidthSize(6),
        paddingVertical: size.getHeightSize(4),
        backgroundColor: "#F6F6FA",
        borderRadius: size.getWidthSize(10),
    },

    menuBarToggleBtn: {
        paddingVertical: size.getHeightSize(6),
        paddingHorizontal: size.getWidthSize(6),
        borderRadius: size.getWidthSize(6),
        justifyContent: "center",
        alignItems: "center",
    },

    menuBarToggleBtnActive: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#0000001A",
    },

    menuBarToggleText: {
        color: "#0A0B14",
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(12),
    },
});
