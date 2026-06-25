const status =
document.getElementById('status');

document
.getElementById('startMigration')
.addEventListener(
'click',
async ()=>{

    status.textContent =
    'Membaca product.json...';

    const res =
    await fetch('../product.json');

    const products =
    await res.json();

    let success = 0;

    for(const product of products){

        await setDoc(

            doc(
                db,
                'products',
                String(product.id)
            ),

            {
                id: product.id,
                kode: product.kode,
                nama: product.nama,
                kategori: product.kategori,
                folder: product.folder,
                thumbnail: product.thumbnail,

                warna:
                product.warna || {},

                active: true,

                order:
                product.id,

                views:0,

                createdAt:
                serverTimestamp()

            }

        );

        success++;

        status.textContent =
        `Mengupload ${success} / ${products.length}`;

    }

    status.textContent =
    '✅ Semua produk berhasil diupload.';

});
