import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { AuthShell } from "@/components/auth-shell";
import { SetupCard } from "@/components/setup-card";
import { createPageMetadata } from "@/lib/seo";
import { hasSupabaseAuthCookies } from "@/lib/supabase/auth-cookie";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createPageMetadata({
  title: "Login",
  path: "/login",
  description: "Log in to manage your Devdopz profile and hire visibility.",
  noIndex: true,
});

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const initialError =
    params.error === "confirmation_failed"
      ? "We could not verify that email link. Request a new confirmation email or sign up again."
      : null;

  if (isSupabaseConfigured()) {
    const cookieStore = await cookies();

    if (hasSupabaseAuthCookies(cookieStore.getAll())) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        redirect("/profile");
      }
    }
  }

  return (
    <AuthShell
      eyebrow="Login"
      title="Sign in and continue building your public profile."
      description="Use your Devdopz account to manage your public hire profile, contact links, and visibility settings."
    >
      {isSupabaseConfigured() ? (
        <AuthForm mode="login" initialError={initialError} />
      ) : (
        <SetupCard
          title="Supabase setup required"
          description="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your environment, then run the SQL migration in supabase/migrations before using auth."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-5 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
            >
              Open signup page
            </Link>
          </div>
        </SetupCard>
      )}
    </AuthShell>
  );
}
