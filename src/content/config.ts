import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    anteprima: z.string().optional(),
    immagine: z.string().optional(),
  }),
});

const eventi = defineCollection({
  type: 'data',
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    ora: z.string().optional(),
    luogo: z.string(),
    descrizione: z.string().optional(),
    maps_url: z.string().url().optional(),
  }),
});

const galleria = defineCollection({
  type: 'data',
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    copertina: z.string().optional(),
    foto: z.array(z.string()),
  }),
});

export const collections = { blog, eventi, galleria };
