import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { AppDispatch } from "@/store";
import { actionFetchUser } from "@/store/slices/auth";
import { Slot } from "expo-router";
import { useCallback } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";

export default function PrivateLayout() {
  const dispatch = useDispatch<AppDispatch>();

  const onRefresh = useCallback(async () => {
    await dispatch(actionFetchUser());
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
            refreshing={false}
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
