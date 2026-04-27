import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    anteprima: z.string().optional(),
    immagine: z.string().optional(),
    fotografie: z.array(z.string()).optional(),
  }),
});

const eventi = defineCollection({
  type: 'data',
  schema: z.object({
    titolo: z.string(),
    data: z.coerce.date(),
    data_fine: z.coerce.date().optional(),
    ora: z.string().optional(),
    luogo: z.string(),
    descrizione: z.string().optional(),
    maps_url: z.string().url().optional(),
    locandina: z.string().optional(),
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

const rassegna_stampa = defineCollection({
  type: 'data',
  schema: z.object({
    titolo: z.string(),
    testata: z.string(),
    data: z.coerce.date(),
    url: z.string().url(),
    immagine: z.string().optional(),
    anteprima: z.string().optional(),
  }),
});

export const collections = { blog, eventi, galleria, rassegna_stampa };
