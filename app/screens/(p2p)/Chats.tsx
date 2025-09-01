import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function Chats() {
    const CHATS = [
        {
            id: "1",
            name: "Angelina Jolie",
            image: require("@/assets/images/avatar-1.png"),
            chatText: "Hello, how are you doing",
            time: "14:24",
        },

        {
            id: "2",
            name: "Angelina Jolie",
            image: require("@/assets/images/avatar-2.png"),
            chatText: "Hello, how are you doing",
            time: "5 hours ago",
        },

        {
            id: "3",
            name: "Angelina Jolie",
            image: require("@/assets/images/avatar-3.png"),
            chatText: "Hello, how are you doing",
            time: "Yesterday",
        },

        {
            id: "4",
            name: "Angelina Jolie",
            image: require("@/assets/images/avatar-1.png"),
            chatText: "Hello, how are you doing",
            time: "3 days ago",
        },
    ];
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View className="CONTAINER" style={styles.container}>
                <View style={styles.headerContainer}>
                    <GenericHeader title="Chats" />
                </View>
                <View style={styles.chatsContainer}>
                    {CHATS.map((item) => (
                        <Pressable
                            onPress={() =>
                                router.push("/screens/(p2p)/ChatConversation")
                            }
                            style={styles.chatItem}
                            key={item.id}
                        >
                            <View style={{ position: "relative" }}>
                                <Image
                                    source={item.image}
                                    style={{
                                        width: size.getWidthSize(48),
                                        height: size.getWidthSize(48),
                                        borderRadius: size.getWidthSize(999),
                                        objectFit: "cover",
                                    }}
                                />

                                <View
                                    className="ONLINE INDICATOR"
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        top: size.getHeightSize(4),
                                        backgroundColor: "#FFFFFF",
                                        borderRadius: size.getWidthSize(100),
                                        padding: size.getWidthSize(1),
                                    }}
                                >
                                    <Svg
                                        width="8"
                                        height="8"
                                        viewBox="0 0 8 8"
                                        fill="none"
                                        //   xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M7.375 4C7.375 5.86396 5.86396 7.375 4 7.375C2.13604 7.375 0.625 5.86396 0.625 4C0.625 2.13604 2.13604 0.625 4 0.625C5.86396 0.625 7.375 2.13604 7.375 4Z"
                                            fill="#38C78B"
                                        />
                                    </Svg>
                                </View>
                                {/* .. */}
                            </View>

                            <View
                                style={{ gap: size.getHeightSize(4), flex: 1 }}
                            >
                                <Text style={styles.chatName}>{item.name}</Text>
                                <Text style={styles.chatText}>
                                    {item.chatText}
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        color: "#525466",
                                        fontFamily: "Satoshi-Medium",
                                        fontSize: size.fontSize(11),
                                    }}
                                >
                                    {item.time}
                                </Text>
                                <Text></Text>
                            </View>
                            {/* end */}
                        </Pressable>
                    ))}
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
        paddingHorizontal: size.getWidthSize(24),
    },

    chatsContainer: {
        paddingVertical: size.getHeightSize(24),
        paddingHorizontal: size.getWidthSize(24),
        gap: size.getHeightSize(24),
    },

    chatItem: {
        flexDirection: "row",
        gap: size.getWidthSize(12),
        alignItems: "center",
    },

    chatName: {
        fontSize: size.fontSize(14),
        color: "#0A0B14",
        fontFamily: "Satoshi-Medium",
    },

    chatText: {
        color: "#525466",
        fontSize: size.fontSize(12),
        fontFamily: "Satoshi-Regular",
    },
});
