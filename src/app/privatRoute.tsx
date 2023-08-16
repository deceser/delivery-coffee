"use client";

import React from "react";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const isAuthorized = localStorage.getItem("userData");

  React.useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    }
  }, [isAuthorized, router]);

  if (isAuthorized) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
