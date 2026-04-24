import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const env = (context.locals as any).runtime?.env;
  if (env) {
    const keys = [
      'KEYSTATIC_GITHUB_CLIENT_ID',
      'KEYSTATIC_GITHUB_CLIENT_SECRET',
      'KEYSTATIC_SECRET',
    ];
    for (const key of keys) {
      if (env[key] != null) process.env[key] = env[key];
    }
  }
  return next();
});
