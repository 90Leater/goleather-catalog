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

            <label class="select-product">

                <input
                type="checkbox"
                class="product-checkbox"
                data-id="${product.id}"
                ${selectedProducts.includes(product.id)
                ? 'checked'
                : ''}>

                <span>Pilih Produk</span>

            </label>
        `;

        card.addEventListener('click', (e) => {

            if(
                e.target.closest('.select-product')
            ){
                return;
            }

            const index =
            products.findIndex(
                p => p.id === product.id
            );

            openProduct(
                product,
                index
            );

        });

        container.appendChild(card);

        const checkbox =
        card.querySelector(
            '.product-checkbox'
        );

        checkbox.addEventListener(
            'click',
            (e) => {

                e.stopPropagation();

            }
        );

        checkbox.addEventListener(
            'change',
            () => {

                if(
                    checkbox.checked
                ){

                    if(
                    !selectedProducts.includes(
                    product.id
                    )
                    ){

                        selectedProducts.push(
                            product.id
                        );

                    }

                }else{

                    selectedProducts =
                    selectedProducts.filter(
                        id =>
                        id !== product.id
                    );

                }

                updateCart();

            }
        );

    });

}
