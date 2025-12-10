import { ArrowRight, Eye, EyeOff, Lock, User } from "lucide-react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { twMerge } from "tailwind-merge";

import { useDispatch, useSelector } from "react-redux";

import Logo from "@/assets/images/logo.png";
import ConditionalRender from "@/components/common/ConditionalRender";
import { endpoints } from "@/services/endpoints";
import { useMutation } from "@/services/useMutation";
import { AppDispatch, RootState } from "@/store";
import { actionFetchUser, actionLogin } from "@/store/slices/auth";
import { handleApiError } from "@/utils/errorHandlers";
import { Redirect } from "expo-router";
import { Toast } from "toastify-react-native";

type FormErrors = {
  username?: string;
  password?: string;
};

export default function LoginPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const loginMutation = useMutation<{
    data: {
      access: string;
      refresh: string;
      token_type: string;
      expires_in: number;
      is_lock: boolean;
    };
    message: string;
    status: number;
  }>({
    url: endpoints.LOGIN,
    method: "post",
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<FormErrors> = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const { response, error } = await loginMutation.mutate(
      { body: { username, password } },
      {
        onSuccess(result) {
          if (result.data.is_lock) Toast.error("Your account has been locked");
          else Toast.success("Login successfully");
        },
      }
    );

    if (error) {
      handleApiError(error);
    }

    if (response && !response.data.is_lock) {
      dispatch(
        actionLogin({
          access_token: response.data.access,
          refresh_token: response.data.refresh,
        })
      );
      dispatch(actionFetchUser());
    }
  };

  if (user) return <Redirect href="/" />;

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerClassName="grow justify-center p-[18px]"
    >
      <View className="w-full max-w-[448px] self-center">
        <View className="flex-row justify-center items-center mb-4 gap-2">
          <Image source={Logo} className="w-9 h-9" alt="Logo" />
          <Text className="text-4xl font-bold text-black">SAFARI</Text>
        </View>
        <Text className="text-center text-[#6B7280] mb-12">
          Sign in to your account
        </Text>

        <View className="gap-4">
          <View
            style={[styles.inputWrapper, errors.username && styles.inputError]}
          >
            <View className="mr-3">
              <User size={20} color="#9CA3AF" />
            </View>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                if (errors.username)
                  setErrors({ ...errors, username: undefined });
              }}
              placeholder="Username"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <ConditionalRender condition={!!errors.username}>
            <Text className="text-[#EF4444] text-[12px] mb-0 ml-4 mt-[-26px]">
              {errors.username}
            </Text>
          </ConditionalRender>

          <View
            style={[styles.inputWrapper, errors.password && styles.inputError]}
          >
            <View className="mr-3">
              <Lock size={20} color="#9CA3AF" />
            </View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                if (errors.password)
                  setErrors({ ...errors, password: undefined });
              }}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              className="p-1"
              onPress={() => setShowPassword(!showPassword)}
            >
              <ConditionalRender
                condition={showPassword}
                childrenIfFalse={<Eye size={20} color="#9CA3AF" />}
              >
                <EyeOff size={20} color="#9CA3AF" />
              </ConditionalRender>
            </TouchableOpacity>
          </View>
          <ConditionalRender condition={!!errors.password}>
            <Text className="text-[#EF4444] text-[12px] mb-0 mt-[-26px] ml-4">
              {errors.password}
            </Text>
          </ConditionalRender>

          <View className="flex-row justify-between items-center mb-4 px-2">
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                className={twMerge(
                  "w-5 h-5 rounded mr-2 justify-center items-center border-[2px] border-[#D1D5DB]",
                  rememberMe && "bg-[#2563EB] border-[#2563EB]"
                )}
              >
                <ConditionalRender condition={rememberMe}>
                  <Text className="text-white text-sm font-medium ">✓</Text>
                </ConditionalRender>
              </View>
              <Text className="text-[#374151] text-sm">Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text className="text-[#2563EB] text-sm">
                Forgot your password ?
              </Text>
            </TouchableOpacity>
          </View>

          <View className="items-end mt-4">
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={loginMutation.pending}
              className="px-8 py-4 flex-row gap-3 items-center bg-[#2563EB] rounded-full w-[36%] justify-center"
            >
              <Text className="text-white text-lg font-semibold ">Sign in</Text>
              <ConditionalRender
                condition={loginMutation.pending}
                childrenIfFalse={<ArrowRight size={24} color="#FFFFFF" />}
              >
                <ActivityIndicator size="small" color="#FFFFFF" />
              </ConditionalRender>
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-center text-[#9CA3AF] text-[12px] mt-[128px]">
          2025 © All rights reserved. Safari
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000000",
    height: "100%",
  },
  inputError: {
    borderColor: "#EF4444",
  },
});
