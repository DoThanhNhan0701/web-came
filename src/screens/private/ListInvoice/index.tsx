import { invoiceTypes } from "@/constants/data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export interface IInvoice {
  id: string;
  name: string;
  count: number;
  icon: string;
  route?: string;
}

export default function ListInvoice() {
  const handleRedirectCamera = (id: string) => {
    router.push(`/(default)/${id}`);
  };

  const renderItem = ({ item }: { item: IInvoice }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      className="bg-white rounded-2xl mb-3"
      onPress={() => handleRedirectCamera(item.id)}
    >
      <View className="flex-row items-center p-4">
        <View className="mr-4">
          <View className="size-12 bg-primary justify-center items-center rounded-xl">
            <Ionicons name={item.icon as any} size={24} color="#FFFFFF" />
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-base font-semibold text-[#1F2937]">
            {item.name}
          </Text>
        </View>
        <View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1">
      <View className="items-center flex-row justify-between p-3 bg-primary px-4 pt-12 pb-4">
        <TouchableOpacity
          className="bg-white size-10 rounded-full justify-center items-center"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} className="text-primary" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold uppercase">
          Select invoice type
        </Text>
        <View className="w-10" />
      </View>

      <FlatList
        data={invoiceTypes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerClassName="p-4"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
