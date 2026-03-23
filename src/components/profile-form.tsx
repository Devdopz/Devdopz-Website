"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ContributorAvatar } from "@/components/contributor-avatar";
import {
  getHireDestination,
  hireContactOptions,
  isProfilesTableMissingError,
  type HireContactMethod,
  type ProfileRecord,
} from "@/lib/profiles";
import { createClient } from "@/lib/supabase/browser";

type ProfileFormProps = {
  initialProfile: ProfileRecord | null;
  userEmail: string;
  userId: string;
};

function valueOrNull(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function normalizeUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function validateUrl(label: string, value: string) {
  const normalized = normalizeUrl(value);

  try {
    const url = new URL(normalized);

    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid URL protocol");
    }

    return normalized;
  } catch {
    throw new Error(`${label} must be a valid URL.`);
  }
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function getHireContactLabel(value: HireContactMethod) {
  return (
    hireContactOptions.find((option) => option.value === value)?.label ??
    "Wevoa profile"
  );
}

export function ProfileForm({
  initialProfile,
  userEmail,
  userId,
}: ProfileFormProps) {
  const router = useRouter();
  const [savedProfile, setSavedProfile] = useState<ProfileRecord | null>(
    initialProfile,
  );
  const [isEditing, setIsEditing] = useState(initialProfile === null);
  const [displayName, setDisplayName] = useState(
    initialProfile?.display_name ?? "",
  );
  const [roleTitle, setRoleTitle] = useState(initialProfile?.role_title ?? "");
  const [bio, setBio] = useState(initialProfile?.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(initialProfile?.avatar_url ?? "");
  const [wevoaProfileUrl, setWevoaProfileUrl] = useState(
    initialProfile?.wevoa_profile_url ?? "",
  );
  const [preferredHireContact, setPreferredHireContact] =
    useState<HireContactMethod>(
      initialProfile?.preferred_hire_contact ?? "wevoa_profile",
    );
  const [contactEmail, setContactEmail] = useState(
    initialProfile?.contact_email ?? "",
  );
  const [contactPhone, setContactPhone] = useState(
    initialProfile?.contact_phone ?? "",
  );
  const [instagramUrl, setInstagramUrl] = useState(
    initialProfile?.instagram_url ?? "",
  );
  const [telegramUrl, setTelegramUrl] = useState(
    initialProfile?.telegram_url ?? "",
  );
  const [websiteUrl, setWebsiteUrl] = useState(
    initialProfile?.website_url ?? "",
  );
  const [isHireable, setIsHireable] = useState(
    initialProfile?.is_hireable ?? true,
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  function syncFormWithProfile(profile: ProfileRecord | null) {
    setDisplayName(profile?.display_name ?? "");
    setRoleTitle(profile?.role_title ?? "");
    setBio(profile?.bio ?? "");
    setAvatarUrl(profile?.avatar_url ?? "");
    setWevoaProfileUrl(profile?.wevoa_profile_url ?? "");
    setPreferredHireContact(profile?.preferred_hire_contact ?? "wevoa_profile");
    setContactEmail(profile?.contact_email ?? "");
    setContactPhone(profile?.contact_phone ?? "");
    setInstagramUrl(profile?.instagram_url ?? "");
    setTelegramUrl(profile?.telegram_url ?? "");
    setWebsiteUrl(profile?.website_url ?? "");
    setIsHireable(profile?.is_hireable ?? true);
  }

  useEffect(() => {
    setSavedProfile(initialProfile);
    setIsEditing(initialProfile === null);
    setDisplayName(initialProfile?.display_name ?? "");
    setRoleTitle(initialProfile?.role_title ?? "");
    setBio(initialProfile?.bio ?? "");
    setAvatarUrl(initialProfile?.avatar_url ?? "");
    setWevoaProfileUrl(initialProfile?.wevoa_profile_url ?? "");
    setPreferredHireContact(initialProfile?.preferred_hire_contact ?? "wevoa_profile");
    setContactEmail(initialProfile?.contact_email ?? "");
    setContactPhone(initialProfile?.contact_phone ?? "");
    setInstagramUrl(initialProfile?.instagram_url ?? "");
    setTelegramUrl(initialProfile?.telegram_url ?? "");
    setWebsiteUrl(initialProfile?.website_url ?? "");
    setIsHireable(initialProfile?.is_hireable ?? true);
  }, [initialProfile]);

  const previewProfile: ProfileRecord = {
    avatar_url: valueOrNull(avatarUrl),
    bio: valueOrNull(bio),
    contact_email: valueOrNull(contactEmail),
    contact_phone: valueOrNull(contactPhone),
    display_name: displayName || "Your profile",
    instagram_url: valueOrNull(instagramUrl),
    is_hireable: isHireable,
    preferred_hire_contact: preferredHireContact,
    role_title: valueOrNull(roleTitle),
    telegram_url: valueOrNull(telegramUrl),
    user_id: userId,
    website_url: valueOrNull(websiteUrl),
    wevoa_profile_url: wevoaProfileUrl || "#",
  };
  const hireDestination = getHireDestination(previewProfile);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);
    setIsPending(true);

    try {
      if (!displayName.trim()) {
        throw new Error("Display name is required.");
      }

      const normalizedWevoaProfileUrl = validateUrl(
        "Wevoa profile link",
        wevoaProfileUrl,
      );
      const normalizedAvatarUrl = avatarUrl
        ? validateUrl("Avatar URL", avatarUrl)
        : null;
      const normalizedInstagramUrl = instagramUrl
        ? validateUrl("Instagram URL", instagramUrl)
        : null;
      const normalizedTelegramUrl = telegramUrl
        ? validateUrl("Telegram URL", telegramUrl)
        : null;
      const normalizedWebsiteUrl = websiteUrl
        ? validateUrl("Website URL", websiteUrl)
        : null;
      const normalizedEmail = valueOrNull(contactEmail);
      const normalizedPhone = valueOrNull(contactPhone);

      if (normalizedEmail && !validateEmail(normalizedEmail)) {
        throw new Error("Contact email must be a valid email address.");
      }

      if (preferredHireContact === "email" && !normalizedEmail) {
        throw new Error("Add an email before choosing email as your hire button.");
      }

      if (preferredHireContact === "phone" && !normalizedPhone) {
        throw new Error("Add a phone number before choosing phone as your hire button.");
      }

      if (preferredHireContact === "instagram" && !normalizedInstagramUrl) {
        throw new Error("Add an Instagram link before choosing Instagram as your hire button.");
      }

      if (preferredHireContact === "telegram" && !normalizedTelegramUrl) {
        throw new Error("Add a Telegram link before choosing Telegram as your hire button.");
      }

      if (preferredHireContact === "website" && !normalizedWebsiteUrl) {
        throw new Error("Add a website link before choosing website as your hire button.");
      }

      const nextProfile: ProfileRecord = {
        avatar_url: normalizedAvatarUrl,
        bio: valueOrNull(bio),
        contact_email: normalizedEmail,
        contact_phone: normalizedPhone,
        display_name: displayName.trim(),
        instagram_url: normalizedInstagramUrl,
        is_hireable: isHireable,
        preferred_hire_contact: preferredHireContact,
        role_title: valueOrNull(roleTitle),
        telegram_url: normalizedTelegramUrl,
        user_id: userId,
        website_url: normalizedWebsiteUrl,
        wevoa_profile_url: normalizedWevoaProfileUrl,
      };

      const supabase = createClient();
      const { error } = await supabase.from("profiles").upsert(
        nextProfile,
        {
          onConflict: "user_id",
        },
      );

      if (error) {
        throw error;
      }

      setSavedProfile(nextProfile);
      setIsEditing(false);
      setStatusMessage("Profile saved. Your public hire card is now updated.");
      router.refresh();
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        isProfilesTableMissingError(
          typeof error.code === "string" ? error.code : null,
        )
      ) {
        setErrorMessage(
          "The profiles table is not live in Supabase yet. Run supabase/migrations/202603240001_create_profiles.sql in your Supabase SQL editor, then refresh and try again.",
        );
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Could not save your profile.",
      );
    } finally {
      setIsPending(false);
    }
  }

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (savedProfile && !isEditing) {
    return (
      <div className="soft-panel rounded-[2rem] p-6 sm:p-7">
        <div className="flex flex-col gap-4 border-b border-accent/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
              Signed in as
            </p>
            <p className="mt-2 text-base text-foreground/72">{userEmail}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null);
                setStatusMessage(null);
                setIsEditing(true);
              }}
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 sm:w-auto"
            >
              Edit profile
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex w-full items-center justify-center rounded-full border border-accent/15 bg-white px-4 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5 sm:w-auto"
            >
              Log out
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
          <ContributorAvatar
            name={savedProfile.display_name}
            photo={savedProfile.avatar_url ?? undefined}
            size={88}
          />

          <div className="min-w-0 flex-1">
            <h1 className="text-4xl font-medium leading-[0.96] tracking-[-0.06em] text-foreground sm:text-5xl">
              {savedProfile.display_name}
            </h1>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
              {savedProfile.role_title || "Contributor"}
            </p>

            {savedProfile.bio ? (
              <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/68">
                {savedProfile.bio}
              </p>
            ) : (
              <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/54">
                Add a short bio to make your public profile stronger.
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[1.4rem] border border-accent/10 bg-white px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/42">
              Hire visibility
            </p>
            <p className="mt-2 text-base font-medium text-foreground">
              {savedProfile.is_hireable ? "Visible on hire page" : "Hidden from hire page"}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-accent/10 bg-white px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/42">
              Hire button
            </p>
            <p className="mt-2 text-base font-medium text-foreground">
              {getHireContactLabel(savedProfile.preferred_hire_contact)}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-accent/10 bg-white px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/42">
              Contact email
            </p>
            <p className="mt-2 break-all text-base font-medium text-foreground">
              {savedProfile.contact_email || "Not added yet"}
            </p>
          </div>

          <div className="rounded-[1.4rem] border border-accent/10 bg-white px-4 py-4">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/42">
              Wevoa profile
            </p>
            <a
              href={savedProfile.wevoa_profile_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex break-all text-base font-medium text-accent transition-opacity duration-200 hover:opacity-80"
            >
              Open profile
            </a>
          </div>
        </div>

        {statusMessage ? (
          <p className="mt-6 text-sm leading-6 text-foreground/64">
            {statusMessage}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="soft-panel rounded-[2rem] p-6 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-accent/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
            Signed in as
          </p>
          <p className="mt-2 text-base text-foreground/72">{userEmail}</p>
        </div>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex w-full items-center justify-center rounded-full border border-accent/15 bg-white px-4 py-2 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5 sm:w-auto"
        >
          Log out
        </button>
      </div>

      {savedProfile ? (
        <div className="mt-6 flex flex-col gap-3 rounded-[1.4rem] border border-accent/10 bg-white px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">
              Editing your public profile
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground/60">
              Save when you are done to collapse the editor back into your profile card.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              syncFormWithProfile(savedProfile);
              setErrorMessage(null);
              setStatusMessage(null);
              setIsEditing(false);
            }}
            className="inline-flex w-full items-center justify-center rounded-full border border-accent/15 bg-white px-4 py-3 text-sm font-medium text-foreground/76 transition-colors duration-300 hover:bg-accent/5 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <div>
          <label className="text-sm font-medium text-foreground/70">
            Display name
          </label>
          <input
            type="text"
            required
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            placeholder="Your public name"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/70">
            Role title
          </label>
          <input
            type="text"
            value={roleTitle}
            onChange={(event) => setRoleTitle(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            placeholder="Founder, Engineer, Designer..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium text-foreground/70">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            placeholder="Tell people what you build and what you want to be hired for."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/70">
            Avatar URL
          </label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(event) => setAvatarUrl(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="text-sm font-medium text-foreground/70">
            Wevoa profile link
          </label>
          <input
            type="text"
            required
            value={wevoaProfileUrl}
            onChange={(event) => setWevoaProfileUrl(event.target.value)}
            className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            placeholder="Required public profile link"
          />
          <p className="mt-2 text-sm leading-6 text-foreground/54">
            This is required and acts as the fallback public destination for your
            hire card.
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-accent/10 pt-6">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
          Public contact options
        </p>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-foreground/70">
              Contact email
            </label>
            <input
              type="email"
              value={contactEmail}
              onChange={(event) => setContactEmail(event.target.value)}
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/70">
              Phone number
            </label>
            <input
              type="text"
              value={contactPhone}
              onChange={(event) => setContactPhone(event.target.value)}
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
              placeholder="+91..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/70">
              Instagram link
            </label>
            <input
              type="text"
              value={instagramUrl}
              onChange={(event) => setInstagramUrl(event.target.value)}
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
              placeholder="https://instagram.com/..."
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground/70">
              Telegram link
            </label>
            <input
              type="text"
              value={telegramUrl}
              onChange={(event) => setTelegramUrl(event.target.value)}
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
              placeholder="https://t.me/..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm font-medium text-foreground/70">
              Website link
            </label>
            <input
              type="text"
              value={websiteUrl}
              onChange={(event) => setWebsiteUrl(event.target.value)}
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-accent/10 pt-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(19rem,22rem)] xl:items-end">
          <div>
            <label className="text-sm font-medium text-foreground/70">
              Hire button destination
            </label>
            <select
              value={preferredHireContact}
              onChange={(event) =>
                setPreferredHireContact(
                  event.target.value as HireContactMethod,
                )
              }
              className="mt-2 w-full rounded-[1.1rem] border border-accent/10 bg-white px-4 py-3 text-base text-foreground outline-none transition-colors duration-200 focus:border-accent/25"
            >
              {hireContactOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-[1.2rem] border border-accent/10 bg-white px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground/42">
              Hire page visibility
            </p>

            <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                role="switch"
                aria-checked={isHireable}
                aria-label={
                  isHireable
                    ? "Hide profile from hire page"
                    : "Show profile on hire page"
                }
                onClick={() => setIsHireable((current) => !current)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                  isHireable ? "bg-accent" : "bg-foreground/15"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                    isHireable ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <div>
                <p className="text-sm font-medium text-foreground">
                  {isHireable ? "Visible on hire page" : "Hidden from hire page"}
                </p>
                <p className="text-sm text-foreground/56">
                  {isHireable
                    ? "People can find and hire you from the public directory."
                    : "Your profile stays private until you switch it back on."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-[1.3rem] border border-accent/10 px-4 py-4">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/42">
            Current hire button
          </p>
          <p className="mt-3 text-base leading-7 text-foreground/66">
            {hireDestination
              ? hireDestination.label
              : "Complete your chosen contact method to activate the hire button."}
          </p>
        </div>
      </div>

      {errorMessage ? (
        <p className="mt-6 text-sm leading-6 text-red-600">{errorMessage}</p>
      ) : null}

      {statusMessage ? (
        <p className="mt-6 text-sm leading-6 text-foreground/64">
          {statusMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-medium !text-white shadow-[0_18px_40px_rgba(47,102,255,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          {isPending ? "Saving..." : "Save profile"}
        </button>
      </div>
    </form>
  );
}
