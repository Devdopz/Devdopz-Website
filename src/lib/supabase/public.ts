import { createClient } from "@supabase/supabase-js";
import { getSupabaseEnv } from "@/lib/supabase/env";

export function createPublicClient() {
  const { publishableKey, url } = getSupabaseEnv();

  return createClient(url, publishableKey);
}
