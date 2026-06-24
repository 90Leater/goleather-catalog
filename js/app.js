let products = [];

let currentPage = 1;
let currentView = 'all';
let currentProductIndex = 0;
let selectedColor = '';

const productsPerPage = 10;

const container = document.getElementById('products');

const pagination = document.getElementById('pagination');

const productCount = document.getElementById('productCount');

const searchInput = document.getElementById('search');

const kategoriFilter = document.getElementById('kategoriFilter');

const sortFilter = document.getElementById('sortFilter');

fetch('product.json')
.then(res => res.json())
.then(data => {

    products = data;

    loadCategories();

    renderProducts(products);

    renderPagination(products);

    updateFavoriteCount();

    updateCart();

    updateStats();

    renderTopProducts();
    
    renderSelectedProducts();

    const params =
new URLSearchParams(
    window.location.search
);

const productId =
params.get('id');

if(productId){

    const product =
    products.find(
        p =>
        String(p.id) ===
        String(productId)
    );

    if(product){

        const index =
        products.findIndex(
            p =>
            p.id ===
            product.id
        );

        openProduct(
            product,
            index
        );

    }

}

});
