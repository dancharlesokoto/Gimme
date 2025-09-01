import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export default function useBiometrics() {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isError, setIsError] = useState(false);

    const hasHardwareCheck = useCallback(async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricSupported(hasHardware);
    }, []);

    useEffect(() => {
        hasHardwareCheck();
    }, []);

    const authenticateBiometrics = async () => {
        setIsAuthenticated(false);
        if (isBiometricSupported) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Authenticate with Face ID or Touch ID",
                fallbackLabel: "Enter PIN",
                cancelLabel: "Cancel",
                disableDeviceFallback: false,
                requireConfirmation: true,
            });

            if (result.success) {
                console.log("High");
                setIsAuthenticated(true);
                setIsError(false);
            } else {
                setIsAuthenticated(false);
                setIsError(true);
            }
        }
    };

    return {
        isBiometricSupported,
        isAuthenticated,
        isError,
        authenticateBiometrics,
    };
}
