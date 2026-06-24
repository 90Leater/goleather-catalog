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
function updateStats(){

    const views =
    JSON.parse(
        localStorage.getItem(
            'productViews'
        )
    ) || {};

    const totalViews =
    Object.values(
        views
    ).reduce(
        (a,b) => a + b,
        0
    );

    const favorites =
    getFavorites();

    document.getElementById(
        'totalViews'
    ).textContent =
    totalViews;

    document.getElementById(
        'totalFavorites'
    ).textContent =
    favorites.length;

    document.getElementById(
        'totalSelected'
    ).textContent =
    selectedProducts.length;

}
