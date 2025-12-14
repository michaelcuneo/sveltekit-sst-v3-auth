import { Resource } from 'sst';
import { createClient } from "@openauthjs/openauth/client"
import type { RequestEvent } from "@sveltejs/kit"

export function createAuthClient() {
  return createClient({
    clientID: "sveltekit-sst-v3-auth",
    issuer: Resource.MyAuth.url,
  })
}

export function setTokens(
  event: RequestEvent,
  access: string,
  refresh: string,
) {
  event.cookies.set("refresh_token", refresh, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  })
  event.cookies.set("access_token", access, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 34560000,
  })
}