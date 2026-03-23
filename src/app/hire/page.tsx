import Link from "next/link";
import { ContributorAvatar } from "@/components/contributor-avatar";
import { SetupCard } from "@/components/setup-card";
import { SiteHeader } from "@/components/site-header";
import {
  getHireDestination,
  isProfilesTableMissingError,
  type ProfileRecord,
} from "@/lib/profiles";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createPublicClient } from "@/lib/supabase/public";

export const revalidate = 60;

type HireDirectoryState = {
  errorMessage: string | null;
  profiles: ProfileRecord[];
};

async function getHireProfiles(): Promise<HireDirectoryState> {
  if (!isSupabaseConfigured()) {
    return {
      errorMessage: "Supabase is not configured yet.",
      profiles: [],
    };
  }

  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("profiles")
    .select(
      "avatar_url, bio, contact_email, contact_phone, display_name, instagram_url, is_hireable, preferred_hire_contact, role_title, telegram_url, user_id, website_url, wevoa_profile_url",
    )
    .eq("is_hireable", true)
    .order("created_at", { ascending: false });

  if (error) {
    return {
      errorMessage:
        isProfilesTableMissingError(error.code)
          ? "Run the Supabase profiles migration to publish hireable profiles."
          : error.message,
      profiles: [],
    };
  }

  return {
    errorMessage: null,
    profiles: (data as ProfileRecord[]) ?? [],
  };
}

export default async function HirePage() {
  const { errorMessage, profiles } = await getHireProfiles();

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-5 pb-10 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-accent/10 bg-white px-6 py-10 shadow-[var(--hero-shadow)] sm:px-8 sm:py-12 lg:px-12 lg:py-16">
          <div className="absolute left-1/2 top-1/2 -z-10 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/8 blur-3xl sm:h-[28rem] sm:w-[28rem]" />

          <div className="relative max-w-4xl">
            <div className="eyebrow-chip inline-flex rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-foreground/60">
              Hire from Devdopz
            </div>
            <h1 className="mt-6 max-w-[10ch] text-5xl font-medium leading-[0.92] tracking-[-0.07em] text-foreground sm:text-6xl lg:text-[6rem]">
              Meet the contributors you can hire.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/68 sm:text-lg">
              Each public profile can choose its own hire destination while
              keeping the Wevoa profile link as the required base profile.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:px-10 lg:pb-24">
        {errorMessage ? (
          <SetupCard
            title="Hire directory is not ready yet"
            description={errorMessage}
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-5 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Log in
              </Link>
            </div>
          </SetupCard>
        ) : profiles.length === 0 ? (
          <SetupCard
            title="No public profiles yet"
            description="Once contributors create an account, complete their profile, and enable hire visibility, they will appear here."
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
              >
                Create account
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-5 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
              >
                Log in
              </Link>
            </div>
          </SetupCard>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {profiles.map((profile) => {
              const hireDestination = getHireDestination(profile);

              return (
                <article
                  key={profile.user_id}
                  className="soft-panel flex h-full flex-col rounded-[2rem] p-6"
                >
                  <ContributorAvatar
                    name={profile.display_name}
                    photo={profile.avatar_url ?? undefined}
                    size={72}
                  />

                  <h2 className="mt-8 text-3xl font-medium leading-[1.05] tracking-[-0.05em] text-foreground">
                    {profile.display_name}
                  </h2>
                  <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
                    {profile.role_title || "Contributor"}
                  </p>

                  {profile.bio ? (
                    <p className="mt-6 text-base leading-7 text-foreground/66">
                      {profile.bio}
                    </p>
                  ) : null}

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={hireDestination?.href ?? profile.wevoa_profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                    >
                      Hire
                    </a>
                    <a
                      href={profile.wevoa_profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-accent/15 bg-white px-5 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5"
                    >
                      Wevoa profile
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
