import {api} from "@/api";

export const login = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data, {
      skipAuthRefresh: true,
    },);
  return response.data;
};

export const signup = async (data: {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
}) => {
  const response = await api.post("/auth/signup", data, {
      skipAuthRefresh: true,
    },);
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  }, {
      skipAuthRefresh: true,
    },);

  return response.data;
};

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  const response = await api.post(
    "/auth/reset-password",
    data, {
      skipAuthRefresh: true,
    },
  );

  return response.data;
};

export const resendVerificationEmail = async (
  email: string,
) => {
  const response = await api.post(
    "/auth/resend-verification",
    {
      email,
    },
    {
      skipAuthRefresh: true,
    },
  );

  return response.data;
};