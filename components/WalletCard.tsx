import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  ScrollView,
} from "react-native";
import flagIcon from "@/assets/images/usa.png";
import hide from "@/assets/images/hide.png";
import { size } from "../config/size";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const WalletCard = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const currencies = [
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
  ];

  const [hideFunds, setHideFunds] = useState(false);
  const handleSwitch = () => {
    setHideFunds(!hideFunds);
  };
  return (
    <View style={styles.mainCard}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.pickContainer}>
          <Image
            source={flagIcon}
            style={{
              width: size.getWidthSize(20),
              height: size.getHeightSize(20),
            }}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Pressable
              style={styles.dropdownButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.selectedText}>{selectedCurrency}</Text>
            </Pressable>
            <Svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M10.5001 10.879L14.2126 7.1665L15.2731 8.227L10.5001 13L5.72705 8.227L6.78755 7.1665L10.5001 10.879Z"
                fill="#525466"
              />
            </Svg>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={currencies}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <Pressable
                      style={styles.modalItem}
                      onPress={() => {
                        setSelectedCurrency(item.label);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </Pressable>
                  )}
                />
              </View>
            </View>
          </Modal>
        </View>
        <Pressable
          style={{
            paddingVertical: size.getHeightSize(6),
            paddingHorizontal: size.getWidthSize(6),
            backgroundColor: hideFunds ? "#FFFFFF" : "#E2E3E9",
            borderRadius: 100,
            justifyContent: "center",
          }}
          onPress={handleSwitch}
        >
          {hideFunds ? (
            <Svg
              width="17"
              height="14"
              viewBox="0 0 17 14"
              fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M8.49999 0.25C12.544 0.25 15.9085 3.16 16.6142 7C15.9092 10.84 12.544 13.75 8.49999 13.75C4.45599 13.75 1.09149 10.84 0.385742 7C1.09074 3.16 4.45599 0.25 8.49999 0.25ZM8.49999 12.25C10.0296 12.2497 11.5138 11.7301 12.7096 10.7764C13.9055 9.82264 14.7422 8.49121 15.0827 7C14.7409 5.50998 13.9037 4.18 12.708 3.22752C11.5122 2.27504 10.0287 1.7564 8.49999 1.7564C6.97126 1.7564 5.48776 2.27504 4.29202 3.22752C3.09629 4.18 2.25907 5.50998 1.91724 7C2.25781 8.49121 3.0945 9.82264 4.29035 10.7764C5.4862 11.7301 6.97039 12.2497 8.49999 12.25ZM8.49999 10.375C7.60489 10.375 6.74644 10.0194 6.11351 9.38649C5.48057 8.75355 5.12499 7.89511 5.12499 7C5.12499 6.10489 5.48057 5.24645 6.11351 4.61351C6.74644 3.98058 7.60489 3.625 8.49999 3.625C9.3951 3.625 10.2535 3.98058 10.8865 4.61351C11.5194 5.24645 11.875 6.10489 11.875 7C11.875 7.89511 11.5194 8.75355 10.8865 9.38649C10.2535 10.0194 9.3951 10.375 8.49999 10.375ZM8.49999 8.875C8.99727 8.875 9.47419 8.67746 9.82582 8.32582C10.1774 7.97419 10.375 7.49728 10.375 7C10.375 6.50272 10.1774 6.02581 9.82582 5.67417C9.47419 5.32254 8.99727 5.125 8.49999 5.125C8.00271 5.125 7.5258 5.32254 7.17417 5.67417C6.82254 6.02581 6.62499 6.50272 6.62499 7C6.62499 7.49728 6.82254 7.97419 7.17417 8.32582C7.5258 8.67746 8.00271 8.875 8.49999 8.875Z"
                fill="#525466"
              />
            </Svg>
          ) : (
            <Svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              //       xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M12.9115 13.4728C11.5924 14.3095 10.062 14.7525 8.49999 14.75C4.45599 14.75 1.09149 11.84 0.385742 8.00005C0.708264 6.25309 1.58696 4.65722 2.89074 3.45055L0.543992 1.10605L1.60524 0.0447998L16.4545 14.8948L15.3932 15.9553L12.9107 13.4728H12.9115ZM3.95124 4.51255C2.932 5.43924 2.22198 6.65664 1.91724 8.00005C2.15146 9.02489 2.62169 9.98091 3.29049 10.792C3.9593 11.6031 4.80821 12.2468 5.76966 12.672C6.7311 13.0972 7.77853 13.2921 8.82856 13.2411C9.87859 13.1902 10.9022 12.8948 11.818 12.3785L10.297 10.8575C9.64951 11.2654 8.88264 11.4411 8.12217 11.3559C7.3617 11.2706 6.65277 10.9295 6.11167 10.3884C5.57057 9.84727 5.22941 9.13834 5.14416 8.37787C5.05891 7.6174 5.23463 6.85053 5.64249 6.20305L3.95124 4.51255ZM9.18549 9.74605L6.75399 7.31455C6.62054 7.65425 6.58913 8.02552 6.66362 8.38281C6.73811 8.7401 6.91526 9.06789 7.17333 9.32596C7.43141 9.58404 7.75919 9.76118 8.11648 9.83567C8.47378 9.91016 8.84504 9.87875 9.18474 9.7453L9.18549 9.74605ZM15.1052 11.444L14.032 10.3715C14.5333 9.65703 14.8903 8.85144 15.0827 8.00005C14.8789 7.10734 14.4957 6.26541 13.9564 5.52542C13.417 4.78543 12.7328 4.16284 11.9454 3.6955C11.158 3.22816 10.2837 2.92582 9.37579 2.80687C8.46787 2.68792 7.54525 2.75483 6.66399 3.00355L5.48049 1.82005C6.41574 1.45255 7.43499 1.25005 8.49999 1.25005C12.544 1.25005 15.9085 4.16005 16.6142 8.00005C16.3844 9.24932 15.8679 10.4282 15.1052 11.444ZM8.29224 4.63105C8.76962 4.60155 9.24783 4.67385 9.69515 4.84316C10.1425 5.01248 10.5487 5.27493 10.8869 5.61314C11.2251 5.95134 11.4876 6.35757 11.6569 6.80489C11.8262 7.25221 11.8985 7.73042 11.869 8.2078L8.29149 4.63105H8.29224Z"
                fill="#525466"
              />
            </Svg>
          )}
        </Pressable>
      </View>

      <View style={styles.amount}>
        <Text
          style={{
            fontFamily: "Satoshi-Regular",
            fontSize: size.fontSize(12),
          }}
        >
          Total Balance
        </Text>
        {hideFunds ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: size.getHeightSize(24),
            }}
          >
            <Image
              source={hide}
              style={{
                width: size.getWidthSize(171),
                height: size.getHeightSize(32),
                marginTop: size.getHeightSize(4),
                borderRadius: size.getHeightSize(8),
              }}
            />
            <Image
              source={hide}
              style={{
                width: size.getWidthSize(103),
                height: size.getHeightSize(12),
                marginTop: size.getHeightSize(4),
                borderRadius: size.getHeightSize(8),
              }}
            />
          </View>
        ) : (
          <>
            <Text
              style={{
                fontFamily: "Satoshi-Bold",
                fontSize: size.fontSize(36),
              }}
            >
              $1,340.35
            </Text>
            <Text
              style={{
                fontFamily: "Satoshi-Regular",
                fontSize: size.fontSize(12),
                paddingBottom: size.getHeightSize(24),
              }}
            >
              ~GM 26.82
            </Text>
          </>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: size.getHeightSize(12),
        }}
      >
        <Pressable
          style={styles.mainButton}
          onPress={() => router.push("/screens/(fund)/FundWallet")}
        >
          <Text style={styles.mainButtonText}>Fund wallet</Text>
        </Pressable>

        <Pressable
          style={styles.mainButton}
          onPress={() => router.push("/screens/(withdraw)/Withdraw")}
        >
          <Text style={styles.mainButtonText}>Withdraw money</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#F6F6FA",
    paddingVertical: size.getHeightSize(12),
    paddingHorizontal: size.getWidthSize(13.5),
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F6F6FA",
    marginTop: size.getHeightSize(30),
    marginHorizontal: size.getWidthSize(24),
  },

  amount: {
    justifyContent: "center",
    alignItems: "center",
  },

  mainButton: {
    height: size.getHeightSize(40),
    width: size.getWidthSize(140),
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#E2E3E9",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: size.getWidthSize(4),
  },

  mainButtonText: {
    fontSize: size.fontSize(12),
    fontFamily: "Satoshi-Medium",
    color: "#525466",
  },

  pickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E2E3E9",
    paddingHorizontal: size.getHeightSize(4),
    paddingVertical: size.getWidthSize(4),
    borderRadius: size.getWidthSize(100),
    width: size.getWidthSize(86),
  },

  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  selectedText: {
    fontSize: size.fontSize(14),
    paddingLeft: size.getWidthSize(8),
    fontFamily: "Satoshi-Regular",
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },

  modalItem: {
    padding: 10,
  },
  modalItemText: {
    fontSize: 18,
  },
});

export default WalletCard;
