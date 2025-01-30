import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { Svg, Path } from "react-native-svg";
import { size } from "@/config/size";
import Button from "@/components/Button";
import BackPage from "@/components/BackPage";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";
import CustomRippleButton from "@/components/CustomRippleButton";

const Create = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const validateInputs = () => {
    let valid = true;

    // Validate phone number
    if (phoneNumber.length < 11 && phoneNumber.length > 1) {
      setPhoneError(true);
      valid = false;
    } else {
      setPhoneError(false);
    }

    //empty phone number
    if (phoneNumber.trim() === "") {
      setEmpty(true);
      valid = false;
    } else {
      setEmpty(false);
    }

    // Validate email (if not empty)
    if (email && !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    return valid;
  };

  const handleCreateAccount = () => {
    if (validateInputs()) {
      router.push("/onboarding/Verify");
    } else {
      setError(true);
    }
  };

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <GenericHeader title="" />

          <View style={{ paddingTop: size.getHeightSize(24) }}>
            <Text style={styles.header}>Welcome to Gimme</Text>
            <Text style={styles.subHead}>
              Create an account with your phone number to get started.
            </Text>
          </View>

          <View style={{ paddingTop: size.getHeightSize(24) }}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={[styles.input, phoneError && { borderColor: "#DF1C36" }]}
              placeholder="e.g 08111222101"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            {phoneError ? (
              <View style={styles.errorContainer}>
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  //   xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#DF1C36"
                  />
                </Svg>
                <Text style={styles.error}>Phone number is incorrect</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Email Address (Optional)</Text>
            <TextInput
              style={[styles.input, emailError && { borderColor: "#DF1C36" }]}
              placeholder="e.g john@gmail.com"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            {emailError ? (
              <View style={styles.errorContainer}>
                <Svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  //   xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                    fill="#DF1C36"
                  />
                </Svg>

                <Text style={styles.error}>Email format is incorrect</Text>
              </View>
            ) : null}

            {empty ? (
              <View style={styles.emptyContainer}>
                <Svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z"
                    fill="#DF1C36"
                  />
                </Svg>

                <Text style={styles.empty}>
                  Fill in at least your phone number to create an account
                </Text>
              </View>
            ) : null}

            <View style={{ paddingTop: size.getHeightSize(8) }}>
              <CustomRippleButton
                style={{
                  borderRadius: size.getWidthSize(16),
                  alignSelf: "flex-start",
                }}
                contentContainerStyle={{
                  backgroundColor: "#374BFB",
                  paddingHorizontal: size.getWidthSize(16),
                  paddingVertical: size.getHeightSize(16),
                }}
                onPress={handleCreateAccount}
              >
                <Text
                  style={{
                    fontFamily: "Satoshi-Bold",
                    fontSize: size.fontSize(18),
                    color: "#fff",
                  }}
                >
                  Create account
                </Text>
              </CustomRippleButton>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </CustomSafeArea>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  header: {
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(20),
  },
  subHead: { fontFamily: "Satoshi-Regular", fontSize: size.fontSize(14) },

  label: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 30,
  },

  input: {
    height: size.getHeightSize(54),
    borderColor: "#E2E3E9",
    fontFamily: "Satoshi-Regular",
    borderWidth: 1,
    borderRadius: size.getWidthSize(12),
    paddingLeft: size.getWidthSize(10),
    marginBottom: size.getHeightSize(16),
    fontSize: size.fontSize(14),
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: size.getHeightSize(16),
    marginTop: size.getHeightSize(-10),
  },

  error: {
    color: "#DF1C36",
    paddingLeft: size.getWidthSize(4),
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
  },

  empty: {
    color: "#0A0B14",
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(14),
  },

  emptyContainer: {
    flexDirection: "row",
    marginBottom: size.getHeightSize(16),
    marginTop: size.getHeightSize(8),
    backgroundColor: "#FDEDEF",
    padding: size.getWidthSize(8),
    borderRadius: size.getWidthSize(8),
    gap: size.getWidthSize(8),
  },
});

export default Create;
