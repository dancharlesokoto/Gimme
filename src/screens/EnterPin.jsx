import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { size } from "../config/size";
import CustomSafeArea from "../shared/CustomSafeArea";
import Button from "../components/Button";
import Cancel from "../../assets/svg/cancel.svg";
import Finger from "../../assets/svg/finger.svg";
import User from "../../assets/user.png";
import BackPage from "../components/BackPage";

const EnterPin = () => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      console.log(hasHardware);
      if (hasHardware) {
        console.log(hasHardware);
      }
      setIsBiometricSupported(hasHardware);
    })();
  }, []);

  const handlePress = (value) => {
    const newPin = [...pin];
    const index = pin.findIndex((num) => num === "");
    if (index !== -1) {
      newPin[index] = value;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    setPin((prevPin) => {
      const newPin = [...prevPin];
      const index = newPin.findIndex((num) => num === "");

      if (index === -1) {
        newPin[newPin.length - 1] = "";
      } else {
        for (let i = index - 1; i >= 0; i--) {
          if (newPin[i] !== "") {
            newPin[i] = "";
            break;
          }
        }
      }

      return newPin;
    });
  };

  const handleNext = () => {
    // if (validateInputs()) {
    navigation.navigate("BottomTabs", {
      screen: "Home",
    });
    // } else {
    //   setError(true);
    // }
  };

  const authenticateBiometrics = async () => {
    if (isBiometricSupported) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate with Face ID or Touch ID",
        fallbackLabel: "Enter PIN",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
        requireConfirmation: true,
      });

      if (result.success) {
        navigation.navigate("BottomTabs", {
          screen: "Home",
        });
      } else {
        console.log(
          "Authentication failed",
          "Please try again or enter your PIN.",
          result.error
        );
      }
    } else {
      console.log("Biometrics not available", "Please enter your PIN.");
    }
  };

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <BackPage page="Login" />
        <View>
          <Image source={User} style={styles.user} />
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Enter your pin below to enter Gimme
          </Text>

          <View style={styles.pinContainer}>
            {pin.map((digit, index) => (
              <View
                key={index}
                style={[
                  styles.pinBox,
                  index === 0 && styles.firstPinBox,
                  index === pin.length - 1 && styles.lastPinBox,
                ]}
              >
                <Text style={styles.pinText}>{digit}</Text>
              </View>
            ))}
          </View>

          <View style={styles.keypadContainer}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map((value, index) => {
              if (value === null) {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.keypadButton}
                    onPress={handleDelete}
                  >
                    <Cancel />
                  </TouchableOpacity>
                );
              } else if (value === "") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.keypadButton}
                    onPress={authenticateBiometrics}
                  >
                    <Finger />
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.keypadButton}
                    onPress={() => handlePress(value)}
                  >
                    <Text style={styles.keypadText}>{value}</Text>
                  </TouchableOpacity>
                );
              }
            })}
          </View>
        </View>

        <Button width="325" onPress={handleNext} text="Continue" />
      </View>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    fontSize: size.fontSize(20),
    fontFamily: "Satoshi-Bold",
    textAlign: "center",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    paddingTop: size.getHeightSize(8),
  },

  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(32),
  },

  pinBox: {
    width: 80,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E3E9",
  },

  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: size.getHeightSize(32),
  },

  keypadButton: {
    width: "30%",
    height: size.getHeightSize(77),
    justifyContent: "center",
    alignItems: "center",
  },

  keypadText: {
    fontSize: 24,
    fontFamily: "Satoshi-Medium",
  },
  firstPinBox: {
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  lastPinBox: {
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },

  pinText: {
    fontSize: 24,
    fontWeight: "bold",
  },

  continueButton: {
    backgroundColor: "#3366FF",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: size.getHeightSize(32),
  },

  continueText: {
    color: "#fff",
    fontSize: 16,
  },
  user: {
    alignSelf: "center",
    width: 72,
    height: 72,
    marginTop: size.getHeightSize(32),
  },
});

export default EnterPin;
