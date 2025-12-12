import { AppDispatch, RootState } from "@/store";
import { actionLogout } from "@/store/slices/auth";
import { LogOut, User } from "lucide-react-native";
import { useState } from "react";
import {
  Modal,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    dispatch(actionLogout());
  };

  return (
    <View>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
      <View className="bg-primary px-4 pt-12 pb-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <Text className="text-lg font-bold text-white mb-1">
              {user?.email}
            </Text>
            <Text className="text-sm text-white opacity-90">
              {user?.full_name}
            </Text>
          </View>
          <Pressable
            onPress={() => setShowUserMenu(true)}
            style={({ pressed }) => [
              {
                width: 44,
                height: 44,
                borderRadius: 27,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <View className="w-12 h-12 rounded-full bg-[#3b82f6] items-center justify-center">
              <User size={28} color="white" strokeWidth={2.5} />
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={showUserMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUserMenu(false)}
      >
        <Pressable
          className="flex-1 bg-black/60"
          onPress={() => setShowUserMenu(false)}
        >
          <View className="absolute top-[95px] right-6 bg-white rounded-3xl min-w-[150px]">
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center px-5 py-3 active:bg-red-50"
            >
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                <LogOut size={20} color="#ef4444" strokeWidth={2.5} />
              </View>
              <Text className="text-red-600 font-bold text-base ml-4">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
