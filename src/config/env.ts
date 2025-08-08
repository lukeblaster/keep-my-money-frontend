import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  NEXT_PUBLIC_BACKEND_URL: z.string().url(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("❌ Invalid environment variables", _env.error.format());
  process.exit(1);
}

export const env = _env.data;
