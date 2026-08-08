"use client";

import { api } from "@/api";
import useAuthStore from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import React from "react";

const TestingPage = () => {
  const clearAuth = useAuthStore((state: any) => state.clearAuth);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      toast.success("Logout successful. Redirecting....");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in logout. Please try again.");
    } finally {
      clearAuth();
      router.replace("/login");
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={handleLogout}
        className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default TestingPage;
