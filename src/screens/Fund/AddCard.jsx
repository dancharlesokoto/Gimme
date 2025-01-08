import React from "react";
import CustomSafeArea from "../../shared/CustomSafeArea";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { size } from "../../config/size";
import BackPage from "../../components/BackPage";
import { useNavigation } from "@react-navigation/native";

const AddCard = () => {
  const navigation = useNavigation();

  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BackPage page="FundCard" />
            <Text style={styles.pageName}>Add card</Text>
          </View>
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
              onPress={() => navigation.navigate("NewCard")}
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
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    color: "#0A0B14",
  },

  input: {
    height: 50,
    borderColor: "#E2E3E9",
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 10,
    marginTop: size.getHeightSize(4),
    marginBottom: size.getHeightSize(6),
    fontSize: 16,
  },

  subInput: {
    fontSize: 14,
    fontFamily: "Satoshi-Medium",
    lineHeight: 20,
    marginLeft: size.getWidthSize(4),
  },
});
export default AddCard;
