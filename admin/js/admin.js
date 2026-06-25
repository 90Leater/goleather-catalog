import '../../firebase.js';

import './import.js';
import './products.js';
import './categories.js';
import './upload.js';
import './auth.js';

console.log('GO.Leather Admin Loaded');

document
.getElementById(
'addProduct'
)
.addEventListener(
'click',
()=>{

alert(
'Fitur Tambah Produk segera dibuat.'
);

}
);

document
.getElementById(
'importJson'
)
.addEventListener(
'click',
importProducts);
