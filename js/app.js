fetch('product.json')
.then(res => res.json())
.then(products => {

    const container = document.getElementById('products');
    const searchInput = document.getElementById('search');
    const kategoriFilter = document.getElementById('kategoriFilter');

    function renderProducts(filteredProducts) {

        container.innerHTML = '';
        document.getElementById('productCount').textContent =
        `Menampilkan ${filteredProducts.length} Produk`;

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

                    <a class="btn"
                       href="https://wa.me/6288973623416?text=Saya ingin tanya harga ${product.nama}"
                       target="_blank">
                       Tanya Harga
                    </a>

                </div>
            `;

            card.addEventListener('click', () => {

                const gallery =
                document.getElementById('galleryThumbs');

                gallery.innerHTML = '';

                if(product.warna){

                    Object.entries(product.warna).forEach(([namaWarna, file]) => {

                        const btn = document.createElement('button');

                        btn.className = 'color-btn';

                        btn.textContent = namaWarna;

                        btn.addEventListener('click', () => {

                        document.getElementById('modalImage').src =
                        `Images/${product.folder}/${file}`;

                        document.querySelectorAll('.color-btn').forEach(b => {
                            b.classList.remove('active');
                        });

                        btn.classList.add('active');

                    });

                    gallery.appendChild(btn);
                    if(gallery.children.length === 1){
                        btn.classList.add('active');
                    }

                });


    }

                document.getElementById('modalName').textContent =
                product.nama;

                document.getElementById('modalCode').textContent =
                'Kode: ' + product.kode;

                document.getElementById('modalCategory').textContent =
                product.kategori;

                document.getElementById('modalWhatsapp').href =
                `https://wa.me/6288973623416?text=Halo, saya ingin tanya harga:

                Produk : ${product.nama}
                Kode : ${product.kode}
                Kategori : ${product.kategori}`;

                document.getElementById('productModal').style.display =
                'block';

            });

            container.appendChild(card);

        });

    }

    renderProducts(products);

    function filterProducts(){

    const keyword =
    searchInput.value.toLowerCase();

    const kategori =
    kategoriFilter.value;

    const filtered = products.filter(product => {

        const cocokKeyword =
            product.nama.toLowerCase().includes(keyword) ||
            product.kode.toLowerCase().includes(keyword);

        const cocokKategori =
            kategori === '' ||
            product.kategori === kategori;

        return cocokKeyword && cocokKategori;

    });

    renderProducts(filtered);

}

    searchInput.addEventListener('input', filterProducts);

    kategoriFilter.addEventListener('change', filterProducts);

    })
    .catch(error => {
    console.error('Error:', error);
    });

    document.addEventListener('click', function(e){

    if(e.target.classList.contains('close')){
        document.getElementById('productModal').style.display =
        'none';
    }

});
