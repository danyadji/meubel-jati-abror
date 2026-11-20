<?php
/**
 * Direct WordPress & WooCommerce Seeder for Meubel Jati Abror
 */

// Load WordPress Core
define( 'WP_USE_THEMES', false );
require_once 'D:/laragon/www/meubel-jati-abror/wp-load.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

echo "\n======================================================\n";
echo "🚀 Memulai Import Produk & Kategori Meubel Jati Abror\n";
echo "WordPress Site: " . get_bloginfo('name') . " (" . home_url() . ")\n";
echo "======================================================\n\n";

$categories_data = [
    [
        'name' => 'Meja Makan Jati',
        'slug' => 'meja-makan-jati',
        'desc' => 'Set meja makan kayu jati solid Jepara dengan konstruksi purus pasak kokoh untuk ruang makan elegan.',
        'image_url' => 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Teak Dining Tables',
    ],
    [
        'name' => 'Kursi & Sofa Jati',
        'slug' => 'kursi-sofa-jati',
        'desc' => 'Kursi makan, kursi santai, dan sofa jati solid dengan bantalan nyaman dan finishing natural halus.',
        'image_url' => 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Chairs & Sofas',
    ],
    [
        'name' => 'Dipan & Tempat Tidur',
        'slug' => 'dipan-tempat-tidur',
        'desc' => 'Dipan kayu jati solid rangka kokoh tanpa bunyi derit, menghadirkan kehangatan tidur alami.',
        'image_url' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Beds & Headboards',
    ],
    [
        'name' => 'Lemari & Bufet TV',
        'slug' => 'lemari-bufet-tv',
        'desc' => 'Credenza TV kisi-kisi dan lemari pakaian kayu jati dengan kapasitas lapang dan estetika modern.',
        'image_url' => 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Sideboards & Wardrobes',
    ],
    [
        'name' => 'Meja Kopi & Tamu',
        'slug' => 'meja-kopi-tamu',
        'desc' => 'Coffee table bundar dan meja tamu jati solid minimalis sebagai focal point ruang keluarga.',
        'image_url' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Coffee Tables',
    ],
    [
        'name' => 'Meja Kerja & Belajar',
        'slug' => 'meja-kerja-belajar',
        'desc' => 'Meja kerja kayu jati ergonomis dengan laci penyimpanan dokumen untuk ruang kerja fungsional.',
        'image_url' => 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Desks & Workstations',
    ],
    [
        'name' => 'Jendela & Kusen Bulat',
        'slug' => 'jendela-kusen-bulat',
        'desc' => 'Kusen jendela bulat jati unik dengan engsel putar dan kaca ryben/bening untuk fasad tropis.',
        'image_url' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Round Teak Windows',
    ],
];

// Helper to download and attach image
function upload_image_from_url( $url, $post_id, $desc ) {
    // Download to temp file
    $tmp = download_url( $url );
    if ( is_wp_error( $tmp ) ) {
        echo "   [!] Download error: " . $tmp->get_error_message() . "\n";
        return 0;
    }

    $file_array = [
        'name'     => sanitize_title( $desc ) . '.jpg',
        'tmp_name' => $tmp,
    ];

    $id = media_handle_sideload( $file_array, $post_id, $desc );
    if ( is_wp_error( $id ) ) {
        @unlink( $file_array['tmp_name'] );
        echo "   [!] Sideload error: " . $id->get_error_message() . "\n";
        return 0;
    }

    return $id;
}

$cat_id_map = [];

echo "--- 1. Menyiapkan Kategori WooCommerce ---\n";
foreach ( $categories_data as $c ) {
    $existing = get_term_by( 'slug', $c['slug'], 'product_cat' );
    if ( $existing ) {
        $cat_id = $existing->term_id;
        echo "✓ Kategori '{$c['name']}' sudah ada (ID: {$cat_id})\n";
    } else {
        $term = wp_insert_term( $c['name'], 'product_cat', [
            'slug'        => $c['slug'],
            'description' => $c['desc'],
        ] );

        if ( is_wp_error( $term ) ) {
            echo "✕ Gagal membuat kategori {$c['name']}: " . $term->get_error_message() . "\n";
            continue;
        }

        $cat_id = $term['term_id'];
        echo "✓ Berhasil membuat kategori: {$c['name']} (ID: {$cat_id})\n";

        // Download category image
        echo "   Mengunduh gambar kategori...\n";
        $img_id = upload_image_from_url( $c['image_url'], 0, $c['name'] );
        if ( $img_id > 0 ) {
            update_term_meta( $cat_id, 'thumbnail_id', $img_id );
            echo "   ✓ Gambar thumbnail kategori terpasang (ID: {$img_id})\n";
        }
    }

    // Set English meta
    update_term_meta( $cat_id, 'name_en', $c['name_en'] );
    $cat_id_map[ $c['slug'] ] = $cat_id;
}

$products_data = [
    [
        'name' => 'Meja Makan Jati Solid Minimalis 6 Kursi',
        'slug' => 'meja-makan-jati-minimalis',
        'cat_slug' => 'meja-makan-jati',
        'regular_price' => '5500000',
        'sale_price' => '4750000',
        'short_desc' => 'Set meja makan kayu jati solid tebal 3,5 cm dengan sambungan purus pasak khas Jepara, muat 6 orang.',
        'desc' => "<p>Meja makan kayu jati solid berkualitas ekspor yang diproduksi langsung oleh pengrajin Jepara. Menggunakan kayu jati pilihan yang telah melalui proses oven (kiln-dried) dengan kadar air terukur sehingga bebas retak dan melengkung.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Pilihan (Tua & Kering)</li><li>Ukuran Meja: 180 cm x 90 cm x 76 cm</li><li>Ketebalan Daun Meja: 3,5 cm solid (tanpa tempelan)</li><li>Finishing: Natural Teak Doff / Satin dengan lapisan pelindung anti-air & panas</li><li>Konstruksi: Sambungan tradisional mortise & tenon (purus & pasak)</li></ul><h3>LAYANAN CUSTOM</h3><p>Melayani penyesuaian ukuran (160 cm, 200 cm, 240 cm) serta warna finishing sesuai konsep ruang makan rumah atau villa Anda.</p>",
        'image_url' => 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Minimalist Solid Teak Dining Table',
        'short_desc_en' => 'Solid teak dining table with traditional mortise and tenon joinery, seats 6 comfortably.',
    ],
    [
        'name' => 'Kursi Makan Jati Ropan Sandaran Lengkung',
        'slug' => 'kursi-makan-jati-ropan',
        'cat_slug' => 'kursi-sofa-jati',
        'regular_price' => '950000',
        'sale_price' => '850000',
        'short_desc' => 'Kursi makan kayu jati bergaya scandinavian dengan sandaran lengkung ergonomis dan dudukan kokoh.',
        'desc' => "<p>Kursi makan model Ropan yang memadukan kehangatan kayu jati alami dengan ergonomi sandaran punggung yang pas. Sangat cocok dipadukan dengan meja makan minimalis untuk hunian modern maupun kafe dan restoran.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Jepara</li><li>Dimensi: 52 cm x 48 cm x 78 cm (Tinggi Dudukan 45 cm)</li><li>Finishing: Natural Wood Bleached / Dark Teak</li><li>Konstruksi: Pasak kayu jati kokoh, beban maksimal hingga 130 kg</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Curved Solid Teak Dining Chair',
        'short_desc_en' => 'Ergonomic curved teak dining chair with solid Scandinavian design.',
    ],
    [
        'name' => 'Dipan Tempat Tidur Jati Spindle Minimalis',
        'slug' => 'dipan-tempat-tidur-jati-spindle',
        'cat_slug' => 'dipan-tempat-tidur',
        'regular_price' => '6000000',
        'sale_price' => '5200000',
        'short_desc' => 'Rangka tempat tidur jati solid headboard spindle jari-jari, konstruksi stabil tanpa derit.',
        'desc' => "<p>Tempat tidur kayu jati desain spindle yang menghadirkan nuansa ketenangan alami di kamar tidur Anda. Dibuat dengan presisi tinggi oleh pengrajin Jepara sehingga rangka sangat kokoh dan tidak bersuara saat digunakan.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Pilihan Oven</li><li>Pilihan Ukuran Matras: Queen (160x200 cm), King (180x200 cm)</li><li>Tinggi Headboard: 105 cm</li><li>Finishing: Sanding Sealer + NC Doff Halus</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Spindle Solid Teak Bed Frame',
        'short_desc_en' => 'Minimalist teak bed frame with vertical spindle headboard and squeak-free construction.',
    ],
    [
        'name' => 'Nakas Samping Kasur Jati 2 Laci',
        'slug' => 'nakas-samping-kasur-jati',
        'cat_slug' => 'dipan-tempat-tidur',
        'regular_price' => '1150000',
        'sale_price' => '950000',
        'short_desc' => 'Bedside table kayu jati dengan 2 laci penyimpanan dan handle tarikan kayu minimalis.',
        'desc' => "<p>Nakas samping tempat tidur kayu jati solid berukuran compact. Menampung buku, lampu tidur, dan aksesoris personal dengan rapi dan estetik.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid</li><li>Ukuran: 45 cm x 40 cm x 55 cm</li><li>Fitur: 2 Laci rel kayu halus dengan tarikan tersembunyi</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1200&q=80',
        'name_en' => '2-Drawer Solid Teak Bedside Table',
        'short_desc_en' => 'Compact solid teak nightstand with two drawers and clean minimalist lines.',
    ],
    [
        'name' => 'Sofa Kursi Santai Jati Retro Vintage 1 Seater',
        'slug' => 'sofa-kursi-santai-jati-retro',
        'cat_slug' => 'kursi-sofa-jati',
        'regular_price' => '3200000',
        'sale_price' => '2800000',
        'short_desc' => 'Armchair kayu jati bergaya mid-century dengan bantalan busa royal foam kain kanvas linen.',
        'desc' => "<p>Armchair santai kayu jati solid dengan sandaran tangan lengkung khas gaya mid-century modern. Dilengkapi bantalan empuk yang bisa dilepas pasang untuk memudahkan pencucian.</p><h3>SPESIFIKASI</h3><ul><li>Rangka: Kayu Jati Solid Kering</li><li>Busa: Royal Foam Density Tinggi (Anti-Gembos)</li><li>Kain: Fabric Linen Premium</li><li>Dimensi: 72 cm x 80 cm x 82 cm</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Mid-Century Teak Armchair',
        'short_desc_en' => 'Solid teak accent chair with ergonomic armrests and premium linen cushions.',
    ],
    [
        'name' => 'Meja Kopi Coffee Table Bundar Jati Solid',
        'slug' => 'meja-kopi-coffee-table-bundar-jati',
        'cat_slug' => 'meja-kopi-tamu',
        'regular_price' => '1650000',
        'sale_price' => '1450000',
        'short_desc' => 'Meja tamu bundar diameter 70 cm dari kayu jati solid dengan kaki tripod kokoh.',
        'desc' => "<p>Coffee table bundar yang manis dan fungsional untuk melengkapi ruang keluarga atau ruang tunggu villa. Finishing halus memperlihatkan keindahan urat kayu jati asli Jepara.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid</li><li>Diameter: 70 cm (Tinggi 45 cm)</li><li>Konstruksi: Kaki tripod interlocking solid</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Round Solid Teak Coffee Table',
        'short_desc_en' => '70cm diameter round teak coffee table with sturdy tripod base.',
    ],
    [
        'name' => 'Credenza Bufet TV Jati Pintu Kisi-Kisi',
        'slug' => 'credenza-bufet-tv-jati-kisi',
        'cat_slug' => 'lemari-bufet-tv',
        'regular_price' => '4800000',
        'sale_price' => '4200000',
        'short_desc' => 'Bufet TV panjang 180 cm pintu sliding kisi-kisi kayu jati untuk ruang tamu modern.',
        'desc' => "<p>Bufet TV bergaya Japandi minimalis dengan pintu geser bermotif kisi-kisi (slat wood). Kisi-kisi memungkinkan sinyal remote TV dan sirkulasi udara perangkat elektronik tetap lancar.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Pilihan</li><li>Dimensi: 180 cm x 45 cm x 55 cm</li><li>Pintu: 2 Pintu Geser Kisi-Kisi + 2 Laci Tengah</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Slatted Teak TV Credenza',
        'short_desc_en' => '180cm solid teak media console with slatted sliding doors.',
    ],
    [
        'name' => 'Meja Kerja Kantor Jati Solid Minimalis',
        'slug' => 'meja-kerja-kantor-jati-solid',
        'cat_slug' => 'meja-kerja-belajar',
        'regular_price' => '4200000',
        'sale_price' => '3750000',
        'short_desc' => 'Meja kerja kayu jati solid 140x70 cm dengan 2 laci penyimpanan dan ruang kaki lapang.',
        'desc' => "<p>Meja kerja dirancang khusus untuk kenyamanan bekerja seharian di rumah (home office) maupun kantor profesional. Permukaan kayu jati halus memberikan kenyamanan saat mengetik dan menulis.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Oven</li><li>Dimensi: 140 cm x 70 cm x 75 cm</li><li>Laci: 2 Laci penyimpanan dokumen & laptop</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Solid Teak Executive Desk',
        'short_desc_en' => '140x70cm ergonomic teak writing desk with 2 built-in drawers.',
    ],
    [
        'name' => 'Kusen Jendela Bulat Kayu Jati Dark Brown',
        'slug' => 'jendela-kusen-bulat-dark-brown-a',
        'cat_slug' => 'jendela-kusen-bulat',
        'regular_price' => '1200000',
        'sale_price' => '999000',
        'short_desc' => 'Kusen jendela bulat jati kaca tebal 5 mm sistem putar engsel kuningan, finishing dark brown.',
        'desc' => "<p>Kusen jendela bundar kayu jati asli Jepara. Memberikan sentuhan arsitektural tropis dan estetika modern pada fasad rumah, villa, maupun kamar mandi luxury.</p><h3>SPESIFIKASI</h3><ul><li>Material: Kayu Jati Solid Jepara</li><li>Diameter: Pilihan 60 cm, 80 cm, 100 cm, 120 cm</li><li>Kaca: Tebal 5 mm (Pilihan Bening / Ryben Rayban)</li><li>Sistem Buka: Engsel putar tengah dengan pengait kuningan antik</li></ul>",
        'image_url' => 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
        'name_en' => 'Round Teak Window Dark Brown',
        'short_desc_en' => 'Circular teak window frame with 5mm glass and rotating pivot hinge.',
    ],
];

echo "\n--- 2. Menyiapkan Produk WooCommerce ---\n";
foreach ( $products_data as $p ) {
    $existing = get_page_by_path( $p['slug'], OBJECT, 'product' );
    if ( $existing ) {
        echo "✓ Produk '{$p['name']}' sudah ada di database (ID: {$existing->ID})\n";
        continue;
    }

    $product = new WC_Product_Simple();
    $product->set_name( $p['name'] );
    $product->set_slug( $p['slug'] );
    $product->set_status( 'publish' );
    $product->set_catalog_visibility( 'visible' );
    $product->set_description( $p['desc'] );
    $product->set_short_description( $p['short_desc'] );
    $product->set_regular_price( $p['regular_price'] );
    if ( ! empty( $p['sale_price'] ) ) {
        $product->set_sale_price( $p['sale_price'] );
    }

    // Set category
    if ( isset( $cat_id_map[ $p['cat_slug'] ] ) ) {
        $product->set_category_ids( [ $cat_id_map[ $p['cat_slug'] ] ] );
    }

    $product_id = $product->save();
    if ( ! $product_id ) {
        echo "✕ Gagal menyimpan produk: {$p['name']}\n";
        continue;
    }

    echo "✓ Berhasil membuat produk: {$p['name']} (ID: {$product_id})\n";

    // Download image
    echo "   Mengunduh foto produk...\n";
    $img_id = upload_image_from_url( $p['image_url'], $product_id, $p['name'] );
    if ( $img_id > 0 ) {
        $product->set_image_id( $img_id );
        $product->save();
        echo "   ✓ Foto utama terpasang (Attachment ID: {$img_id})\n";
    }

    // Meta translations
    update_post_meta( $product_id, 'name_en', $p['name_en'] );
    update_post_meta( $product_id, 'short_description_en', $p['short_desc_en'] );
}

echo "\n======================================================\n";
echo "🎉 IMPORT SELESAI!\n";
echo "Semua kategori dan produk sekarang aktif di database WordPress.\n";
echo "======================================================\n\n";
