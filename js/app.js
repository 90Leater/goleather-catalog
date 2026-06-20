fetch('product.json')
.then(res => res.json())
.then(products => {

    const container = document.getElementById('products');

    products.forEach(product => {

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
            `https://wa.me/6281234567890?text=Saya ingin pesan ${product.nama}`;

            document.getElementById('productModal').style.display =
            'block';

        });

        container.appendChild(card);

    });

});

document.addEventListener('click', function(e){

    if(e.target.classList.contains('close')){
        document.getElementById('productModal').style.display =
        'none';
    }

});
