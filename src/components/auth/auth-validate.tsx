"use client";

import { useEffect } from "react";

export function AuthValidate() {
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      document.location.href = "/login";
    }
  });

  return <></>;
}
