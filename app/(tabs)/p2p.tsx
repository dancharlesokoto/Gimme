import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import Country from "@/components/Country";
import P2PMarket from "@/components/P2PMarket";
import { Link, router } from "expo-router";
import CustomRippleButton from "@/components/CustomRippleButton";
import { Menu } from "react-native-paper";
import { useAppStore } from "@/store/appStore";

export default function P2P() {
    const { isP2PStarted, setIsP2PStarted } = useAppStore();
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const handleStartP2P = () => {
        setIsP2PStarted(true);
    };

    const OPTIONS_MENU = [
        {
            label: "Chats",
            value: "chats",
            url: "/screens/(p2p)/Chats",
        },
        {
            label: "My ads",
            value: "myads",
            url: "/screens/(p2p)/MyAds",
        },
        {
            label: "Disputes",
            value: "disputes",
        },
    ];

    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text
                        style={{
                            fontFamily: "Satoshi-Bold",
                            fontSize: size.fontSize(16),
                        }}
                    >
                        P2P
                    </Text>

                    <View style={styles.rightMenu}>
                        <TouchableOpacity
                            hitSlop={size.getWidthSize(10)}
                            style={{ position: "relative" }}
                            onPress={() => router.push("/screens/(p2p)/Orders")}
                        >
                            {/* order count */}
                            <View
                                style={{
                                    position: "absolute",
                                    width: size.getWidthSize(16),
                                    height: size.getWidthSize(16),
                                    backgroundColor: "#DF1C36",
                                    borderRadius: size.getWidthSize(100),
                                    justifyContent: "center",
                                    alignItems: "center",
                                    top: size.getHeightSize(-4),
                                    right: size.getWidthSize(-4),
                                    zIndex: 1,
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#FFFFFF",
                                        fontSize: size.fontSize(10),
                                        fontFamily: "Satoshi-Medium",
                                    }}
                                >
                                    1
                                </Text>
                            </View>
                            <Svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M6 15V6H4.5V4.5H6.75C6.94891 4.5 7.13968 4.57902 7.28033 4.71967C7.42098 4.86032 7.5 5.05109 7.5 5.25V14.25H16.8285L18.3285 8.25H9V6.75H19.29C19.404 6.75 19.5165 6.776 19.619 6.826C19.7214 6.87601 19.8111 6.94871 19.8813 7.03859C19.9514 7.12847 20.0001 7.23315 20.0237 7.34468C20.0473 7.45622 20.0452 7.57166 20.0175 7.68225L18.1425 15.1823C18.1019 15.3444 18.0082 15.4884 17.8764 15.5913C17.7446 15.6941 17.5822 15.75 17.415 15.75H6.75C6.55109 15.75 6.36032 15.671 6.21967 15.5303C6.07902 15.3897 6 15.1989 6 15ZM7.5 20.25C7.10218 20.25 6.72064 20.092 6.43934 19.8107C6.15804 19.5294 6 19.1478 6 18.75C6 18.3522 6.15804 17.9706 6.43934 17.6893C6.72064 17.408 7.10218 17.25 7.5 17.25C7.89783 17.25 8.27936 17.408 8.56066 17.6893C8.84197 17.9706 9 18.3522 9 18.75C9 19.1478 8.84197 19.5294 8.56066 19.8107C8.27936 20.092 7.89783 20.25 7.5 20.25ZM16.5 20.25C16.1022 20.25 15.7206 20.092 15.4393 19.8107C15.158 19.5294 15 19.1478 15 18.75C15 18.3522 15.158 17.9706 15.4393 17.6893C15.7206 17.408 16.1022 17.25 16.5 17.25C16.8978 17.25 17.2794 17.408 17.5607 17.6893C17.842 17.9706 18 18.3522 18 18.75C18 19.1478 17.842 19.5294 17.5607 19.8107C17.2794 20.092 16.8978 20.25 16.5 20.25Z"
                                    fill="#525466"
                                />
                            </Svg>
                        </TouchableOpacity>

                        <Menu
                            elevation={0}
                            contentStyle={styles.popover}
                            anchorPosition="bottom"
                            visible={isOptionsOpen} // Control visibility
                            onDismiss={() => setIsOptionsOpen(false)} // Close menu when dismissed
                            anchor={
                                <CustomRippleButton
                                    style={{
                                        borderRadius: size.getWidthSize(8),
                                    }}
                                    onPress={() => setIsOptionsOpen(true)}
                                >
                                    <Svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M12 5.25C11.175 5.25 10.5 5.925 10.5 6.75C10.5 7.575 11.175 8.25 12 8.25C12.825 8.25 13.5 7.575 13.5 6.75C13.5 5.925 12.825 5.25 12 5.25ZM12 15.75C11.175 15.75 10.5 16.425 10.5 17.25C10.5 18.075 11.175 18.75 12 18.75C12.825 18.75 13.5 18.075 13.5 17.25C13.5 16.425 12.825 15.75 12 15.75ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </CustomRippleButton>
                            } // Anchor element
                        >
                            {OPTIONS_MENU.map((item: any, index) => (
                                <TouchableHighlight
                                    underlayColor="#F6F6FA"
                                    key={index}
                                    onPress={() => {
                                        setIsOptionsOpen(false);
                                        router.push(item.url);
                                    }}
                                    style={styles.popoverItem}
                                >
                                    <Text style={styles.popoverText}>
                                        {item.label}
                                    </Text>
                                </TouchableHighlight>
                            ))}
                        </Menu>
                        {/* end */}
                        <Country />
                    </View>
                </View>

                {/* Showing onboarding content  */}
                {isP2PStarted ? (
                    <P2PMarket />
                ) : (
                    <View
                        style={{
                            paddingVertical: size.getHeightSize(36),
                            gap: size.getHeightSize(20),
                        }}
                    >
                        <View style={styles.topContent}>
                            <Svg
                                width="93"
                                height="94"
                                viewBox="0 0 93 94"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    y="1"
                                    width="93"
                                    height="93"
                                    rx="46.5"
                                    fill="#F6F6FA"
                                />
                                <Path
                                    d="M20.8934 41.4204C20.9654 41.0726 21.0032 40.7124 21.0032 40.3434C21.0032 37.4231 18.6358 35.0557 15.7154 35.0557C12.7951 35.0557 10.4277 37.4231 10.4277 40.3434C10.4277 43.2637 12.7951 45.6311 15.7154 45.6311"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M15.7154 45.6309H30.9355"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M53.6911 29.6182C53.7481 29.3428 53.7781 29.0575 53.7781 28.7652C53.7781 26.4522 51.903 24.5771 49.59 24.5771C47.277 24.5771 45.402 26.4522 45.402 28.7652C45.402 31.0782 47.277 32.9532 49.59 32.9532"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M49.5897 32.9531H58.3577"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M25.859 69.3748C25.931 69.7225 25.9688 70.0827 25.9688 70.4518C25.9688 73.3721 23.6014 75.7395 20.681 75.7395C17.7607 75.7395 15.3933 73.3721 15.3933 70.4518C15.3933 67.5315 17.7607 65.1641 20.681 65.1641"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M20.6811 65.1641H41.5278"
                                    stroke="#20212D"
                                    stroke-miterlimit="10"
                                    stroke-linecap="round"
                                />
                                <Path
                                    d="M26.7743 63.2266C27.4312 63.8746 50.0018 84.2471 56.4192 68.5446L61.4944 52.9663C55.0768 68.6688 32.5063 48.2963 31.8494 47.6483L26.7743 63.2266Z"
                                    fill="#F28B2C"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M44.299 69.4541C46.7044 69.6544 48.8166 67.8668 49.0169 65.4614C49.2172 63.0561 47.4296 60.9438 45.0243 60.7435C42.6189 60.5432 40.5066 62.3308 40.3063 64.7362C40.106 67.1415 41.8936 69.2538 44.299 69.4541Z"
                                    fill="#20212D"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M56.7894 53.4619C57.6345 53.0917 84.9162 39.6686 72.706 27.8931L60.1141 17.4106C72.3243 29.1861 45.0426 42.6091 44.1975 42.9794L56.7894 53.4619Z"
                                    fill="#E2E3E9"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M67.2394 41.3791C69.3599 40.226 70.1441 37.5723 68.991 35.4519C67.838 33.3314 65.1842 32.5472 63.0638 33.7003C60.9433 34.8533 60.1591 37.5071 61.3122 39.6275C62.4653 41.748 65.119 42.5322 67.2394 41.3791Z"
                                    fill="#20212D"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M35.9774 60.1487C37.1009 60.5298 74.6444 71.4325 73.2571 49.6654L70.3865 28.7953C71.7738 50.5624 34.2303 39.6596 33.1068 39.2786L35.9774 60.1487Z"
                                    fill="#C2CFFF"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M58.4868 57.8438C61.5614 57.4209 63.711 54.5857 63.2881 51.5111C62.8652 48.4366 60.03 46.287 56.9554 46.7099C53.8809 47.1328 51.7313 49.968 52.1541 53.0426C52.577 56.1171 55.4123 58.2667 58.4868 57.8438Z"
                                    fill="#20212D"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M62.7747 66.0238C64.9484 65.0391 73.2561 64.8548 76.1248 70.0239C71.7226 72.5005 67.4978 75.5229 62.7747 66.0238Z"
                                    fill="#E2E3E9"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M62.9875 66.0979C64.4318 66.3907 67.9212 67.4732 70.3242 69.4611"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M36.6613 24.8857C38.568 18.6712 33.6955 13.9511 27.3988 13.1234C26.6603 18.499 25.3065 23.9128 36.6613 24.8857Z"
                                    fill="#C2CFFF"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M36.5042 24.7021C35.642 23.3743 33.184 20.3145 30.2498 18.6974"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Ellipse
                                    cx="29.0032"
                                    cy="36.2886"
                                    rx="1.25055"
                                    ry="1.25055"
                                    fill="#20212D"
                                />
                                <Circle
                                    cx="80.3358"
                                    cy="51.2154"
                                    r="1.25055"
                                    fill="#20212D"
                                />
                                <Ellipse
                                    cx="12.513"
                                    cy="56.1399"
                                    rx="2.13994"
                                    ry="2.13994"
                                    stroke="#20212D"
                                />
                                <Path
                                    d="M61.6888 5.76585C61.6888 5.76585 57.9139 4.64128 56.7804 8.39953C57.9139 4.64133 54.1467 3.49113 54.1467 3.49113C54.1467 3.49113 57.9217 4.61562 59.0551 0.857422C57.9217 4.61562 61.6888 5.76585 61.6888 5.76585Z"
                                    fill="#C2CFFF"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                                <Path
                                    d="M47.3303 81.918C47.3303 81.918 44.1064 85.7001 47.8646 88.9258C44.1064 85.7001 40.8569 89.4601 40.8569 89.4601C40.8569 89.4601 44.0807 85.678 40.3225 82.4523C44.0807 85.678 47.3303 81.918 47.3303 81.918Z"
                                    fill="#C2CFFF"
                                    stroke="#20212D"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                />
                            </Svg>
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                }}
                            >
                                Swap your assets with one another
                            </Text>
                            <Text
                                style={{
                                    fontSize: size.fontSize(16),
                                    fontFamily: "Satoshi-Regular",
                                    textAlign: "center",
                                    color: "#525466",
                                }}
                            >
                                Exchange your funds with other customers as
                                Airtime, data or cash
                            </Text>
                        </View>

                        <View style={styles.lineDash}></View>

                        <View style={styles.mainContent}>
                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="15"
                                        height="16"
                                        viewBox="0 0 15 16"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M3.75 4.25V1.25C3.75 1.05109 3.82902 0.860322 3.96967 0.71967C4.11032 0.579018 4.30109 0.5 4.5 0.5H14.25C14.4489 0.5 14.6397 0.579018 14.7803 0.71967C14.921 0.860322 15 1.05109 15 1.25V11C15 11.1989 14.921 11.3897 14.7803 11.5303C14.6397 11.671 14.4489 11.75 14.25 11.75H11.25V14.7448C11.25 15.1617 10.9133 15.5 10.4948 15.5H0.75525C0.656042 15.5001 0.557788 15.4806 0.466112 15.4427C0.374436 15.4048 0.291139 15.3492 0.220988 15.279C0.150837 15.2089 0.0952092 15.1256 0.0572893 15.0339C0.0193694 14.9422 -9.82928e-05 14.844 3.7317e-07 14.7448L0.00225039 5.00525C0.00225039 4.58825 0.339 4.25 0.7575 4.25H3.75ZM5.25 4.25H10.4948C10.9118 4.25 11.25 4.58675 11.25 5.00525V10.25H13.5V2H5.25V4.25ZM9.75 5.75H1.50225L1.5 14H9.75V5.75ZM4.87725 12.5L2.22525 9.848L3.28575 8.7875L4.87725 10.379L8.05875 7.19675L9.11925 8.25725L4.87725 12.5Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Choose asset and place order
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Select an asset (Airtime, Cash, Data),
                                        Pick an Ad and place your order
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="15"
                                        height="16"
                                        viewBox="0 0 15 16"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M7.5 15.5C3.35775 15.5 0 12.1423 0 8C0 3.85775 3.35775 0.5 7.5 0.5C11.6423 0.5 15 3.85775 15 8C15 12.1423 11.6423 15.5 7.5 15.5ZM7.5 14C9.0913 14 10.6174 13.3679 11.7426 12.2426C12.8679 11.1174 13.5 9.5913 13.5 8C13.5 6.4087 12.8679 4.88258 11.7426 3.75736C10.6174 2.63214 9.0913 2 7.5 2C5.9087 2 4.38258 2.63214 3.25736 3.75736C2.13214 4.88258 1.5 6.4087 1.5 8C1.5 9.5913 2.13214 11.1174 3.25736 12.2426C4.38258 13.3679 5.9087 14 7.5 14ZM7.5 4.2875L11.2125 8L7.5 11.7125L3.7875 8L7.5 4.2875ZM7.5 6.40925L5.90925 8L7.5 9.59075L9.09075 8L7.5 6.40925Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Make payment
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Complete payment to the seller within
                                        the given time
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.item}>
                                <View style={styles.vectorContainer}>
                                    <Svg
                                        width="18"
                                        height="15"
                                        viewBox="0 0 18 15"
                                        fill="none"
                                        // xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M3.25 5.75C3.44891 5.75 3.63968 5.82902 3.78033 5.96967C3.92098 6.11032 4 6.30109 4 6.5C5.17836 6.49826 6.32274 6.8947 7.2475 7.625H8.875C9.87475 7.625 10.7725 8.06 11.3905 8.75H13.75C14.4589 8.7498 15.1534 8.95058 15.7529 9.32903C16.3524 9.70749 16.8323 10.2481 17.137 10.8883C15.3633 13.229 12.4915 14.75 9.25 14.75C7.1575 14.75 5.3875 14.2977 3.955 13.5065C3.90253 13.6513 3.80668 13.7764 3.68051 13.8647C3.55435 13.953 3.40401 14.0003 3.25 14H1C0.801088 14 0.610322 13.921 0.46967 13.7803C0.329018 13.6397 0.25 13.4489 0.25 13.25V6.5C0.25 6.30109 0.329018 6.11032 0.46967 5.96967C0.610322 5.82902 0.801088 5.75 1 5.75H3.25ZM4.00075 8L4 11.7665L4.03375 11.7905C5.38 12.7355 7.1335 13.25 9.25 13.25C11.503 13.25 13.5992 12.383 15.1262 10.9025L15.226 10.8028L15.136 10.7277C14.7818 10.4504 14.3526 10.2858 13.9037 10.2552L13.75 10.25H12.1667C12.2207 10.4915 12.25 10.742 12.25 11V11.75H5.5V10.25L10.5925 10.2492L10.567 10.1908C10.4233 9.8904 10.2022 9.63373 9.92644 9.4471C9.6507 9.26046 9.33025 9.15058 8.998 9.12875L8.875 9.125H6.6775C6.32899 8.76854 5.9127 8.48539 5.45314 8.29219C4.99358 8.09898 4.50002 7.99964 4.0015 8H4.00075ZM2.5 7.25H1.75V12.5H2.5V7.25ZM13 2.75C13.5967 2.75 14.169 2.98705 14.591 3.40901C15.0129 3.83097 15.25 4.40326 15.25 5C15.25 5.59674 15.0129 6.16903 14.591 6.59099C14.169 7.01295 13.5967 7.25 13 7.25C12.4033 7.25 11.831 7.01295 11.409 6.59099C10.9871 6.16903 10.75 5.59674 10.75 5C10.75 4.40326 10.9871 3.83097 11.409 3.40901C11.831 2.98705 12.4033 2.75 13 2.75ZM13 4.25C12.8011 4.25 12.6103 4.32902 12.4697 4.46967C12.329 4.61032 12.25 4.80109 12.25 5C12.25 5.19891 12.329 5.38968 12.4697 5.53033C12.6103 5.67098 12.8011 5.75 13 5.75C13.1989 5.75 13.3897 5.67098 13.5303 5.53033C13.671 5.38968 13.75 5.19891 13.75 5C13.75 4.80109 13.671 4.61032 13.5303 4.46967C13.3897 4.32902 13.1989 4.25 13 4.25ZM7.75 0.5C8.34674 0.5 8.91903 0.737053 9.34099 1.15901C9.76295 1.58097 10 2.15326 10 2.75C10 3.34674 9.76295 3.91903 9.34099 4.34099C8.91903 4.76295 8.34674 5 7.75 5C7.15326 5 6.58097 4.76295 6.15901 4.34099C5.73705 3.91903 5.5 3.34674 5.5 2.75C5.5 2.15326 5.73705 1.58097 6.15901 1.15901C6.58097 0.737053 7.15326 0.5 7.75 0.5ZM7.75 2C7.55109 2 7.36032 2.07902 7.21967 2.21967C7.07902 2.36032 7 2.55109 7 2.75C7 2.94891 7.07902 3.13968 7.21967 3.28033C7.36032 3.42098 7.55109 3.5 7.75 3.5C7.94891 3.5 8.13968 3.42098 8.28033 3.28033C8.42098 3.13968 8.5 2.94891 8.5 2.75C8.5 2.55109 8.42098 2.36032 8.28033 2.21967C8.13968 2.07902 7.94891 2 7.75 2Z"
                                            fill="#525466"
                                        />
                                    </Svg>
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.title}>
                                        Receive asset
                                    </Text>
                                    <Text style={styles.subtitle}>
                                        Once the seller confirms your payment,
                                        we will release the asset to you
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <CustomRippleButton
                            rippleColor="#fff"
                            onPress={handleStartP2P}
                            style={{ borderRadius: size.getWidthSize(16) }}
                            contentContainerStyle={{
                                backgroundColor: "#374BFB",
                                height: size.getHeightSize(56),
                                marginVertical: size.getHeightSize(16),
                                borderRadius: size.getHeightSize(16),
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: size.fontSize(18),
                                    fontFamily: "Satoshi-Bold",
                                    color: "#ffffff",
                                    marginLeft: size.getWidthSize(10),
                                }}
                            >
                                Get started
                            </Text>
                        </CustomRippleButton>
                    </View>
                )}
            </View>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
    },

    headerContainer: {
        flexDirection: "row",
        paddingVertical: size.getHeightSize(14),
        justifyContent: "space-between",
        alignItems: "center",
    },

    rightMenu: {
        flexDirection: "row",
        gap: size.getWidthSize(24),
        alignItems: "center",
    },

    popover: {
        width: size.getWidthSize(175),
        backgroundColor: "#FFFFFF",
        padding: size.getWidthSize(8),
        marginTop: size.getHeightSize(8),
        borderWidth: size.getWidthSize(1),

        gap: size.getHeightSize(4),
        borderColor: "#CDCED5",
        borderRadius: size.getWidthSize(8),
    },

    popoverItem: {
        borderRadius: size.getWidthSize(4),
        padding: size.getWidthSize(12),
    },

    popoverItemSelected: {
        backgroundColor: "#F6F6FA",
        borderRadius: size.getWidthSize(4),
        padding: size.getWidthSize(12),
    },

    popoverText: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Regular",
        color: "#0A0B14",
    },

    topContent: {
        justifyContent: "center",
        alignItems: "center",
        gap: size.getHeightSize(10),
    },

    lineDash: {
        width: "80%",
        marginHorizontal: "auto",
        borderTopWidth: 0.5,
        borderColor: "#CDCED5",
    },

    mainContent: {},

    item: {
        flexDirection: "row",
        gap: size.getWidthSize(14),
        paddingVertical: size.getHeightSize(16),
    },

    vectorContainer: {
        width: size.getWidthSize(40),
        height: size.getHeightSize(40),
        borderRadius: size.getWidthSize(100),
        borderColor: "#E2E3E9",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    textContainer: { flex: 1 },

    title: {
        color: "#0A0B14",
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(16),
    },

    subtitle: {
        color: "#525466",
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(14),
    },
});
