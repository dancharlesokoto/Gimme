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
import { size } from "@/config/size";
import { Svg, Path } from "react-native-svg";

const Country = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const currencies = [
    { label: "USD", value: "usd" },
    { label: "EUR", value: "eur" },
    { label: "GBP", value: "gbp" },
  ];

  return (
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
          //   xmlns="http://www.w3.org/2000/svg"
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
  );
};

const styles = StyleSheet.create({
  pickContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#E2E3E9",
    paddingHorizontal: size.getHeightSize(4),
    paddingVertical: size.getWidthSize(4),
    borderRadius: size.getWidthSize(100),
    width: size.getWidthSize(86),
    height: size.getHeightSize(28),
    alignItems: "center",
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

export default Country;
