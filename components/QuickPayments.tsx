import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { size } from "../config/size";
import { router } from "expo-router";
import { axiosInstance, IMAGE_URL } from "@/services/api";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore";
import { Image } from "expo-image";
import AvatarInitials from "./AvatarInitials";

type Data = {
    receiver: DataItem[];
};

type DataItem = {
    userId: string;
    fullName: string;
    profileIMage: any;
};

export default function QuickPayments({ data: passedData }: { data?: Data[] }) {
    const { user } = useUserStore();
    const userId = user?.userId;
    const [data, setData] = useState<Data[]>(passedData ?? []);

    const { data: fetchedData, isLoading } = useQuery({
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        retry: true,
        queryKey: ["quick-payments", userId],
        queryFn: async () => {
            const response = await axiosInstance.get(
                "/transaction/quick-payments"
            );
            return response.data.data;
        },
    });

    useEffect(() => {
        fetchedData && setData(fetchedData);
    }, [fetchedData]);

    if (data?.length === 0) {
        return;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick payments</Text>
            {/* <Text>{JSON.stringify(data)}</Text> */}
            <FlatList
                data={data}
                renderItem={({ item }: { item: any }) => (
                    <Pressable
                        onPress={() =>
                            router.push(
                                `/screens/(send)/EnterAmount?data=${JSON.stringify(
                                    { data: item.receiver, sender: item.sender }
                                )}`
                            )
                        }
                        style={styles.avatarContainer}
                    >
                        {item.receiver?.profileImage &&
                        item.receiver?.profileImage !== "default.png" ? (
                            <Image
                                source={`${IMAGE_URL}/profile/${item.receiver?.profileImage}`}
                                style={styles.avatar}
                            />
                        ) : (
                            <AvatarInitials
                                style={styles.avatar}
                                name={item.receiver?.fullName}
                            />
                        )}
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={styles.name}
                        >
                            {item.receiver?.fullName}
                        </Text>
                    </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: size.getWidthSize(24),
    },
    title: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
        marginBottom: 10,
    },

    avatarContainer: {
        width: size.getWidthSize(72),
        marginRight: size.getWidthSize(16),
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: size.getWidthSize(72),
        height: size.getHeightSize(72),
        borderRadius: 100,
    },
    name: {
        width: size.getWidthSize(72),
        marginTop: size.getHeightSize(4),
        fontSize: size.fontSize(11),
        color: "#8E8E93",
        textAlign: "center",
        fontFamily: "Satoshi-Medium",
    },
});
