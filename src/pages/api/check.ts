import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env;
  return new Response(JSON.stringify({
    hasRuntime: !!(locals as any).runtime,
    hasEnv: !!env,
    CLIENT_ID: env?.KEYSTATIC_GITHUB_CLIENT_ID ? 'SET' : 'MISSING',
    CLIENT_SECRET: env?.KEYSTATIC_GITHUB_CLIENT_SECRET ? 'SET' : 'MISSING',
    SECRET: env?.KEYSTATIC_SECRET ? 'SET' : 'MISSING',
  }, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
