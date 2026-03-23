import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/auth-form";
import { SetupCard } from "@/components/setup-card";
import { SiteHeader } from "@/components/site-header";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SignupPage() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      redirect("/profile");
    }
  }

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36 lg:pb-24">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rounded-[2.4rem] border border-accent/10 bg-white px-6 py-8 shadow-[var(--card-shadow)] sm:px-8 sm:py-10">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Signup
            </div>
            <h1 className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.05em] sm:text-5xl">
              Create an account and build your hire profile.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-foreground/68 sm:text-lg">
              After signup, each user can complete a public profile with a
              required Wevoa link and their preferred public hire destination.
            </p>
          </div>

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
        </div>
      </section>
    </main>
  );
}
