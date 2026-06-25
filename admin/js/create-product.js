import {
    db,
    collection,
    addDoc,
    serverTimestamp
}
from "../../firebase-admin.js";

import {
    closeModal
}
from "./modal.js";

import {
    loadProducts
}
from "./products.js";

const saveButton =
document.getElementById(
    "saveProduct"
);

saveButton.addEventListener(
    "click",
    saveProduct
);

async function saveProduct(){

    try{

        const nama =
        document.getElementById(
            "productName"
        ).value.trim();

        const kode =
        document.getElementById(
            "productCode"
        ).value.trim();

        const kategori =
        document.getElementById(
            "productCategory"
        ).value.trim();

        const folder =
        document.getElementById(
            "productFolder"
        ).value.trim();

        if(
            !nama ||
            !kode ||
            !kategori ||
            !folder
        ){

            alert(
                "Semua field wajib diisi."
            );

            return;

        }

        await addDoc(

            collection(
                db,
                "products"
            ),

            {

                nama,

                kode,

                kategori,

                folder,

                thumbnail: "",

                warna:{},

                active:true,

                views:0,

                order:0,

                createdAt:
                serverTimestamp()

            }

        );

        closeModal();

        loadProducts();

        alert(
            "Produk berhasil ditambahkan."
        );

    }

    catch(error){

        console.error(error);

        alert(
            "Gagal menambahkan produk."
        );

    }

}
