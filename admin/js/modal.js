const modal =
document.getElementById("productModal");

const closeButton =
document.getElementById("closeModal");

const addButton =
document.getElementById("addProduct");

addButton.addEventListener(
    "click",
    openModal
);

closeButton.addEventListener(
    "click",
    closeModal
);

export function openModal(){

    clearForm();

    document.getElementById(
        "modalTitle"
    ).textContent =
    "Tambah Produk";

    modal.classList.remove(
        "hidden"
    );

}

export function closeModal(){

    modal.classList.add(
        "hidden"
    );

}

export function clearForm(){

    document.getElementById(
        "productName"
    ).value = "";

    document.getElementById(
        "productCode"
    ).value = "";

    document.getElementById(
        "productCategory"
    ).value = "";

    document.getElementById(
        "productFolder"
    ).value = "";

}
