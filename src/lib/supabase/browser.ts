import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createClient() {
  const { publishableKey, url } = getSupabaseEnv();

  return createBrowserClient(url, publishableKey);
}
