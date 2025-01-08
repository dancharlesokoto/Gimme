import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
// import Icon from "react-native-vector-icons/MaterialIcons";

const KeyPad = () => {
  const [input, setInput] = useState("");

  const handlePress = (value) => {
    if (value === "backspace") {
      setInput(input.slice(0, -1));
    } else {
      setInput(input + value);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.keypad}>
        <View style={styles.row}>
          <KeypadButton value="1" onPress={handlePress} />
          <KeypadButton value="2" onPress={handlePress} />
          <KeypadButton value="3" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <KeypadButton value="4" onPress={handlePress} />
          <KeypadButton value="5" onPress={handlePress} />
          <KeypadButton value="6" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <KeypadButton value="7" onPress={handlePress} />
          <KeypadButton value="8" onPress={handlePress} />
          <KeypadButton value="9" onPress={handlePress} />
        </View>
        <View style={styles.row}>
          <KeypadButton value="backspace" onPress={handlePress} />
          <KeypadButton value="0" onPress={handlePress} />
          <View style={styles.button} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => console.log(input)}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const KeypadButton = ({ value, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => onPress(value)}>
      {value === "backspace" ? (
        // <Icon name="backspace" size={24} color="#000" />
        <Text>Cancel</Text>
      ) : (
        <Text style={styles.buttonText}>{value}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  keypad: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    color: "#000000",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    height: 60,
  },
  buttonText: {
    fontSize: 24,
    color: "#000",
  },
  continueButton: {
    backgroundColor: "#0057FF",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 8,
    marginBottom: 20,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default KeyPad;
