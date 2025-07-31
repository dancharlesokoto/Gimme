import { AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUserStore } from "@/store/userStore";

const INACTIVITY_LIMIT = 20 * 1000; // 5 minutes
const LAST_ACTIVE_KEY = "lastActiveTime";

export function useSessionTimeout(onTimeout: () => void) {
    const [appState, setAppState] = useState(AppState.currentState);

    // Save last active time to storage
    const updateLastActive = useCallback(async () => {
        await AsyncStorage.setItem(LAST_ACTIVE_KEY, Date.now().toString());
    }, []);

    // Check if session is stale
    const checkTimeout = useCallback(async () => {
        const lastActive = await AsyncStorage.getItem(LAST_ACTIVE_KEY);
        if (lastActive) {
            const diff = Date.now() - parseInt(lastActive, 10);
            if (diff > INACTIVITY_LIMIT) {
                onTimeout();
            }
        }
        // Always update last active on resume
        await updateLastActive();
    }, [onTimeout, updateLastActive]);

    useEffect(() => {
        // On mount, set last active
        updateLastActive();

        // Listen for app state changes
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (
                    (appState === "inactive" || appState === "background") &&
                    nextAppState === "active"
                ) {
                    checkTimeout();
                } else if (
                    nextAppState === "inactive" ||
                    nextAppState === "background"
                ) {
                    updateLastActive();
                }
                setAppState(nextAppState);
            }
        );

        return () => subscription.remove();
    }, [appState, checkTimeout, updateLastActive]);

    // Call this on any user activity (touch, scroll, etc.)
    return { updateLastActive };
}
