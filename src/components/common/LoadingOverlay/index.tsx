import React from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingOverlay() {
  return (
    <View className="absolute inset-0 justify-center items-center z-50">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
}
