import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    increment,
    serverTimestamp,
    writeBatch
}
    from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

    import {
        getStorage,
        ref,
        uploadBytes,
        getDownloadURL,
        deleteObject
}
    from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

    const firebaseConfig = {
    apiKey: "AIzaSyDwpejFLs4uyMcd2-3_J4wq55NVfaas5ig",
    authDomain: "go-leather-ind.firebaseapp.com",
    projectId: "go-leather-ind",
    storageBucket: "go-leather-ind.firebasestorage.app",
    messagingSenderId: "771828187046",
    appId: "1:771828187046:web:46cff406fb2e5089c71967",
    measurementId: "G-TR754VP1QN"
  };

const app =
initializeApp(firebaseConfig);


export const db = getFirestore(app);

export const storage = getStorage(app);

export {
    doc,
    getDoc,
    getDocs,
    collection,
    query,
    where,
    orderBy,
    limit,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    increment,
    serverTimestamp,
    writeBatch,
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
};


    export async function trackProductView(productId){

    try{

    const productRef =
    doc(
        db,
        'productViews',
        String(productId)
);

    const snap =
    await getDoc(productRef);

    if(snap.exists()){

    await updateDoc(
        productRef,
    {
        views: increment(1)
    }
);            

    }else{

    await setDoc(
        productRef,
    {
        views: 1
    }
);

    }

    }catch(error){

        console.error(
            'Gagal menyimpan view produk:',
            error
        );

    }

};

    export async function getProductViews(productId){

    try{

    const productRef =
    doc(
        db,
        'productViews',
        String(productId)
    );

    const snap =
    await getDoc(productRef);

    if(
        snap.exists()
    ){

        return snap.data().views || 0;

    }

    return 0;

    }catch(error){

        console.error(
            'Gagal mengambil view produk:',
            error
        );

        return 0;

    }

};

    export async function getTopViewedProducts(){

    try{

    const snapshot =
    await getDocs(
        collection(
            db,
            'productViews'
        )
    );

    let topId = null;
    let maxViews = 0;

    snapshot.forEach(doc => {

        const data =
        doc.data();

        if(
        data.views > maxViews
        ){

            maxViews =
            data.views;

            topId =
            doc.id;

        }

    });

    return topId;

    }catch(error){

        console.error(
            'Gagal mengambil produk terpopuler:',
            error
        );

        return null;

    }

};

    export async function getTopProducts(total = 8){

try{

const snapshot =
await getDocs(
    query(
        collection(
            db,
            'productViews'
        ),
        orderBy(
            'views',
            'desc'
        ),
        limit(total)
    )
);

const items = [];

snapshot.forEach(doc => {

    items.push({

        id: doc.id,

        views:
        doc.data().views || 0

    });

});

return items;

}catch(error){

    console.error(
        'Gagal mengambil daftar produk terpopuler:',
        error
    );

    return [];

}

};
