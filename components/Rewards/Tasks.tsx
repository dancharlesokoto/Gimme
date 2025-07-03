import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { size } from "@/config/size";
import Svg, { Path, Rect } from "react-native-svg";

const CompleteIcon = () => (
    <Svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Rect width="30" height="30" rx="15" fill="#38C78B" />
        <Path
            d="M13.5001 17.3789L20.3941 10.4841L21.4553 11.5446L13.5001 19.4999L8.72705 14.7269L9.78755 13.6664L13.5001 17.3789Z"
            fill="white"
        />
    </Svg>
);

export default function Tasks() {
    const TASK_DATA = useMemo(
        () => [
            {
                title: "Complete registration",
                description: "Finish your registration process",
                amount: 40,
                complete: true,
            },
            {
                title: "Setup KYC",
                description: "Setup KYC",
                amount: 20,
                complete: false,
                icon: (
                    <Svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="30" height="30" rx="15" fill="#E2E3E9" />
                        <Path
                            d="M15 6.75L21.1627 8.1195C21.5055 8.196 21.75 8.49975 21.75 8.8515V16.3417C21.75 17.8462 20.9977 19.2517 19.746 20.0858L15 23.25L10.254 20.0858C9.0015 19.251 8.25 17.8463 8.25 16.3425V8.8515C8.25 8.49975 8.4945 8.196 8.83725 8.1195L15 6.75ZM18.339 12.1665L14.6265 15.8783L12.5055 13.7573L11.445 14.8177L14.6273 18L19.4003 13.227L18.339 12.1665Z"
                            fill="#525466"
                        />
                    </Svg>
                ),
            },
            {
                title: "Complete transactions",
                description: "Complete transactions",
                amount: 20,
                complete: false,
                icon: (
                    <Svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                    >
                        <Rect width="30" height="30" rx="15" fill="#E2E3E9" />
                        <Path
                            d="M15 22.5C10.8578 22.5 7.5 19.1423 7.5 15C7.5 10.8578 10.8578 7.5 15 7.5C19.1423 7.5 22.5 10.8578 22.5 15C22.5 19.1423 19.1423 22.5 15 22.5ZM15 11.8177L11.8177 15L15 18.1823L18.1823 15L15 11.8177Z"
                            fill="#525466"
                        />
                    </Svg>
                ),
            },
        ],
        []
    );
    return (
        <View style={styles.taskContainer}>
            {TASK_DATA.map((task, index) => (
                <TouchableOpacity key={index} style={styles.taskItem}>
                    {task.complete ? <CompleteIcon /> : task.icon}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.taskTitle}>{task.title}</Text>
                        <Text style={styles.taskDescription}>
                            {task.description}
                        </Text>
                    </View>
                    <Text style={styles.taskAmount}>+{task.amount}GM</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    taskContainer: {
        borderRadius: size.getWidthSize(16),
        padding: size.getWidthSize(4),
        gap: size.getWidthSize(4),
        backgroundColor: "#F6F6FA",
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",

        alignItems: "center",
        borderRadius: size.getWidthSize(16),
        backgroundColor: "#FFFFFF",
        padding: size.getWidthSize(12),
        gap: size.getWidthSize(16),
    },

    taskTitle: {
        fontFamily: "Satoshi-Medium",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
        color: "#0A0B14",
    },
    taskDescription: {
        fontFamily: "Satoshi-Regular",
        fontSize: size.fontSize(10),
        color: "#0A0B14",
    },

    taskAmount: {
        fontFamily: "Satoshi-Bold",
        color: "#2D3047",
        fontSize: size.fontSize(14),
        lineHeight: size.getHeightSize(20),
    },
});
