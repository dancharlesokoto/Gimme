import React from "react";
import { TouchableOpacity } from "react-native";
import { Svg, Path } from "react-native-svg";
import { size } from "@/config/size";
import { useRouter } from "expo-router";

const BackPage = React.memo(
    ({ page, type = "push" }: { page?: any; type?: "push" | "replace" }) => {
        const router = useRouter();
        const handlePress = () => {
            if (page) {
                if (type === "push") {
                    router.push(page);
                } else if (type === "replace") {
                    router.replace(page);
                }
            } else {
                router.back();
            }
        };

        return (
            <TouchableOpacity
                style={
                    {
                        // padding: size.getWidthSize(2),
                    }
                }
                hitSlop={size.getWidthSize(20)}
                onPress={handlePress}
            >
                <Svg
                    // xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#525466"
                    width={size.getWidthSize(20)}
                    height={size.getHeightSize(20)}
                >
                    <Path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                </Svg>
            </TouchableOpacity>
        );
    }
);

export default BackPage;
