import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  Modal,
  ScrollView,
} from "react-native";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import { Path, Svg } from "react-native-svg";
import Img from "@/assets/images/emptyCard.png";
import Country from "@/components/Country";
import Edit from "@/assets/svg/edit.svg";
import { router } from "expo-router";
import GenericHeader from "@/components/GenericHeader";

const GetCash = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <GenericHeader title={"Get cash"} showCountry />
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              marginVertical: size.getHeightSize(14),
              paddingVertical: size.getHeightSize(24),
              backgroundColor: "#F6F6FA",
              borderRadius: size.getHeightSize(16),
              alignItems: "center",
            }}
          >
            <Image source={Img} style={styles.img} />
            <Text style={styles.imgText}>
              Add a bank account to withdraw to
            </Text>
            <View>
              <Pressable
                onPress={() => router.push("/screens/(withdraw)/AddBank")}
                style={{
                  backgroundColor: "#374BFB",
                  height: size.getHeightSize(44),
                  width: size.getWidthSize(140),
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: size.getHeightSize(12),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  <Svg
                    style={{ alignSelf: "center" }}
                    width="11"
                    height="12"
                    viewBox="0 0 11 12"
                    fill="none"
                    //   xmlns="http://www.w3.org/2000/svg"
                  >
                    <Path
                      d="M4.75 5.25V0.75H6.25V5.25H10.75V6.75H6.25V11.25H4.75V6.75H0.25V5.25H4.75Z"
                      fill="white"
                    />
                  </Svg>

                  <Text
                    style={{
                      fontSize: size.fontSize(12),
                      fontFamily: "Satoshi-Medium",
                      color: "#ffffff",
                      marginLeft: size.getWidthSize(10),
                    }}
                  >
                    Add Bank
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
          <View style={{ marginVertical: size.getHeightSize(24) }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>Selected bank</Text>
              <Edit />
            </View>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={{
                borderColor: "#374BFB",
                borderWidth: 1,
                borderRadius: size.getHeightSize(12),
                paddingVertical: size.getHeightSize(16),
                paddingHorizontal: size.getWidthSize(16),
                marginTop: size.getHeightSize(12),
              }}
            >
              <Text
                style={{
                  fontFamily: "Satoshi-Bold",
                  fontSize: size.fontSize(16),
                  color: "#0A0B14",
                }}
              >
                Access Bank
              </Text>
              <Text
                style={{
                  paddingTop: size.getHeightSize(4),
                  fontFamily: "Satoshi-Regular",
                  fontSize: size.fontSize(12),
                  color: "#525466",
                }}
              >
                10130481945 . Jeremy Nkuku
              </Text>
            </Pressable>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.modalHead}>Edit selected bank</Text>
                    <Pressable
                      onPress={() => setModalVisible(false)}
                      style={{
                        flexDirection: "row",
                        padding: size.getHeightSize(6),
                        alignItems: "center",
                        borderWidth: 1,
                        borderRadius: 8,
                        borderColor: "#E2E3E9",
                      }}
                    >
                      <Svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        //   xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M10.0001 8.93955L13.7126 5.22705L14.7731 6.28755L11.0606 10.0001L14.7731 13.7126L13.7126 14.7731L10.0001 11.0606L6.28755 14.7731L5.22705 13.7126L8.93955 10.0001L5.22705 6.28755L6.28755 5.22705L10.0001 8.93955Z"
                          fill="#525466"
                        />
                      </Svg>
                      <Text
                        style={{
                          fontFamily: "Satoshi-Mdium",
                          fontSize: size.fontSize(12),
                        }}
                      >
                        Close
                      </Text>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginTop: size.getHeightSize(12),
                    }}
                  >
                    <Pressable
                      style={{
                        borderColor: "#374BFB",
                        borderWidth: 1,
                        borderRadius: size.getHeightSize(12),
                        paddingVertical: size.getHeightSize(16),
                        paddingHorizontal: size.getWidthSize(16),
                        marginTop: size.getHeightSize(12),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Satoshi-Bold",
                          fontSize: size.fontSize(16),
                          color: "#0A0B14",
                        }}
                      >
                        Access Bank
                      </Text>
                      <Text
                        style={{
                          paddingTop: size.getHeightSize(4),
                          fontFamily: "Satoshi-Regular",
                          fontSize: size.fontSize(12),
                          color: "#525466",
                        }}
                      >
                        10130481945 . Jeremy Nkuku
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        borderColor: "#E2E3E9",
                        borderWidth: 1,
                        borderRadius: size.getHeightSize(12),
                        paddingVertical: size.getHeightSize(16),
                        paddingHorizontal: size.getWidthSize(16),
                        marginTop: size.getHeightSize(12),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Satoshi-Bold",
                          fontSize: size.fontSize(16),
                          color: "#0A0B14",
                        }}
                      >
                        Access Bank
                      </Text>
                      <Text
                        style={{
                          paddingTop: size.getHeightSize(4),
                          fontFamily: "Satoshi-Regular",
                          fontSize: size.fontSize(12),
                          color: "#525466",
                        }}
                      >
                        10130481945 . Jeremy Nkuku
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{
                        borderColor: "#E2E3E9",
                        borderWidth: 1,
                        borderRadius: size.getHeightSize(12),
                        paddingVertical: size.getHeightSize(16),
                        paddingHorizontal: size.getWidthSize(16),
                        marginTop: size.getHeightSize(12),
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Satoshi-Bold",
                          fontSize: size.fontSize(16),
                          color: "#0A0B14",
                        }}
                      >
                        Access Bank
                      </Text>
                      <Text
                        style={{
                          paddingTop: size.getHeightSize(4),
                          fontFamily: "Satoshi-Regular",
                          fontSize: size.fontSize(12),
                          color: "#525466",
                        }}
                      >
                        10130481945 . Jeremy Nkuku
                      </Text>
                    </Pressable>
                    <View
                      style={{
                        marginTop: size.getHeightSize(16),
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        //   xmlns="http://www.w3.org/2000/svg"
                      >
                        <Path
                          d="M12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM12 19.2C13.9096 19.2 15.7409 18.4414 17.0912 17.0912C18.4414 15.7409 19.2 13.9096 19.2 12C19.2 10.0904 18.4414 8.25909 17.0912 6.90883C15.7409 5.55857 13.9096 4.8 12 4.8C10.0904 4.8 8.25909 5.55857 6.90883 6.90883C5.55857 8.25909 4.8 10.0904 4.8 12C4.8 13.9096 5.55857 15.7409 6.90883 17.0912C8.25909 18.4414 10.0904 19.2 12 19.2ZM11.1 7.5H12.9V9.3H11.1V7.5ZM11.1 11.1H12.9V16.5H11.1V11.1Z"
                          fill="#525466"
                        />
                      </Svg>

                      <Text
                        style={{
                          fontSize: size.fontSize(14),
                          fontFamily: "Satoshi-Regular",
                          marginLeft: size.getWidthSize(8),
                          color: "#525466",
                        }}
                      >
                        Go to your
                      </Text>
                      <Pressable>
                        <Text
                          style={{
                            fontSize: size.fontSize(14),
                            marginLeft: size.getWidthSize(3),
                            fontFamily: "Satoshi-Regular",
                            color: "#374BFB",
                          }}
                        >
                          settings
                        </Text>
                      </Pressable>

                      <Text
                        style={{
                          fontSize: size.fontSize(14),
                          fontFamily: "Satoshi-Regular",
                          marginLeft: size.getWidthSize(3),
                          color: "#525466",
                        }}
                      >
                        to delete cards
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingTop: size.getHeightSize(24),
                    }}
                  >
                    <Pressable
                      style={[
                        styles.mainButton,
                        { backgroundColor: "#374BFB" },
                      ]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text
                        style={[styles.mainButtonText, { color: "#ffffff" }]}
                      >
                        Save
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.mainButton,
                        { backgroundColor: "#F6F6FA" },
                      ]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text style={styles.mainButtonText}>Add bank</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>Amount to to withdraw</Text>
                <Text style={styles.labelBal}>Balance: NGN 150,000</Text>
              </View>

              <TextInput
                style={[styles.input]}
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                placeholder="1000 - 99,999"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={[styles.subInput, { color: "#525466" }]}>
                Equivalent to GM 0
              </Text>
            </View>
          </View>
          <View
            style={{
              marginVertical: size.getHeightSize(24),
              paddingVertical: size.getHeightSize(24),
              paddingHorizontal: size.getWidthSize(24),
              backgroundColor: "#F6F6FA",
              borderRadius: size.getHeightSize(16),
            }}
          >
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.convertText}>Today’s rate</Text>
              <Text style={styles.convertAmount}>0.001 GM = NGN 1</Text>
            </View>
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
                marginTop: size.getHeightSize(12),
              }}
            >
              <Text style={styles.convertText}>Transaction fee</Text>
              <Text style={styles.convertAmount}>5%</Text>
            </View>
            <View style={styles.line} />
            <View
              style={{
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={styles.convertText}>Conversion</Text>
              <Text style={styles.convertAmount}>x 0.001 GM</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.label}>Amount to receive</Text>
              <TextInput
                style={[styles.input]}
                keyboardType="phone-pad"
                // value={phoneNumber}
                // onChangeText={setPhoneNumber}
                placeholder="1000 - 99,999"
              />
            </View>
          </View>

          <Pressable
            onPress={() => router.push("/screens/Receipt")}
            style={{
              backgroundColor: "#374BFB",
              height: size.getHeightSize(56),
              borderRadius: size.getHeightSize(16),
              alignItems: "center",
              justifyContent: "center",
              marginTop: size.getHeightSize(24),
              marginBottom: size.getHeightSize(100), //Remove this after integration
            }}
          >
            <Text
              style={{
                fontSize: size.fontSize(18),
                fontFamily: "Satoshi-Bold",
                color: "#ffffff",
              }}
            >
              Withdraw
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </CustomSafeArea>
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

  img: {
    width: size.getWidthSize(63),
    height: size.getWidthSize(63),
  },

  imgText: {
    fontSize: size.getWidthSize(16),
    fontFamily: "Satoshi-Regular",
    marginTop: size.getHeightSize(4),
  },

  label: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  labelBal: {
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#525466",
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
    lineHeight: size.getWidthSize(20),
    marginLeft: size.getWidthSize(4),
  },

  convertText: {
    fontSize: 14,
    fontFamily: "Satoshi-Regular",
    lineHeight: size.getWidthSize(20),
    color: "#525466",
  },

  convertAmount: {
    fontSize: size.fontSize(12),
    fontFamily: "Satoshi-Medium",
    lineHeight: size.getWidthSize(16),
    color: "#0A0B14",
  },

  line: {
    height: 1,
    backgroundColor: "#CDCED5",
    marginVertical: size.getHeightSize(12),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: size.getHeightSize(35),
    paddingHorizontal: size.getWidthSize(21),
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: size.getWidthSize(16),
    paddingHorizontal: size.getWidthSize(24),
    paddingVertical: size.getHeightSize(24),
    width: "100%",
  },

  modalHead: {
    fontSize: size.fontSize(18),
    fontFamily: "Satoshi-Bold",
    lineHeight: size.getWidthSize(24),
  },

  mainButton: {
    flex: 1,
    padding: 16,
    backgroundColor: "#374BFB",
    marginRight: 10,
    alignItems: "center",
    paddingVertical: size.getHeightSize(16),
    borderRadius: size.getHeightSize(16),
  },

  mainButtonText: {
    fontSize: size.fontSize(18),
    fontFamily: "Satoshi-Bold",
    color: "#525466",
  },
});

export default GetCash;
