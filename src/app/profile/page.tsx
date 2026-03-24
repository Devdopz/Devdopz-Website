import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/profile-form";
import { SetupCard } from "@/components/setup-card";
import { SiteHeader } from "@/components/site-header";
import {
  isProfilesTableMissingError,
  type ProfileRecord,
} from "@/lib/profiles";
import { createPageMetadata } from "@/lib/seo";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata: Metadata = createPageMetadata({
  title: "Profile",
  path: "/profile",
  description: "Manage your Devdopz contributor profile and hire page visibility.",
  noIndex: true,
});

export default async function ProfilePage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="relative overflow-hidden">
        <SiteHeader />

        <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pt-36 lg:pb-24">
          <SetupCard
            title="Supabase setup required"
            description="Configure Supabase and run the profiles SQL migration before opening the profile editor."
          />
        </section>
      </main>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "avatar_url, bio, contact_email, contact_phone, display_name, instagram_url, is_hireable, preferred_hire_contact, role_title, telegram_url, user_id, website_url, wevoa_profile_url",
    )
    .eq("user_id", user.id)
    .maybeSingle<ProfileRecord>();

  const migrationMissing = isProfilesTableMissingError(error?.code);

  return (
    <main className="relative overflow-hidden">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:px-10 lg:pb-24 lg:pt-36">
        {migrationMissing ? (
          <SetupCard
            title="Profiles table not found"
            description="Run the SQL file in supabase/migrations/202603240001_create_profiles.sql inside your Supabase project, then refresh this page."
          />
        ) : (
          <ProfileForm
            initialProfile={profile ?? null}
            userEmail={user.email ?? "Signed in user"}
            userId={user.id}
          />
        )}
      </section>
    </main>
  );
}
