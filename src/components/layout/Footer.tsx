import { Text, View } from "react-native";

export default function Footer() {
  return (
    <View className="bg-white py-4 px-2">
      <View className="items-center">
        <Text className="text-slate-900 font-bold text-base tracking-wider">
          CÔNG TY CỔ PHẦN RAINSCALES
        </Text>
        <Text className="text-slate-600 text-xs leading-6 text-center font-medium">
          📍 Số 02 Quang Trung, TP.Đà Nẵng{"\n"}
          📞 Tel: (+84) 236 6299 289{"\n"}
          ✉️ Email: contact_vbpo@vbpo.com.vn
        </Text>
      </View>
    </View>
  );
}
