let selectedProducts =
    JSON.parse(
    localStorage.getItem('selectedProducts')
    ) || [];
function updateCart(){

    document.getElementById(
    'cartCount'
    ).textContent =

    `🛒 ${selectedProducts.length} Produk Dipilih`;

    localStorage.setItem(
        'selectedProducts',
        JSON.stringify(selectedProducts)
    );

}
