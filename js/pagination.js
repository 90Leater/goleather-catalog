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

            const productSection =
            document.getElementById('products');

            window.scrollTo({
                top: productSection.offsetTop - 100,
                behavior: 'smooth'
            });

        });

            pagination.appendChild(btn);

        }

    }

function updateProductCount(
    filteredProducts
){

    const count =
    document.getElementById(
        'productCount'
    );

    if(!count) return;

    count.textContent =
    `Menampilkan ...`;

}
