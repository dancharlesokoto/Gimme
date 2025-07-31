import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useLayoutEffect, useState } from "react";
import Svg, { Path } from "react-native-svg";
import { size } from "@/config/size";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

//...
type SimpleNotifyType = {
    title: String;
    description?: String;
    link?: String;
    icon?: String;
};

export default function SimpleNotify({
    title,
    description,
    link,
    icon,
}: SimpleNotifyType) {
    ///....
    const [isShown, setIsShown] = useState(true);

    //...
    const handleClose = () => {
        setIsShown(false);
    };

    ///...
    const _height = useSharedValue(size.getHeightSize(135));
    //...
    useEffect(() => {
        _height.value = withTiming(isShown ? size.getHeightSize(135) : 0);
    }, [isShown]);

    return (
        <Animated.View
            style={{
                height: _height,
                paddingTop: size.getHeightSize(8),
            }}
        >
            {isShown && (
                <View
                    style={{
                        height: size.getHeightSize(135),
                        paddingVertical: size.getHeightSize(14),
                        paddingHorizontal: size.getWidthSize(16),
                        backgroundColor: "#EBEFFF",
                        borderRadius: size.getHeightSize(16),
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <View style={{ flexDirection: "row" }}>
                        <Svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            // xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775 3.85775 0.5 8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5ZM7.25 7.25V11.75H8.75V7.25H7.25ZM7.25 4.25V5.75H8.75V4.25H7.25Z"
                                fill="#374BFB"
                            />
                        </Svg>
                        <View
                            style={{
                                marginLeft: size.getWidthSize(12),
                                width: size.getWidthSize(220),
                            }}
                        >
                            <Text style={styles.mainText}>{title}</Text>
                            <Text style={styles.subText}>{description}</Text>
                            <Text style={styles.link}>Learn More</Text>
                        </View>
                    </View>
                    <TouchableOpacity hitSlop={20} onPress={handleClose}>
                        <Svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            // xmlns="http://www.w3.org/2000/svg"
                        >
                            <Path
                                d="M9.99999 8.93955L13.7125 5.22705L14.773 6.28755L11.0605 10.0001L14.773 13.7126L13.7125 14.7731L9.99999 11.0606L6.28749 14.7731L5.22699 13.7126L8.93949 10.0001L5.22699 6.28755L6.28749 5.22705L9.99999 8.93955Z"
                                fill="#525466"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
            )}
            <View></View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    mainText: {
        fontSize: size.getWidthSize(16),
        fontFamily: "Satoshi-Bold",
        marginBottom: size.getHeightSize(4),
    },

    subText: {
        color: "#525466",
        fontSize: size.getWidthSize(14),
        fontFamily: "Satoshi-Regular",
    },

    link: {
        marginTop: size.getHeightSize(10),
        fontSize: size.getWidthSize(14),
        color: "#0A0B14",
        fontFamily: "Satoshi-Medium",
        textDecorationLine: "underline",
    },

    label: {
        fontSize: size.fontSize(14),
        fontFamily: "Satoshi-Medium",
        lineHeight: 20,
        color: "#0A0B14",
    },
});
