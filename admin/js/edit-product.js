import {
    db,
    doc,
    getDoc
}
from "../../firebase-admin.js";

import {
    openModal,
    setEditingProduct
}
from "./modal.js";

document.addEventListener(
    "click",
    async(event)=>{

        if(
            !event.target.classList.contains(
                "editBtn"
            )
        ){
            return;
        }

        const id =
        event.target.dataset.id;

        try{

            const snapshot =
            await getDoc(

                doc(
                    db,
                    "products",
                    id
                )

            );

            if(
                !snapshot.exists()
            ){
                return;
            }

            const product =
            snapshot.data();

            setEditingProduct(id);

            document.getElementById(
                "modalTitle"
            ).textContent =
            "Edit Produk";

            document.getElementById(
                "productName"
            ).value =
            product.nama;

            document.getElementById(
                "productCode"
            ).value =
            product.kode;

            document.getElementById(
                "productCategory"
            ).value =
            product.kategori;

            document.getElementById(
                "productFolder"
            ).value =
            product.folder;

            openModal(false);

        }

        catch(error){

            console.error(error);

        }

    }
);
