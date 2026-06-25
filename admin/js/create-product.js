import {
    db,
    doc,
    setDoc,
    updateDoc,
    serverTimestamp,
    runTransaction
}
from "../../firebase-admin.js";

import {
    closeModal,
    getEditingProduct,
    setEditingProduct
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

        const counterRef =
doc(
    db,
    "system",
    "counter"
);

const nextId =
await runTransaction(
    db,
    async(transaction)=>{

        const counterDoc =
        await transaction.get(
            counterRef
        );

        if(
            !counterDoc.exists()
        ){

            throw new Error(
                "Counter tidak ditemukan."
            );

        }

        const currentId =
        counterDoc.data().nextProductId;

        transaction.update(
            counterRef,
            {
                nextProductId:
                currentId + 1
            }
        );

        return currentId;

    }
);
        
        const editingId =
getEditingProduct();

if(editingId){

    await updateDoc(

        doc(
            db,
            "products",
            editingId
        ),

        {

            kode,

            nama,

            kategori,

            folder

        }

    );

}else{

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

            thumbnail:"",

            warna:{},

            active:true,

            views:0,

            order:nextId,

            createdAt:
            serverTimestamp()

        }

    );

}

        closeModal();

        setEditingProduct(null);

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
