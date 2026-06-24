function trackProductView(productId){

    let views =
    JSON.parse(
        localStorage.getItem(
            'productViews'
        )
    ) || {};

    views[productId] =
    (views[productId] || 0) + 1;

    localStorage.setItem(
        'productViews',
        JSON.stringify(
            views
        )
    );

}

function getTopViewedProducts(){

    const views =
    JSON.parse(
        localStorage.getItem(
            'productViews'
        )
    ) || {};

    return Object.entries(
        views
    )
    .sort(
        (a,b) =>
        b[1] - a[1]
    )
    .slice(0,5);

}

function renderTopProducts(){

    const container =
    document.getElementById(
        'topProducts'
    );

    if(!container) return;

    container.innerHTML = '';

    const topProducts =
    getTopViewedProducts();

    topProducts.forEach(
    ([id,count]) => {

        const product =
        products.find(
            p =>
            String(p.id) ===
            String(id)
        );

        if(!product) return;

        const item =
        document.createElement(
            'div'
        );

        item.className =
        'selected-card';

        item.innerHTML = `
            <img
            src="Images/${product.folder}/${product.thumbnail}">

            <p>${product.nama}</p>

            <small>
                ${count}x dilihat
            </small>
        `;

        container.appendChild(
            item
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
async function renderTopProducts(){

    const container =
    document.getElementById(
        'topProductsList'
    );

    if(!container) return;

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
