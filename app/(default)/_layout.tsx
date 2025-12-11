import { Slot } from "expo-router";
import { View } from "react-native";

export default function DefaultLayout() {
  return (
    <View className="flex-1">
      <Slot />
    </View>
  );
}
