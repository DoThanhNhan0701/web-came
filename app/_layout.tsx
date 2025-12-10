import { router, Stack, usePathname } from "expo-router";
import ToastManager from "toastify-react-native";

import LoadingOverlay from "@/components/common/LoadingOverlay";
import { AppDispatch, RootState, store } from "@/store";
import { actionFetchUser } from "@/store/slices/auth";
import { Suspense, useEffect } from "react";
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
    if (!loading && !user && pathname !== "/login") {
      router.replace("/login");
    }
  }, [loading, user, pathname]);

  if (loading) return <LoadingOverlay />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

function RootLayout() {
  return (
    <Provider store={store}>
      <ToastManager />
      <AppContent />
    </Provider>
  );
}

export default RootLayout;
