const modal =
document.getElementById(
'productModal'
);

const closeButton =
document.getElementById(
'closeModal'
);

const addButton =
document.getElementById(
'addProduct'
);

addButton.addEventListener(
'click',
openModal
);

closeButton.addEventListener(
'click',
closeModal
);

export function openModal(){

modal.classList.remove(
'hidden'
);

}

export function closeModal(){

modal.classList.add(
'hidden'
);

}
