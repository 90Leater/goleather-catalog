async function importProducts(){

    if(
        !confirm(
            'Import semua produk?'
        )
    ) return;

    const status =
    document.getElementById(
        'importStatus'
    );

    try{

        status.textContent =
        'Membaca product.json...';

        const response =
        await fetch(
            '../product.json'
        );

        const products =
        await response.json();

        let success = 0;

        for(
            const product
            of products
        ){

            await setDoc(

                doc(
                    db,
                    'products',
                    String(product.id)
                ),

                {

                    id:
                    product.id,

                    kode:
                    product.kode,

                    nama:
                    product.nama,

                    kategori:
                    product.kategori,

                    folder:
                    product.folder,

                    thumbnail:
                    product.thumbnail,

                    warna:
                    product.warna || {},

                    views:0,

                    active:true,

                    order:
                    product.id,

                    createdAt:
                    serverTimestamp()

                }

            );

            success++;

            status.textContent =
            `Mengupload ${success}/${products.length}`;

        }

        status.textContent =
        '✅ Import selesai.';

    }

    catch(error){

        console.error(error);

        status.textContent =
        error.message;

    }

}
