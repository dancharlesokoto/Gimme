// components/FadeInView.tsx
import { Animated, ViewStyle } from "react-native";
import { useEffect, useRef } from "react";

export default function FadeInView({
    children,
    style,
    duration = 300,
}: {
    children: React.ReactNode;
    style?: ViewStyle;
    duration?: number;
}) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[{ opacity }, style]}>{children}</Animated.View>
    );
}
