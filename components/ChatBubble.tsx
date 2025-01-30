import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { size } from "@/config/size";
import Svg, { Path } from "react-native-svg";

export default function ChatBubble({ item }: { item: any }) {
  return (
    <View
      key={item.id}
      style={item.sentByMe === 1 ? styles.myChatBubble : styles.otherChatBubble}
    >
      <Text
        style={
          item.sentByMe === 1
            ? styles.chatBubbleText
            : styles.otherChatBubbleText
        }
      >
        {item.message}
      </Text>
      <View
        style={
          item.sentByMe === 1
            ? styles.chatBubbleInfo
            : styles.otherChatBubbleInfo
        }
      >
        <Text
          style={{
            color: item.sentByMe === 1 ? "#E2E3E9" : "#868898",
            fontFamily: "Satoshi-Regular",
            fontSize: size.fontSize(10),
          }}
        >
          {item.time}
        </Text>
        {item.sentByMe === 1 && (
          <Svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            //   xmlns="http://www.w3.org/2000/svg"
          >
            <Path
              d="M9.7015 11.3201L10.7605 12.3791L17.11 6.02962L18.1705 7.09012L10.7605 14.5001L5.9875 9.72712L7.048 8.66663L8.64175 10.2604L9.7015 11.3194V11.3201ZM9.703 9.19913L13.417 5.48438L14.4745 6.54187L10.7605 10.2566L9.703 9.19913ZM7.58275 13.4404L6.523 14.5001L1.75 9.72712L2.8105 8.66663L3.87025 9.72638L3.8695 9.72712L7.58275 13.4404Z"
              fill="#CDCED5"
            />
          </Svg>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  myChatBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#374BFB",
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(8),
    borderRadius: size.getWidthSize(12),
    borderBottomRightRadius: 0,
    maxWidth: "60%",
    gap: size.getHeightSize(10),
  },

  otherChatBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#EBEFFF",
    paddingHorizontal: size.getWidthSize(12),
    paddingVertical: size.getHeightSize(8),
    borderRadius: size.getWidthSize(12),
    borderBottomLeftRadius: 0,
    maxWidth: "60%",
    gap: size.getHeightSize(10),
  },

  chatBubbleText: {
    fontFamily: "Satoshi-Regular",
    color: "#FFFFFF",
    fontSize: size.fontSize(14),
    alignSelf: "flex-end",
  },

  chatBubbleInfo: {
    alignSelf: "flex-end",
    flexDirection: "row",
    gap: size.getWidthSize(4),
    alignItems: "center",
  },

  otherChatBubbleText: {
    fontFamily: "Satoshi-Regular",
    color: "#0A0B14",
    fontSize: size.fontSize(14),
  },

  otherChatBubbleInfo: {
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: size.getWidthSize(4),
    alignItems: "center",
  },
});
