import {
    db,
    collection,
    getDocs,
    doc,
    deleteDoc
} from "../../firebase-admin.js";

const productTable =
document.getElementById(
    "productTable"
);

const totalProducts =
document.getElementById(
    "totalProducts"
);

export async function loadProducts(){

    try{

        productTable.replaceChildren();

        const loadingRow =
        document.createElement("tr");

        loadingRow.innerHTML = `
            <td colspan="5">
                Memuat data...
            </td>
        `;

        productTable.appendChild(
            loadingRow
        );

        const snapshot =
        await getDocs(
            collection(
                db,
                "products"
            )
        );

        productTable.replaceChildren();

        let total = 0;

        snapshot.forEach(doc=>{

            total++;

            createProductRow(
                doc.data()
            );

        });

        totalProducts.textContent =
        total;

    }catch(error){

        console.error(error);

        productTable.innerHTML = `
            <tr>
                <td colspan="5">
                    Gagal mengambil data.
                </td>
            </tr>
        `;

    }

}

function createProductRow(product){

    const row =
    document.createElement("tr");

    row.innerHTML = `
        <td>${product.id}</td>

        <td>${product.nama}</td>

        <td>${product.kategori}</td>

        <td>
            ${product.active ? "Aktif" : "Nonaktif"}
        </td>

        <td>

            <button
                class="editBtn"
                data-id="${product.id}">
                Edit
            </button>

            <button
                class="deleteBtn"
                data-id="${product.id}">
                Hapus
            </button>

        </td>
    `;

    productTable.appendChild(row);

}
document.addEventListener(
    "click",
    async (event)=>{

        if(
            !event.target.classList.contains(
                "deleteBtn"
            )
        ) return;

        const id =
        event.target.dataset.id;

        const confirmDelete =
        confirm(
            "Hapus produk ini?"
        );

        if(!confirmDelete) return;

        try{

            await deleteDoc(

                doc(
                    db,
                    "products",
                    id
                )

            );

            loadProducts();

        }catch(error){

            console.error(error);

            alert(
                "Gagal menghapus produk."
            );

        }

    }
);
