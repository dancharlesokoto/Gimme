import { useUserStore } from "@/store/userStore";
import { router } from "expo-router";
import { useRef, useEffect, useState } from "react";
import { View, Text, AppState } from "react-native";

export default function useSessionTimeout() {
    ///State to check if the session is stale
    const [iStale, setIStale] = useState(false);

    const appState = useRef(AppState.currentState);
    const lastStale = useUserStore((state) => state.lastStale);

    const INACTIVITY_LIMIT = 1000 * 60 * 20;

    useEffect(() => {
        const subscription = AppState.addEventListener(
            "change",
            (nextAppState) => {
                if (
                    appState.current === "active" &&
                    nextAppState.match(/inactive|background/)
                ) {
                    useUserStore.getState().setLastStale(Date.now());
                }

                if (nextAppState === "active") {
                    if (Date.now() - lastStale >= INACTIVITY_LIMIT) {
                        setIStale(true);
                        router.replace("/onboarding/ReEnterPin");
                    } else {
                        setIStale(false);
                    }
                }

                appState.current = nextAppState;
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    useEffect(() => {
        if (lastStale !== null && Date.now() - lastStale >= INACTIVITY_LIMIT) {
            setIStale(true);
        } else {
            setIStale(false);
        }
    }, [lastStale]);
    return {
        isStale: iStale,
    };
}
