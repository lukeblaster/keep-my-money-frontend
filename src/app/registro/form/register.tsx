"use client";
import { signUp } from "../../../api/auth/sign-up";
import { FormInputError } from "../../../components/errors/form-input-error";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { ApiError } from "../../../types/error";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const LoginSchema = z
  .object({
    name: z
      .string()
      .min(6, { message: "Nome deve ter no mínimo 6 caracteres." }),
    email: z.string().email({ message: "E-mail inválido." }),
    password: z
      .string()
      .min(6, { message: "Senha deve ter no mínimo 6 caracteres." }),
    password_confirm: z.string(),
  })
  .superRefine(({ password_confirm, password }, ctx) => {
    if (password_confirm !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas precisam ser iguais.",
        path: ["password_confirm"],
      });
    }
  });
type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: (response) => {
      document.location.href = "/login";
      toast.success(response.data.message);
    },
    onError: (e: AxiosError) => {
      const error = e.response?.data as ApiError;
      toast.warning(error.message);
    },
  });
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    const props = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    return mutation.mutate({ props: props });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <div className="mb-1">
        <Label className="text-md font-bold">Registre-se</Label>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Nome</label>
        <Input {...register("name")} placeholder="Nome" />
        <FormInputError>{errors.name?.message}</FormInputError>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">E-mail</label>
        <Input {...register("email")} placeholder="E-mail" />
        <FormInputError>{errors.email?.message}</FormInputError>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Senha</label>
        <Input {...register("password")} type="password" placeholder="Senha" />
        <FormInputError>{errors.password?.message}</FormInputError>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold">Confirme a senha</label>
        <Input
          {...register("password_confirm")}
          type="password"
          placeholder="Confirme a senha"
        />
        <FormInputError>{errors.password_confirm?.message}</FormInputError>
      </div>
      <div className="flex flex-col gap-1">
        <Button className="mt-1" disabled={mutation.isPending}>
          Registrar
        </Button>
        <p className="text-sm text-center">
          Já tem uma conta?{" "}
          <a href="/login" className="font-semibold text-primary-foreground">
            Faça login
          </a>
        </p>
      </div>
    </form>
  );
};
