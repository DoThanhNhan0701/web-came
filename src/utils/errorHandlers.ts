import { Toast } from "toastify-react-native";

interface ApiError {
  response?: { data?: { message?: string } };
}

const getErrorMessage = (error: unknown): string => {
  const apiError = error as ApiError;
  return apiError.response?.data?.message ?? "Error";
};

export const handleApiError = (error: unknown) => {
  Toast.error(getErrorMessage(error));
};
