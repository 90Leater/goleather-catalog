import {
    db,
    collection,
    getDocs,
    doc,
    setDoc,
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

        const snapshot =
await getDocs(

    collection(
        db,
        "products"
    )

);

let nextId = 1;

snapshot.forEach(doc=>{

    const data =
    doc.data();

    if(data.id >= nextId){

        nextId =
        data.id + 1;

    }

});

await setDoc(

    doc(
        db,
        "products",
        String(nextId)
    ),

    {

        id: nextId,

        kode,

        nama,

        kategori,

        folder,

        thumbnail: "",

        warna:{},

        active:true,

        views:0,

        order:nextId,

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
