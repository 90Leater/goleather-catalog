async function renderTopProducts(){

const container =
document.getElementById(
    'topProductsList'
);

if(!container) return;

if(
typeof getTopProducts !==
'function'
){
    return;
}

container.innerHTML =
'<p class="top-products-message">Memuat produk terpopuler...</p>';

try{

const topProducts =
await getTopProducts(8);

container.innerHTML = '';

if(
topProducts.length === 0
){

    container.innerHTML =
    '<p class="top-products-message">Belum ada data produk populer</p>';

    return;

}

const fragment =
document.createDocumentFragment();

let renderedCount = 0;

topProducts.forEach(item => {

    const product =
    products.find(
        p =>
        String(p.id) ===
        String(item.id)
    );

    if(!product) return;

    const card =
    document.createElement(
        'div'
    );

    card.className =
    'top-product-card';

    card.innerHTML = `
        <img
        src="Images/${product.folder}/${product.thumbnail}"
        alt="${product.nama}"
        loading="lazy"
        decoding="async">

        <p>${product.nama}</p>

        <span>
        👀 ${item.views}x
        </span>
    `;

    card.addEventListener(
        'click',
        () => {

            const index =
            products.findIndex(
                p =>
                p.id === product.id
            );

            openProduct(
                product,
                index
            );

        }
    );

    fragment.appendChild(
        card
    );

    renderedCount++;

});

if(
renderedCount === 0
){

    container.innerHTML =
    '<p class="top-products-message">Belum ada data produk populer</p>';

    return;

}

container.appendChild(
    fragment
);

}catch(error){

    console.error(
        'Gagal menampilkan produk terpopuler:',
        error
    );

    container.innerHTML =
    '<p class="top-products-message">Produk terpopuler belum tersedia</p>';

}

}

function getMostViewedProduct(){

    const views =
    JSON.parse(
        localStorage.getItem(
            'productViews'
        )
    ) || {};

    let maxViews = 0;
    let topProductId = null;

    Object.entries(views)
    .forEach(([id,count]) => {

        if(count > maxViews){

            maxViews = count;
            topProductId = id;

        }

    });

    return topProductId;

}
