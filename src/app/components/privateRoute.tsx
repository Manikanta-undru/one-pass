"use client";

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { useAuth } from "@/config/auth";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  // Redirect to login if not authenticated
  console.log(currentUser, "from private route");
  if (!currentUser) {
    redirect('/');
    return null;
  }

  return <>{children}</>;
};

export default PrivateRoute;
