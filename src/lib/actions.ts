"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { loginSchema } from "@/types/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormDataTypes {
  username: string;
  password: string;
}

const defaultValues = {
  username: "",
  password: "",
};

export async function login(formData: FormDataTypes) {
  console.log("triggered 2");

  try {
    const { username, password } = formData;
    const validatedFields = loginSchema.safeParse({
      username: username,
      password: password,
    });

    if (!validatedFields.success) {
      return {
        message: "validation error",
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    console.log("validation login process started...");

    await signIn("credentials", formData);

    return {
      message: "success",
      errors: {},
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "credentials error",
            errors: {
              ...defaultValues,
              credentials: "incorrect username or password",
            },
          };
        default:
          return {
            message: "unknown error",
            errors: {
              ...defaultValues,
              unknown: "unknown error",
            },
          };
      }
    }
    throw error;
  } finally {
    revalidatePath("/");
  }
}

export async function logout() {
  await signOut().then(() => {
    revalidatePath("/");
    redirect("/");
  });
}