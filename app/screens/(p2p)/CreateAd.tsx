import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React, { act, useState } from "react";
import CustomSafeArea from "@/shared/CustomSafeArea";
import { size } from "@/config/size";
import GenericHeader from "@/components/GenericHeader";
import CreateAdProgress from "@/components/CreateAdProgress";
import CreateAdStepOne from "@/components/CreateAdStepOne";
import CreateAdStepTwo from "@/components/CreateAdStepTwo";

export default function CreateAd() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | any>(1);

  const handleProgressNext = () => {
    if (currentStep !== 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleProgressBack = () => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  return (
    <CustomSafeArea topColor="#ffffff" bgColor="#ffffff">
      <View style={styles.container}>
        <GenericHeader title="Create Ad" />
        <CreateAdProgress step={currentStep} />
        <ScrollView>
          <View style={styles.progressContent}>
            {currentStep === 1 && <CreateAdStepOne />}
            {currentStep === 2 && <CreateAdStepTwo />}
          </View>
          {currentStep > 1 && (
            <Pressable
              style={styles.inactiveButton}
              onPress={handleProgressBack}
            >
              <Text style={styles.inactiveButtonText}>Go back</Text>
            </Pressable>
          )}
          <Pressable
            style={styles.activeButton}
            onPress={() => handleProgressNext()}
          >
            <Text style={styles.activeButtonText}>Continue</Text>
          </Pressable>
        </ScrollView>
      </View>
    </CustomSafeArea>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: size.getWidthSize(24),
  },

  progressContent: {
    paddingVertical: size.getHeightSize(24),
  },

  activeButton: {
    backgroundColor: "#374BFB",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(8),
    borderRadius: size.getWidthSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  inactiveButton: {
    backgroundColor: "#F6F6FA",
    height: size.getHeightSize(56),
    marginVertical: size.getHeightSize(8),
    borderRadius: size.getWidthSize(16),
    alignItems: "center",
    justifyContent: "center",
  },

  activeButtonText: {
    color: "#FFFFFF",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },

  inactiveButtonText: {
    color: "#525466",
    fontFamily: "Satoshi-Bold",
    fontSize: size.fontSize(18),
  },
});
