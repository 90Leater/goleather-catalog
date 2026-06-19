const WA='6288973623416';
let allProducts=[];

fetch('data/products.json')
.then(r=>r.json())
.then(data=>{
  allProducts=data;
  populateColors();
  render(data);
});

function populateColors(){
  const colors=[...new Set(allProducts.map(p=>p.warna))];
  const select=document.getElementById('warnaFilter');
  colors.forEach(c=>{
    const o=document.createElement('option');
    o.value=c;o.textContent=c;
    select.appendChild(o);
  });
}

function render(items){
  const el=document.getElementById('products');
  el.innerHTML='';
  items.forEach(p=>{
    const msg=`Halo GO.Leather,%0A%0ASaya ingin menanyakan harga produk berikut:%0A%0AKode : ${p.kode}%0ANama : ${p.nama}%0AWarna : ${p.warna}%0A%0AMohon informasi harga dan ketersediaannya.`;
    el.innerHTML+=`
    <div class="card">
      <img loading="lazy" src="${p.gambar}" alt="${p.nama}">
      <div class="info">
        <h3>${p.nama}</h3>
        <p>Kode: ${p.kode}</p>
        <p>Warna: ${p.warna}</p>
        <button onclick="window.open('https://wa.me/${WA}?text=${msg}','_blank')">Tanya Harga</button>
      </div>
    </div>`;
  });
}

function filter(){
  const q=document.getElementById('search').value.toLowerCase();
  const warna=document.getElementById('warnaFilter').value;
  const result=allProducts.filter(p=>
    (p.nama.toLowerCase().includes(q)||p.kode.toLowerCase().includes(q)) &&
    (!warna || p.warna===warna)
  );
  render(result);
}

document.addEventListener('input',e=>{
 if(e.target.id==='search') filter();
});
document.addEventListener('change',e=>{
 if(e.target.id==='warnaFilter') filter();
});
