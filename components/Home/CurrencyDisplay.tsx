import { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { currencies } from "./CurrencyToggle";
import { size } from "@/config/size";

const CurrencyDisplay = ({ _currency }: { _currency: string }) => {
    const [isToggled, setIsToggled] = useState<any>(null);
    return (
        //Using this custom currency toggle instead of the global one then sycing the toggle function
        <>
            {/* <CurrencyToggle toggle={isToggled} hidden /> */}
            <Pressable
                style={styles.pickContainer}
                onPress={() => {
                    setIsToggled(Date.now());
                }}
            >
                <Image
                    source={
                        currencies.find((item) => item.value === _currency)
                            ?.icon
                    }
                    style={{
                        objectFit: "cover",
                        borderRadius: size.getWidthSize(1000),
                        width: size.getWidthSize(20),
                        height: size.getWidthSize(20),
                    }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.selectedText}>
                        {
                            currencies.find((item) => item.value === _currency)
                                ?.label
                        }
                    </Text>
                    {/* <Svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        //   xmlns="http://www.w3.org/2000/svg"
                    >
                        <Path
                            d="M10.5001 10.879L14.2126 7.1665L15.2731 8.227L10.5001 13L5.72705 8.227L6.78755 7.1665L10.5001 10.879Z"
                            fill="#525466"
                        />
                    </Svg> */}
                </View>
            </Pressable>
        </>
    );
};

export default CurrencyDisplay;

const styles = StyleSheet.create({
    pickContainer: {
        gap: size.getHeightSize(0),
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#E2E3E9",
        paddingHorizontal: size.getWidthSize(8),
        paddingRight: size.getWidthSize(12),
        paddingVertical: size.getHeightSize(8),
        borderRadius: size.getWidthSize(100),
        // width: size.getWidthSize(86),
    },

    selectedText: {
        fontSize: size.fontSize(14),
        paddingLeft: size.getWidthSize(8),
        fontFamily: "Satoshi-Regular",
    },
});
