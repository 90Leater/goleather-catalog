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

container.innerHTML = '';

const topProducts =
await getTopProducts();

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
        loading="lazy">

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

    container.appendChild(
        card
    );

});

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
