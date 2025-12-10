import { AppDispatch, RootState } from "@/store";
import { actionLogoutUser } from "@/store/slices/auth";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(actionLogoutUser());
  };

  return (
    <View className="flex-1 justify-center items-center">
      {user ? (
        <Text onPress={handleLogout}>Logout {user?.email}</Text>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </View>
  );
}
