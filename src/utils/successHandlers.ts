import { Toast } from "toastify-react-native";

interface ApiSuccess {
  message?: string;
}

const getSuccessMessage = (success: unknown): string => {
  const apiSuccess = success as ApiSuccess;
  return apiSuccess?.message || "Success";
};

export const handleApiSuccess = (success: unknown) => {
  Toast.success(getSuccessMessage(success));
};
