import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import CheckBox from "react-native-check-box";
import Svg, { Path } from "react-native-svg";
import { router } from "expo-router";

export default function AddContactAddress() {
  const [useAsDefault, setUseAsDefault] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <GenericHeader title="Add contact address" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.contactFormContainer}>
            <View style={styles.contactFormItem}>
              <Text style={styles.contactFormLabel}>Full name</Text>
              <TextInput
                style={styles.contactFormInput}
                placeholder="e.g John Doe"
              />
            </View>

            <View style={styles.contactFormItem}>
              <Text style={styles.contactFormLabel}>Street address</Text>
              <TextInput
                style={styles.contactFormInput}
                placeholder="e.g No.1 Gimme Street"
              />
            </View>

            <View style={styles.contactFormItem}>
              <Text style={styles.contactFormLabel}>City</Text>
              <TextInput
                style={styles.contactFormInput}
                placeholder="e.g Ikeja"
              />
            </View>

            <View style={styles.contactFormItem}>
              <Text style={styles.contactFormLabel}>State</Text>
              <TextInput
                style={styles.contactFormInput}
                placeholder="e.g Lagos"
              />
            </View>

            <View style={styles.contactFormItem}>
              <Text style={styles.contactFormLabel}>ZIP</Text>
              <TextInput
                style={styles.contactFormInput}
                placeholder="e.g 100001"
              />
            </View>

            {/* checkbox */}
            <View>
              <CheckBox
                isChecked={useAsDefault}
                onClick={() => setUseAsDefault(!useAsDefault)}
                rightText={"Set as default for delivery"}
                rightTextStyle={{
                  fontFamily: "Satoshi-Regular",
                  fontSize: size.fontSize(14),
                }}
                uncheckedCheckBoxColor="#1B1C1D1F"
                checkBoxColor="#374BFB"
              />
            </View>

            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "#374BFB",
                height: size.getHeightSize(56),
                marginVertical: size.getHeightSize(16),
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
                Save
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
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
                <Text style={styles.success}>New contact address added </Text>
              </View>
              <View style={{ marginTop: size.getHeightSize(300) }}>
                <Pressable
                  onPress={() => router.back()}
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
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  contactFormContainer: {
    paddingVertical: size.getHeightSize(24),
    gap: size.getHeightSize(24),
  },

  contactFormItem: {
    gap: size.getHeightSize(4),
  },

  contactFormLabel: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    color: "#0A0B14",
  },

  contactFormInput: {
    height: size.getHeightSize(56),
    borderColor: "#E2E3E9",
    fontFamily: "Satoshi-Regular",
    borderWidth: size.getWidthSize(1),
    borderRadius: size.getWidthSize(12),
    paddingHorizontal: size.getWidthSize(12),
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
