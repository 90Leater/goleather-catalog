const status =
document.getElementById(
'status'
);

document
.getElementById(
'startMigration'
)
.addEventListener(
'click',
async ()=>{

status.textContent =
'Memuat product.json...';

});
