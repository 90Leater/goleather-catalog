import {
    db,
    doc,
    setDoc,
    serverTimestamp
} from "../../firebase-admin.js";

import {
    loadProducts
} from "./products.js";

const importButton =
document.getElementById(
    "importJson"
);

const importStatus =
document.getElementById(
    "importStatus"
);

const importProgress =
document.getElementById(
    "importProgress"
);

export function setupImportButton(){

    importButton.addEventListener(
        "click",
        importProducts
    );

}

async function importProducts(){

    const confirmImport =
    confirm(
        "Import semua produk ke Firestore?"
    );

    if(!confirmImport) return;

    try{

        importButton.disabled = true;

        importStatus.textContent =
        "Membaca product.json...";

        const response =
        await fetch(
            "../product.json"
        );

        const products =
        await response.json();

        importProgress.max =
        products.length;

        importProgress.value = 0;

        let success = 0;

        for(const product of products){

            await setDoc(

                doc(
                    db,
                    "products",
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

                    views: 0,

                    order: product.id,

                    createdAt:
                    serverTimestamp()

                }

            );

            success++;

            importProgress.value =
            success;

            importStatus.textContent =
            `Mengupload ${success} / ${products.length}`;

        }

        importStatus.textContent =
        "✅ Import selesai.";

        await loadProducts();

    }catch(error){

        console.error(error);

        importStatus.textContent =
        error.message;

    }

    importButton.disabled = false;

}
