import fs from "fs";
import path from "path";
import sharp from "sharp";

const rootDir = process.cwd();

// 1. Light Logo SVG (For Dark backgrounds: Hero & Footer)
const lightLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" width="540" height="100" fill="none">
  <!-- Artisan Emblem: Interlocking Mortise & Tenon Solid Wood Joinery -->
  <g transform="translate(10, 10)">
    <!-- Base timber emblem shield -->
    <rect x="0" y="0" width="80" height="80" rx="14" fill="#1C1815" stroke="#D97706" stroke-width="2.5" />
    
    <!-- Stylized M & A solid timber beam joinery -->
    <!-- Vertical left timber -->
    <path d="M22 22 V58" stroke="#FAF7F2" stroke-width="5.5" stroke-linecap="round" />
    <!-- Diagonal timber joints forming 'M' -->
    <path d="M22 24 L40 44 L58 24" stroke="#D97706" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Vertical right timber -->
    <path d="M58 22 V58" stroke="#FAF7F2" stroke-width="5.5" stroke-linecap="round" />
    <!-- Horizontal tenon beam forming 'A' crossbar -->
    <path d="M30 48 H50" stroke="#D97706" stroke-width="4.5" stroke-linecap="round" />
    
    <!-- Central interlocking wooden dowel / pasak -->
    <circle cx="40" cy="44" r="3" fill="#FAF7F2" />
  </g>

  <!-- Typography -->
  <text x="108" y="50" fill="#FAF7F2" font-family="Georgia, 'Times New Roman', serif" font-size="29" font-weight="700" letter-spacing="1.5">MEUBEL JATI ABROR</text>
  <text x="110" y="73" fill="#D97706" font-family="'Courier New', Courier, monospace, sans-serif" font-size="11.5" font-weight="700" letter-spacing="3.8">JEPARA SOLID WOODCRAFT</text>
</svg>`;

// 2. Dark Logo SVG (For Light backgrounds: Scrolled Navbar)
const darkLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" width="540" height="100" fill="none">
  <!-- Artisan Emblem: Interlocking Mortise & Tenon Solid Wood Joinery -->
  <g transform="translate(10, 10)">
    <!-- Base timber emblem shield -->
    <rect x="0" y="0" width="80" height="80" rx="14" fill="#FAF7F2" stroke="#B45309" stroke-width="2.5" />
    
    <!-- Stylized M & A solid timber beam joinery -->
    <!-- Vertical left timber -->
    <path d="M22 22 V58" stroke="#141210" stroke-width="5.5" stroke-linecap="round" />
    <!-- Diagonal timber joints forming 'M' -->
    <path d="M22 24 L40 44 L58 24" stroke="#B45309" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
    <!-- Vertical right timber -->
    <path d="M58 22 V58" stroke="#141210" stroke-width="5.5" stroke-linecap="round" />
    <!-- Horizontal tenon beam forming 'A' crossbar -->
    <path d="M30 48 H50" stroke="#B45309" stroke-width="4.5" stroke-linecap="round" />
    
    <!-- Central interlocking wooden dowel / pasak -->
    <circle cx="40" cy="44" r="3" fill="#141210" />
  </g>

  <!-- Typography -->
  <text x="108" y="50" fill="#141210" font-family="Georgia, 'Times New Roman', serif" font-size="29" font-weight="700" letter-spacing="1.5">MEUBEL JATI ABROR</text>
  <text x="110" y="73" fill="#B45309" font-family="'Courier New', Courier, monospace, sans-serif" font-size="11.5" font-weight="700" letter-spacing="3.8">JEPARA SOLID WOODCRAFT</text>
</svg>`;

// 3. Favicon SVG
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" fill="none">
  <rect width="64" height="64" rx="16" fill="#141210" />
  <rect x="3" y="3" width="58" height="58" rx="13" stroke="#B45309" stroke-width="2" />
  
  <path d="M18 17 V47" stroke="#FAF7F2" stroke-width="4.5" stroke-linecap="round" />
  <path d="M18 19 L32 35 L46 19" stroke="#D97706" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M46 17 V47" stroke="#FAF7F2" stroke-width="4.5" stroke-linecap="round" />
  <path d="M24 39 H40" stroke="#D97706" stroke-width="3.5" stroke-linecap="round" />
  <circle cx="32" cy="35" r="2.5" fill="#FAF7F2" />
</svg>`;

async function main() {
  console.log("Generating brand assets for Meubel Jati Abror...");

  // Write SVGs
  const logoDir = path.join(rootDir, "public", "images", "logo");
  fs.writeFileSync(path.join(logoDir, "logo.svg"), lightLogoSvg, "utf-8");
  fs.writeFileSync(path.join(logoDir, "logo-dark.svg"), darkLogoSvg, "utf-8");

  // Generate logo.png (light version for dark backgrounds)
  await sharp(Buffer.from(lightLogoSvg))
    .png()
    .toFile(path.join(logoDir, "logo.png"));
  console.log("✓ Generated public/images/logo/logo.png");

  // Generate logo-2.png (dark version for light backgrounds)
  await sharp(Buffer.from(darkLogoSvg))
    .png()
    .toFile(path.join(logoDir, "logo-2.png"));
  console.log("✓ Generated public/images/logo/logo-2.png");

  // Generate favicon.ico (using sharp png as favicon)
  const faviconBuffer = await sharp(Buffer.from(faviconSvg))
    .resize(64, 64)
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(rootDir, "src", "app", "favicon.ico"), faviconBuffer);
  console.log("✓ Generated src/app/favicon.ico");

  // Generate OpenGraph Default Banner (1200x630)
  const ogOverlaySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
    <!-- Solid dark walnut background with warm grain scrim -->
    <rect width="1200" height="630" fill="#141210" />
    <rect x="24" y="24" width="1152" height="582" fill="none" stroke="#B45309" stroke-width="1.5" stroke-opacity="0.4" />
    <rect x="32" y="32" width="1136" height="566" fill="none" stroke="#D97706" stroke-width="0.75" stroke-opacity="0.25" />

    <!-- Corner Decorative Accents -->
    <path d="M24 44 H44 V24" stroke="#D97706" stroke-width="3" fill="none" />
    <path d="M1176 44 H1156 V24" stroke="#D97706" stroke-width="3" fill="none" />
    <path d="M24 586 H44 V606" stroke="#D97706" stroke-width="3" fill="none" />
    <path d="M1176 586 H1156 V606" stroke="#D97706" stroke-width="3" fill="none" />

    <!-- Emblem -->
    <g transform="translate(100, 110)">
      <rect x="0" y="0" width="90" height="90" rx="16" fill="#1C1815" stroke="#D97706" stroke-width="3" />
      <path d="M25 25 V65" stroke="#FAF7F2" stroke-width="6" stroke-linecap="round" />
      <path d="M25 27 L45 49 L65 27" stroke="#D97706" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M65 25 V65" stroke="#FAF7F2" stroke-width="6" stroke-linecap="round" />
      <path d="M34 54 H56" stroke="#D97706" stroke-width="5" stroke-linecap="round" />
      <circle cx="45" cy="49" r="3.5" fill="#FAF7F2" />
    </g>

    <!-- Brand Header -->
    <text x="215" y="152" fill="#FAF7F2" font-family="Georgia, 'Times New Roman', serif" font-size="36" font-weight="700" letter-spacing="2">MEUBEL JATI ABROR</text>
    <text x="217" y="182" fill="#D97706" font-family="'Courier New', monospace" font-size="14" font-weight="700" letter-spacing="4">JEPARA SOLID WOODCRAFT</text>

    <!-- Main Headline in Luxury Serif -->
    <text x="100" y="300" fill="#FAF7F2" font-family="Georgia, 'Times New Roman', serif" font-size="52" font-weight="700" letter-spacing="-0.5">Spesialis Furnitur Kayu Jati Solid Jepara</text>
    
    <!-- Subtitle -->
    <text x="100" y="360" fill="#D4CDC3" font-family="sans-serif" font-size="22" font-weight="400">Pengrajin dan produsen aneka mebel kayu jati kualitas ekspor langsung dari workshop Jepara.</text>
    <text x="100" y="395" fill="#A89F91" font-family="sans-serif" font-size="18" font-weight="400">Meja Makan · Kursi · Dipan Tempat Tidur · Lemari · Credenza TV · Pesanan Kustom Arsitektur</text>

    <!-- Divider Bar -->
    <line x1="100" y1="440" x2="1100" y2="440" stroke="#3E342B" stroke-width="1.5" />

    <!-- 3 Pillars -->
    <g transform="translate(100, 470)">
      <circle cx="6" cy="6" r="4" fill="#D97706" />
      <text x="20" y="10" fill="#FAF7F2" font-family="'Courier New', monospace" font-size="14" font-weight="700" letter-spacing="1">100% KAYU JATI SOLID</text>
      <text x="20" y="32" fill="#A89F91" font-family="sans-serif" font-size="13">Bebas campuran triplek &amp; serbuk</text>
    </g>

    <g transform="translate(450, 470)">
      <circle cx="6" cy="6" r="4" fill="#D97706" />
      <text x="20" y="10" fill="#FAF7F2" font-family="'Courier New', monospace" font-size="14" font-weight="700" letter-spacing="1">KONSTRUKSI PURUS &amp; PASAK</text>
      <text x="20" y="32" fill="#A89F91" font-family="sans-serif" font-size="13">Sambungan mortise tenon awet puluhan tahun</text>
    </g>

    <g transform="translate(820, 470)">
      <circle cx="6" cy="6" r="4" fill="#D97706" />
      <text x="20" y="10" fill="#FAF7F2" font-family="'Courier New', monospace" font-size="14" font-weight="700" letter-spacing="1">HARGA LANGSUNG PENGRAJIN</text>
      <text x="20" y="32" fill="#A89F91" font-family="sans-serif" font-size="13">Tanpa potongan perantara marketplace</text>
    </g>

    <!-- Footer URL -->
    <rect x="940" y="535" width="220" height="40" rx="6" fill="#1C1815" stroke="#B45309" stroke-width="1" />
    <text x="1050" y="560" fill="#FAF7F2" font-family="'Courier New', monospace" font-size="13" font-weight="700" letter-spacing="1" text-anchor="middle">meubeljatiabror.com</text>
  </svg>`;

  await sharp(Buffer.from(ogOverlaySvg))
    .jpeg({ quality: 95 })
    .toFile(path.join(rootDir, "public", "images", "og-default.jpg"));
  console.log("✓ Generated public/images/og-default.jpg");

  console.log("All brand assets successfully generated!");
}

main().catch((err) => {
  console.error("Error generating brand assets:", err);
  process.exit(1);
});
