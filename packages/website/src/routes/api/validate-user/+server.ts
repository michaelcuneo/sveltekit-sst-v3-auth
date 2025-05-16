import { validateSession } from '$lib/utils/auth';
import { SESSION_COOKIE_NAME } from '$lib/utils/constants';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  // The name of the session cookie.
  const sessionCookieName = SESSION_COOKIE_NAME;
  // The session cookie from the request.
  const sessionCookie = cookies.get(sessionCookieName);

  // Flag to indicate if the user is authenticated.
  let isAuthenticated = false;

  // Check if the session cookie is present.
  if (sessionCookie) {
    try {
      // Validate the session cookie.
      const session = validateSession(sessionCookie);
      // Set the authenticated flag based on the validity of the session.
      isAuthenticated = Boolean(session.session);
    } catch {
      // If the session cookie is invalid, delete the cookie.
      cookies.delete(sessionCookieName, { path: '/' });
    }
  }

  // Return a JSON response indicating if the user is authenticated.
  return json({ authenticated: isAuthenticated });
};
