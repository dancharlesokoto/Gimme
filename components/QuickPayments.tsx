import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Pressable,
} from "react-native";
import { size } from "../config/size";
import { router } from "expo-router";
import { axiosInstance, IMAGE_URL } from "@/services/api";

type Data = {
    receiver: DataItem[];
};

type DataItem = {
    userId: string;
    fullName: string;
    profileIMage: any;
};

export default function QuickPayments() {
    const [data, setData] = useState<Data | any>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await axiosInstance.get(
                    "/transaction/quick-payments"
                );
                const { data } = response.data;
                setData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    if (data.length === 0) {
        return;
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quick payments</Text>
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
                        <Image
                            source={{
                                uri:
                                    IMAGE_URL +
                                    "/profile/" +
                                    item.receiver?.profileImage,
                            }}
                            style={styles.avatar}
                        />
                        <Text style={styles.name}>
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
        paddingBottom: size.getHeightSize(24),
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
        marginTop: size.getHeightSize(4),
        fontSize: size.fontSize(11),
        color: "#8E8E93",
        textAlign: "center",
        fontFamily: "Satoshi-Medium",
    },
});
