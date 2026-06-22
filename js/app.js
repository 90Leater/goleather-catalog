fetch('product.json')
.then(res => res.json())
.then(products => {

    const container = document.getElementById('products');
    const searchInput = document.getElementById('search');
    const pagination = document.getElementById('pagination');

    let currentPage = 1;
    let currentProductIndex = 0;

    const productsPerPage = 10;

    function openProduct(product,index){

    currentProductIndex = index;

    const imagePath =
    `Images/${product.folder}/${product.thumbnail}`;

    document.getElementById('modalImage').src =
    imagePath;

    document.getElementById('modalName').textContent =
    product.nama;

    document.getElementById('modalCode').textContent =
    'Kode: ' + product.kode;

    document.getElementById('modalCategory').textContent =
    product.kategori;

    document.getElementById('modalWhatsapp').href =
    `https://wa.me/6288973623416?text=Saya ingin pesan ${product.nama}`;

    const gallery =
    document.getElementById('galleryThumbs');

    gallery.innerHTML = '';

    if(product.warna){

        Object.entries(product.warna)
        .forEach(([namaWarna,file]) => {

            const btn =
            document.createElement('button');

            btn.className =
            'color-btn';

            btn.textContent =
            namaWarna;

            btn.addEventListener('click', () => {

                document.getElementById('modalImage').src =
                `Images/${product.folder}/${file}`;

                document
                .querySelectorAll('.color-btn')
                .forEach(b =>
                    b.classList.remove('active')
                );

                btn.classList.add('active');

            });

            gallery.appendChild(btn);

        });

        const firstBtn =
        gallery.querySelector('.color-btn');

        if(firstBtn){
            firstBtn.classList.add('active');
        }

    }

    document.getElementById('prevProduct').disabled =
    (index === 0);

    document.getElementById('nextProduct').disabled =
    (index === products.length - 1);

    document.getElementById('productModal').style.display =
    'block';

}

    function renderProducts(filteredProducts){

        container.innerHTML = '';

        const start =
        (currentPage - 1) * productsPerPage;

        const end =
        start + productsPerPage;

        const pageProducts =
        filteredProducts.slice(start,end);

        pageProducts.forEach(product => {

            const imagePath =
            `Images/${product.folder}/${product.thumbnail}`;

            const card =
            document.createElement('div');

            card.className = 'card';

            card.innerHTML = `
                <img src="${imagePath}" alt="${product.nama}">
                <div class="card-body">

                    <h3>${product.nama}</h3>

                    <p><b>Kode:</b> ${product.kode}</p>

                    <p>${product.kategori}</p>

                </div>
            `;

            card.addEventListener('click', () => {

    const realIndex =
    products.findIndex(
        p => p.id === product.id
    );

    openProduct(product, realIndex);

            });

            container.appendChild(card);

        });

    }

    function renderPagination(filteredProducts){

        pagination.innerHTML = '';

        const totalPages =
        Math.ceil(
            filteredProducts.length /
            productsPerPage
        );

        for(let i=1;i<=totalPages;i++){

            const btn =
            document.createElement('button');

            btn.textContent = i;

            if(i === currentPage){
                btn.classList.add('active');
            }

            btn.addEventListener('click', () => {

                currentPage = i;


                renderProducts(filteredProducts);

                renderPagination(filteredProducts);

                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

            });

            pagination.appendChild(btn);

        }

    }

    function filterProducts(){

        const keyword =
        searchInput.value.toLowerCase();

        const filtered =
        products.filter(product =>

            product.nama.toLowerCase()
            .includes(keyword)

            ||

            product.kode.toLowerCase()
            .includes(keyword)

        );

        currentPage = 1;

        renderProducts(filtered);

        renderPagination(filtered);

    }

    searchInput.addEventListener(
        'input',
        filterProducts
    );
    document
    .getElementById('prevProduct')
    .addEventListener('click', () => {

    if(currentProductIndex > 0){

        currentProductIndex--;

        openProduct(
            products[currentProductIndex],
            currentProductIndex
        );

    }

});

document
.getElementById('nextProduct')
.addEventListener('click', () => {

    if(currentProductIndex < products.length - 1){

        currentProductIndex++;

        openProduct(
            products[currentProductIndex],
            currentProductIndex
        );

    }

});

    renderProducts(products);

    renderPagination(products);

});

document.addEventListener('click', function(e){

    if(e.target.classList.contains('close')){

        document.getElementById('productModal')
        .style.display = 'none';

    }

});
