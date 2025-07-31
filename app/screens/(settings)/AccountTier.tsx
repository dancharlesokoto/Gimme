import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import GenericHeader from "@/components/GenericHeader";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import TierOne from "@/components/Tier/TierOne";
import CustomRippleButton from "@/components/CustomRippleButton";
import { toast } from "sonner-native";

export default function AccountTier() {
    //...
    const [isLoading, setIsLoading] = useState(false);

    //...
    const handleUpgradeAccount = async () => {
        setIsLoading(true);
        toast.info("This feature is not available yet", {
            duration: 2000,
            dismissible: true,
        });
        setIsLoading(false);
    };
    return (
        <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
            <View
                style={{
                    paddingHorizontal: size.getWidthSize(24),
                }}
            >
                <GenericHeader title="Account tier" />
            </View>
            <ScrollView
                contentContainerStyle={styles.container}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.pageCard}>
                    <Svg
                        width="41"
                        height="40"
                        viewBox="0 0 41 40"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect
                            x="0.5"
                            width="40"
                            height="40"
                            rx="16"
                            fill="#F28B2C"
                        />
                        <Path
                            d="M20.5 16.2508C22.0913 16.2508 23.6174 16.8829 24.7426 18.0081C25.8679 19.1333 26.5 20.6595 26.5 22.2508C26.5 23.842 25.8679 25.3682 24.7426 26.4934C23.6174 27.6186 22.0913 28.2507 20.5 28.2507C18.9087 28.2507 17.3826 27.6186 16.2574 26.4934C15.1321 25.3682 14.5 23.842 14.5 22.2508C14.5 20.6595 15.1321 19.1333 16.2574 18.0081C17.3826 16.8829 18.9087 16.2508 20.5 16.2508ZM20.5 17.7508C19.3065 17.7508 18.1619 18.2249 17.318 19.0688C16.4741 19.9127 16 21.0573 16 22.2508C16 23.4442 16.4741 24.5888 17.318 25.4327C18.1619 26.2766 19.3065 26.7507 20.5 26.7507C21.6935 26.7507 22.8381 26.2766 23.682 25.4327C24.5259 24.5888 25 23.4442 25 22.2508C25 21.0573 24.5259 19.9127 23.682 19.0688C22.8381 18.2249 21.6935 17.7508 20.5 17.7508ZM20.5 18.8758L21.4922 20.8858L23.71 21.2083L22.105 22.772L22.4838 24.9815L20.5 23.9383L18.5162 24.9807L18.895 22.772L17.29 21.2075L19.5078 20.885L20.5 18.8758ZM25 12.5008V14.7508L23.9777 15.6042C23.1295 15.1592 22.2033 14.8819 21.25 14.7875V12.5008H25ZM19.75 12.5V14.7875C18.797 14.8817 17.8711 15.1588 17.023 15.6035L16 14.7508V12.5008L19.75 12.5Z"
                            fill="#FEF4EB"
                        />
                    </Svg>
                    <Text style={styles.pageCardTitle}>Tier progress</Text>
                    <View style={styles.progressBar}>
                        <View style={styles.progressBarItem}>
                            <Svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Circle cx="6" cy="6" r="6" fill="#38C78B" />
                            </Svg>

                            <Text style={styles.progressBarText}>Tier 1</Text>
                        </View>
                        <View style={styles.progressBarItem}>
                            <Svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Circle cx="6" cy="6" r="6" fill="#374BFB" />
                            </Svg>
                            <Text style={styles.progressBarText}>Tier 2</Text>
                        </View>
                        <View style={styles.progressBarItem}>
                            <Svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                // xmlns="http://www.w3.org/2000/svg"
                            >
                                <Circle cx="6" cy="6" r="6" fill="#E2E3E9" />
                            </Svg>
                            <Text style={styles.progressBarText}>Tier 3</Text>
                        </View>
                    </View>
                </View>

                <TierOne />

                <CustomRippleButton
                    onPress={handleUpgradeAccount}
                    contentContainerStyle={styles.pageButton}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.pageButtonText}>
                            Update account
                        </Text>
                    )}
                </CustomRippleButton>
            </ScrollView>
        </CustomSafeArea>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: size.getWidthSize(24),
        gap: size.getHeightSize(24),
    },

    page: {
        marginVertical: size.getHeightSize(24),
        gap: size.getHeightSize(32),
    },

    pageCard: {
        borderRadius: size.getWidthSize(12),
        backgroundColor: "#F6F6FA",
        alignItems: "center",
        justifyContent: "center",
        gap: size.getHeightSize(8),
        paddingHorizontal: size.getWidthSize(8),
        paddingBottom: size.getHeightSize(8),
        paddingTop: size.getHeightSize(16),
    },

    pageCardTitle: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#0A0B14",
    },

    progressBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        borderRadius: size.getWidthSize(12),
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#E2E3E9",
        padding: size.getWidthSize(16),
    },

    progressBarItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: size.getWidthSize(8),
    },

    progressBarText: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(12),
        lineHeight: size.getHeightSize(16),
        color: "#525466",
    },

    pageButton: {
        height: size.getHeightSize(56),
        borderRadius: size.getWidthSize(16),
        padding: size.getWidthSize(16),
        backgroundColor: "#374BFB",
        justifyContent: "center",
        alignItems: "center",
    },

    pageButtonText: {
        fontFamily: "Satoshi-Bold",
        fontSize: size.fontSize(18),
        lineHeight: size.getHeightSize(24),
        color: "#ffffff",
    },
});
