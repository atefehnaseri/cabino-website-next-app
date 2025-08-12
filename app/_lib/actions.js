"use server";

import { signIn } from "./auth";

export async function signInAction() {
  return await signIn("google", { redirectTo: "/account" });
}
