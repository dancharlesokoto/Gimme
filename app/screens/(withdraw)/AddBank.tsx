import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import flagIcon from "@/assets/images/usa.png";
import { Path, Svg } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";

const countries = [
  { label: "Algeria", value: "1" },
  { label: "Angola", value: "2" },
  { label: "Argentina", value: "3" },
  { label: "Bahamas", value: "4" },
  { label: "Belize", value: "5" },
  { label: "Benin", value: "6" },
  { label: "Bolivia", value: "7" },
  { label: "Botswana", value: "8" },
  { label: "Brazil", value: "9" },
  { label: "Canada", value: "10" },
  { label: "Chile", value: "11" },
  { label: "Colombia", value: "12" },
  { label: "Costa Rica", value: "13" },
  { label: "Côte d'Ivoire", value: "14" },
  { label: "Cuba", value: "15" },
];

const banks = [
  { label: "Access Bank", value: "1" },
  { label: "Citibank Nigeria", value: "2" },
  { label: "Ecobank Nigeria", value: "3" },
  { label: "Fidelity Bank", value: "4" },
  { label: "First Bank of Nigeria", value: "5" },
  { label: "First City Monument Bank", value: "6" },
  { label: "Guaranty Trust Bank", value: "7" },
  { label: "Keystone Bank", value: "8" },
  { label: "Polaris Bank", value: "9" },
  { label: "Stanbic IBTC Bank", value: "10" },
  { label: "Standard Chartered", value: "11" },
  { label: "Sterling Bank", value: "12" },
  { label: "Titan Trust Bank", value: "13" },
  { label: "Union Bank", value: "14" },
  { label: "United Bank for Africa", value: "15" },
];

const AddBank = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [country, setCountry] = useState(null);
  const [countryFocus, setCountryFocus] = useState(false);
  const [bank, setBank] = useState(null);
  const [bankFocus, setBankFocus] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountError, setAccountError] = useState(false);
  const [empty, setEmpty] = useState(false);

  const validateInputs = () => {
    let valid = true;

    if (accountNumber.length < 10 && accountNumber.length > 1) {
      setAccountError(true);
      valid = false;
    } else {
      setAccountError(false);
    }

    if (accountNumber.trim() === "") {
      setEmpty(true);
      valid = false;
    } else {
      setEmpty(false);
    }

    return valid;
  };

  const handleAddBank = () => {
    router.back();
  };

  return (
    <>
      <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <GenericHeader title={"Add bank"} />
            <View style={{ marginTop: size.getHeightSize(24) }}>
              <Text style={styles.label}>Country</Text>
              <Dropdown
                style={[
                  styles.input,
                  countryFocus && { borderColor: "blue" },
                  { paddingRight: size.getWidthSize(10) },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={countries}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choose country"
                searchPlaceholder="Search..."
                value={country}
                onFocus={() => setCountryFocus(true)}
                onBlur={() => setCountryFocus(false)}
                onChange={(item) => {
                  setCountry(item.value);
                  setCountryFocus(false);
                }}
              />
            </View>
            <View style={{ marginTop: size.getHeightSize(12) }}>
              <Text style={styles.label}>Bank name</Text>
              <Dropdown
                style={[
                  styles.input,
                  bankFocus && { borderColor: "blue" },
                  { paddingRight: size.getWidthSize(10) },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={banks}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Choose bank"
                searchPlaceholder="Search..."
                value={bank}
                onFocus={() => setBankFocus(true)}
                onBlur={() => setBankFocus(false)}
                onChange={(item) => {
                  setBank(item.value);
                  setBankFocus(false);
                }}
              />
            </View>
            <View style={{ marginTop: size.getHeightSize(12) }}>
              <View>
                <Text style={styles.label}>Account number</Text>
                <TextInput
                  style={[styles.input]}
                  keyboardType="phone-pad"
                  value={accountNumber}
                  onChangeText={setAccountNumber}
                  placeholder="1234567890"
                />
                {accountError ? (
                  <View style={styles.errorContainer}>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                        fill="#DF1C36"
                      />
                    </Svg>
                    <Text style={styles.error}>
                      Can’t resolve account number
                    </Text>
                  </View>
                ) : empty ? (
                  <View style={styles.errorContainer}>
                    <Svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      // xmlns="http://www.w3.org/2000/svg"
                    >
                      <Path
                        d="M6 12C2.6862 12 0 9.3138 0 6C0 2.6862 2.6862 0 6 0C9.3138 0 12 2.6862 12 6C12 9.3138 9.3138 12 6 12ZM5.4 7.8V9H6.6V7.8H5.4ZM5.4 3V6.6H6.6V3H5.4Z"
                        fill="#DF1C36"
                      />
                    </Svg>
                    <Text style={styles.error}>
                      Account Number cannot be empty
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>

            <View style={{ marginTop: size.getHeightSize(12) }}>
              <View>
                <Text style={styles.label}>Account name</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: "#F6F6FA" }]}
                  keyboardType="phone-pad"
                  // value={phoneNumber}
                  // onChangeText={setPhoneNumber}
                  placeholder="Jeremy Nkuku"
                  editable={false}
                />
              </View>
            </View>

            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "#374BFB",
                height: size.getHeightSize(56),
                borderRadius: size.getHeightSize(16),
                alignItems: "center",
                justifyContent: "center",
                marginTop: size.getHeightSize(24),
              }}
            >
              <Text
                style={{
                  fontSize: size.fontSize(18),
                  fontFamily: "Satoshi-Bold",
                  color: "#ffffff",
                  marginLeft: size.getWidthSize(10),
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
      </CustomSafeArea>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalInnerContainer}>
              <View
                style={{
                  marginTop: size.getHeightSize(181),
                  alignItems: "center",
                }}
              >
                <View style={styles.check}>
                  <Svg
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                    //   xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M14.0997 19.8064L25.1301 8.77478L26.8281 10.4716L14.0997 23.2L6.46289 15.5632L8.15969 13.8664L14.0997 19.8064Z"
                      fill="#38C793"
                    />
                  </Svg>
                </View>
                <Text style={styles.success}>New card added </Text>
              </View>
              <View style={{ marginTop: size.getHeightSize(300) }}>
                <Pressable
                  onPress={handleAddBank}
                  style={{
                    backgroundColor: "#374BFB",
                    height: size.getHeightSize(56),
                    borderRadius: size.getHeightSize(16),
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: size.fontSize(18),
                      fontFamily: "Satoshi-Bold",
                      color: "#ffffff",
                      marginLeft: size.getWidthSize(10),
                    }}
                  >
                    Continue
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  pageName: {
    paddingVertical: size.getHeightSize(14),
    marginLeft: size.getWidthSize(18),
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  label: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  input: {
    height: size.getHeightSize(54),
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: size.getWidthSize(12),
    paddingLeft: size.getWidthSize(10),
    marginTop: size.getHeightSize(4),
    marginBottom: size.getHeightSize(6),
    fontFamily: "Satoshi-Regular",
    fontSize: size.fontSize(14),
  },

  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  placeholderStyle: {
    fontSize: 16,
  },

  selectedTextStyle: {
    fontSize: 16,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  error: {
    color: "#DF1C36",
    paddingLeft: size.getWidthSize(4),
    fontFamily: "Satoshi-Regular",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    paddingHorizontal: size.getWidthSize(24),
    paddingVertical: size.getHeightSize(24),
    width: "100%",
    height: "100%",
  },
  modalInnerContainer: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },
  check: {
    borderWidth: 1,
    borderColor: "#E2E4E9",
    width: size.getWidthSize(64),
    height: size.getWidthSize(64),
    borderRadius: size.getWidthSize(96),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: size.getHeightSize(16),
    paddingHorizontal: size.getWidthSize(16),
  },
  success: {
    fontSize: size.fontSize(16),
    color: "#000000",
    marginTop: size.getHeightSize(16),
    fontFamily: "Satoshi-Bold",
  },
});

export default AddBank;
