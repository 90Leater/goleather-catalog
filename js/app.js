fetch('product.json')
.then(res => res.json())
.then(products => {

    const container = document.getElementById('products');
    const searchInput = document.getElementById('search');
    const pagination = document.getElementById('pagination');
    const productCount = document.getElementById('productCount');
    const kategoriFilter = document.getElementById('kategoriFilter');
    const sortFilter = document.getElementById('sortFilter');

    let currentPage = 1;
    let currentView = 'all';
    let currentProductIndex = 0;
    let selectedColor = '';

    const productsPerPage = 10;
    function updateProductCount(filteredProducts){

    const start =
    (currentPage - 1) * productsPerPage + 1;

    const end =
    Math.min(
        currentPage * productsPerPage,
        filteredProducts.length
    );

    productCount.textContent =
    `Menampilkan ${start}-${end} dari ${filteredProducts.length} produk`;

}
    
    function loadCategories(){

    const categories =
    [...new Set(
        products.map(
            product => product.kategori
        )
    )];

    kategoriFilter.innerHTML =
    '<option value="">Semua Kategori</option>';

    categories.forEach(category => {

        const option =
        document.createElement('option');

        option.value =
        category;

        option.textContent =
        category;

        kategoriFilter.appendChild(option);

    });

}

    function renderRecentProducts(){

    const container =
    document.getElementById('recentProducts');

    if(!container) return;

    container.innerHTML = '';

    const recent =
    JSON.parse(
        localStorage.getItem('recentProducts')
    ) || [];

    recent.forEach(id => {

        const product =
        products.find(
            p => String(p.id) === String(id)
        );

        if(!product) return;

        const card =
        document.createElement('div');

        card.className =
        'recent-card';

        card.innerHTML = `
            <img
            src="Images/${product.folder}/${product.thumbnail}"
            loading="lazy">

            <p>${product.nama}</p>
        `;

        card.addEventListener('click', () => {

            const index =
            products.findIndex(
                p => p.id === product.id
            );

            openProduct(product,index);

        });

        container.appendChild(card);

    });

}

function openProduct(product,index){

    saveRecent(product.id);

    renderRecentProducts();

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
    const relatedContainer =
document.getElementById('relatedProducts');

relatedContainer.innerHTML = '';

const relatedProducts =
products.filter(p =>

    p.kategori === product.kategori &&
    p.id !== product.id

).slice(0,4);

relatedProducts.forEach(item => {

    const related =
    document.createElement('div');

    related.className =
    'related-item';

    const relatedImage =
    `Images/${item.folder}/${item.thumbnail}`;

    related.innerHTML = `
        <img
            src="${relatedImage}"
            alt="${item.nama}"
            loading="lazy">
        <span>${item.nama}</span>
    `;

    related.addEventListener('click', () => {

        const index =
        products.findIndex(
            p => p.id === item.id
        );

        openProduct(item,index);

    });

    relatedContainer.appendChild(related);

});
    document
.getElementById('shareProduct')
.onclick = async () => {

    const shareText =
`Lihat produk ${product.nama}

Kode: ${product.kode}

Website:
${window.location.href}`;

    if(navigator.share){

        try{

            await navigator.share({

                title: product.nama,

                text: shareText,

                url: window.location.href

            });

        }catch(err){}

    }else{

        navigator.clipboard.writeText(
            shareText
        );

        alert(
            'Link produk berhasil disalin'
        );

    }

};
    document.getElementById('modalWhatsapp').onclick = () => {

    const pesan =
    `Halo GO.Leather

    Saya ingin tanya harga:

    Produk : ${product.nama}
    Kode : ${product.kode}
    Warna : ${selectedColor}`;

    window.open(
        `https://wa.me/6288973623416?text=${encodeURIComponent(pesan)}`,
        '_blank'
    );

};

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

            btn.textContent = namaWarna;
            if(file === product.thumbnail){

            btn.classList.add('active');

            selectedColor = namaWarna;

            }

            btn.addEventListener('click', () => {

            selectedColor = namaWarna;

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

    }

    document.getElementById('prevProduct').disabled =
    (index === 0);

    document.getElementById('nextProduct').disabled =
    (index === products.length - 1);

    document.getElementById('productModal').style.display =
    'block';

}
    function getFavorites(){

        return JSON.parse(
            localStorage.getItem('favorites')
        ) || [];

    }

    function saveFavorites(favorites){

        localStorage.setItem(
            'favorites',
            JSON.stringify(favorites)
        );

    }
    function saveRecent(productId){

    let recent =
    JSON.parse(
        localStorage.getItem('recentProducts')
    ) || [];

    recent =
    recent.filter(
        id => id !== productId
    );

    recent.unshift(productId);

    recent = recent.slice(0,8);

    localStorage.setItem(
        'recentProducts',
        JSON.stringify(recent)
    );

}
    function updateFavoriteCount(){

    const count =
    getFavorites().length;

    document
    .getElementById('favoriteCount')
    .textContent = count;

}
    function renderProducts(filteredProducts){

        container.innerHTML = '';
        updateProductCount(filteredProducts);

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
                <img
                    src="${imagePath}"
                    alt="${product.nama}"
                    loading="lazy">
                <div class="card-body">

                    <h3>${product.nama}</h3>

                    <p><b>Kode:</b> ${product.kode}</p>

                    <p>${product.kategori}</p>
                <button
                class="favorite-btn"
                data-id="${product.id}">
                ♡ Favorit
                </button>

                </div>
            `;

            card.addEventListener('click', () => {

    const realIndex =
    products.findIndex(
        p => p.id === product.id
    );

    openProduct(product, realIndex);

            });
            const favBtn =
card.querySelector('.favorite-btn');

let favorites =
getFavorites();

if(
favorites.includes(product.id)
){

    favBtn.classList.add('active');

    favBtn.textContent =
    '❤️ Favorit';

}

favBtn.addEventListener(
'click',
(e) => {

    e.stopPropagation();

    let favorites =
    getFavorites();

    if(
    favorites.includes(product.id)
    ){

        favorites =
        favorites.filter(
            id => id !== product.id
        );

        favBtn.classList.remove(
        'active'
        );

        favBtn.textContent =
        '♡ Favorit';

    }else{

        favorites.push(
        product.id
        );

        favBtn.classList.add(
        'active'
        );

        favBtn.textContent =
        '❤️ Favorit';

    }

    saveFavorites(
    favorites
    );
    updateFavoriteCount();

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

    const kategori =
    kategoriFilter.value;

    const filtered =
    products.filter(product => {

        const cocokKeyword =

            product.nama
            .toLowerCase()
            .includes(keyword)

            ||

            product.kode
            .toLowerCase()
            .includes(keyword);

        const cocokKategori =

            kategori === ''

            ||

            product.kategori === kategori;
        const favorites =
        getFavorites();

        const cocokFavorit =

            currentView === 'all'

            ||

            favorites.includes(
                product.id
            );

        return cocokKeyword &&
               cocokKategori &&
               cocokFavorit;

    });

    currentPage = 1;
    if(sortFilter.value === 'az'){

    filtered.sort((a,b) =>
        a.nama.localeCompare(b.nama)
    );

}

if(sortFilter.value === 'za'){

    filtered.sort((a,b) =>
        b.nama.localeCompare(a.nama)
    );

}

    renderProducts(filtered);

    renderPagination(filtered);

}

    searchInput.addEventListener(
        'input',
        filterProducts
    );
    kategoriFilter.addEventListener(
    'change',
    filterProducts
    );
    sortFilter.addEventListener(
    'change',
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
.getElementById('showAll')
.addEventListener('click', () => {

    currentView = 'all';

    document
    .getElementById('showAll')
    .classList.add('active');

    document
    .getElementById('showFavorites')
    .classList.remove('active');
    filterProducts();

});

document
.getElementById('showFavorites')
.addEventListener('click', () => {

    currentView = 'favorites';

    document
    .getElementById('showFavorites')
    .classList.add('active');

    document
    .getElementById('showAll')
    .classList.remove('active');

    filterProducts();

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

    loadCategories();
    currentView = 'all';

    document
    .getElementById('showAll')
    .classList.add('active');

    document
    .getElementById('showFavorites')
    .classList.remove('active');
    
    renderRecentProducts();

    renderProducts(products);

    renderPagination(products);

});
window.addEventListener('scroll', () => {

    const btn =
    document.getElementById('backToTop');

    if(window.scrollY > 300){

        btn.style.display =
        'block';

    }else{

        btn.style.display =
        'none';

    }

});

document
.getElementById('backToTop')
.addEventListener('click', () => {

    window.scrollTo({

        top:0,

        behavior:'smooth'

    });

});

document.addEventListener('click', function(e){

    if(e.target.classList.contains('close')){

        document.getElementById('productModal')
        .style.display = 'none';

    }

});
const themeToggle =
document.getElementById(
'themeToggle'
);

const savedTheme =
localStorage.getItem(
'theme'
);

if(savedTheme === 'dark'){

    document.body.classList.add(
    'dark'
    );

    themeToggle.textContent =
    '☀️ Light Mode';

}

themeToggle.addEventListener(
'click',
() => {

    document.body.classList.toggle(
    'dark'
    );

    if(
    document.body.classList.contains(
    'dark'
    )
    ){

        localStorage.setItem(
        'theme',
        'dark'
        );

        themeToggle.textContent =
        '☀️ Light Mode';

    }else{

        localStorage.setItem(
        'theme',
        'light'
        );

        themeToggle.textContent =
        '🌙 Dark Mode';

    }
    if ('serviceWorker' in navigator) {

    navigator.serviceWorker
    .register('./sw.js')
    .then(() => {
        console.log('Service Worker Registered');
    });

}

});
