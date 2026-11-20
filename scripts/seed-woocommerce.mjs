
const WP_API_URL = process.env.WP_API_URL || "http://localhost/meubel-jati-abror/wp-json/wc/v3";
const WC_KEY = process.env.WC_CONSUMER_KEY || process.env.WC_READ_KEY || "";
const WC_SECRET = process.env.WC_CONSUMER_SECRET || process.env.WC_READ_SECRET || "";

const auth = Buffer.from(`${WC_KEY}:${WC_SECRET}`).toString("base64");
const headers = {
  "Content-Type": "application/json",
  Authorization: `Basic ${auth}`,
};

const CATEGORIES = [
  {
    name: "Meja Makan Jati",
    slug: "meja-makan-jati",
    description: "Koleksi set meja makan kayu jati solid Jepara dengan konstruksi purus pasak kokoh untuk ruang makan elegan.",
    image: {
      src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Teak Dining Tables" },
    ],
  },
  {
    name: "Kursi & Sofa Jati",
    slug: "kursi-sofa-jati",
    description: "Kursi makan, kursi santai, dan sofa berbahan kayu jati solid dengan bantalan nyaman dan finishing natural halus.",
    image: {
      src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Chairs & Sofas" },
    ],
  },
  {
    name: "Dipan & Tempat Tidur",
    slug: "dipan-tempat-tidur",
    description: "Dipan kayu jati solid rangka kokoh tanpa bunyi derit, menghadirkan kehangatan dan kenyamanan tidur alami.",
    image: {
      src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Beds & Headboards" },
    ],
  },
  {
    name: "Lemari & Bufet TV",
    slug: "lemari-bufet-tv",
    description: "Credenza TV kisi-kisi dan lemari pakaian kayu jati dengan kapasitas penyimpanan lapang dan estetika modern.",
    image: {
      src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Sideboards & Wardrobes" },
    ],
  },
  {
    name: "Meja Kopi & Tamu",
    slug: "meja-kopi-tamu",
    description: "Coffee table bundar dan meja tamu jati solid minimalis sebagai focal point ruang keluarga.",
    image: {
      src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Coffee Tables" },
    ],
  },
  {
    name: "Meja Kerja & Belajar",
    slug: "meja-kerja-belajar",
    description: "Meja kerja kayu jati ergonomis dengan laci penyimpanan dokumen untuk ruang kerja fungsional.",
    image: {
      src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Desks & Workstations" },
    ],
  },
  {
    name: "Jendela & Kusen Bulat",
    slug: "jendela-kusen-bulat",
    description: "Kusen jendela bulat jati unik dengan engsel putar dan kaca ryben/bening untuk fasad arsitektur modern.",
    image: {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    },
    meta_data: [
      { key: "name_en", value: "Round Teak Windows" },
    ],
  },
];

const PRODUCTS = [
  {
    name: "Meja Makan Jati Solid Minimalis 6 Kursi",
    slug: "meja-makan-jati-minimalis",
    categorySlug: "meja-makan-jati",
    regular_price: "5500000",
    price: "4750000",
    on_sale: true,
    short_description: "Set meja makan kayu jati solid tebal 3,5 cm dengan sambungan purus pasak khas Jepara, muat 6 orang.",
    description: `<p>Meja makan kayu jati solid berkualitas ekspor yang diproduksi langsung oleh pengrajin Jepara. Menggunakan kayu jati pilihan yang telah melalui proses oven (kiln-dried) dengan kadar air terukur sehingga bebas retak dan melengkung.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Pilihan (Tua & Kering)</li>
  <li>Ukuran Meja: 180 cm x 90 cm x 76 cm</li>
  <li>Ketebalan Daun Meja: 3,5 cm solid (tanpa tempelan)</li>
  <li>Finishing: Natural Teak Doff / Satin dengan lapisan pelindung anti-air & panas</li>
  <li>Konstruksi: Sambungan tradisional mortise & tenon (purus & pasak)</li>
</ul>
<h3>LAYANAN CUSTOM</h3>
<p>Melayani penyesuaian ukuran (160 cm, 200 cm, 240 cm) serta warna finishing sesuai konsep ruang makan rumah atau villa Anda.</p>`,
    images: [
      { src: "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80", alt: "Meja Makan Jati Solid Minimalis Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Ukuran", options: ["160 x 85 cm", "180 x 90 cm", "200 x 100 cm"], visible: true, variation: false },
      { name: "Finishing", options: ["Natural Doff", "Salak Brown", "Dark Walnut"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Minimalist Solid Teak Dining Table" },
      { key: "short_description_en", value: "Solid teak dining table with traditional mortise and tenon joinery, seats 6 comfortably." },
    ],
  },
  {
    name: "Kursi Makan Jati Ropan Sandaran Lengkung",
    slug: "kursi-makan-jati-ropan",
    categorySlug: "kursi-sofa-jati",
    regular_price: "950000",
    price: "850000",
    on_sale: true,
    short_description: "Kursi makan kayu jati bergaya scandinavian dengan sandaran lengkung ergonomis dan dudukan kokoh.",
    description: `<p>Kursi makan model Ropan yang memadukan kehangatan kayu jati alami dengan ergonomi sandaran punggung yang pas. Sangat cocok dipadukan dengan meja makan minimalis untuk hunian modern maupun kafe dan restoran.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Jepara</li>
  <li>Dimensi: 52 cm x 48 cm x 78 cm (Tinggi Dudukan 45 cm)</li>
  <li>Finishing: Natural Wood Bleached / Dark Teak</li>
  <li>Konstruksi: Pasak kayu jati kokoh, beban maksimal hingga 130 kg</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80", alt: "Kursi Makan Jati Ropan Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Finishing", options: ["Natural Teak", "Bleached White", "Dark Brown"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Curved Solid Teak Dining Chair" },
      { key: "short_description_en", value: "Ergonomic curved teak dining chair with solid Scandinavian design." },
    ],
  },
  {
    name: "Dipan Tempat Tidur Jati Spindle Minimalis",
    slug: "dipan-tempat-tidur-jati-spindle",
    categorySlug: "dipan-tempat-tidur",
    regular_price: "6000000",
    price: "5200000",
    on_sale: true,
    short_description: "Rangka tempat tidur jati solid headboard spindle jari-jari, konstruksi stabil tanpa derit.",
    description: `<p>Tempat tidur kayu jati desain spindle yang menghadirkan nuansa ketenangan alami di kamar tidur Anda. Dibuat dengan presisi tinggi oleh pengrajin Jepara sehingga rangka sangat kokoh dan tidak bersuara saat digunakan.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Pilihan Oven</li>
  <li>Pilihan Ukuran Matras: Queen (160x200 cm), King (180x200 cm), Super King (200x200 cm)</li>
  <li>Tinggi Headboard: 105 cm</li>
  <li>Finishing: Sanding Sealer + NC Doff Halus</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80", alt: "Dipan Tempat Tidur Jati Spindle Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Ukuran Matras", options: ["160 x 200 cm (Queen)", "180 x 200 cm (King)", "200 x 200 cm (Super King)"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Spindle Solid Teak Bed Frame" },
      { key: "short_description_en", value: "Minimalist teak bed frame with vertical spindle headboard and squeak-free construction." },
    ],
  },
  {
    name: "Nakas Samping Kasur Jati 2 Laci",
    slug: "nakas-samping-kasur-jati",
    categorySlug: "dipan-tempat-tidur",
    regular_price: "1150000",
    price: "950000",
    on_sale: false,
    short_description: "Bedside table kayu jati dengan 2 laci penyimpanan dan handle tarikan kayu minimalis.",
    description: `<p>Nakas samping tempat tidur kayu jati solid berukuran compact. Menampung buku, lampu tidur, dan aksesoris personal dengan rapi dan estetik.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid</li>
  <li>Ukuran: 45 cm x 40 cm x 55 cm</li>
  <li>Fitur: 2 Laci rel kayu halus dengan tarikan tersembunyi</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80", alt: "Nakas Samping Kasur Jati Meubel Jati Abror" },
    ],
    attributes: [],
    meta_data: [
      { key: "name_en", value: "2-Drawer Solid Teak Bedside Table" },
      { key: "short_description_en", value: "Compact solid teak nightstand with two drawers and clean minimalist lines." },
    ],
  },
  {
    name: "Sofa Kursi Santai Jati Retro Vintage 1 Seater",
    slug: "sofa-kursi-santai-jati-retro",
    categorySlug: "kursi-sofa-jati",
    regular_price: "3200000",
    price: "2800000",
    on_sale: true,
    short_description: "Armchair kayu jati bergaya mid-century dengan bantalan busa royal foam kain kanvas linen.",
    description: `<p>Armchair santai kayu jati solid dengan sandaran tangan lengkung khas gaya mid-century modern. Dilengkapi bantalan empuk yang bisa dilepas pasang untuk memudahkan pencucian.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Rangka: Kayu Jati Solid Kering</li>
  <li>Busa: Royal Foam Density Tinggi (Anti-Gembos)</li>
  <li>Kain: Fabric Linen Premium warna Abu-abu / Krem Natural</li>
  <li>Dimensi: 72 cm x 80 cm x 82 cm</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80", alt: "Sofa Kursi Santai Jati Retro Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Warna Busa", options: ["Krem Linen", "Abu-abu Doff", "Hijau Sage"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Mid-Century Teak Armchair" },
      { key: "short_description_en", value: "Solid teak accent chair with ergonomic armrests and premium linen cushions." },
    ],
  },
  {
    name: "Meja Kopi Coffee Table Bundar Jati Solid",
    slug: "meja-kopi-coffee-table-bundar-jati",
    categorySlug: "meja-kopi-tamu",
    regular_price: "1650000",
    price: "1450000",
    on_sale: false,
    short_description: "Meja tamu bundar diameter 70 cm dari kayu jati solid dengan kaki tripod kokoh.",
    description: `<p>Coffee table bundar yang manis dan fungsional untuk melengkapi ruang keluarga atau ruang tunggu villa. Finishing halus memperlihatkan keindahan urat kayu jati asli Jepara.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid</li>
  <li>Diameter: 70 cm (Tinggi 45 cm)</li>
  <li>Konstruksi: Kaki tripod interlocking solid</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80", alt: "Meja Kopi Coffee Table Bundar Jati Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Diameter", options: ["60 cm", "70 cm", "80 cm"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Round Solid Teak Coffee Table" },
      { key: "short_description_en", value: "70cm diameter round teak coffee table with sturdy tripod base." },
    ],
  },
  {
    name: "Credenza Bufet TV Jati Pintu Kisi-Kisi",
    slug: "credenza-bufet-tv-jati-kisi",
    categorySlug: "lemari-bufet-tv",
    regular_price: "4800000",
    price: "4200000",
    on_sale: true,
    short_description: "Bufet TV panjang 180 cm pintu sliding kisi-kisi kayu jati untuk ruang tamu modern.",
    description: `<p>Bufet TV bergaya Japandi minimalis dengan pintu geser bermotif kisi-kisi (slat wood). Kisi-kisi memungkinkan sinyal remote TV dan sirkulasi udara perangkat elektronik tetap lancar.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Pilihan</li>
  <li>Dimensi: 180 cm x 45 cm x 55 cm</li>
  <li>Pintu: 2 Pintu Geser Kisi-Kisi + 2 Laci Tengah</li>
  <li>Lubang Kabel: Tersedia di bagian belakang untuk manajemen kabel rapi</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80", alt: "Credenza Bufet TV Jati Kisi-Kisi Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Panjang", options: ["160 cm", "180 cm", "200 cm"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Slatted Teak TV Credenza" },
      { key: "short_description_en", value: "180cm solid teak media console with slatted sliding doors." },
    ],
  },
  {
    name: "Meja Kerja Kantor Jati Solid Minimalis",
    slug: "meja-kerja-kantor-jati-solid",
    categorySlug: "meja-kerja-belajar",
    regular_price: "4200000",
    price: "3750000",
    on_sale: false,
    short_description: "Meja kerja kayu jati solid 140x70 cm dengan 2 laci penyimpanan dan ruang kaki lapang.",
    description: `<p>Meja kerja dirancang khusus untuk kenyamanan bekerja seharian di rumah (home office) maupun kantor profesional. Permukaan kayu jati halus memberikan kenyamanan saat mengetik dan menulis.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Oven</li>
  <li>Dimensi: 140 cm x 70 cm x 75 cm</li>
  <li>Laci: 2 Laci penyimpanan dokumen & laptop</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80", alt: "Meja Kerja Kantor Jati Solid Meubel Jati Abror" },
    ],
    attributes: [],
    meta_data: [
      { key: "name_en", value: "Solid Teak Executive Desk" },
      { key: "short_description_en", value: "140x70cm ergonomic teak writing desk with 2 built-in drawers." },
    ],
  },
  {
    name: "Kusen Jendela Bulat Kayu Jati Dark Brown",
    slug: "jendela-kusen-bulat-dark-brown-a",
    categorySlug: "jendela-kusen-bulat",
    regular_price: "1200000",
    price: "999000",
    on_sale: true,
    short_description: "Kusen jendela bulat jati kaca tebal 5 mm sistem putar engsel kuningan, finishing dark brown.",
    description: `<p>Kusen jendela bundar kayu jati asli Jepara. Memberikan sentuhan arsitektural tropis dan estetika modern pada fasad rumah, villa, maupun kamar mandi luxury.</p>
<h3>SPESIFIKASI</h3>
<ul>
  <li>Material: Kayu Jati Solid Jepara</li>
  <li>Diameter: Pilihan 60 cm, 80 cm, 100 cm, 120 cm</li>
  <li>Kaca: Tebal 5 mm (Pilihan Bening / Ryben Rayban)</li>
  <li>Sistem Buka: Engsel putar tengah dengan pengait kuningan antik</li>
</ul>`,
    images: [
      { src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80", alt: "Kusen Jendela Bulat Kayu Jati Meubel Jati Abror" },
    ],
    attributes: [
      { name: "Diameter", options: ["60 cm", "80 cm", "100 cm", "120 cm"], visible: true, variation: false },
      { name: "Jenis Kaca", options: ["Kaca Bening", "Kaca Ryben"], visible: true, variation: false },
    ],
    meta_data: [
      { key: "name_en", value: "Round Teak Window Dark Brown" },
      { key: "short_description_en", value: "Circular teak window frame with 5mm glass and rotating pivot hinge." },
    ],
  },
];

async function seed() {
  console.log(`\n======================================================`);
  console.log(`🚀 Memulai Pengisian Database WooCommerce`);
  console.log(`Endpoint: ${WP_API_URL}`);
  console.log(`======================================================\n`);

  // 1. Cek Kategori yang Sudah Ada
  const catRes = await fetch(`${WP_API_URL}/products/categories?per_page=100`, { headers });
  if (!catRes.ok) {
    throw new Error(`Gagal membaca kategori dari WP: ${catRes.status} ${catRes.statusText}`);
  }
  const existingCategories = await catRes.json();
  const categoryMap = new Map(); // slug -> id

  for (const cat of existingCategories) {
    categoryMap.set(cat.slug, cat.id);
  }

  // 2. Buat Kategori Baru
  console.log(`--- Menyiapkan Kategori Produk ---`);
  for (const catData of CATEGORIES) {
    if (categoryMap.has(catData.slug)) {
      console.log(`✓ Kategori "${catData.name}" sudah ada (ID: ${categoryMap.get(catData.slug)})`);
      continue;
    }

    const createRes = await fetch(`${WP_API_URL}/products/categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(catData),
    });

    if (!createRes.ok) {
      console.error(`✕ Gagal membuat kategori ${catData.name}: ${createRes.status}`);
      const err = await createRes.text();
      console.error(err);
      continue;
    }

    const created = await createRes.json();
    categoryMap.set(created.slug, created.id);
    console.log(`✓ Berhasil membuat kategori: ${created.name} (ID: ${created.id})`);
  }

  // 3. Buat Produk
  console.log(`\n--- Menyiapkan Produk Furnitur Jati ---`);
  const prodRes = await fetch(`${WP_API_URL}/products?per_page=100`, { headers });
  const existingProducts = prodRes.ok ? await prodRes.json() : [];
  const existingSlugs = new Set(existingProducts.map((p) => p.slug));

  for (const p of PRODUCTS) {
    if (existingSlugs.has(p.slug)) {
      console.log(`✓ Produk "${p.name}" sudah ada di WooCommerce`);
      continue;
    }

    const catId = categoryMap.get(p.categorySlug);
    const payload = {
      name: p.name,
      slug: p.slug,
      type: "simple",
      regular_price: p.regular_price,
      sale_price: p.on_sale ? p.price : undefined,
      description: p.description,
      short_description: p.short_description,
      categories: catId ? [{ id: catId }] : [],
      images: p.images,
      attributes: p.attributes,
      meta_data: p.meta_data,
      status: "publish",
    };

    const res = await fetch(`${WP_API_URL}/products`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(`✕ Gagal membuat produk ${p.name}: ${res.status}`);
      const err = await res.text();
      console.error(err);
      continue;
    }

    const created = await res.json();
    console.log(`✓ Berhasil membuat produk: ${created.name} (ID: ${created.id})`);
  }

  console.log(`\n======================================================`);
  console.log(`🎉 SUKSES! Seluruh kategori dan produk telah di-import ke WooCommerce.`);
  console.log(`======================================================\n`);
}

seed().catch(console.error);
