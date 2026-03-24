type CookieLike = {
  name: string;
};

export function isSupabaseAuthCookie(name: string) {
  return name.startsWith("sb-") && name.includes("-auth-token");
}

export function hasSupabaseAuthCookies(cookies: CookieLike[]) {
  return cookies.some((cookie) => isSupabaseAuthCookie(cookie.name));
}
