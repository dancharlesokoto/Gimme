import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { size } from "@/config/size";
import noTxn from "@/assets/images/noTxn.png";
import { useQuery } from "@tanstack/react-query";
import { getTransactions } from "@/services/transactions";
import { useUserStore } from "@/store/userStore";
import { useFocusEffect } from "expo-router";

//Icons......
import WithdrawIcon from "@/assets/svg/withdrawIcon.svg"; //...
import DepositIcon from "@/assets/svg/depositIcon.svg";
import SendIcon from "@/assets/svg/sendIcon.svg";
import ReceivedIcon from "@/assets/svg/receivedIcon.svg";
//........
import { formatCurrency } from "@/lib/currency";

export default function Transactions({
    isPageRefetching,
}: {
    isPageRefetching: boolean;
}) {
    ///.....
    const { userId } = useUserStore().user;
    const { data, isError, isLoading, refetch } = useQuery({
        queryKey: ["transactions", userId],
        queryFn: async () => await getTransactions(),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchInterval: 10000,
        retry: true,
    });
    useEffect(() => {
        refetch();
    }, [isPageRefetching]);
    // Refetch when tab comes into focus
    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    if (isLoading || isError) {
        return null;
    }

    if (data.data.length === 0) {
        return (
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
        );
    }
    return (
        <View
            style={{
                paddingHorizontal: size.getWidthSize(24),
                paddingBottom: size.getHeightSize(50),
            }}
        >
            {data.data.slice(0, 5).map((item: any, index: any) => (
                <View
                    key={index}
                    style={{
                        flexDirection: "row",
                        gap: size.getWidthSize(12),
                        justifyContent: "space-between",
                        padding: size.getHeightSize(8),
                        alignItems: "center",
                    }}
                >
                    {item.type == "withdrawal" && <WithdrawIcon />}
                    {item.type == "deposit" && <DepositIcon />}
                    {item.type == "transfer" && item.senderId == userId && (
                        <SendIcon />
                    )}
                    {item.type == "transfer" && item.receiverId == userId && (
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
                                lineHeight: size.getHeightSize(20),
                                color: "#0A0B14",
                            }}
                        >
                            {item.type == "deposit" && "Funded wallet"}
                            {item.type == "withdrawal" && "Withdrawal"}
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
                                lineHeight: size.getHeightSize(15),
                                color: "#525466",
                            }}
                        >
                            {(() => {
                                const now = new Date();
                                const created = new Date(item.createdAt);
                                const diffMs =
                                    now.getTime() - created.getTime();
                                const diffSec = Math.floor(diffMs / 1000);
                                const diffMin = Math.floor(diffSec / 60);
                                const diffHour = Math.floor(diffMin / 60);
                                const diffDay = Math.floor(diffHour / 24);
                                const diffWeek = Math.floor(diffDay / 7);

                                if (diffWeek > 0) {
                                    {
                                        new Date(
                                            item.createdAt
                                        ).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        });
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
                                lineHeight: size.getHeightSize(15),
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
                                lineHeight: size.getHeightSize(15),
                                color:
                                    item.status == "pending"
                                        ? "#C2630A"
                                        : item.status == "successful"
                                        ? "#2D9F70"
                                        : "#AF1D30",
                            }}
                        >
                            {item.status}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    noTxn: {
        alignSelf: "center",
        width: size.getHeightSize(108),
        height: size.getHeightSize(108),
    },
});
