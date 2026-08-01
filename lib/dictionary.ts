export const dictionaries = {
  id: {
    meta: {
      title: 'HmzTools - Koleksi Alat Online Gratis',
      description: 'Kumpulan 15 alat online gratis untuk kebutuhan sehari-hari dan pengembangan. Kalkulator, generator, konverter, dan banyak lagi.'
    },
    home: {
      title: 'Alat Online Gratis',
      subtitle: 'Kumpulan alat praktis untuk kebutuhan sehari-hari',
      all: 'Semua',
      general: 'Umum',
      developer: 'Developer'
    },
    footer: {
      description: 'Kumpulan 15 alat online gratis yang siap membantu pekerjaan Anda'
    }
  },
  en: {
    meta: {
      title: 'HmzTools - Free Online Tools Collection',
      description: 'Collection of 15 free online tools for daily needs and development. Calculators, generators, converters, and more.'
    },
    home: {
      title: 'Free Online Tools',
      subtitle: 'Collection of practical tools for your daily needs',
      all: 'All',
      general: 'General',
      developer: 'Developer'
    },
    footer: {
      description: 'Collection of 15 free online tools ready to help your work'
    }
  }
}

export async function getDictionary(locale: string) {
  return dictionaries[locale as keyof typeof dictionaries] || dictionaries.id
}