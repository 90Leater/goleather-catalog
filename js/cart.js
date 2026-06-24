let selectedProducts =
    JSON.parse(
    localStorage.getItem('selectedProducts')
    ) || [];
function updateCart(){

    document.getElementById(
    'cartCount'
    ).textContent =

    '📋 Produk Dipilih • ' +

    selectedProducts.length;

    const whatsappBtn =
    document.getElementById(
    'cartWhatsapp'
    );

    if(whatsappBtn){
    
    if(
    selectedProducts.length === 0
    ){

        whatsappBtn.textContent =
        '💬 Tanya Harga';

    }else{

        whatsappBtn.textContent =

        '💬 Tanya Harga • ' +

        selectedProducts.length +

        ' Produk';

    }

}

    localStorage.setItem(
    'selectedProducts',
    JSON.stringify(
        selectedProducts
    )
);

    if(
    typeof updateStats ===
    'function'
    ){

        updateStats();

}

    renderSelectedProducts();

}
function renderSelectedProducts(){

const container =
document.getElementById(
    'selectedProductsList'
);

if(!container) return;

container.innerHTML = '';

if(
selectedProducts.length === 0
){

    container.innerHTML =
    '<p>Belum ada produk dipilih</p>';

    return;

}

selectedProducts.forEach(id => {

    const product =
    products.find(
        p => p.id === id
    );

    if(!product) return;

    const card =
    document.createElement(
        'div'
    );

    card.className =
    'selected-card';

    card.innerHTML = `
        <button
        class="remove-selected"
        data-id="${product.id}">
            ✕
        </button>

        <img
        src="Images/${product.folder}/${product.thumbnail}"
        loading="lazy">

        <p>${product.nama}</p>
    `;

    card.addEventListener(
        'click',
        () => {

            const index =
            products.findIndex(
                p => p.id === product.id
            );

            openProduct(
                product,
                index
            );

        }
    );

    container.appendChild(
        card
    );

    const removeBtn =
    card.querySelector(
        '.remove-selected'
    );

    removeBtn.addEventListener(
        'click',
        (e) => {

            e.stopPropagation();

            selectedProducts =
            selectedProducts.filter(
                itemId =>
                itemId !== product.id
            );

            localStorage.setItem(
                'selectedProducts',
                JSON.stringify(
                    selectedProducts
                )
            );

            const checkbox =
            document.querySelector(
            `.product-checkbox[data-id="${product.id}"]`
            );

            if(checkbox){
                checkbox.checked = false;
            }

            updateCart();

        }
    );

});

}

document
.getElementById('cartWhatsapp')
.addEventListener(
'click',
() => {

    if(selectedProducts.length === 0){
        alert('Pilih produk terlebih dahulu');
        return;
    }

    let pesan =
    'Halo GO.Leather%0A%0ASaya ingin tanya harga:%0A%0A';

    selectedProducts.forEach(id => {

        const product =
        products.find(
            p => p.id === id
        );

        if(product){

            pesan +=
            '• ' +
            product.nama +
            ' (' +
            product.kode +
            ')%0A';

        }

    });

    window.open(
        'https://wa.me/6288973623416?text=' +
        pesan,
        '_blank'
    );

});
