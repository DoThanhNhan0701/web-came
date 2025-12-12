import { endpoints } from "@/services/endpoints";
import { useMutation } from "@/services/useMutation";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ScreenShotDetail() {
  const { id } = useLocalSearchParams();

  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCapturing, setIsCapturing] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  const invoiceMutation = useMutation({
    url: `${endpoints.INVOICES}/`,
    method: "post",
  });

  const handleCapture = async () => {
    if (isCapturing || !cameraRef.current || invoiceMutation.pending) return;

    try {
      setIsCapturing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
      });

      if (!photo?.uri) return;

      const formData = new FormData();
      formData.append("category_id", String(id));
      const file: { uri: string; name: string; type: string } = {
        uri: photo.uri,
        name: `invoice_${Date.now()}.jpg`,
        type: "image/jpeg",
      };

      formData.append("file", file as unknown as Blob);

      invoiceMutation.mutate({
        body: formData,
      });
    } catch (error) {
      console.error("Error taking picture:", error);
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // Handle camera permission
  if (!permission) {
    return (
      <View className="flex-1 bg-black">
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50 p-6">
        <StatusBar barStyle="dark-content" />
        <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
        <Text className="text-2xl font-bold text-gray-800 mt-6 mb-3">
          Cần quyền truy cập Camera
        </Text>
        <Text className="text-base text-gray-600 text-center mb-8 leading-6">
          Ứng dụng cần quyền truy cập camera để chụp ảnh hóa đơn
        </Text>
        <TouchableOpacity
          className="rounded-xl overflow-hidden"
          onPress={requestPermission}
        >
          <LinearGradient
            colors={["#4F46E5", "#7C3AED"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="px-8 py-4"
          >
            <Text className="text-base font-semibold text-white">
              Cho phép truy cập
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <StatusBar barStyle="light-content" />

      <CameraView ref={cameraRef} facing={facing} style={{ flex: 1 }} />

      <LinearGradient
        colors={["rgba(79, 70, 229, 0.9)", "rgba(124, 58, 237, 0.7)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: 48,
          paddingBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-lg font-bold text-white mb-1">
              Coop-Mart Hai Châu
            </Text>
            <Text className="text-sm text-white opacity-90">Bảng kê TPTS</Text>
          </View>
          <TouchableOpacity className="w-11 h-11 rounded-xl bg-white/20 justify-center items-center">
            <Ionicons name="grid-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View className="absolute bottom-0 left-0 right-0 pb-0">
        <View className="flex-row items-center justify-between px-4 py-5 bg-black/40">
          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-white/20 justify-center items-center"
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-3xl overflow-hidden"
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4169E1", "#5B7FE8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                paddingBottom: 12,
                maxWidth: 100,
              }}
            >
              <Text
                numberOfLines={1}
                className="text-[13px] font-semibold text-white text-center"
              >
                Biên bản
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center justify-center relative"
            onPress={handleCapture}
            activeOpacity={0.8}
            disabled={isCapturing || invoiceMutation.pending}
            style={{
              opacity: isCapturing || invoiceMutation.pending ? 0.6 : 1,
            }}
          >
            <View className="w-[72px] h-[72px] rounded-full bg-white justify-center items-center border-4 border-white/30">
              {isCapturing || invoiceMutation.pending ? (
                <ActivityIndicator size="large" color="#4F46E5" />
              ) : (
                <View className="w-[60px] h-[60px] rounded-full bg-white" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-3xl overflow-hidden"
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#4169E1", "#5B7FE8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 12,
                paddingBottom: 12,
                maxWidth: 100,
              }}
            >
              <Text
                numberOfLines={1}
                className="text-[13px] font-semibold text-white text-center"
              >
                KTSSSS đợt 1
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            className="w-11 h-11 rounded-full bg-white/20 justify-center items-center"
            onPress={toggleCameraFacing}
            activeOpacity={0.8}
          >
            <Ionicons name="camera-reverse-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
