import { redirect, type Handle, type HandleServerError } from "@sveltejs/kit";
import { createAuthClient, setTokens } from "$lib/auth/auth.server";
import { subjects } from "$lib/auth/subjects";
import log from "$lib/server/log";

export const handleError: HandleServerError = async ({ error, event }) => {
  const errorId = crypto.randomUUID();

  event.locals.error = error?.toString() || undefined;
  event.locals.errorStackTrace = (error instanceof Error ? error.stack : undefined);
  event.locals.errorId = errorId;

  log(500, event);

  return {
    message: "An unexpected error occurred",
    errorId,
  };
};

export const handle: Handle = async ({ event, resolve }) => {
  // Set the start timer for logging
  const startTimer = Date.now();
  event.locals.startTimer = startTimer;

  const response = await resolve(event);

  if (event.url.pathname === "/callback") {
    return response;
  }

  const client = createAuthClient();

  try {
    const accessToken = event.cookies.get("access_token");

    if (accessToken) {
      const refreshToken = event.cookies.get("refresh_token");

      const verified = await client.verify(subjects, accessToken, {
        refresh: refreshToken,
      });

      if (!verified.err) {
        if (verified.tokens)
          setTokens(event, verified.tokens.access, verified.tokens.refresh);
        event.locals.session = verified.subject.properties;
        return response;
      }
    }
  } catch (e) {
    console.error("Authentication error:", e);
  }

  const { url } = await client.authorize(event.url.origin + "/callback", "code");

  return redirect(302, url);
};
