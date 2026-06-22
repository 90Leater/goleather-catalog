fetch('product.json')
.then(res => res.json())
.then(products => {

```
const container = document.getElementById('products');
const searchInput = document.getElementById('search');

function renderProducts(filteredProducts){

    container.innerHTML = '';

    filteredProducts.forEach(product => {

        const imagePath =
        `Images/${product.folder}/${product.thumbnail}`;

        const card = document.createElement('div');

        card.className = 'card';

        card.innerHTML = `
            <img src="${imagePath}" alt="${product.nama}">
            <div class="card-body">

                <h3>${product.nama}</h3>

                <p><b>Kode:</b> ${product.kode}</p>

                <p>${product.kategori}</p>

                <a class="btn">
                    Tanya Harga
                </a>

            </div>
        `;

        card.addEventListener('click', () => {

            document.getElementById('modalImage').src =
            imagePath;

            document.getElementById('modalName').textContent =
            product.nama;

            document.getElementById('modalCode').textContent =
            "Kode: " + product.kode;

            document.getElementById('modalCategory').textContent =
            product.kategori;

            document.getElementById('modalWhatsapp').href =
            `https://wa.me/6288973623416?text=Saya ingin pesan ${product.nama}`;

            document.getElementById('productModal').style.display =
            'block';

        });

        container.appendChild(card);

    });

}

renderProducts(products);

searchInput.addEventListener('input', () => {
    console.log(searchInput.value);

    const keyword =
    searchInput.value.toLowerCase();

    const filtered =
products.filter(product =>
    product.nama.toLowerCase().includes(keyword)
);

    renderProducts(filtered);

});
```

});

document.addEventListener('click', function(e){

```
if(e.target.classList.contains('close')){
    document.getElementById('productModal').style.display =
    'none';
}
```

});
