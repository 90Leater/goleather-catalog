fetch('product.json')
.then(res => res.json())
.then(products => {

    const container = document.getElementById('products');

    container.innerHTML = '';

    products.forEach(product => {

        const imagePath =
        `Images/${product.folder}/abu nude.jpg`;

        const card = `
        <div class="card">
            <img src="${imagePath}" alt="${product.nama}">

            <div class="card-body">

                <h3>${product.nama}</h3>

                <p>
                    <strong>Kode:</strong> ${product.kode}
                </p>

                <p>${product.kategori}</p>

                <a
                    class="btn"
                    href="https://wa.me/6288973623416?text=Saya ingin pesan ${product.nama}"
                    target="_blank"
                >
                    Tanya Harga
                </a>

            </div>
        </div>
        `;

        container.innerHTML += card;

    });

})
.catch(error => {
    console.error('Gagal membaca product.json', error);
});
