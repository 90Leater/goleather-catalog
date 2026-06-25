const productTable =
document.getElementById(
    'productTable'
);

const totalProducts =
document.getElementById(
    'totalProducts'
);

document.addEventListener(
    'DOMContentLoaded',
    () => {
        loadProducts();
    }
);

async function loadProducts(){

    try{

        productTable.replaceChildren();

        const loadingRow =
        document.createElement('tr');

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
                'products'
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
    document.createElement('tr');

    row.innerHTML = `
        <td>${product.id}</td>

        <td>${product.nama}</td>

        <td>${product.kategori}</td>

        <td>
            ${product.active ? 'Aktif' : 'Nonaktif'}
        </td>

        <td>

            <button class="editBtn">
                Edit
            </button>

            <button class="deleteBtn">
                Hapus
            </button>

        </td>
    `;

    productTable.appendChild(row);

}
