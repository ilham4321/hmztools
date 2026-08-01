export interface Tool {
  slug: string
  category: 'general' | 'developer'
  translations: {
    id: {
      name: string
      description: string
      metaTitle: string
      metaDescription: string
      seoTitle: string
      seoDescription: string
      articleTitle: string
      articleContent: string
    }
    en: {
      name: string
      description: string
      metaTitle: string
      metaDescription: string
      seoTitle: string
      seoDescription: string
      articleTitle: string
      articleContent: string
    }
  }
}

export const toolsData: Tool[] = [
  {
    slug: 'age-calculator',
    category: 'general',
    translations: {
      id: {
        name: 'Kalkulator Umur',
        description: 'Hitung umur Anda secara akurat dalam tahun, bulan, dan hari',
        metaTitle: 'Kalkulator Umur Online - Hitung Usia dengan Akurat',
        metaDescription: 'Kalkulator umur online gratis untuk menghitung usia Anda dalam tahun, bulan, hari, jam, menit, dan detik.',
        seoTitle: 'Kalkulator Umur Online',
        seoDescription: 'Hitung usia Anda secara akurat',
        articleTitle: 'Cara Menghitung Umur dengan Tepat',
        articleContent: 'Kalkulator umur adalah alat yang membantu Anda menghitung usia secara akurat berdasarkan tanggal lahir. Alat ini sangat berguna untuk berbagai keperluan seperti pendaftaran sekolah, pekerjaan, atau sekadar penasaran. Dengan memasukkan tanggal lahir dan tanggal saat ini, Anda bisa mengetahui usia dalam tahun, bulan, dan hari.'
      },
      en: {
        name: 'Age Calculator',
        description: 'Calculate your age accurately in years, months, and days',
        metaTitle: 'Age Calculator Online - Calculate Age Accurately',
        metaDescription: 'Free online age calculator to calculate your age in years, months, days, hours, minutes, and seconds.',
        seoTitle: 'Online Age Calculator',
        seoDescription: 'Calculate your age accurately',
        articleTitle: 'How to Calculate Age Accurately',
        articleContent: 'Age calculator is a tool that helps you calculate your age accurately based on birth date. This tool is very useful for various purposes such as school enrollment, job applications, or just curiosity. By entering your birth date and current date, you can find out your age in years, months, and days.'
      }
    }
  },
  {
    slug: 'discount-calculator',
    category: 'general',
    translations: {
      id: {
        name: 'Kalkulator Diskon',
        description: 'Hitung harga setelah diskon dengan cepat',
        metaTitle: 'Kalkulator Diskon Online - Hitung Harga Setelah Diskon',
        metaDescription: 'Kalkulator diskon online gratis untuk menghitung harga akhir setelah diskon persentase.',
        seoTitle: 'Kalkulator Diskon Online',
        seoDescription: 'Hitung harga setelah diskon',
        articleTitle: 'Cara Menghitung Diskon dengan Cepat',
        articleContent: 'Kalkulator diskon membantu Anda menghitung harga akhir setelah diskon persentase. Alat ini sangat berguna saat berbelanja untuk mengetahui berapa yang harus dibayar setelah diskon. Cukup masukkan harga awal dan persentase diskon, maka Anda akan mendapatkan harga akhir secara instan.'
      },
      en: {
        name: 'Discount Calculator',
        description: 'Calculate price after discount quickly',
        metaTitle: 'Discount Calculator Online - Calculate Final Price',
        metaDescription: 'Free online discount calculator to calculate final price after percentage discount.',
        seoTitle: 'Online Discount Calculator',
        seoDescription: 'Calculate price after discount',
        articleTitle: 'How to Calculate Discount Quickly',
        articleContent: 'Discount calculator helps you calculate the final price after percentage discount. This tool is very useful when shopping to know how much you need to pay after discount. Simply enter the original price and discount percentage, and you will get the final price instantly.'
      }
    }
  },
  {
    slug: 'bmi-calculator',
    category: 'general',
    translations: {
      id: {
        name: 'Kalkulator BMI',
        description: 'Hitung indeks massa tubuh Anda',
        metaTitle: 'Kalkulator BMI Online - Cek Indeks Massa Tubuh',
        metaDescription: 'Kalkulator BMI online gratis untuk menghitung indeks massa tubuh dan mengetahui kategori berat badan ideal.',
        seoTitle: 'Kalkulator BMI Online',
        seoDescription: 'Cek indeks massa tubuh',
        articleTitle: 'Memahami Indeks Massa Tubuh (BMI)',
        articleContent: 'BMI atau Body Mass Index adalah ukuran yang digunakan untuk mengetahui apakah berat badan Anda sehat berdasarkan tinggi badan. Kalkulator BMI membantu Anda menghitung nilai BMI dan mengetahui kategori apakah Anda termasuk kurus, normal, overweight, atau obesitas. Penting untuk menjaga BMI dalam rentang normal untuk kesehatan yang optimal.'
      },
      en: {
        name: 'BMI Calculator',
        description: 'Calculate your body mass index',
        metaTitle: 'BMI Calculator Online - Check Body Mass Index',
        metaDescription: 'Free online BMI calculator to calculate body mass index and know your ideal weight category.',
        seoTitle: 'Online BMI Calculator',
        seoDescription: 'Check your body mass index',
        articleTitle: 'Understanding Body Mass Index (BMI)',
        articleContent: 'BMI or Body Mass Index is a measure used to determine whether your weight is healthy based on your height. BMI calculator helps you calculate your BMI value and know whether you are underweight, normal, overweight, or obese. It is important to maintain BMI within normal range for optimal health.'
      }
    }
  },
  {
    slug: 'days-between-dates',
    category: 'general',
    translations: {
      id: {
        name: 'Selisih Hari',
        description: 'Hitung selisih hari antara dua tanggal',
        metaTitle: 'Kalkulator Selisih Hari - Hitung Jarak Tanggal',
        metaDescription: 'Kalkulator selisih hari online gratis untuk menghitung jarak hari antara dua tanggal.',
        seoTitle: 'Kalkulator Selisih Hari',
        seoDescription: 'Hitung jarak antara dua tanggal',
        articleTitle: 'Cara Menghitung Selisih Hari Antar Tanggal',
        articleContent: 'Kalkulator selisih hari membantu Anda menghitung jarak waktu antara dua tanggal. Alat ini berguna untuk menghitung durasi proyek, usia, atau perencanaan acara. Cukup masukkan tanggal mulai dan tanggal akhir, maka Anda akan mendapatkan selisih hari secara akurat.'
      },
      en: {
        name: 'Days Between Dates',
        description: 'Calculate days between two dates',
        metaTitle: 'Days Between Dates Calculator',
        metaDescription: 'Free online days between dates calculator to count days between two dates.',
        seoTitle: 'Days Between Dates Calculator',
        seoDescription: 'Calculate days between dates',
        articleTitle: 'How to Calculate Days Between Dates',
        articleContent: 'Days between dates calculator helps you calculate the time difference between two dates. This tool is useful for calculating project duration, age, or event planning. Simply enter the start date and end date, and you will get the days difference accurately.'
      }
    }
  },
  {
    slug: 'random-number-generator',
    category: 'general',
    translations: {
      id: {
        name: 'Generator Angka Acak',
        description: 'Buat angka acak dalam rentang tertentu',
        metaTitle: 'Generator Angka Acak Online',
        metaDescription: 'Generator angka acak online gratis untuk menghasilkan angka random dalam rentang yang ditentukan.',
        seoTitle: 'Generator Angka Acak',
        seoDescription: 'Buat angka acak online',
        articleTitle: 'Cara Menghasilkan Angka Acak',
        articleContent: 'Generator angka acak adalah alat yang menghasilkan angka secara acak dalam rentang yang Anda tentukan. Alat ini berguna untuk berbagai keperluan seperti undian, pengambilan sampel, atau sekadar untuk hiburan. Hasil yang dihasilkan benar-benar acak dan tidak dapat diprediksi.'
      },
      en: {
        name: 'Random Number Generator',
        description: 'Generate random numbers in a range',
        metaTitle: 'Random Number Generator Online',
        metaDescription: 'Free online random number generator to generate random numbers in specified range.',
        seoTitle: 'Random Number Generator',
        seoDescription: 'Generate random numbers online',
        articleTitle: 'How to Generate Random Numbers',
        articleContent: 'Random number generator is a tool that generates numbers randomly within specified range. This tool is useful for various purposes such as lottery, sampling, or just for fun. The results are truly random and unpredictable.'
      }
    }
  },
  {
    slug: 'word-character-counter',
    category: 'general',
    translations: {
      id: {
        name: 'Penghitung Kata & Karakter',
        description: 'Hitung kata, karakter, dan paragraf dalam teks',
        metaTitle: 'Penghitung Kata & Karakter Online',
        metaDescription: 'Penghitung kata dan karakter online gratis untuk menghitung jumlah kata, karakter, dan paragraf.',
        seoTitle: 'Penghitung Kata & Karakter',
        seoDescription: 'Hitung kata dan karakter online',
        articleTitle: 'Pentingnya Menghitung Kata dan Karakter',
        articleContent: 'Penghitung kata dan karakter adalah alat yang membantu Anda menghitung jumlah kata, karakter (dengan dan tanpa spasi), serta paragraf dalam teks. Alat ini sangat berguna untuk penulis, editor, atau siapa pun yang perlu membatasi jumlah kata atau karakter dalam tulisannya.'
      },
      en: {
        name: 'Word & Character Counter',
        description: 'Count words, characters, and paragraphs',
        metaTitle: 'Word & Character Counter Online',
        metaDescription: 'Free online word and character counter to count words, characters, and paragraphs.',
        seoTitle: 'Word & Character Counter',
        seoDescription: 'Count words and characters online',
        articleTitle: 'The Importance of Counting Words and Characters',
        articleContent: 'Word and character counter is a tool that helps you count the number of words, characters (with and without spaces), and paragraphs in your text. This tool is very useful for writers, editors, or anyone who needs to limit word or character count in their writing.'
      }
    }
  },
  {
    slug: 'password-generator',
    category: 'general',
    translations: {
      id: {
        name: 'Generator Password',
        description: 'Buat password yang kuat dan aman',
        metaTitle: 'Generator Password Online - Buat Password Kuat',
        metaDescription: 'Generator password online gratis untuk membuat password yang kuat dan aman dengan berbagai opsi karakter.',
        seoTitle: 'Generator Password Online',
        seoDescription: 'Buat password kuat dan aman',
        articleTitle: 'Cara Membuat Password yang Kuat',
        articleContent: 'Generator password adalah alat yang membantu Anda membuat password yang kuat dan aman. Dengan mengombinasikan huruf besar, huruf kecil, angka, dan simbol, password yang dihasilkan sulit ditebak dan aman dari serangan brute force. Gunakan password yang berbeda untuk setiap akun untuk keamanan maksimal.'
      },
      en: {
        name: 'Password Generator',
        description: 'Create strong and secure passwords',
        metaTitle: 'Password Generator Online - Create Strong Password',
        metaDescription: 'Free online password generator to create strong and secure passwords with various character options.',
        seoTitle: 'Online Password Generator',
        seoDescription: 'Create strong and secure passwords',
        articleTitle: 'How to Create Strong Passwords',
        articleContent: 'Password generator is a tool that helps you create strong and secure passwords. By combining uppercase, lowercase, numbers, and symbols, the generated passwords are hard to guess and secure against brute force attacks. Use different passwords for each account for maximum security.'
      }
    }
  },
  {
    slug: 'image-compressor',
    category: 'general',
    translations: {
      id: {
        name: 'Kompres Gambar',
        description: 'Kompres gambar untuk mengurangi ukuran file',
        metaTitle: 'Kompres Gambar Online - Kurangi Ukuran File',
        metaDescription: 'Kompres gambar online gratis untuk mengurangi ukuran file gambar tanpa mengurangi kualitas terlalu banyak.',
        seoTitle: 'Kompres Gambar Online',
        seoDescription: 'Kurangi ukuran file gambar',
        articleTitle: 'Manfaat Mengompres Gambar',
        articleContent: 'Kompres gambar adalah proses mengurangi ukuran file gambar tanpa mengurangi kualitas secara signifikan. Alat ini sangat berguna untuk menghemat ruang penyimpanan dan mempercepat loading website. Dengan mengompres gambar, Anda bisa mengupload foto lebih cepat dan menghemat bandwidth.'
      },
      en: {
        name: 'Image Compressor',
        description: 'Compress images to reduce file size',
        metaTitle: 'Image Compressor Online - Reduce File Size',
        metaDescription: 'Free online image compressor to reduce image file size without losing too much quality.',
        seoTitle: 'Online Image Compressor',
        seoDescription: 'Reduce image file size',
        articleTitle: 'Benefits of Image Compression',
        articleContent: 'Image compression is the process of reducing image file size without significantly reducing quality. This tool is very useful for saving storage space and speeding up website loading. By compressing images, you can upload photos faster and save bandwidth.'
      }
    }
  },
  {
    slug: 'qr-code-generator',
    category: 'developer',
    translations: {
      id: {
        name: 'Generator QR Code',
        description: 'Buat QR code dari teks atau URL',
        metaTitle: 'Generator QR Code Online - Buat QR Code',
        metaDescription: 'Generator QR code online gratis untuk membuat QR code dari teks, URL, atau data lainnya.',
        seoTitle: 'Generator QR Code Online',
        seoDescription: 'Buat QR code dari teks atau URL',
        articleTitle: 'Cara Menggunakan QR Code',
        articleContent: 'QR Code atau Quick Response Code adalah kode matriks dua dimensi yang dapat menyimpan berbagai jenis data. Generator QR code membantu Anda membuat QR code dari teks, URL, atau data lainnya. QR code sangat berguna untuk berbagi informasi secara cepat dan mudah, terutama dengan smartphone.'
      },
      en: {
        name: 'QR Code Generator',
        description: 'Generate QR code from text or URL',
        metaTitle: 'QR Code Generator Online - Generate QR Code',
        metaDescription: 'Free online QR code generator to create QR code from text, URL, or other data.',
        seoTitle: 'Online QR Code Generator',
        seoDescription: 'Generate QR code from text or URL',
        articleTitle: 'How to Use QR Codes',
        articleContent: 'QR Code or Quick Response Code is a two-dimensional matrix code that can store various types of data. QR code generator helps you create QR code from text, URL, or other data. QR codes are very useful for sharing information quickly and easily, especially with smartphones.'
      }
    }
  },
  {
    slug: 'uuid-generator',
    category: 'developer',
    translations: {
      id: {
        name: 'Generator UUID',
        description: 'Buat UUID v4 unik dan acak',
        metaTitle: 'Generator UUID Online - Buat UUID Unik',
        metaDescription: 'Generator UUID online gratis untuk membuat UUID v4 yang unik dan acak untuk berbagai keperluan pengembangan.',
        seoTitle: 'Generator UUID Online',
        seoDescription: 'Buat UUID unik dan acak',
        articleTitle: 'Apa itu UUID dan Cara Menggunakannya',
        articleContent: 'UUID atau Universally Unique Identifier adalah identifikasi unik yang digunakan dalam pengembangan perangkat lunak. UUID v4 adalah yang paling umum digunakan dan dihasilkan secara acak. Generator UUID membantu Anda membuat UUID unik untuk database, session, atau kebutuhan identifikasi lainnya.'
      },
      en: {
        name: 'UUID Generator',
        description: 'Generate unique and random UUID v4',
        metaTitle: 'UUID Generator Online - Generate Unique UUID',
        metaDescription: 'Free online UUID generator to create unique and random UUID v4 for various development needs.',
        seoTitle: 'Online UUID Generator',
        seoDescription: 'Generate unique and random UUID',
        articleTitle: 'What is UUID and How to Use It',
        articleContent: 'UUID or Universally Unique Identifier is a unique identification used in software development. UUID v4 is the most commonly used and is randomly generated. UUID generator helps you create unique UUIDs for databases, sessions, or other identification needs.'
      }
    }
  },
  {
    slug: 'json-formatter-validator',
    category: 'developer',
    translations: {
      id: {
        name: 'JSON Formatter & Validator',
        description: 'Format dan validasi JSON dengan indentation',
        metaTitle: 'JSON Formatter & Validator Online',
        metaDescription: 'JSON formatter dan validator online gratis untuk memformat dan memvalidasi data JSON.',
        seoTitle: 'JSON Formatter & Validator',
        seoDescription: 'Format dan validasi JSON online',
        articleTitle: 'Pentingnya JSON dalam Pengembangan Web',
        articleContent: 'JSON atau JavaScript Object Notation adalah format data yang ringan dan mudah dibaca. JSON formatter membantu Anda memformat JSON agar lebih rapi dan mudah dibaca, sementara validator memeriksa apakah JSON Anda valid. JSON banyak digunakan dalam API dan pertukaran data antar aplikasi.'
      },
      en: {
        name: 'JSON Formatter & Validator',
        description: 'Format and validate JSON with indentation',
        metaTitle: 'JSON Formatter & Validator Online',
        metaDescription: 'Free online JSON formatter and validator to format and validate JSON data.',
        seoTitle: 'JSON Formatter & Validator',
        seoDescription: 'Format and validate JSON online',
        articleTitle: 'The Importance of JSON in Web Development',
        articleContent: 'JSON or JavaScript Object Notation is a lightweight and easy-to-read data format. JSON formatter helps you format JSON to be more readable, while validator checks whether your JSON is valid. JSON is widely used in APIs and data exchange between applications.'
      }
    }
  },
  {
    slug: 'base64-encoder-decoder',
    category: 'developer',
    translations: {
      id: {
        name: 'Base64 Encoder/Decoder',
        description: 'Encode dan decode teks menggunakan Base64',
        metaTitle: 'Base64 Encoder/Decoder Online',
        metaDescription: 'Base64 encoder dan decoder online gratis untuk encode dan decode teks menggunakan Base64.',
        seoTitle: 'Base64 Encoder/Decoder',
        seoDescription: 'Encode dan decode Base64 online',
        articleTitle: 'Apa itu Base64 dan Fungsinya',
        articleContent: 'Base64 adalah metode encoding yang mengubah data biner menjadi format teks ASCII. Base64 encoder membantu Anda mengencode data, sementara decoder mengembalikannya ke bentuk asli. Base64 sering digunakan untuk mengirim data biner dalam email atau URL yang hanya menerima teks.'
      },
      en: {
        name: 'Base64 Encoder/Decoder',
        description: 'Encode and decode text using Base64',
        metaTitle: 'Base64 Encoder/Decoder Online',
        metaDescription: 'Free online Base64 encoder and decoder to encode and decode text using Base64.',
        seoTitle: 'Base64 Encoder/Decoder',
        seoDescription: 'Encode and decode Base64 online',
        articleTitle: 'What is Base64 and Its Functions',
        articleContent: 'Base64 is an encoding method that converts binary data into ASCII text format. Base64 encoder helps you encode data, while decoder returns it to its original form. Base64 is often used to send binary data in email or URLs that only accept text.'
      }
    }
  },
  {
    slug: 'url-encoder-decoder',
    category: 'developer',
    translations: {
      id: {
        name: 'URL Encoder/Decoder',
        description: 'Encode dan decode URL untuk keperluan web',
        metaTitle: 'URL Encoder/Decoder Online',
        metaDescription: 'URL encoder dan decoder online gratis untuk encode dan decode URL dan string query.',
        seoTitle: 'URL Encoder/Decoder',
        seoDescription: 'Encode dan decode URL online',
        articleTitle: 'Pentingnya URL Encoding',
        articleContent: 'URL encoding adalah proses mengubah karakter khusus menjadi format yang aman untuk URL. URL encoder membantu Anda mengencode URL, sementara decoder mengembalikannya ke bentuk asli. URL encoding penting untuk memastikan bahwa URL dapat dikirim dan diproses dengan benar di web.'
      },
      en: {
        name: 'URL Encoder/Decoder',
        description: 'Encode and decode URLs for web purposes',
        metaTitle: 'URL Encoder/Decoder Online',
        metaDescription: 'Free online URL encoder and decoder to encode and decode URLs and query strings.',
        seoTitle: 'URL Encoder/Decoder',
        seoDescription: 'Encode and decode URLs online',
        articleTitle: 'The Importance of URL Encoding',
        articleContent: 'URL encoding is the process of converting special characters into a safe format for URLs. URL encoder helps you encode URLs, while decoder returns them to their original form. URL encoding is important to ensure that URLs can be sent and processed correctly on the web.'
      }
    }
  },
  {
    slug: 'color-converter',
    category: 'developer',
    translations: {
      id: {
        name: 'Konverter Warna',
        description: 'Konversi warna antara HEX, RGB, dan HSL',
        metaTitle: 'Konverter Warna Online - HEX ke RGB/HSL',
        metaDescription: 'Konverter warna online gratis untuk mengkonversi warna antara format HEX, RGB, dan HSL dengan preview.',
        seoTitle: 'Konverter Warna Online',
        seoDescription: 'Konversi warna antara format',
        articleTitle: 'Memahami Format Warna Digital',
        articleContent: 'Konverter warna membantu Anda mengkonversi warna antara berbagai format seperti HEX, RGB, dan HSL. HEX adalah format warna yang sering digunakan di web, RGB adalah model warna digital, dan HSL berdasarkan hue, saturation, dan lightness. Setiap format memiliki kegunaannya masing-masing dalam desain digital.'
      },
      en: {
        name: 'Color Converter',
        description: 'Convert colors between HEX, RGB, and HSL',
        metaTitle: 'Color Converter Online - HEX to RGB/HSL',
        metaDescription: 'Free online color converter to convert colors between HEX, RGB, and HSL formats with preview.',
        seoTitle: 'Online Color Converter',
        seoDescription: 'Convert colors between formats',
        articleTitle: 'Understanding Digital Color Formats',
        articleContent: 'Color converter helps you convert colors between various formats such as HEX, RGB, and HSL. HEX is a color format often used on the web, RGB is a digital color model, and HSL is based on hue, saturation, and lightness. Each format has its own uses in digital design.'
      }
    }
  },
  {
    slug: 'hash-generator',
    category: 'developer',
    translations: {
      id: {
        name: 'Generator Hash',
        description: 'Buat hash MD5, SHA-1, dan SHA-256',
        metaTitle: 'Generator Hash Online - MD5/SHA-1/SHA-256',
        metaDescription: 'Generator hash online gratis untuk membuat hash MD5, SHA-1, dan SHA-256 dari teks.',
        seoTitle: 'Generator Hash Online',
        seoDescription: 'Buat hash dari teks',
        articleTitle: 'Apa itu Hashing dan Kegunaannya',
        articleContent: 'Hash adalah fungsi yang mengubah input menjadi string karakter dengan panjang tetap. Hash generator membantu Anda membuat hash MD5, SHA-1, atau SHA-256 dari teks. Hashing digunakan untuk verifikasi integritas data, penyimpanan password, dan tanda tangan digital.'
      },
      en: {
        name: 'Hash Generator',
        description: 'Generate MD5, SHA-1, and SHA-256 hashes',
        metaTitle: 'Hash Generator Online - MD5/SHA-1/SHA-256',
        metaDescription: 'Free online hash generator to create MD5, SHA-1, and SHA-256 hashes from text.',
        seoTitle: 'Online Hash Generator',
        seoDescription: 'Generate hash from text',
        articleTitle: 'What is Hashing and Its Uses',
        articleContent: 'Hash is a function that converts input into a fixed-length string of characters. Hash generator helps you create MD5, SHA-1, or SHA-256 hashes from text. Hashing is used for data integrity verification, password storage, and digital signatures.'
      }
    }
  }
]