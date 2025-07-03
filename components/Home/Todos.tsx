import { View, Text } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import CustomRippleButton from "../CustomRippleButton";

export default function Todos() {
    return (
        <View
            style={{
                gap: size.getHeightSize(8),
                padding: size.getWidthSize(24),
                paddingBottom: size.getHeightSize(0),
            }}
        >
            <Text
                style={{
                    fontSize: size.fontSize(14),
                    fontFamily: "Satoshi-Bold",
                    color: "#000000",
                }}
            >
                Todos
            </Text>
            <View
                style={{
                    borderRadius: size.getWidthSize(16),
                    padding: size.getWidthSize(16),
                    backgroundColor: "#F6F6FA",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: size.getWidthSize(16),
                }}
            >
                <Svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    style={{ flexShrink: 0 }}
                    fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                >
                    <Rect width="44" height="44" rx="16" fill="#E2E3E9" />
                    <Path
                        d="M15.8372 15.1195L22 13.75L28.1627 15.1195C28.3293 15.1565 28.4782 15.2492 28.585 15.3823C28.6918 15.5154 28.75 15.6809 28.75 15.8515V23.3417C28.7499 24.0826 28.567 24.8119 28.2174 25.465C27.8678 26.1181 27.3624 26.6749 26.746 27.0858L22 30.25L17.254 27.0858C16.6377 26.6749 16.1323 26.1183 15.7828 25.4653C15.4332 24.8124 15.2502 24.0832 15.25 23.3425V15.8515C15.25 15.6809 15.3082 15.5154 15.415 15.3823C15.5218 15.2492 15.6707 15.1565 15.8372 15.1195ZM16.75 16.453V23.3417C16.75 23.8356 16.8719 24.3218 17.1049 24.7572C17.338 25.1926 17.6749 25.5638 18.0858 25.8378L22 28.4478L25.9142 25.8378C26.325 25.5639 26.6619 25.1928 26.8949 24.7575C27.1279 24.3223 27.2499 23.8362 27.25 23.3425V16.453L22 15.2875L16.75 16.453ZM22 21.25C21.5027 21.25 21.0258 21.0525 20.6742 20.7008C20.3225 20.3492 20.125 19.8723 20.125 19.375C20.125 18.8777 20.3225 18.4008 20.6742 18.0492C21.0258 17.6975 21.5027 17.5 22 17.5C22.4973 17.5 22.9742 17.6975 23.3258 18.0492C23.6775 18.4008 23.875 18.8777 23.875 19.375C23.875 19.8723 23.6775 20.3492 23.3258 20.7008C22.9742 21.0525 22.4973 21.25 22 21.25ZM18.6452 25C18.7362 24.1738 19.1288 23.4102 19.7478 22.8555C20.3669 22.3009 21.1688 21.9942 22 21.9942C22.8312 21.9942 23.6331 22.3009 24.2522 22.8555C24.8712 23.4102 25.2638 24.1738 25.3547 25H18.6452Z"
                        fill="#0A0B14"
                    />
                </Svg>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: "Satoshi-Medium",
                            fontSize: size.fontSize(14),
                            lineHeight: size.getHeightSize(20),
                            color: "#0A0B14",
                        }}
                    >
                        Setup BVN
                    </Text>
                    <Text
                        style={{
                            fontFamily: "Satoshi-Regular",
                            fontSize: size.fontSize(12),
                            lineHeight: size.getHeightSize(14),
                            color: "#0A0B14",
                        }}
                    >
                        Your KYC is needed for you to use Gimme fully
                    </Text>
                </View>
                <CustomRippleButton
                    style={{
                        padding: size.getWidthSize(6),
                        borderRadius: size.getWidthSize(8),
                        backgroundColor: "#374BFB",
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "Satoshi-Medium",
                            fontSize: size.fontSize(12),
                            lineHeight: size.getHeightSize(16),
                            letterSpacing: size.getWidthSize(0.5),
                            color: "#FFFFFF",
                        }}
                    >
                        Proceed
                    </Text>
                </CustomRippleButton>
            </View>
        </View>
    );
}
