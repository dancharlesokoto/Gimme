import { View, Text, TextInput, Keyboard, ScrollView } from "react-native";
import { useEffect, useMemo, useState } from "react";
import GenericHeader from "@/components/GenericHeader";
import { size } from "@/config/size";
import { StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import CustomRadioButton from "@/components/CustomRadioButton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CancelOrder() {
  const [cancelationReason, setCancelationReason] = useState("1");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardHeight = useSharedValue(100); //shared value for keyboard height
  const radioButtons = useMemo(
    () => [
      {
        id: "1", // acts as primary key, should be unique and non-empty string
        label: "Unable to make payment",
        value: "1",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },
      {
        id: "2",
        label: "Discussed with seller not to proceed",
        value: "2",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },
      {
        id: "3",
        label: "Poor seller attitude",
        value: "3",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },
      {
        id: "4",
        label: "Can’t contact seller",
        value: "4",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },

      {
        id: "5",
        label: "Suspect seller is a fraud",
        value: "5",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },

      {
        id: "6",
        label: "Others",
        value: "6",
        size: size.getWidthSize(20),
        borderColor: "#1B1C1D1F",
        color: "#2532A7",
      },
    ],
    []
  );

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      keyboardHeight.value = withTiming(e.endCoordinates.height + 20, {
        duration: 300,
      });
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      keyboardHeight.value = withTiming(0, { duration: 300 });
    });
    // Clean up listeners when the component unmounts
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    paddingBottom: keyboardHeight.value,
  }));

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#ffffff",
      }}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <GenericHeader title="Order cancelation" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, gap: size.getHeightSize(48) }}>
            <View
              className="NOTICE BOARD"
              style={{
                borderRadius: size.getHeightSize(12),
                paddingHorizontal: size.getWidthSize(16),
                paddingVertical: size.getHeightSize(16),
                backgroundColor: "#EBEFFF",
                flexDirection: "row",
                gap: size.getWidthSize(12),
                justifyContent: "space-between",
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
                  d="M10 17.5C5.85775 17.5 2.5 14.1423 2.5 10C2.5 5.85775 5.85775 2.5 10 2.5C14.1423 2.5 17.5 5.85775 17.5 10C17.5 14.1423 14.1423 17.5 10 17.5ZM9.25 9.25V13.75H10.75V9.25H9.25ZM9.25 6.25V7.75H10.75V6.25H9.25Z"
                  fill="#374BFB"
                />
              </Svg>

              <View style={{ flex: 1, gap: size.getHeightSize(8) }}>
                <Text style={styles.mainText}>Please note</Text>
                <Text style={styles.subText}>
                  You will not be able to cancel your order after you have
                  received the payment
                </Text>

                <Text
                  style={{
                    color: "#0A0B14",
                    fontFamily: "Satoshi-Bold",
                    textDecorationLine: "underline",
                  }}
                >
                  Learn more
                </Text>
              </View>

              <Svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                //   xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M10.0001 8.93906L13.7126 5.22656L14.7731 6.28706L11.0606 9.99956L14.7731 13.7121L13.7126 14.7726L10.0001 11.0601L6.28755 14.7726L5.22705 13.7121L8.93955 9.99956L5.22705 6.28706L6.28755 5.22656L10.0001 8.93906Z"
                  fill="#525466"
                />
              </Svg>

              {/* end */}
            </View>

            <View style={{ gap: size.getHeightSize(24) }}>
              <Text
                style={{
                  color: "#0A0B14",
                  fontFamily: "Satoshi-Bold",
                  fontSize: size.fontSize(16),
                }}
              >
                Cancelation reasons
              </Text>

              {/* radio buttons */}
              <View style={{ gap: size.getHeightSize(20) }}>
                {radioButtons.map((item, index) => (
                  <CustomRadioButton
                    onSelect={(value: string) => setCancelationReason(value)}
                    value={item.id}
                    key={index}
                    label={item.label}
                    active={item.id === cancelationReason}
                  />
                ))}
              </View>
              {cancelationReason === "6" && (
                <TextInput
                  style={styles.reasonInput}
                  placeholder="Type your reason"
                />
              )}
              {/* end */}
            </View>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  mainText: {
    color: "#0A0B14",
    fontFamily: "Satoshi-Bold",
    fontSize: size.getWidthSize(16),
  },

  subText: {
    color: "#525466",
    fontFamily: "Satoshi-Regular",
    fontSize: size.getWidthSize(14),
  },

  reasonInput: {
    height: size.getHeightSize(111),
    borderColor: "#E2E3E9",
    fontSize: size.fontSize(14),
    fontFamily: "Satoshi-Regular",
    borderWidth: size.getWidthSize(1),
    borderRadius: size.getWidthSize(12),
    paddingHorizontal: size.getWidthSize(10),
    textAlignVertical: "top",
    marginLeft: size.getWidthSize(16),
    marginRight: size.getWidthSize(1),
  },
});
