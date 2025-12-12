import { router } from "expo-router";
import { BarChart3, TrendingUp, Users } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function HomePage() {
  const handleStatistics = () => {
    router.push("/(default)/statistics");
  };

  const handleCamera = () => {
    router.push("/(default)/list-invoice");
  };

  return (
    <View className="flex-1 justify-center items-center px-5 py-10">
      <View className="flex-row justify-center items-center w-full gap-5">
        <Pressable
          onPress={handleStatistics}
          className="items-center flex-1"
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.92 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <View className="bg-primary size-[165px] rounded-[36px] justify-center items-center mb-4">
            <View className="size-[135px] items-center justify-center bg-white rounded-[28px]">
              <View className="flex-row gap-2.5 mb-2">
                <View className="bg-blue-100 rounded-xl p-3 items-center justify-center">
                  <Users size={22} color="#3b82f6" strokeWidth={2.8} />
                </View>
                <View className="bg-blue-100 rounded-xl p-3 items-center justify-center">
                  <TrendingUp size={22} color="#3b82f6" strokeWidth={2.8} />
                </View>
              </View>
              <View className="flex-row gap-2.5">
                <View className="bg-blue-100 rounded-xl p-3 items-center justify-center">
                  <BarChart3 size={22} color="#3b82f6" strokeWidth={2.8} />
                </View>
                <View className="p-3 justify-center items-center bg-[#2563eb] rounded-xl">
                  <View className="size-[22px] bg-white rounded" />
                </View>
              </View>
            </View>
          </View>
          <Text className="text-slate-900 text-lg font-bold tracking-wide">
            Statistical
          </Text>
          <Text className="text-slate-500 text-xs mt-1.5 font-medium">
            View reports and analysis.
          </Text>
        </Pressable>

        <Pressable
          onPress={handleCamera}
          className="items-center flex-1"
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.92 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
        >
          <View className="bg-[#f97316] size-[165px] rounded-[36px] justify-center items-center mb-4">
            <View className="bg-[#6d28d9] relative rounded-[28px] w-[120px] h-[105px] justify-center items-center">
              <View className="bg-white rounded-full w-16 h-16 items-center justify-center">
                <View className="bg-purple-200 rounded-full w-10 h-10 items-center justify-center">
                  <View className="bg-purple-600 rounded-full w-5 h-5" />
                </View>
              </View>
              <View className="absolute -top-[10px] right-[22px] w-[26px] h-[26px] rounded-[13px] bg-[#6d28d9]" />
              <View className="absolute top-[10px] left-[14px] w-[18px] h-[10px] rounded-[5px] bg-[#8b5cf6]" />
            </View>
          </View>
          <Text className="text-slate-900 text-lg font-bold tracking-wide">
            Take a photo
          </Text>
          <Text className="text-slate-500 text-xs mt-1.5 font-medium">
            Record images
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
