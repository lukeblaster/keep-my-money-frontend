"use client";
import { signIn } from "@/api/auth/signin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Mail, LockKeyhole } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginInput = z.infer<typeof LoginSchema>;

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: (response) => {
      document.location.href = "/painel/dashboard";
      localStorage.setItem("user", JSON.stringify(response.data.data.userInfo));
      toast.success(response.data.message);
    },
    onError: (e: AxiosError) => {
      const error = e.response?.data as ApiError;
      toast.warning(error.message);
    },
  });
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    const props = {
      email: data.email,
      password: data.password,
    };

    return mutation.mutate({ props: props });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div>
        <Label className="font-bold">Faça o seu login</Label>
      </div>
      <div className="flex items-center gap-3">
        <Mail />
        <Input {...register("email")} placeholder="E-mail" />
      </div>
      <div className="flex items-center gap-3">
        <LockKeyhole />
        <Input {...register("password")} type="password" placeholder="Senha" />
      </div>
      <div className="flex flex-col gap-1">
        <Button className="mt-1" disabled={mutation.isPending}>
          Entrar
        </Button>
        <p className="text-sm text-center">
          Não tem uma conta?{" "}
          <a href="/registro" className="font-semibold text-primary-foreground">
            Registre-se
          </a>
        </p>
      </div>
    </form>
  );
};
