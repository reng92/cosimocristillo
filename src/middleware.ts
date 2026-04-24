import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const locals = context.locals as any;

  // Ensure runtime object exists
  if (!locals.runtime) locals.runtime = {};
  if (!locals.runtime.env) locals.runtime.env = {};

  // If env vars are missing from runtime.env, try to populate from globalThis
  // (CF Workers makes bindings available via the env parameter; this is a fallback)
  const env = locals.runtime.env;
  const keys = ['KEYSTATIC_GITHUB_CLIENT_ID', 'KEYSTATIC_GITHUB_CLIENT_SECRET', 'KEYSTATIC_SECRET'];
  for (const key of keys) {
    if (!env[key]) {
      // Try process.env as last resort (may be populated by CF in some configurations)
      const fromProcess = (process.env as any)[key];
      if (fromProcess) env[key] = fromProcess;
    }
  }

  return next();
});
