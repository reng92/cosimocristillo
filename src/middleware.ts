import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const locals = context.locals as any;

  if (!locals.runtime) locals.runtime = {};
  if (!locals.runtime.env) locals.runtime.env = {};

  const env = locals.runtime.env;
  if (!env['KEYSTATIC_SECRET']) {
    const fromProcess = (process.env as any)['KEYSTATIC_SECRET'];
    if (fromProcess) env['KEYSTATIC_SECRET'] = fromProcess;
  }

  return next();
});
