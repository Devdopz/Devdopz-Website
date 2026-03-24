"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

type AuthFormProps = {
  initialError?: string | null;
  initialMessage?: string | null;
  mode: "login" | "signup";
};

export function AuthForm({
  initialError = null,
  initialMessage = null,
  mode,
}: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(initialError);
  const [isPending, setIsPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(
    initialMessage,
  );

  const isLogin = mode === "login";

  useEffect(() => {
    setErrorMessage(initialError);
    setStatusMessage(initialMessage);
  }, [initialError, initialMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);
    setIsPending(true);

    try {
      const supabase = createClient();

      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          setErrorMessage(error.message);
          return;
        }

        router.push("/profile");
        router.refresh();
        return;
      }

      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: new URL(
            "/auth/confirm",
            window.location.origin,
          ).toString(),
        },
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      if (data.session) {
        router.push("/profile");
        router.refresh();
        return;
      }

      setStatusMessage(
        "Account created. Check your email to confirm your account. The confirmation link will bring you back to Devdopz automatically.",
      );
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="soft-panel h-full rounded-[2rem] p-6 sm:p-7">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
          {isLogin ? "Welcome back" : "Join Devdopz"}
        </p>
        <p className="mt-2 text-sm leading-6 text-foreground/60">
          {isLogin
            ? "Sign in to manage your profile and hire visibility."
            : "Create your account, then finish your public profile after signup."}
        </p>
      </div>

      <div className="grid gap-5">
        <div>
          <label className="text-sm font-medium text-foreground/70">
            Email
          </label>
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-foreground/28 focus:border-accent/25"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/70">
            Password
          </label>
          <input
            type="password"
            autoComplete={isLogin ? "current-password" : "new-password"}
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 placeholder:text-foreground/28 focus:border-accent/25"
            placeholder="Minimum 8 characters"
          />
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-4 text-sm leading-6 text-red-600">{errorMessage}</p>
      ) : null}

      {statusMessage ? (
        <p className="mt-4 text-sm leading-6 text-foreground/64">
          {statusMessage}
        </p>
      ) : null}

      <div className="mt-6">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Please wait..." : isLogin ? "Log in" : "Create account"}
        </button>
      </div>

      <p className="mt-4 text-sm leading-6 text-foreground/60">
        {isLogin ? "Need an account?" : "Already have an account?"}{" "}
        <Link
          href={isLogin ? "/signup" : "/login"}
          className="font-medium text-accent transition-opacity duration-200 hover:opacity-80"
        >
          {isLogin ? "Create one here" : "Log in here"}
        </Link>
      </p>
    </form>
  );
}
