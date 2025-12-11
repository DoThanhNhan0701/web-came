import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppDispatch } from "@/store";
import { actionFetchUser } from "@/store/slices/auth";
import { Slot } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

export default function PrivateLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(actionFetchUser());
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  return (
    <View className="flex-1">
      <Header />
      <ScrollView
        contentContainerClassName="grow"
        className=" flex-1 bg-gradient-to-b from-blue-50/30 to-white"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#3b82f6"
            colors={["#3b82f6", "#8b5cf6"]}
            progressBackgroundColor="#ffffff"
          />
        }
      >
        <Slot />
      </ScrollView>
      <Footer />
    </View>
  );
}
