export const hireContactOptions = [
  { label: "Wevoa profile", value: "wevoa_profile" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
  { label: "Instagram", value: "instagram" },
  { label: "Telegram", value: "telegram" },
  { label: "Website", value: "website" },
] as const;

export type HireContactMethod = (typeof hireContactOptions)[number]["value"];

export type ProfileRecord = {
  avatar_url: string | null;
  bio: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  display_name: string;
  instagram_url: string | null;
  is_hireable: boolean;
  preferred_hire_contact: HireContactMethod;
  role_title: string | null;
  telegram_url: string | null;
  user_id: string;
  website_url: string | null;
  wevoa_profile_url: string;
};

export function isProfilesTableMissingError(code: string | null | undefined) {
  return code === "42P01" || code === "PGRST205";
}

export function getHireDestination(profile: ProfileRecord) {
  switch (profile.preferred_hire_contact) {
    case "email":
      return profile.contact_email
        ? { href: `mailto:${profile.contact_email}`, label: "Hire via email" }
        : null;
    case "phone":
      return profile.contact_phone
        ? { href: `tel:${profile.contact_phone}`, label: "Hire via phone" }
        : null;
    case "instagram":
      return profile.instagram_url
        ? { href: profile.instagram_url, label: "Hire via Instagram" }
        : null;
    case "telegram":
      return profile.telegram_url
        ? { href: profile.telegram_url, label: "Hire via Telegram" }
        : null;
    case "website":
      return profile.website_url
        ? { href: profile.website_url, label: "Hire via website" }
        : null;
    default:
      return {
        href: profile.wevoa_profile_url,
        label: "Hire via Wevoa profile",
      };
  }
}
