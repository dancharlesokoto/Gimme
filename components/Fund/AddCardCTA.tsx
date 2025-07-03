import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import { size } from "@/config/size";
import { router } from "expo-router";
import Img from "@/assets/images/emptyCard.png";
import Svg, { Path } from "react-native-svg";

export default function AddCardCTA() {
    return (
        <View
            style={{
                marginVertical: size.getHeightSize(14),
                paddingVertical: size.getHeightSize(24),
                backgroundColor: "#F6F6FA",
                borderRadius: size.getHeightSize(16),
                alignItems: "center",
            }}
        >
            <Image source={Img} style={styles.img} />
            <Text style={styles.imgText}>
                Add a card to use to fund your account
            </Text>
            <View>
                <Pressable
                    onPress={() => router.push("/screens/(fund)/AddCard")}
                    style={{
                        backgroundColor: "#374BFB",
                        height: size.getHeightSize(44),
                        width: size.getWidthSize(140),
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: size.getHeightSize(12),
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            alignContent: "center",
                        }}
                    >
                        <Svg
                            style={{ alignSelf: "center" }}
                            width="11"
                            height="12"
                            viewBox="0 0 11 12"
                            fill="none"
                            //   xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M4.75 5.25V0.75H6.25V5.25H10.75V6.75H6.25V11.25H4.75V6.75H0.25V5.25H4.75Z"
                                fill="white"
                            />
                        </Svg>

                        <Text
                            style={{
                                fontSize: size.fontSize(12),
                                fontFamily: "Satoshi-Medium",
                                color: "#ffffff",
                                marginLeft: size.getWidthSize(8),
                            }}
                        >
                            Add Card
                        </Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    img: {
        width: size.getWidthSize(63),
        height: size.getWidthSize(63),
    },

    imgText: {
        fontSize: size.getWidthSize(16),
        fontFamily: "Satoshi-Regular",
        marginTop: size.getHeightSize(4),
    },
});
