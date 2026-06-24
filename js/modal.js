function openProduct(product,index){

    saveRecent(product.id);

    trackProductView(
    product.id
    );

    renderTopProducts();

    renderRecentProducts();

    currentProductIndex = index;

    const url =
    new URL(
    window.location
    );

    url.searchParams.set(
    'id',
    product.id
    );

    window.history.replaceState(
    {},
    '',
    url
    );

    const imagePath =
    `Images/${product.folder}/${product.thumbnail}`;

    document.getElementById('modalImage').src =
    imagePath;

    document.getElementById('modalName').textContent =
    product.nama;

    document.title =
    product.nama +
    ' - Go Leather Catalog';

    const metaDescription = document.getElementById('metaDescription');

    if(metaDescription){

    metaDescription.content =
    product.nama +
    ' | Kode: ' +
    product.kode +
    ' | GO.Leather';

}

    document.getElementById('modalCode').textContent =
    'Kode: ' + product.kode;

    document.getElementById(
    'copyCodeBtn'
    ).onclick = () => {

    navigator.clipboard.writeText(
        product.kode
    );

    const btn =
    document.getElementById(
        'copyCodeBtn'
    );

    btn.textContent =
    '✅ Tersalin';

    setTimeout(() => {

        btn.textContent =
        '📋 Salin Kode';

    },2000);

};

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
    const addBtn =
document.getElementById(
'addToSelection'
);

if(
selectedProducts.includes(
product.id
)
){

    addBtn.textContent =
    '✅ Sudah Dipilih';

    addBtn.disabled = true;

}else{

    addBtn.textContent =
    '📋 Tambah ke Pilihan';

    addBtn.disabled = false;

}

addBtn.onclick = () => {

    if(
    selectedProducts.includes(
    product.id
    )
    ) return;

    selectedProducts.push(
        product.id
    );

    localStorage.setItem(
        'selectedProducts',
        JSON.stringify(
            selectedProducts
        )
    );

    updateCart();

    addBtn.textContent =
    '✅ Sudah Dipilih';

    addBtn.disabled = true;

};

    document.getElementById('prevProduct').disabled =
    (index === 0);

    document.getElementById('nextProduct').disabled =
    (index === products.length - 1);

    document.getElementById('productModal').style.display =
    'block';

}
    document
document
.querySelector('.close')
.addEventListener(
'click',
() => {

document.getElementById(
    'productModal'
).style.display = 'none';

document.title =
'GO.Leather Catalog';

const metaDescription =
document.getElementById(
    'metaDescription'
);

if(metaDescription){

    metaDescription.content =
    'Katalog produk GO.Leather';

}

const url =
new URL(
    window.location.href
);

url.searchParams.delete(
    'id'
);

window.history.replaceState(
    {},
    '',
    url.pathname
);

});

window.addEventListener(
'click',
(e) => {

const modal =
document.getElementById(
    'productModal'
);

if(
    e.target === modal
){

    modal.style.display =
    'none';

    document.title =
    'GO.Leather Catalog';

    const metaDescription =
    document.getElementById(
        'metaDescription'
    );

    if(metaDescription){

        metaDescription.content =
        'Katalog produk GO.Leather';

    }

    const url =
    new URL(
        window.location.href
    );

    url.searchParams.delete(
        'id'
    );

    window.history.replaceState(
        {},
        '',
        url.pathname
    );

}

});
