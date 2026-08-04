export interface Tool {
  id: string;
  category: 'general' | 'developer';
  name: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  icon: string;
  slug: string;
  seoTitle: {
    id: string;
    en: string;
  };
  seoDescription: {
    id: string;
    en: string;
  };
  article: {
    id: string;
    en: string;
  };
}

export const toolsData: Tool[] = [
  {
    id: 'age-calculator',
    category: 'general',
    name: { id: 'Kalkulator Usia', en: 'Age Calculator' },
    description: { id: 'Hitung usia Anda dengan presisi', en: 'Calculate your age with precision' },
    icon: 'Calendar',
    slug: 'age-calculator',
    seoTitle: { id: 'Kalkulator Usia Online - Hitung Umur dengan Akurat', en: 'Age Calculator Online - Calculate Age Accurately' },
    seoDescription: { id: 'Kalkulator usia online gratis untuk menghitung umur Anda dalam tahun, bulan, hari, jam, menit, dan detik.', en: 'Free online age calculator to calculate your age in years, months, days, hours, minutes, and seconds.' },
    article: {
      id: `<h2>Apa itu Kalkulator Usia?</h2>
<p>Kalkulator usia adalah alat yang membantu Anda menghitung umur dengan tepat berdasarkan tanggal lahir. Alat ini sangat berguna untuk berbagai keperluan seperti pendaftaran sekolah, lamaran pekerjaan, atau sekadar memenuhi rasa penasaran.</p>
<h3>Bagaimana Cara Menggunakannya?</h3>
<p>Cukup masukkan tanggal lahir Anda, dan alat ini akan secara otomatis menghitung usia Anda dalam berbagai format waktu. Anda dapat melihat hasil dalam tahun, bulan, hari, jam, menit, dan bahkan detik.</p>
<h3>Mengapa Perlu Kalkulator Usia?</h3>
<p>Mengetahui usia pasti sangat penting dalam berbagai aspek kehidupan. Mulai dari kebutuhan administratif hingga perencanaan masa depan, kalkulator usia membantu Anda mendapatkan informasi yang akurat dan cepat.</p>`,
      en: `<h2>What is Age Calculator?</h2>
<p>Age calculator is a tool that helps you calculate your age accurately based on your birth date. This tool is very useful for various purposes such as school registration, job applications, or just to satisfy curiosity.</p>
<h3>How to Use It?</h3>
<p>Simply enter your birth date, and this tool will automatically calculate your age in various time formats. You can see results in years, months, days, hours, minutes, and even seconds.</p>
<h3>Why Need an Age Calculator?</h3>
<p>Knowing your exact age is important in many aspects of life. From administrative needs to future planning, an age calculator helps you get accurate and fast information.</p>`
    }
  },
  {
  id: 'code-editor',
  category: 'developer',
  name: { 
    id: 'Code Editor Multi-Bahasa', 
    en: 'Multi-Language Code Editor' 
  },
  description: { 
    id: 'Edit HTML, CSS, JS, Python, Java, C++, PHP, Go, Rust, TypeScript', 
    en: 'Edit HTML, CSS, JS, Python, Java, C++, PHP, Go, Rust, TypeScript' 
  },
  icon: 'Code',
  slug: 'code-editor',
  seoTitle: { 
    id: 'Code Editor Online - Multi Bahasa Pemrograman', 
    en: 'Online Code Editor - Multi Programming Languages' 
  },
  seoDescription: { 
    id: 'Editor kode online dengan syntax highlighting untuk 10 bahasa pemrograman.', 
    en: 'Online code editor with syntax highlighting for 10 programming languages.' 
  },
  article: {
    id: `<h2>Apa itu Code Editor Multi-Bahasa?</h2>
<p>Code Editor adalah alat untuk menulis dan mengedit kode dalam berbagai bahasa pemrograman dengan fitur syntax highlighting dan live preview.</p>
<h3>Bahasa yang Didukung</h3>
<ul>
  <li><strong>HTML</strong> - HyperText Markup Language</li>
  <li><strong>CSS</strong> - Cascading Style Sheets</li>
  <li><strong>JavaScript</strong> - Bahasa pemrograman web</li>
  <li><strong>TypeScript</strong> - JavaScript dengan tipe</li>
  <li><strong>Python</strong> - Bahasa pemrograman serbaguna</li>
  <li><strong>Java</strong> - Bahasa pemrograman enterprise</li>
  <li><strong>C++</strong> - Bahasa pemrograman sistem</li>
  <li><strong>PHP</strong> - Bahasa pemrograman web server</li>
  <li><strong>Go</strong> - Bahasa pemrograman Google</li>
  <li><strong>Rust</strong> - Bahasa pemrograman sistem yang aman</li>
</ul>
<h3>Fitur Code Editor</h3>
<ul>
  <li><strong>Syntax Highlighting:</strong> Warna kode sesuai bahasa</li>
  <li><strong>Live Preview:</strong> Untuk HTML, CSS, dan JavaScript</li>
  <li><strong>Multi-Language:</strong> 10 bahasa pemrograman</li>
  <li><strong>Download:</strong> Download kode dengan ekstensi yang sesuai</li>
  <li><strong>Upload:</strong> Upload file kode</li>
  <li><strong>Line Numbers:</strong> Tampilkan nomor baris</li>
  <li><strong>Word Wrap:</strong> Membungkus teks panjang</li>
  <li><strong>Font Size:</strong> Atur ukuran font</li>
  <li><strong>Fullscreen:</strong> Mode layar penuh</li>
</ul>`,
    en: `<h2>What is Multi-Language Code Editor?</h2>
<p>Code Editor is a tool for writing and editing code in various programming languages with syntax highlighting and live preview features.</p>
<h3>Supported Languages</h3>
<ul>
  <li><strong>HTML</strong> - HyperText Markup Language</li>
  <li><strong>CSS</strong> - Cascading Style Sheets</li>
  <li><strong>JavaScript</strong> - Web programming language</li>
  <li><strong>TypeScript</strong> - JavaScript with types</li>
  <li><strong>Python</strong> - Versatile programming language</li>
  <li><strong>Java</strong> - Enterprise programming language</li>
  <li><strong>C++</strong> - System programming language</li>
  <li><strong>PHP</strong> - Server-side web language</li>
  <li><strong>Go</strong> - Google's programming language</li>
  <li><strong>Rust</strong> - Safe systems programming</li>
</ul>
<h3>Code Editor Features</h3>
<ul>
  <li><strong>Syntax Highlighting:</strong> Color coding per language</li>
  <li><strong>Live Preview:</strong> For HTML, CSS, and JavaScript</li>
  <li><strong>Multi-Language:</strong> 10 programming languages</li>
  <li><strong>Download:</strong> Download code with proper extension</li>
  <li><strong>Upload:</strong> Upload code files</li>
  <li><strong>Line Numbers:</strong> Show line numbers</li>
  <li><strong>Word Wrap:</strong> Wrap long lines</li>
  <li><strong>Font Size:</strong> Adjust font size</li>
  <li><strong>Fullscreen:</strong> Fullscreen mode</li>
</ul>`
  }
  },
  {
    id: 'discount-calculator',
    category: 'general',
    name: { id: 'Kalkulator Diskon', en: 'Discount Calculator' },
    description: { id: 'Hitung harga setelah diskon', en: 'Calculate price after discount' },
    icon: 'Percent',
    slug: 'discount-calculator',
    seoTitle: { id: 'Kalkulator Diskon Online - Hitung Harga Setelah Diskon', en: 'Discount Calculator Online - Calculate Price After Discount' },
    seoDescription: { id: 'Kalkulator diskon gratis untuk menghitung harga akhir setelah diskon persen atau nominal.', en: 'Free discount calculator to calculate final price after percentage or nominal discount.' },
    article: {
      id: `<h2>Apa itu Kalkulator Diskon?</h2>
<p>Kalkulator diskon adalah alat yang membantu Anda menghitung harga akhir setelah diskon diterapkan. Alat ini sangat berguna saat berbelanja atau melakukan transaksi bisnis.</p>
<h3>Fitur Kalkulator Diskon</h3>
<p>Anda dapat menghitung diskon dalam bentuk persentase atau nominal. Masukkan harga awal dan diskon yang diberikan, alat ini akan menampilkan harga akhir, jumlah diskon, dan persentase diskon.</p>`,
      en: `<h2>What is Discount Calculator?</h2>
<p>Discount calculator is a tool that helps you calculate the final price after discount is applied. This tool is very useful when shopping or doing business transactions.</p>
<h3>Discount Calculator Features</h3>
<p>You can calculate discount in percentage or nominal form. Enter the original price and discount given, this tool will display the final price, discount amount, and discount percentage.</p>`
    }
  },
  {
  id: 'pdf-to-images',
  category: 'developer',
  name: { 
    id: 'PDF ke Gambar', 
    en: 'PDF to Images' 
  },
  description: { 
    id: 'Konversi PDF ke gambar per halaman', 
    en: 'Convert PDF to images per page' 
  },
  icon: 'FileImage',
  slug: 'pdf-to-images',
  seoTitle: { 
    id: 'PDF ke Gambar Online - Konversi PDF ke PNG/JPG', 
    en: 'PDF to Images Online - Convert PDF to PNG/JPG' 
  },
  seoDescription: { 
    id: 'Konversi PDF ke gambar (PNG/JPG) per halaman. Proses di browser, 100% aman.', 
    en: 'Convert PDF to images (PNG/JPG) per page. Processed in browser, 100% secure.' 
  },
  article: {
    id: `<h2>Apa itu PDF to Images?</h2>
<p>PDF to Images adalah alat untuk mengkonversi setiap halaman PDF menjadi gambar (PNG atau JPG).</p>
<h3>Cara Menggunakan</h3>
<ol>
  <li>Upload file PDF</li>
  <li>Pilih kualitas gambar (SD/HD/4K)</li>
  <li>Pilih format gambar (PNG/JPG)</li>
  <li>Download ZIP berisi semua gambar</li>
</ol>
<h3>Keamanan</h3>
<p>Semua proses dilakukan di browser. File PDF tidak diupload ke server manapun. 100% aman dan privat.</p>`,
    en: `<h2>What is PDF to Images?</h2>
<p>PDF to Images is a tool to convert every PDF page into an image (PNG or JPG).</p>
<h3>How to Use</h3>
<ol>
  <li>Upload PDF file</li>
  <li>Select image quality (SD/HD/4K)</li>
  <li>Select image format (PNG/JPG)</li>
  <li>Download ZIP containing all images</li>
</ol>
<h3>Security</h3>
<p>All processes are done in the browser. PDF files are not uploaded to any server. 100% safe and private.</p>`
    }
  },
  {
  id: 'pdf-text-extractor',
  category: 'developer',
  name: { 
    id: 'PDF Text Extractor', 
    en: 'PDF Text Extractor' 
  },
  description: { 
    id: 'Ekstrak semua teks dari PDF', 
    en: 'Extract all text from PDF' 
  },
  icon: 'FileText',
  slug: 'pdf-text-extractor',
  seoTitle: { 
    id: 'PDF Text Extractor Online - Ekstrak Teks PDF', 
    en: 'PDF Text Extractor Online - Extract PDF Text' 
  },
  seoDescription: { 
    id: 'Ekstrak teks dari file PDF dengan mudah. Copy atau download sebagai .txt.', 
    en: 'Extract text from PDF files easily. Copy or download as .txt.' 
  },
  article: {
    id: `<h2>Apa itu PDF Text Extractor?</h2>
<p>PDF Text Extractor adalah alat untuk mengekstrak semua teks dari file PDF.</p>
<h3>Cara Menggunakan</h3>
<ol>
  <li>Upload file PDF</li>
  <li>Tunggu proses ekstraksi</li>
  <li>Copy atau download hasil teks</li>
</ol>`,
    en: `<h2>What is PDF Text Extractor?</h2>
<p>PDF Text Extractor is a tool to extract all text from PDF files.</p>
<h3>How to Use</h3>
<ol>
  <li>Upload PDF file</li>
  <li>Wait for extraction process</li>
  <li>Copy or download the extracted text</li>
</ol>`
    }
  },
  {
  id: 'pdf-info-viewer',
  category: 'developer',
  name: { 
    id: 'PDF Info Viewer', 
    en: 'PDF Info Viewer' 
  },
  description: { 
    id: 'Lihat metadata dan informasi PDF', 
    en: 'View PDF metadata and information' 
  },
  icon: 'Info',
  slug: 'pdf-info-viewer',
  seoTitle: { 
    id: 'PDF Info Viewer Online - Lihat Metadata PDF', 
    en: 'PDF Info Viewer Online - View PDF Metadata' 
  },
  seoDescription: { 
    id: 'Lihat metadata PDF seperti jumlah halaman, ukuran, author, judul, dan lainnya.', 
    en: 'View PDF metadata like page count, size, author, title, and more.' 
  },
  article: {
    id: `<h2>Apa itu PDF Info Viewer?</h2>
<p>PDF Info Viewer adalah alat untuk melihat metadata dan informasi dari file PDF.</p>
<h3>Informasi yang Ditampilkan</h3>
<ul>
  <li>Jumlah halaman</li>
  <li>Ukuran file</li>
  <li>Judul, Author, Creator</li>
  <li>Tanggal dibuat/modified</li>
  <li>Versi PDF</li>
</ul>`,
    en: `<h2>What is PDF Info Viewer?</h2>
<p>PDF Info Viewer is a tool to view metadata and information from PDF files.</p>
<h3>Information Displayed</h3>
<ul>
  <li>Page count</li>
  <li>File size</li>
  <li>Title, Author, Creator</li>
  <li>Creation/modification date</li>
  <li>PDF version</li>
</ul>`
   }
  },
  {
  id: 'pdf-rotator',
  category: 'developer',
  name: { 
    id: 'PDF Rotator', 
    en: 'PDF Rotator' 
  },
  description: { 
    id: 'Rotate halaman PDF (90°/180°/270°)', 
    en: 'Rotate PDF pages (90°/180°/270°)' 
  },
  icon: 'RotateCw',
  slug: 'pdf-rotator',
  seoTitle: { 
    id: 'PDF Rotator Online - Rotate Halaman PDF', 
    en: 'PDF Rotator Online - Rotate PDF Pages' 
  },
  seoDescription: { 
    id: 'Rotate halaman PDF dengan mudah. Pilih sudut 90°, 180°, atau 270°.', 
    en: 'Easily rotate PDF pages. Choose 90°, 180°, or 270° angle.' 
  },
  article: {
    id: `<h2>Apa itu PDF Rotator?</h2>
<p>PDF Rotator adalah alat untuk merotasi halaman PDF dengan sudut 90°, 180°, atau 270°.</p>
<h3>Cara Menggunakan</h3>
<ol>
  <li>Upload file PDF</li>
  <li>Pilih sudut rotasi (90°/180°/270°)</li>
  <li>Download PDF hasil rotate</li>
</ol>`,
    en: `<h2>What is PDF Rotator?</h2>
<p>PDF Rotator is a tool to rotate PDF pages with 90°, 180°, or 270° angle.</p>
<h3>How to Use</h3>
<ol>
  <li>Upload PDF file</li>
  <li>Select rotation angle (90°/180°/270°)</li>
  <li>Download rotated PDF</li>
</ol>`
   }
   },
  {
  id: 'ip-checker',
  category: 'general',
  name: { 
    id: 'IP Checker', 
    en: 'IP Checker' 
  },
  description: { 
    id: 'Cek informasi lengkap IP Anda', 
    en: 'Check your complete IP information' 
  },
  icon: 'Wifi',
  slug: 'ip-checker',
  seoTitle: { 
    id: 'IP Checker Online - Cek Alamat IP dan Informasi', 
    en: 'IP Checker Online - Check IP Address and Information' 
  },
  seoDescription: { 
    id: 'Cek alamat IP publik, lokasi, ISP, dan informasi perangkat Anda.', 
    en: 'Check your public IP address, location, ISP, and device information.' 
  },
  article: {
    id: `<h2>Apa itu IP Checker?</h2>
<p>IP Checker adalah alat untuk melihat informasi lengkap tentang alamat IP Anda, termasuk lokasi, ISP, dan informasi perangkat.</p>
<h3>Informasi yang Ditampilkan</h3>
<ul>
  <li><strong>IP Address:</strong> Alamat IP publik Anda</li>
  <li><strong>Lokasi:</strong> Negara, kota, region, koordinat</li>
  <li><strong>ISP:</strong> Penyedia layanan internet</li>
  <li><strong>Timezone:</strong> Zona waktu berdasarkan lokasi</li>
  <li><strong>Perangkat:</strong> OS, browser, resolusi layar</li>
</ul>
<h3>Cara Menggunakan</h3>
<p>Cukup buka halaman ini, informasi IP dan perangkat Anda akan otomatis ditampilkan.</p>`,
    en: `<h2>What is IP Checker?</h2>
<p>IP Checker is a tool to view complete information about your IP address, including location, ISP, and device information.</p>
<h3>Information Displayed</h3>
<ul>
  <li><strong>IP Address:</strong> Your public IP address</li>
  <li><strong>Location:</strong> Country, city, region, coordinates</li>
  <li><strong>ISP:</strong> Internet service provider</li>
  <li><strong>Timezone:</strong> Timezone based on location</li>
  <li><strong>Device:</strong> OS, browser, screen resolution</li>
</ul>
<h3>How to Use</h3>
<p>Simply open this page, and your IP and device information will be displayed automatically.</p>`
   }
  },
  {
    id: 'bmi-calculator',
    category: 'general',
    name: { id: 'Kalkulator BMI', en: 'BMI Calculator' },
    description: { id: 'Cek indeks massa tubuh Anda', en: 'Check your body mass index' },
    icon: 'Activity',
    slug: 'bmi-calculator',
    seoTitle: { id: 'Kalkulator BMI - Cek Indeks Massa Tubuh Online', en: 'BMI Calculator - Check Body Mass Index Online' },
    seoDescription: { id: 'Kalkulator BMI online gratis untuk mengetahui status berat badan Anda berdasarkan tinggi dan berat badan.', en: 'Free online BMI calculator to check your weight status based on height and weight.' },
    article: {
      id: `<h2>Apa itu BMI?</h2>
<p>BMI atau Body Mass Index adalah ukuran yang digunakan untuk menilai apakah berat badan Anda ideal berdasarkan tinggi badan. BMI membantu mengidentifikasi risiko kesehatan terkait berat badan.</p>
<h3>Cara Menghitung BMI</h3>
<p>Masukkan tinggi dan berat badan Anda, alat ini akan menghitung BMI dan menampilkan kategori status berat badan Anda (Kurus, Normal, Gemuk, atau Obesitas).</p>`,
      en: `<h2>What is BMI?</h2>
<p>BMI or Body Mass Index is a measure used to assess whether your weight is ideal based on height. BMI helps identify health risks related to weight.</p>
<h3>How to Calculate BMI</h3>
<p>Enter your height and weight, this tool will calculate your BMI and display your weight status category (Underweight, Normal, Overweight, or Obese).</p>`
    }
  },
  {
    id: 'days-between-dates',
    category: 'general',
    name: { id: 'Selisih Tanggal', en: 'Days Between Dates' },
    description: { id: 'Hitung selisih hari antar tanggal', en: 'Calculate days between dates' },
    icon: 'CalendarDays',
    slug: 'days-between-dates',
    seoTitle: { id: 'Kalkulator Selisih Tanggal - Hitung Hari Antara Dua Tanggal', en: 'Date Difference Calculator - Calculate Days Between Two Dates' },
    seoDescription: { id: 'Hitung selisih hari, minggu, bulan, atau tahun antara dua tanggal dengan mudah.', en: 'Calculate the difference in days, weeks, months, or years between two dates easily.' },
    article: {
      id: `<h2>Apa itu Kalkulator Selisih Tanggal?</h2>
<p>Kalkulator selisih tanggal membantu Anda menghitung jarak waktu antara dua tanggal. Alat ini berguna untuk merencanakan proyek, menghitung usia, atau menentukan tenggat waktu.</p>`,
      en: `<h2>What is Date Difference Calculator?</h2>
<p>Date difference calculator helps you calculate the time span between two dates. This tool is useful for planning projects, calculating age, or determining deadlines.</p>`
    }
  },
  {
    id: 'random-number',
    category: 'general',
    name: { id: 'Generator Angka Acak', en: 'Random Number Generator' },
    description: { id: 'Hasilkan angka acak dengan mudah', en: 'Generate random numbers easily' },
    icon: 'Dice',
    slug: 'random-number',
    seoTitle: { id: 'Generator Angka Acak Online - Hasilkan Nomor Acak', en: 'Random Number Generator Online - Generate Random Numbers' },
    seoDescription: { id: 'Hasilkan angka acak dengan rentang yang dapat Anda tentukan sendiri.', en: 'Generate random numbers within your specified range.' },
    article: {
      id: `<h2>Apa itu Generator Angka Acak?</h2>
<p>Generator angka acak adalah alat yang menghasilkan angka secara acak dalam rentang yang Anda tentukan. Berguna untuk undian, pemilihan sampel, atau keperluan statistik.</p>`,
      en: `<h2>What is Random Number Generator?</h2>
<p>Random number generator is a tool that generates random numbers within your specified range. Useful for raffles, sample selection, or statistical purposes.</p>`
    }
  },
  {
    id: 'word-counter',
    category: 'general',
    name: { id: 'Penghitung Kata & Karakter', en: 'Word & Character Counter' },
    description: { id: 'Hitung kata dan karakter di teks', en: 'Count words and characters in text' },
    icon: 'Type',
    slug: 'word-counter',
    seoTitle: { id: 'Penghitung Kata & Karakter Online - Hitung Teks', en: 'Word & Character Counter Online - Count Text' },
    seoDescription: { id: 'Hitung jumlah kata, karakter, kalimat, dan paragraf dalam teks Anda secara instan.', en: 'Count words, characters, sentences, and paragraphs in your text instantly.' },
    article: {
      id: `<h2>Apa itu Penghitung Kata?</h2>
<p>Penghitung kata adalah alat untuk menghitung jumlah kata, karakter, kalimat, dan paragraf dalam teks. Sangat berguna untuk penulis, mahasiswa, dan profesional konten.</p>`,
      en: `<h2>What is Word Counter?</h2>
<p>Word counter is a tool to count words, characters, sentences, and paragraphs in text. Very useful for writers, students, and content professionals.</p>`
    }
  },
  {
    id: 'password-generator',
    category: 'general',
    name: { id: 'Generator Password', en: 'Password Generator' },
    description: { id: 'Buat password yang kuat', en: 'Generate strong passwords' },
    icon: 'Key',
    slug: 'password-generator',
    seoTitle: { id: 'Generator Password Online - Buat Password Kuat', en: 'Password Generator Online - Create Strong Passwords' },
    seoDescription: { id: 'Buat password yang kuat dan aman dengan berbagai opsi karakter.', en: 'Create strong and secure passwords with various character options.' },
    article: {
      id: `<h2>Apa itu Generator Password?</h2>
<p>Generator password adalah alat untuk membuat kata sandi yang kuat dan aman. Anda dapat mengatur panjang password dan jenis karakter yang digunakan.</p>`,
      en: `<h2>What is Password Generator?</h2>
<p>Password generator is a tool to create strong and secure passwords. You can set password length and character types used.</p>`
    }
  },
  {
    id: 'image-compressor',
    category: 'general',
    name: { id: 'Kompresor Gambar', en: 'Image Compressor' },
    description: { id: 'Kompres gambar tanpa backend', en: 'Compress images without backend' },
    icon: 'Image',
    slug: 'image-compressor',
    seoTitle: { id: 'Kompresor Gambar Online - Kompres Foto Gratis', en: 'Image Compressor Online - Free Photo Compression' },
    seoDescription: { id: 'Kompres gambar secara online tanpa mengunggah ke server menggunakan Canvas API.', en: 'Compress images online without uploading to server using Canvas API.' },
    article: {
      id: `<h2>Apa itu Kompresor Gambar?</h2>
<p>Kompresor gambar adalah alat untuk mengurangi ukuran file gambar tanpa mengurangi kualitas secara signifikan. Semua proses dilakukan di sisi klien untuk menjaga privasi.</p>`,
      en: `<h2>What is Image Compressor?</h2>
<p>Image compressor is a tool to reduce image file size without significantly reducing quality. All processing is done client-side to maintain privacy.</p>`
    }
  },
  {
    id: 'qr-code-generator',
    category: 'developer',
    name: { id: 'Generator QR Code', en: 'QR Code Generator' },
    description: { id: 'Buat QR Code dari teks', en: 'Generate QR Code from text' },
    icon: 'QrCode',
    slug: 'qr-code-generator',
    seoTitle: { id: 'Generator QR Code Online - Buat QR Code Gratis', en: 'QR Code Generator Online - Free QR Code Creator' },
    seoDescription: { id: 'Buat QR code dari teks, URL, atau data apapun secara instan.', en: 'Generate QR codes from text, URL, or any data instantly.' },
    article: {
      id: `<h2>Apa itu Generator QR Code?</h2>
<p>Generator QR Code adalah alat untuk membuat kode QR dari teks atau URL. QR Code dapat dipindai dengan smartphone untuk mengakses informasi dengan cepat.</p>`,
      en: `<h2>What is QR Code Generator?</h2>
<p>QR Code Generator is a tool to create QR codes from text or URLs. QR codes can be scanned with smartphones to access information quickly.</p>`
    }
  },
  {
    id: 'uuid-generator',
    category: 'developer',
    name: { id: 'Generator UUID', en: 'UUID Generator' },
    description: { id: 'Hasilkan UUID unik', en: 'Generate unique UUIDs' },
    icon: 'Hash',
    slug: 'uuid-generator',
    seoTitle: { id: 'Generator UUID Online - Buat ID Unik', en: 'UUID Generator Online - Create Unique IDs' },
    seoDescription: { id: 'Hasilkan UUID versi 4 yang unik dan acak untuk berbagai keperluan pengembangan.', en: 'Generate unique and random UUID v4 for various development purposes.' },
    article: {
      id: `<h2>Apa itu UUID?</h2>
<p>UUID (Universally Unique Identifier) adalah standar pengenal unik yang digunakan dalam pengembangan software. Generator UUID membantu membuat ID unik dengan cepat.</p>`,
      en: `<h2>What is UUID?</h2>
<p>UUID (Universally Unique Identifier) is a unique identifier standard used in software development. UUID generator helps create unique IDs quickly.</p>`
    }
  },
  {
    id: 'json-formatter',
    category: 'developer',
    name: { id: 'JSON Formatter & Validator', en: 'JSON Formatter & Validator' },
    description: { id: 'Format dan validasi JSON', en: 'Format and validate JSON' },
    icon: 'Braces',
    slug: 'json-formatter',
    seoTitle: { id: 'JSON Formatter & Validator Online', en: 'JSON Formatter & Validator Online' },
    seoDescription: { id: 'Format, validasi, dan perbaiki struktur JSON Anda dengan mudah.', en: 'Format, validate, and fix your JSON structure easily.' },
    article: {
      id: `<h2>Apa itu JSON Formatter?</h2>
<p>JSON Formatter adalah alat untuk memformat dan memvalidasi data JSON. Membantu pengembang untuk melihat struktur data dengan lebih jelas dan menemukan kesalahan sintaks.</p>`,
      en: `<h2>What is JSON Formatter?</h2>
<p>JSON Formatter is a tool to format and validate JSON data. Helps developers to see data structure more clearly and find syntax errors.</p>`
    }
  },
  {
    id: 'base64-encoder',
    category: 'developer',
    name: { id: 'Base64 Encoder/Decoder', en: 'Base64 Encoder/Decoder' },
    description: { id: 'Encode dan decode Base64', en: 'Encode and decode Base64' },
    icon: 'Code',
    slug: 'base64-encoder',
    seoTitle: { id: 'Base64 Encoder/Decoder Online - Encode & Decode', en: 'Base64 Encoder/Decoder Online - Encode & Decode' },
    seoDescription: { id: 'Encode dan decode teks ke format Base64 dengan mudah.', en: 'Encode and decode text to Base64 format easily.' },
    article: {
      id: `<h2>Apa itu Base64?</h2>
<p>Base64 adalah metode encoding yang mengubah data biner menjadi teks ASCII. Berguna untuk mengirim data melalui media yang hanya mendukung teks.</p>`,
      en: `<h2>What is Base64?</h2>
<p>Base64 is an encoding method that converts binary data to ASCII text. Useful for sending data through media that only supports text.</p>`
    }
  },
  {
    id: 'url-encoder',
    category: 'developer',
    name: { id: 'URL Encoder/Decoder', en: 'URL Encoder/Decoder' },
    description: { id: 'Encode dan decode URL', en: 'Encode and decode URLs' },
    icon: 'Link',
    slug: 'url-encoder',
    seoTitle: { id: 'URL Encoder/Decoder Online - Encode URL', en: 'URL Encoder/Decoder Online - Encode URL' },
    seoDescription: { id: 'Encode dan decode URL dengan aman untuk penggunaan web.', en: 'Encode and decode URLs safely for web use.' },
    article: {
      id: `<h2>Apa itu URL Encoder?</h2>
<p>URL Encoder adalah alat untuk mengubah karakter khusus dalam URL menjadi format yang aman. Penting untuk memastikan URL valid dan kompatibel.</p>`,
      en: `<h2>What is URL Encoder?</h2>
<p>URL Encoder is a tool to convert special characters in URLs to a safe format. Important to ensure URLs are valid and compatible.</p>`
    }
  },
  {
    id: 'color-converter',
    category: 'developer',
    name: { id: 'Konverter Warna', en: 'Color Converter' },
    description: { id: 'Konversi HEX ke RGB/HSL', en: 'Convert HEX to RGB/HSL' },
    icon: 'Palette',
    slug: 'color-converter',
    seoTitle: { id: 'Konverter Warna Online - HEX ke RGB/HSL', en: 'Color Converter Online - HEX to RGB/HSL' },
    seoDescription: { id: 'Konversi warna antara format HEX, RGB, dan HSL dengan preview warna.', en: 'Convert colors between HEX, RGB, and HSL formats with color preview.' },
    article: {
      id: `<h2>Apa itu Konverter Warna?</h2>
<p>Konverter warna adalah alat untuk mengubah format warna dari HEX ke RGB/HSL dan sebaliknya. Berguna untuk desainer dan pengembang web.</p>`,
      en: `<h2>What is Color Converter?</h2>
<p>Color converter is a tool to convert color formats from HEX to RGB/HSL and vice versa. Useful for designers and web developers.</p>`
    }
  },
  {
    id: 'hash-generator',
    category: 'developer',
    name: { id: 'Generator Hash', en: 'Hash Generator' },
    description: { id: 'Buat hash MD5/SHA-1/SHA-256', en: 'Generate MD5/SHA-1/SHA-256 hashes' },
    icon: 'Lock',
    slug: 'hash-generator',
    seoTitle: { id: 'Generator Hash Online - MD5, SHA-1, SHA-256', en: 'Hash Generator Online - MD5, SHA-1, SHA-256' },
    seoDescription: { id: 'Hasilkan hash MD5, SHA-1, dan SHA-256 dari teks atau file.', en: 'Generate MD5, SHA-1, and SHA-256 hashes from text or files.' },
    article: {
      id: `<h2>Apa itu Generator Hash?</h2>
<p>Generator hash adalah alat untuk membuat hash kriptografi dari teks atau data. Berguna untuk verifikasi integritas data dan keamanan.</p>`,
      en: `<h2>What is Hash Generator?</h2>
<p>Hash generator is a tool to create cryptographic hashes from text or data. Useful for data integrity verification and security.</p>`
    }
  }
];