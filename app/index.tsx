import { AppDispatch, RootState } from "@/store";
import { actionFetchUser, actionLogoutUser } from "@/store/slices/auth";
import { LinearGradient } from "expo-linear-gradient";
import {
  BarChart3,
  LogOut,
  TrendingUp,
  User,
  Users,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function HomeScreen() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(actionFetchUser());
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleStatistics = () => {
    console.log("Navigate to statistics");
  };

  const handleCamera = () => {
    console.log("Navigate to camera");
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    dispatch(actionLogoutUser());
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Modern Gradient Header */}
      <LinearGradient
        colors={["#0f172a", "#1e293b", "#334155"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingHorizontal: 24,
          paddingVertical: 20,
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-white text-xl font-bold tracking-wide mb-1">
              SCA Coop-Nhật Châu
            </Text>
            <View className="flex-row items-center mt-1">
              <View className="w-2 h-2 bg-emerald-400 rounded-full mr-2" />
              <Text className="text-slate-300 text-sm font-medium">
                {user?.full_name || "Đang tải..."}
              </Text>
            </View>
          </View>

          {/* User Avatar Button with Gradient */}
          <Pressable
            onPress={() => setShowUserMenu(true)}
            style={({ pressed }) => [
              {
                width: 54,
                height: 54,
                borderRadius: 27,
                alignItems: "center",
                justifyContent: "center",
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <LinearGradient
              colors={["#3b82f6", "#2563eb", "#1d4ed8"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                width: 54,
                height: 54,
                borderRadius: 27,
                alignItems: "center",
                justifyContent: "center",
                elevation: 8,
                shadowColor: "#3b82f6",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 10,
              }}
            >
              <User size={28} color="white" strokeWidth={2.5} />
            </LinearGradient>
          </Pressable>
        </View>
      </LinearGradient>

      {/* User Menu Popover - Enhanced */}
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
          <View
            style={{
              position: "absolute",
              top: 95,
              right: 24,
              backgroundColor: "white",
              borderRadius: 24,
              minWidth: 250,
              elevation: 24,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 12 },
              shadowOpacity: 0.35,
              shadowRadius: 20,
              overflow: "hidden",
            }}
          >
            {/* User Info Section with Gradient Background */}
            <LinearGradient
              colors={["#f0f9ff", "#e0f2fe"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ paddingHorizontal: 20, paddingVertical: 20 }}
            >
              <View className="flex-row items-center">
                <LinearGradient
                  colors={["#3b82f6", "#2563eb"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 14,
                  }}
                >
                  <User size={26} color="white" strokeWidth={2.5} />
                </LinearGradient>
                <View className="flex-1">
                  <Text className="text-slate-900 font-bold text-base">
                    sca1000gsk1
                  </Text>
                  <Text className="text-slate-600 text-xs mt-1">
                    SCA Coop-Nhật Châu
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View className="h-px bg-gray-200" />

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="flex-row items-center px-6 py-5 active:bg-red-50"
            >
              <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                <LogOut size={20} color="#ef4444" strokeWidth={2.5} />
              </View>
              <Text className="text-red-600 font-bold text-base ml-4">
                Đăng xuất
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* Main Content Area */}
      <ScrollView
        className="flex-1 bg-gradient-to-b from-blue-50/30 to-white"
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={["#3b82f6", "#8b5cf6"]}
            progressBackgroundColor="#ffffff"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center items-center px-5 py-10">
          {/* Action Buttons Container */}
          <View className="flex-row justify-center items-center w-full gap-5">
            {/* Statistics Card - Enhanced */}
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
              <LinearGradient
                colors={["#3b82f6", "#2563eb", "#1d4ed8"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 165,
                  height: 165,
                  borderRadius: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  elevation: 18,
                  shadowColor: "#3b82f6",
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.6,
                  shadowRadius: 24,
                }}
              >
                <View
                  style={{
                    width: 135,
                    height: 135,
                    borderRadius: 28,
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 14,
                  }}
                >
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
                    <LinearGradient
                      colors={["#3b82f6", "#2563eb"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        borderRadius: 12,
                        padding: 12,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View className="w-5 h-5 bg-white rounded" />
                    </LinearGradient>
                  </View>
                </View>
              </LinearGradient>
              <Text className="text-slate-900 text-lg font-bold tracking-wide">
                Thống kê
              </Text>
              <Text className="text-slate-500 text-xs mt-1.5 font-medium">
                Xem báo cáo & phân tích
              </Text>
            </Pressable>

            {/* Camera Card - Enhanced */}
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
              <LinearGradient
                colors={["#f97316", "#ea580c", "#dc2626"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: 165,
                  height: 165,
                  borderRadius: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  elevation: 18,
                  shadowColor: "#f97316",
                  shadowOffset: { width: 0, height: 12 },
                  shadowOpacity: 0.6,
                  shadowRadius: 24,
                }}
              >
                <LinearGradient
                  colors={["#7c3aed", "#6d28d9", "#5b21b6"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: 120,
                    height: 105,
                    borderRadius: 28,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    elevation: 10,
                    shadowColor: "#7c3aed",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.5,
                    shadowRadius: 14,
                  }}
                >
                  {/* Camera Lens */}
                  <View className="bg-white rounded-full w-16 h-16 items-center justify-center">
                    <View className="bg-purple-200 rounded-full w-10 h-10 items-center justify-center">
                      <View className="bg-purple-600 rounded-full w-5 h-5" />
                    </View>
                  </View>
                  {/* Camera Flash */}
                  <View
                    style={{
                      position: "absolute",
                      top: -10,
                      right: 22,
                      width: 26,
                      height: 26,
                      borderRadius: 13,
                      backgroundColor: "#6d28d9",
                    }}
                  />
                  {/* Camera Viewfinder */}
                  <View
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 14,
                      width: 18,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#8b5cf6",
                    }}
                  />
                </LinearGradient>
              </LinearGradient>
              <Text className="text-slate-900 text-lg font-bold tracking-wide">
                Chụp ảnh
              </Text>
              <Text className="text-slate-500 text-xs mt-1.5 font-medium">
                Ghi nhận hình ảnh
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Modern Footer with Gradient Accent */}
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 24,
          paddingVertical: 28,
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          elevation: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -6 },
          shadowOpacity: 0.08,
          shadowRadius: 12,
        }}
      >
        <View className="items-center">
          <View className="flex-row items-center mb-3">
            <View className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            <Text className="text-slate-900 font-bold text-base tracking-wider">
              CÔNG TY CỔ PHẦN RAINSCALES
            </Text>
            <View className="w-2 h-2 bg-purple-500 rounded-full ml-2" />
          </View>
          <LinearGradient
            colors={["#3b82f6", "#8b5cf6", "#d946ef"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: 80,
              height: 4,
              borderRadius: 2,
              marginBottom: 16,
            }}
          />
          <Text className="text-slate-600 text-xs leading-6 text-center font-medium">
            📍 Số 02 Quang Trung, TP.Đà Nẵng{"\n"}
            📞 Tel: (+84) 236 6299 289{"\n"}
            ✉️ Email: contact_vbpo@vbpo.com.vn
          </Text>
        </View>
      </View>
    </View>
  );
}
