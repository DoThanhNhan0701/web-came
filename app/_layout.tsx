import { Stack } from "expo-router";
import ToastManager from 'toastify-react-native';

import "./globals.css";

export default function RootLayout() {
  return (
    <>
      <ToastManager />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
