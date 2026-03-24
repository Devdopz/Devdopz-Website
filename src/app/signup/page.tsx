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
  title: "Signup",
  path: "/signup",
  description: "Create a Devdopz account and build your public hire profile.",
  noIndex: true,
});

export default async function SignupPage() {
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
      eyebrow="Signup"
      title="Create an account and set up your Devdopz profile."
      description="Join with one clean account flow, then build the public profile people will see on the hire page."
    >
      {isSupabaseConfigured() ? (
        <AuthForm mode="signup" />
      ) : (
        <SetupCard
          title="Supabase setup required"
          description="Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY to your environment, then run the SQL migration in supabase/migrations before using signup."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-5 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
            >
              Open login page
            </Link>
          </div>
        </SetupCard>
      )}
    </AuthShell>
  );
}
