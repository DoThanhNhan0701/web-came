import { IInvoiceImage } from "@/types/IInvoice";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";

type Props = {
  images: IInvoiceImage[];
  loading?: boolean;
};

export default function ListImage({
  images,
  loading = false,
}: Readonly<Props>) {
  if (loading) {
    return (
      <View className="w-full flex-1 py-10 justify-center items-center">
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text className="text-gray-500 mt-3">Đang tải hình ảnh...</Text>
      </View>
    );
  }

  if (!loading && images.length === 0) {
    return (
      <View className="w-full py-10 justify-center items-center flex-1">
        <Text className="text-gray-500 text-base">Không có hình ảnh nào</Text>
      </View>
    );
  }

  return (
    <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
      <View className="flex-row flex-wrap" style={{ gap: 10 }}>
        {images.map((item) => (
          <View
            key={item.id}
            className="rounded-xl overflow-hidden bg-gray-200"
            style={{
              width: `${100 / 3 - 2}%`,
              aspectRatio: 1,
            }}
          >
            <Image
              source={{ uri: item.file_path }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
