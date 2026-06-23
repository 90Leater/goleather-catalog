function renderProducts(filteredProducts){

    container.innerHTML = '';

    updateProductCount(
        filteredProducts
    );

    const start =
    (currentPage - 1) *
    productsPerPage;

    const end =
    start + productsPerPage;

    const pageProducts =
    filteredProducts.slice(
        start,
        end
    );

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

                <p>
                    <b>Kode:</b>
                    ${product.kode}
                </p>

                <p>
                    ${product.kategori}
                </p>

                <label class="select-product">

                    <input
                    type="checkbox"
                    class="product-checkbox"
                    data-id="${product.id}"

                    ${selectedProducts.includes(product.id)
                    ? 'checked'
                    : ''}>

                    <span>
                        Pilih Produk
                    </span>

                </label>

                <button
                class="favorite-btn"
                data-id="${product.id}">

                    ♡ Favorit

                </button>

            </div>
        `;

        card.addEventListener(
            'click',
            (e) => {

                if(
                e.target.closest(
                '.select-product'
                )
                ){
                    return;
                }

                if(
                e.target.closest(
                '.favorite-btn'
                )
                ){
                    return;
                }

                const realIndex =
                products.findIndex(
                    p => p.id === product.id
                );

                openProduct(
                    product,
                    realIndex
                );

            }
        );

        const favBtn =
        card.querySelector(
            '.favorite-btn'
        );

        let favorites =
        getFavorites();

        if(
        favorites.includes(
        product.id
        )
        ){

            favBtn.classList.add(
                'active'
            );

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
            favorites.includes(
            product.id
            )
            ){

                favorites =
                favorites.filter(
                    id =>
                    id !== product.id
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

        const checkbox =
        card.querySelector(
            '.product-checkbox'
        );
        const selectLabel =
        card.querySelector(
        '.select-product'
        );

        selectLabel.addEventListener(
        'click',
        (e) => {

        e.stopPropagation();

});

        checkbox.addEventListener(
        'click',
        (e) => {

            e.stopPropagation();

        });

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

        });

        container.appendChild(
            card
        );

    });

}
