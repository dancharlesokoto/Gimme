import {
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { size } from "@/config/size";
import BackPage from "@/components/BackPage";
import Svg, { Path } from "react-native-svg";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatBubble from "@/components/ChatBubble";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function ChatConversation() {
  const [inputValue, setInputValue] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardHeight = useSharedValue(0); //shared value for keyboard height
  const [chats, setChats] = useState([
    {
      id: 1,
      sentByMe: 1,
      message: "Hello, how are you? ",
      time: "12:00 PM",
    },

    {
      id: 1,
      sentByMe: 0,
      message: "Hello, how are you? ",
      time: "12:00 PM",
    },

    {
      id: 1,
      sentByMe: 1,
      message: "Hello, how are you? ",
      time: "12:00 PM",
    },
  ]);
  const scrollViewRef = useRef<any>();

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      keyboardHeight.value = withTiming(e.endCoordinates.height, {
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

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chats, isKeyboardVisible]);

  const handleSend = () => {
    if (inputValue.trim() === "") return;
    setChats([
      ...chats,
      {
        id: chats.length + 1,
        sentByMe: 1,
        message: inputValue,
        time: "12:00 PM",
      },
    ]);
    Keyboard.dismiss();
    setInputValue("");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.headerContainer}>
          <View style={styles.left}>
            <BackPage />
            <View
              style={{
                flexDirection: "row",
                gap: size.getWidthSize(12),
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: size.getWidthSize(40),
                  height: size.getWidthSize(40),
                  borderRadius: size.getWidthSize(999),
                  backgroundColor: "#EBEFFF",
                  justifyContent: "center",
                }}
              ></View>
              <View>
                <Text
                  style={{
                    fontSize: size.fontSize(14),
                    fontFamily: "Satoshi-Medium",
                    color: "#0A0B14",
                  }}
                >
                  Angelina Jolie
                </Text>
                <Text
                  style={{
                    fontSize: size.fontSize(12),
                    fontFamily: "Satoshi-Regular",
                    color: "#525466",
                  }}
                >
                  Online
                </Text>
              </View>
            </View>
          </View>
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          <View style={styles.chatsContainer}>
            {chats.map((item, index) => (
              <ChatBubble item={item} key={index} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.textBox}>
            <Svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              //   xmlns="http://www.w3.org/2000/svg"
            >
              <Path
                d="M12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM12 19.2C13.9096 19.2 15.7409 18.4414 17.0912 17.0912C18.4414 15.7409 19.2 13.9096 19.2 12C19.2 10.0904 18.4414 8.25909 17.0912 6.90883C15.7409 5.55857 13.9096 4.8 12 4.8C10.0904 4.8 8.25909 5.55857 6.90883 6.90883C5.55857 8.25909 4.8 10.0904 4.8 12C4.8 13.9096 5.55857 15.7409 6.90883 17.0912C8.25909 18.4414 10.0904 19.2 12 19.2ZM8.4 12.9H15.6C15.6 13.8548 15.2207 14.7705 14.5456 15.4456C13.8705 16.1207 12.9548 16.5 12 16.5C11.0452 16.5 10.1295 16.1207 9.45442 15.4456C8.77928 14.7705 8.4 13.8548 8.4 12.9ZM8.4 11.1C8.04196 11.1 7.69858 10.9578 7.44541 10.7046C7.19223 10.4514 7.05 10.108 7.05 9.75C7.05 9.39196 7.19223 9.04858 7.44541 8.79541C7.69858 8.54223 8.04196 8.4 8.4 8.4C8.75804 8.4 9.10142 8.54223 9.35459 8.79541C9.60777 9.04858 9.75 9.39196 9.75 9.75C9.75 10.108 9.60777 10.4514 9.35459 10.7046C9.10142 10.9578 8.75804 11.1 8.4 11.1ZM15.6 11.1C15.242 11.1 14.8986 10.9578 14.6454 10.7046C14.3922 10.4514 14.25 10.108 14.25 9.75C14.25 9.39196 14.3922 9.04858 14.6454 8.79541C14.8986 8.54223 15.242 8.4 15.6 8.4C15.958 8.4 16.3014 8.54223 16.5546 8.79541C16.8078 9.04858 16.95 9.39196 16.95 9.75C16.95 10.108 16.8078 10.4514 16.5546 10.7046C16.3014 10.9578 15.958 11.1 15.6 11.1Z"
                fill="#868898"
              />
            </Svg>

            <TextInput
              style={styles.textBoxInput}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="Type your message..."
            />

            <View style={{ flexDirection: "row", gap: size.getWidthSize(12) }}>
              <Svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                // xmlns="http://www.w3.org/2000/svg"
              >
                <Path
                  d="M19.2 12.8996C17.6898 12.8996 16.2759 13.3136 15.0663 14.0327C16.1434 15.2915 16.9794 16.7379 17.5323 18.2996H19.2V12.8996ZM15.6036 18.2996C13.8396 14.0714 9.6672 11.0996 4.8 11.0996V18.2996H15.6036ZM4.8 9.29961C8.247 9.29961 11.3907 10.5911 13.7766 12.716C15.3875 11.6585 17.273 11.0965 19.2 11.0996V3.89961H20.1072C20.6004 3.89961 21 4.30011 21 4.79331V19.2059C20.9984 19.4423 20.9038 19.6685 20.7367 19.8357C20.5697 20.0029 20.3436 20.0977 20.1072 20.0996H3.8928C3.65593 20.0994 3.42885 20.0051 3.26144 19.8375C3.09403 19.67 3 19.4428 3 19.2059V4.79331C3.00165 4.55695 3.09621 4.33072 3.26326 4.16351C3.43031 3.99629 3.65644 3.90149 3.8928 3.89961H6.6V2.09961H8.4V5.69961H4.8V9.29961ZM17.4 2.09961V5.69961H10.2V3.89961H15.6V2.09961H17.4ZM16.05 10.1996C15.692 10.1996 15.3486 10.0574 15.0954 9.8042C14.8422 9.55103 14.7 9.20765 14.7 8.84961C14.7 8.49157 14.8422 8.14819 15.0954 7.89501C15.3486 7.64184 15.692 7.49961 16.05 7.49961C16.408 7.49961 16.7514 7.64184 17.0046 7.89501C17.2578 8.14819 17.4 8.49157 17.4 8.84961C17.4 9.20765 17.2578 9.55103 17.0046 9.8042C16.7514 10.0574 16.408 10.1996 16.05 10.1996Z"
                  fill="#868898"
                />
              </Svg>

              <Pressable hitSlop={size.getWidthSize(10)} onPress={handleSend}>
                <Svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  // xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M3.90002 12.8997H9.30002V11.0997H3.90002V2.86106C3.90004 2.78286 3.92043 2.70602 3.95918 2.6381C3.99794 2.57018 4.05373 2.51354 4.12104 2.47375C4.18836 2.43396 4.26488 2.41239 4.34307 2.41119C4.42126 2.40998 4.49841 2.42916 4.56692 2.46686L21.1827 11.6055C21.2533 11.6443 21.3121 11.7014 21.3531 11.7707C21.3941 11.84 21.4157 11.9191 21.4157 11.9997C21.4157 12.0802 21.3941 12.1593 21.3531 12.2286C21.3121 12.2979 21.2533 12.355 21.1827 12.3939L4.56692 21.5325C4.49841 21.5701 4.42126 21.5893 4.34307 21.5881C4.26488 21.5869 4.18836 21.5654 4.12104 21.5256C4.05373 21.4858 3.99794 21.4291 3.95918 21.3612C3.92043 21.2933 3.90004 21.2164 3.90002 21.1383V12.8997Z"
                    fill="#374BFB"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    gap: size.getWidthSize(12),
    alignItems: "center",
  },

  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: size.getWidthSize(24),
    paddingVertical: size.getHeightSize(14),
    borderBottomWidth: size.getWidthSize(0.5),
    borderColor: "#E2E3E9",
  },

  chatsContainer: {
    flex: 1,
    paddingTop: size.getHeightSize(1600),
    backgroundColor: "#FFFFF",
    justifyContent: "flex-end",
    paddingHorizontal: size.getWidthSize(16),
    paddingBottom: size.getHeightSize(16),
    gap: size.getHeightSize(8),
  },

  inputContainer: {
    borderTopWidth: size.getWidthSize(0.5),
    borderColor: "#E2E3E9",
    paddingHorizontal: size.getWidthSize(24),
    paddingVertical: size.getHeightSize(24),
  },

  textBox: {
    height: size.getHeightSize(56),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: size.getWidthSize(12),
    borderWidth: size.getWidthSize(1),
    borderColor: "#E2E3E9",
    paddingHorizontal: size.getWidthSize(10),
  },

  textBoxInput: {
    fontFamily: "Satoshi-Medium",
    fontSize: size.fontSize(14),
    color: "#0A0B14",
    flex: 1,
  },
});
