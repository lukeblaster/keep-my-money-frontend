"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface UserProps {
  name: string;
  email: string;
}

export const Profile = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        setUser(JSON.parse(user));
      } catch (e) {
        console.error("Erro ao fazer parse do user", e);
      }
    }
  }, []);

  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage />
        <AvatarFallback className="rounded-lg">
          {user?.email[0]?.toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user?.name}</span>
        <span className="truncate text-xs">{user?.email}</span>
      </div>
    </>
  );
};
