import LoadingOverlay from "@/components/common/LoadingOverlay";
import { router, Stack, usePathname } from "expo-router";
import ToastManager from "toastify-react-native";

import { AppDispatch, RootState, store } from "@/store";

import { actionFetchUser } from "@/store/slices/auth";
import { Suspense, useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./globals.css";

function AppContent() {
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <AppContentInner />
    </Suspense>
  );
}

function AppContentInner() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(actionFetchUser());
  }, []);

  useEffect(() => {
    if (loading) return;

    const isLoginPage = pathname === "/login";

    if (!user && !isLoginPage) {
      router.replace("/login");
      return;
    }

    if (user && isLoginPage) {
      router.replace("/(private)/");
    }
  }, [loading, user, pathname]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <Provider store={store}>
        <ToastManager />
        <AppContent />
      </Provider>
    </GestureHandlerRootView>
  );
}
