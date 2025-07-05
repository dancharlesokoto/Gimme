import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";
import { router, useFocusEffect } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { fetchUser } from "@/services/user";
import { IMAGE_URL } from "@/services/api";
import PageLoader from "@/components/PageLoader";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner-native";
import { useAppStore } from "@/store/appStore";

export default function Profile() {
    const { user } = useUserStore();
    const { userId } = user;

    const [screenRefreshing, setScreenRefreshing] = useState(false);

    const handleScreenRefresh = () => {
        setScreenRefreshing(true);
        setTimeout(() => {
            refetch();
            setScreenRefreshing(false);
        }, 500);
    };
    //Fetch logic..........................
    const {
        data: userData,
        error,
        isError,
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["getUser"],
        queryFn: async () => await fetchUser(userId),
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });

    useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    //Error reactive logic..........................
    useEffect(() => {
        isError && handleLogout();
    }, [error]);

    //Logout logic..........................
    const handleLogout = async () => {
        try {
            useUserStore.getState().resetUser();
            useAppStore.getState().setIsMarketStarted(false);
            useAppStore.getState().setIsP2PStarted(false);
            router.replace("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading || isError) {
        return (
            <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
                <PageLoader />
            </CustomSafeArea>
        );
    }

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
                        Profile
                    </Text>
                </View>

                <ScrollView
                    refreshControl={
                        <RefreshControl
                            colors={["#374BFB"]}
                            refreshing={screenRefreshing}
                            onRefresh={handleScreenRefresh}
                        />
                    }
                    contentContainerStyle={styles.main}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.mainInfo}>
                        <Image
                            source={{
                                uri:
                                    IMAGE_URL +
                                    "/profile/" +
                                    userData.profileImage,
                            }}
                            alt=""
                            style={{
                                width: size.getWidthSize(88),
                                height: size.getHeightSize(88),
                                borderRadius: size.getWidthSize(1000),
                            }}
                        />
                        <View style={{ gap: size.getWidthSize(1) }}>
                            {userData.fullName ? (
                                <Text
                                    style={{
                                        fontSize: size.fontSize(18),
                                        fontFamily: "Satoshi-Bold",
                                        color: "#0B0A14",
                                    }}
                                >
                                    {userData.fullName}
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        fontSize: size.fontSize(18),
                                        fontFamily: "Satoshi-Regular",
                                        color: "#0B0A14",
                                    }}
                                >
                                    ~Your name~
                                </Text>
                            )}

                            <Text
                                style={{
                                    fontSize: size.fontSize(12),
                                    fontFamily: "Satoshi-Regular",
                                    color: "#535266",
                                }}
                            >
                                @{userData.username}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contactInfoContainer}>
                        <View style={styles.contactInfo}>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M8.0245 9.0115C8.72825 10.2479 9.75214 11.2717 10.9885 11.9755L11.6515 11.047C11.7581 10.8977 11.9158 10.7927 12.0946 10.7517C12.2734 10.7108 12.4611 10.7369 12.622 10.825C13.6827 11.4047 14.8542 11.7533 16.0592 11.848C16.2473 11.8629 16.4229 11.9482 16.5509 12.0867C16.6789 12.2253 16.75 12.4071 16.75 12.5958V15.9423C16.75 16.1279 16.6812 16.3071 16.5568 16.4449C16.4324 16.5828 16.2612 16.6696 16.0765 16.6885C15.679 16.7297 15.2785 16.75 14.875 16.75C8.455 16.75 3.25 11.545 3.25 5.125C3.25 4.7215 3.27025 4.321 3.3115 3.9235C3.33044 3.73877 3.41724 3.56764 3.55509 3.44323C3.69295 3.31881 3.87205 3.24996 4.05775 3.25H7.40425C7.59292 3.24998 7.77467 3.32106 7.91326 3.44909C8.05185 3.57711 8.13709 3.75267 8.152 3.94075C8.24667 5.14584 8.59531 6.31726 9.175 7.378C9.2631 7.53892 9.28916 7.72656 9.24825 7.9054C9.20734 8.08424 9.1023 8.24188 8.953 8.3485L8.0245 9.0115ZM6.133 8.51875L7.558 7.501C7.15359 6.62807 6.87651 5.70163 6.73525 4.75H4.7575C4.753 4.8745 4.75075 4.99975 4.75075 5.125C4.75 10.717 9.283 15.25 14.875 15.25C15.0002 15.25 15.1255 15.2478 15.25 15.2425V13.2648C14.2984 13.1235 13.3719 12.8464 12.499 12.442L11.4813 13.867C11.0715 13.7078 10.6735 13.5198 10.2902 13.3045L10.2468 13.2797C8.77568 12.4425 7.55746 11.2243 6.72025 9.75325L6.6955 9.70975C6.48018 9.3265 6.29221 8.9285 6.133 8.51875Z"
                                    fill="#525466"
                                />
                            </Svg>
                            <Text
                                style={{
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(14),
                                    color: "#0A0B14",
                                }}
                            >
                                (+234) {userData.phone}
                            </Text>
                        </View>
                        <View style={styles.contactInfo}>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M3.25 3.75H16.75C16.9489 3.75 17.1397 3.82902 17.2803 3.96967C17.421 4.11032 17.5 4.30109 17.5 4.5V15.5C17.5 15.6989 17.421 15.8897 17.2803 16.0303C17.1397 16.171 16.9489 16.25 16.75 16.25H3.25C3.05109 16.25 2.86032 16.171 2.71967 16.0303C2.57902 15.8897 2.5 15.6989 2.5 15.5V4.5C2.5 4.30109 2.57902 4.11032 2.71967 3.96967C2.86032 3.82902 3.05109 3.75 3.25 3.75ZM16 6.9285L10.054 12.2535L4 6.912V14.75H16V6.9285ZM4.38325 5.25L10.0457 10.2465L15.6265 5.25H4.38325Z"
                                    fill="#525466"
                                />
                            </Svg>

                            <Text
                                style={{
                                    fontFamily: "Satoshi-Regular",
                                    fontSize: size.fontSize(14),
                                    color: "#0A0B14",
                                }}
                            >
                                {userData.email}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.options}>
                        <Pressable
                            style={[
                                styles.optionItem,
                                {
                                    marginVertical: size.getHeightSize(20),
                                    backgroundColor: "#FEF4EB",
                                    borderColor: "#FFDFC2",
                                },
                            ]}
                            onPress={() =>
                                router.push(`/screens/(settings)/AccountTier`)
                            }
                        >
                            <Svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    width="40"
                                    height="40"
                                    rx="16"
                                    fill="#FFDFC2"
                                />
                                <Path
                                    d="M20 16.2508C21.5913 16.2508 23.1174 16.8829 24.2426 18.0081C25.3679 19.1333 26 20.6595 26 22.2508C26 23.842 25.3679 25.3682 24.2426 26.4934C23.1174 27.6186 21.5913 28.2507 20 28.2507C18.4087 28.2507 16.8826 27.6186 15.7574 26.4934C14.6321 25.3682 14 23.842 14 22.2508C14 20.6595 14.6321 19.1333 15.7574 18.0081C16.8826 16.8829 18.4087 16.2508 20 16.2508ZM20 17.7508C18.8065 17.7508 17.6619 18.2249 16.818 19.0688C15.9741 19.9127 15.5 21.0573 15.5 22.2508C15.5 23.4442 15.9741 24.5888 16.818 25.4327C17.6619 26.2766 18.8065 26.7507 20 26.7507C21.1935 26.7507 22.3381 26.2766 23.182 25.4327C24.0259 24.5888 24.5 23.4442 24.5 22.2508C24.5 21.0573 24.0259 19.9127 23.182 19.0688C22.3381 18.2249 21.1935 17.7508 20 17.7508ZM20 18.8758L20.9922 20.8858L23.21 21.2083L21.605 22.772L21.9838 24.9815L20 23.9383L18.0162 24.9807L18.395 22.772L16.79 21.2075L19.0078 20.885L20 18.8758ZM24.5 12.5008V14.7508L23.4777 15.6042C22.6295 15.1592 21.7033 14.8819 20.75 14.7875V12.5008H24.5ZM19.25 12.5V14.7875C18.297 14.8817 17.3711 15.1588 16.523 15.6035L15.5 14.7508V12.5008L19.25 12.5Z"
                                    fill="#6E3B0C"
                                />
                            </Svg>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>
                                    Account tier - 0
                                </Text>
                                <Text style={styles.optionSubtitle}>
                                    Unlock account limits with KYC verifications{" "}
                                </Text>
                            </View>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M10.7162 9.99882L7.375 6.65757L8.32945 5.70312L12.6251 9.99882L8.32945 14.2945L7.375 13.3401L10.7162 9.99882Z"
                                    fill="#525466"
                                />
                            </Svg>
                        </Pressable>
                        <Pressable
                            style={styles.optionItem}
                            onPress={() =>
                                router.push(
                                    `/screens/(settings)/GeneralSettings?username=${
                                        userData.username
                                    }&phoneNumber=${encodeURIComponent(
                                        userData.phone
                                    )}&email=${userData.email}`
                                )
                            }
                        >
                            <Svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    width="40"
                                    height="40"
                                    rx="16"
                                    fill="#EBEFFF"
                                />
                                <Path
                                    d="M20 11.75L27.125 15.875V24.125L20 28.25L12.875 24.125V15.875L20 11.75ZM20 13.4833L14.375 16.7397V23.2603L20 26.5167L25.625 23.2603V16.7397L20 13.4833ZM20 23C19.2044 23 18.4413 22.6839 17.8787 22.1213C17.3161 21.5587 17 20.7956 17 20C17 19.2044 17.3161 18.4413 17.8787 17.8787C18.4413 17.3161 19.2044 17 20 17C20.7956 17 21.5587 17.3161 22.1213 17.8787C22.6839 18.4413 23 19.2044 23 20C23 20.7956 22.6839 21.5587 22.1213 22.1213C21.5587 22.6839 20.7956 23 20 23ZM20 21.5C20.3978 21.5 20.7794 21.342 21.0607 21.0607C21.342 20.7794 21.5 20.3978 21.5 20C21.5 19.6022 21.342 19.2206 21.0607 18.9393C20.7794 18.658 20.3978 18.5 20 18.5C19.6022 18.5 19.2206 18.658 18.9393 18.9393C18.658 19.2206 18.5 19.6022 18.5 20C18.5 20.3978 18.658 20.7794 18.9393 21.0607C19.2206 21.342 19.6022 21.5 20 21.5Z"
                                    fill="#2532A7"
                                />
                            </Svg>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>
                                    General settings
                                </Text>
                                <Text style={styles.optionSubtitle}>
                                    Manage username, email and phone no.
                                </Text>
                            </View>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M10.7162 9.99882L7.375 6.65757L8.32945 5.70312L12.6251 9.99882L8.32945 14.2945L7.375 13.3401L10.7162 9.99882Z"
                                    fill="#525466"
                                />
                            </Svg>
                        </Pressable>

                        <Pressable
                            style={styles.optionItem}
                            onPress={() =>
                                router.push(
                                    "/screens/(settings)/SecuritySettings"
                                )
                            }
                        >
                            <Svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    width="40"
                                    height="40"
                                    rx="16"
                                    fill="#EBEFFF"
                                />
                                <Path
                                    d="M13.8372 13.1195L20 11.75L26.1627 13.1195C26.3293 13.1565 26.4782 13.2492 26.585 13.3823C26.6918 13.5154 26.75 13.6809 26.75 13.8515V21.3417C26.7499 22.0826 26.567 22.8119 26.2174 23.465C25.8678 24.1181 25.3624 24.6749 24.746 25.0858L20 28.25L15.254 25.0858C14.6377 24.6749 14.1323 24.1183 13.7828 23.4653C13.4332 22.8124 13.2502 22.0832 13.25 21.3425V13.8515C13.25 13.6809 13.3082 13.5154 13.415 13.3823C13.5218 13.2492 13.6707 13.1565 13.8372 13.1195ZM14.75 14.453V21.3417C14.75 21.8356 14.8719 22.3218 15.1049 22.7572C15.338 23.1926 15.6749 23.5638 16.0858 23.8378L20 26.4478L23.9142 23.8378C24.325 23.5639 24.6619 23.1928 24.8949 22.7575C25.1279 22.3223 25.2499 21.8362 25.25 21.3425V14.453L20 13.2875L14.75 14.453ZM20 19.25C19.5027 19.25 19.0258 19.0525 18.6742 18.7008C18.3225 18.3492 18.125 17.8723 18.125 17.375C18.125 16.8777 18.3225 16.4008 18.6742 16.0492C19.0258 15.6975 19.5027 15.5 20 15.5C20.4973 15.5 20.9742 15.6975 21.3258 16.0492C21.6775 16.4008 21.875 16.8777 21.875 17.375C21.875 17.8723 21.6775 18.3492 21.3258 18.7008C20.9742 19.0525 20.4973 19.25 20 19.25ZM16.6452 23C16.7362 22.1738 17.1288 21.4102 17.7478 20.8555C18.3669 20.3009 19.1688 19.9942 20 19.9942C20.8312 19.9942 21.6331 20.3009 22.2522 20.8555C22.8712 21.4102 23.2638 22.1738 23.3547 23H16.6452Z"
                                    fill="#2532A7"
                                />
                            </Svg>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>
                                    Security settings
                                </Text>
                                <Text style={styles.optionSubtitle}>
                                    Set biometric and other security settings
                                </Text>
                            </View>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M10.7162 9.99882L7.375 6.65757L8.32945 5.70312L12.6251 9.99882L8.32945 14.2945L7.375 13.3401L10.7162 9.99882Z"
                                    fill="#525466"
                                />
                            </Svg>
                        </Pressable>

                        <Pressable
                            style={styles.optionItem}
                            onPress={() =>
                                router.push(
                                    "/screens/(settings)/HelpAndSupport"
                                )
                            }
                        >
                            <Svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    width="40"
                                    height="40"
                                    rx="16"
                                    fill="#EBEFFF"
                                />
                                <Path
                                    d="M20 27.5C15.8578 27.5 12.5 24.1423 12.5 20C12.5 15.8578 15.8578 12.5 20 12.5C24.1423 12.5 27.5 15.8578 27.5 20C27.5 24.1423 24.1423 27.5 20 27.5ZM20 26C21.5913 26 23.1174 25.3679 24.2426 24.2426C25.3679 23.1174 26 21.5913 26 20C26 18.4087 25.3679 16.8826 24.2426 15.7574C23.1174 14.6321 21.5913 14 20 14C18.4087 14 16.8826 14.6321 15.7574 15.7574C14.6321 16.8826 14 18.4087 14 20C14 21.5913 14.6321 23.1174 15.7574 24.2426C16.8826 25.3679 18.4087 26 20 26ZM19.25 22.25H20.75V23.75H19.25V22.25ZM20.75 21.0162V21.5H19.25V20.375C19.25 20.1761 19.329 19.9853 19.4697 19.8447C19.6103 19.704 19.8011 19.625 20 19.625C20.2131 19.625 20.4217 19.5645 20.6017 19.4505C20.7818 19.3365 20.9257 19.1738 21.0168 18.9812C21.108 18.7886 21.1425 18.5741 21.1165 18.3626C21.0905 18.1512 21.005 17.9514 20.8699 17.7867C20.7348 17.6219 20.5557 17.4989 20.3534 17.432C20.1511 17.365 19.934 17.3569 19.7273 17.4085C19.5206 17.4602 19.3328 17.5694 19.1858 17.7236C19.0387 17.8778 18.9385 18.0706 18.8968 18.2795L17.4253 17.9847C17.5165 17.5288 17.7271 17.1053 18.0357 16.7574C18.3442 16.4096 18.7396 16.1499 19.1814 16.005C19.6232 15.86 20.0956 15.835 20.5503 15.9325C21.0049 16.0299 21.4255 16.2463 21.7691 16.5596C22.1127 16.8729 22.3669 17.2718 22.5058 17.7155C22.6447 18.1593 22.6633 18.632 22.5596 19.0852C22.456 19.5385 22.2338 19.9561 21.9159 20.2954C21.5979 20.6347 21.1956 20.8834 20.75 21.0162Z"
                                    fill="#2532A7"
                                />
                            </Svg>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>
                                    Help and support
                                </Text>
                                <Text style={styles.optionSubtitle}>
                                    Request further assistance
                                </Text>
                            </View>
                            <Svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Path
                                    d="M10.7162 9.99882L7.375 6.65757L8.32945 5.70312L12.6251 9.99882L8.32945 14.2945L7.375 13.3401L10.7162 9.99882Z"
                                    fill="#525466"
                                />
                            </Svg>
                        </Pressable>

                        <Pressable
                            onPress={async () => await handleLogout()}
                            style={[
                                styles.optionItem,
                                { marginTop: size.getHeightSize(40) },
                            ]}
                        >
                            <Svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Rect
                                    width="40"
                                    height="40"
                                    rx="16"
                                    fill="#FDEDEF"
                                />
                                <Path
                                    d="M14 24.5H15.5V26H24.5V14H15.5V15.5H14V13.25C14 13.0511 14.079 12.8603 14.2197 12.7197C14.3603 12.579 14.5511 12.5 14.75 12.5H25.25C25.4489 12.5 25.6397 12.579 25.7803 12.7197C25.921 12.8603 26 13.0511 26 13.25V26.75C26 26.9489 25.921 27.1397 25.7803 27.2803C25.6397 27.421 25.4489 27.5 25.25 27.5H14.75C14.5511 27.5 14.3603 27.421 14.2197 27.2803C14.079 27.1397 14 26.9489 14 26.75V24.5ZM15.5 19.25H20.75V20.75H15.5V23L11.75 20L15.5 17V19.25Z"
                                    fill="#AF1D30"
                                />
                            </Svg>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.optionTitle}>Log out</Text>
                            </View>
                        </Pressable>
                    </View>
                </ScrollView>
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
        padding: size.getHeightSize(24),
        justifyContent: "space-between",
        alignItems: "center",
    },

    main: {
        paddingHorizontal: size.getHeightSize(24),
        gap: size.getWidthSize(8),
    },

    mainInfo: {
        flexDirection: "row",
        gap: size.getWidthSize(12),
        alignItems: "center",
    },

    contactInfoContainer: {
        gap: size.getHeightSize(4),
        paddingVertical: size.getHeightSize(12),
    },

    contactInfo: {
        flexDirection: "row",
        gap: size.getWidthSize(14),
    },

    options: {
        gap: size.getWidthSize(16),
    },

    optionItem: {
        borderRadius: size.getWidthSize(12),
        borderWidth: size.getWidthSize(1),
        borderColor: "#E2E3E9",
        padding: size.getWidthSize(16),
        gap: size.getWidthSize(12),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    optionTitle: {
        fontFamily: "Satoshi-Medium",
        color: "#0A0B14",
        fontSize: size.fontSize(14),
    },

    optionSubtitle: {
        fontFamily: "Satoshi-Regular",
        color: "#868898",
        fontSize: size.fontSize(11),
    },
});
