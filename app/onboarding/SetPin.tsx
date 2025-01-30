import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { size } from "@/config/size";
import CustomSafeArea from "@/shared/CustomSafeArea";
import Button from "@/components/Button";
import BackPage from "@/components/BackPage";
import Cancel from "@/assets/svg/cancel.svg";
import { router } from "expo-router";

const SetPin = () => {
  const [pin, setPin] = useState(["", "", "", ""]);

  const handlePress = (value: any) => {
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
    router.push("/onboarding/ConfirmPin");
    // } else {
    //   setError(true);
    // }
  };

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <BackPage />
        <View>
          <Text style={styles.title}>Set up your Pin</Text>
          <Text style={styles.subtitle}>
            This pin will be used to login and complete transactions
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
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, ""].map((value, index) =>
              value !== null ? (
                <TouchableOpacity
                  key={index}
                  style={styles.keypadButton}
                  onPress={() => handlePress(value)}
                >
                  <Text style={styles.keypadText}>{value}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  style={styles.keypadButton}
                  onPress={handleDelete}
                >
                  <Cancel />
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        <Button width={325} onPress={handleNext} text="Continue" />
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
    marginTop: 95,
  },
  subtitle: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Regular",
    textAlign: "center",
    paddingTop: size.getHeightSize(8),
  },

  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: size.getHeightSize(32),
    gap: size.getWidthSize(8),
  },

  pinBox: {
    flex: 1,
    height: size.getHeightSize(64),
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
});

export default SetPin;
