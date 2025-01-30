import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import GenericHeader from "@/components/GenericHeader";

const AddCard = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCard = async () => {
    router.back();
  };
  return (
    <>
      <CustomSafeArea topColor="#fff" bgColor="#ff000ffff">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <GenericHeader title={"Add card"} />
            <View>
              <View style={{ marginTop: size.getHeightSize(24) }}>
                <View>
                  <Text style={styles.label}>Card number</Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="phone-pad"
                    // value={phoneNumber}
                    // onChangeText={setPhoneNumber}
                    placeholder="0000 0000 0000 0000"
                  />
                </View>
              </View>
              <View
                style={{
                  marginTop: size.getHeightSize(12),
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.label}>Expiry date</Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="phone-pad"
                    // value={phoneNumber}
                    // onChangeText={setPhoneNumber}
                    placeholder="MM/YY"
                  />
                </View>

                <View style={{ flex: 1, marginLeft: size.getWidthSize(12) }}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={[styles.input]}
                    keyboardType="phone-pad"
                    // value={phoneNumber}
                    // onChangeText={setPhoneNumber}
                    placeholder="e.g 124"
                  />
                </View>
              </View>
              <View>
                {/* <CheckBox
              style={{ flex: 1, padding: 10 }}
              //   onClick={() => setIsChecked(!isChecked)}
              //   isChecked={isChecked}
              leftText={"Set card as default"}
            /> */}
              </View>
              <Pressable
                //   onPress={() => router.push("/screens/(fund)/NewCard")}
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
                  onPress={handleAddCard}
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

  subInput: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    marginLeft: size.getWidthSize(4),
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
export default AddCard;
