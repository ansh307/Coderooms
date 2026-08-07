import { ReactNode } from "react";
import AuthGuard from "@/components/auth/AuthGuard";

interface ProtectRoutesLayoutProps {
  children: ReactNode;
}

const ProtectRoutesLayout = ({ children }: ProtectRoutesLayoutProps) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default ProtectRoutesLayout;
