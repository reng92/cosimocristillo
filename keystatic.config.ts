import { config, fields, collection, singleton } from '@keystatic/core';

const isProd = process.env.NODE_ENV === 'production';

export default config({
  storage: isProd
    ? { kind: 'cloud' }
    : { kind: 'local' },

  cloud: { project: 'tracceweb/cosimocristillo' },

  ui: {
    brand: { name: 'Portico in Comune – Admin' },
  },

  singletons: {
    impostazioni: singleton({
      label: 'Impostazioni sito',
      path: 'src/content/impostazioni',
      schema: {
        hero_slogan_riga1: fields.text({ label: 'Slogan hero – riga 1', defaultValue: 'Facciamo' }),
        hero_slogan_riga2: fields.text({ label: 'Slogan hero – riga 2 (in evidenza)', defaultValue: 'funzionare' }),
        hero_slogan_riga3: fields.text({ label: 'Slogan hero – riga 3', defaultValue: 'le cose.' }),
        facebook_url: fields.url({ label: 'URL pagina Facebook', defaultValue: 'https://www.facebook.com/porticoincomune' }),
        facebook_profilo_url: fields.url({ label: 'URL profilo Facebook candidato', defaultValue: 'https://www.facebook.com/cosimo.cristillo.3' }),
      },
    }),
  },

  collections: {
    blog: collection({
      label: 'Blog / Diario di campagna',
      slugField: 'titolo',
      path: 'src/content/blog/*',
      format: { contentField: 'contenuto' },
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo' } }),
        data: fields.date({ label: 'Data pubblicazione', validation: { isRequired: true } }),
        anteprima: fields.text({ label: 'Anteprima (breve descrizione)', multiline: true }),
        immagine: fields.image({
          label: 'Immagine copertina',
          directory: 'public/content/blog',
          publicPath: '/content/blog/',
        }),
        fotografie: fields.array(
          fields.image({
            label: 'Foto',
            directory: 'public/content/blog',
            publicPath: '/content/blog/',
          }),
          { label: 'Galleria foto', itemLabel: () => 'Foto' }
        ),
        contenuto: fields.markdoc({ label: 'Contenuto articolo' }),
      },
    }),

    eventi: collection({
      label: 'Calendario eventi',
      slugField: 'titolo',
      path: 'src/content/eventi/*',
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo evento' } }),
        data: fields.date({ label: 'Data inizio', validation: { isRequired: true } }),
        data_fine: fields.date({ label: 'Data fine (opzionale, per eventi multi-giorno)' }),
        ora: fields.text({ label: 'Ora inizio (es. 18:30)', defaultValue: '' }),
        luogo: fields.text({ label: 'Luogo', validation: { isRequired: true } }),
        descrizione: fields.text({ label: 'Descrizione', multiline: true }),
        maps_url: fields.url({ label: 'Link Google Maps (opzionale)' }),
        locandina: fields.image({
          label: 'Locandina evento',
          directory: 'public/content/eventi',
          publicPath: '/content/eventi/',
        }),
      },
    }),

    rassegna_stampa: collection({
      label: 'Rassegna stampa',
      slugField: 'titolo',
      path: 'src/content/rassegna_stampa/*',
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo articolo' } }),
        testata: fields.text({ label: 'Testata (es. Corriere del Mezzogiorno)', validation: { isRequired: true } }),
        data: fields.date({ label: 'Data pubblicazione', validation: { isRequired: true } }),
        url: fields.url({ label: 'Link all\'articolo', validation: { isRequired: true } }),
        immagine: fields.image({
          label: 'Immagine / screenshot',
          directory: 'public/content/rassegna_stampa',
          publicPath: '/content/rassegna_stampa/',
        }),
        anteprima: fields.text({ label: 'Breve descrizione', multiline: true }),
      },
    }),

    galleria: collection({
      label: 'Galleria foto',
      slugField: 'titolo',
      path: 'src/content/galleria/*',
      schema: {
        titolo: fields.slug({ name: { label: 'Titolo album' } }),
        data: fields.date({ label: 'Data' }),
        copertina: fields.image({
          label: 'Foto copertina album',
          directory: 'public/content/galleria',
          publicPath: '/content/galleria/',
        }),
        foto: fields.array(
          fields.image({
            label: 'Foto',
            directory: 'public/content/galleria',
            publicPath: '/content/galleria/',
          }),
          { label: 'Foto album', itemLabel: () => 'Foto' }
        ),
      },
    }),
  },
});
