export type Locale = 'id' | 'en';

export interface Dictionary {
  metadata: {
    title: string;
    description: string;
    keywords: string;
  };
  header: {
    title: string;
    subtitle: string;
  };
  nav: {
    all: string;
    general: string;
    developer: string;
  };
  footer: {
    rights: string;
    donate: string;
    support: string;
    social: string;
    contact: string;
    email: string;
  };
  home: {
    title: string;
    subtitle: string;
    featured: string;
    search: string;
    noResults: string;
  };
  tools: {
    [key: string]: {
      name: string;
      description: string;
      seoTitle: string;
      seoDescription: string;
      article: string;
    };
  };
  common: {
    copy: string;
    copied: string;
    download: string;
    reset: string;
    generate: string;
    calculate: string;
    convert: string;
    format: string;
    encode: string;
    decode: string;
    compress: string;
    upload: string;
    error: string;
    success: string;
    loading: string;
    close: string;
    save: string;
    delete: string;
    edit: string;
    view: string;
    more: string;
    less: string;
  };
}

const dictionary: Record<Locale, Dictionary> = {
  id: {
    metadata: {
      title: 'HmzTools - Koleksi Alat Online Gratis',
      description: 'Kumpulan alat online gratis untuk kebutuhan sehari-hari dan pengembangan. Kalkulator, generator, konverter, dan masih banyak lagi.',
      keywords: 'alat online, tools gratis, kalkulator, generator, konverter, pengembang, HMZTools'
    },
    header: {
      title: 'HmzTools',
      subtitle: 'Koleksi Alat Online Gratis'
    },
    nav: {
      all: 'Semua',
      general: 'Umum',
      developer: 'Developer'
    },
    footer: {
      rights: 'Hak Cipta Dilindungi',
      donate: 'Dukung HmzTools',
      support: 'Dukungan',
      social: 'Media Sosial',
      contact: 'Kontak',
      email: 'support.hmztools@gmail.com'
    },
    home: {
      title: 'Koleksi Alat Online Gratis',
      subtitle: 'Temukan berbagai alat online gratis untuk kebutuhan sehari-hari dan pengembangan',
      featured: 'Alat Unggulan',
      search: 'Cari alat...',
      noResults: 'Tidak ada alat yang ditemukan'
    },
    tools: {},
    common: {
      copy: 'Salin',
      copied: 'Disalin!',
      download: 'Unduh',
      reset: 'Atur Ulang',
      generate: 'Hasilkan',
      calculate: 'Hitung',
      convert: 'Konversi',
      format: 'Format',
      encode: 'Encode',
      decode: 'Decode',
      compress: 'Kompres',
      upload: 'Unggah',
      error: 'Terjadi Kesalahan',
      success: 'Berhasil',
      loading: 'Memuat...',
      close: 'Tutup',
      save: 'Simpan',
      delete: 'Hapus',
      edit: 'Edit',
      view: 'Lihat',
      more: 'Lihat Lainnya',
      less: 'Tutup'
    }
  },
  en: {
    metadata: {
      title: 'HmzTools - Free Online Tools Collection',
      description: 'Collection of free online tools for daily needs and development. Calculators, generators, converters, and more.',
      keywords: 'online tools, free tools, calculator, generator, converter, developer, HMZTools'
    },
    header: {
      title: 'HmzTools',
      subtitle: 'Free Online Tools Collection'
    },
    nav: {
      all: 'All',
      general: 'General',
      developer: 'Developer'
    },
    footer: {
      rights: 'All Rights Reserved',
      donate: 'Support HmzTools',
      support: 'Support',
      social: 'Social Media',
      contact: 'Contact',
      email: 'support.hmztools@gmail.com'
    },
    home: {
      title: 'Free Online Tools Collection',
      subtitle: 'Discover various free online tools for daily needs and development',
      featured: 'Featured Tools',
      search: 'Search tools...',
      noResults: 'No tools found'
    },
    tools: {},
    common: {
      copy: 'Copy',
      copied: 'Copied!',
      download: 'Download',
      reset: 'Reset',
      generate: 'Generate',
      calculate: 'Calculate',
      convert: 'Convert',
      format: 'Format',
      encode: 'Encode',
      decode: 'Decode',
      compress: 'Compress',
      upload: 'Upload',
      error: 'Error Occurred',
      success: 'Success',
      loading: 'Loading...',
      close: 'Close',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      more: 'See More',
      less: 'Close'
    }
  }
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dict = dictionary[locale] || dictionary.id;
  const toolsData = (await import('@/data/tools')).toolsData;
  
  const toolsDict: Dictionary['tools'] = {};
  toolsData.forEach(tool => {
    toolsDict[tool.id] = {
      name: tool.name[locale],
      description: tool.description[locale],
      seoTitle: tool.seoTitle[locale],
      seoDescription: tool.seoDescription[locale],
      article: tool.article[locale]
    };
  });
  
  return {
    ...dict,
    tools: toolsDict
  };
}