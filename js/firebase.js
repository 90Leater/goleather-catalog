import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    getDocs,
    collection,
    setDoc,
    updateDoc,
    increment
}
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

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

const db =
getFirestore(app);

window.db = db;
window.doc = doc;
window.getDoc = getDoc;
window.getDocs = getDocs;
window.collection = collection;
window.setDoc = setDoc;
window.updateDoc = updateDoc;
window.increment = increment;


window.trackProductView =
async function(productId){

    const ref =
    doc(
        db,
        'productViews',
        String(productId)
    );

    const snap =
    await getDoc(ref);

    if(snap.exists()){

        await updateDoc(
            ref,
            {
                views:
                increment(1)
            }
        );

    }else{

        await setDoc(
            ref,
            {
                views:1
            }
        );

    }

};
window.getProductViews =
async function(productId){

    const ref =
    doc(
        db,
        'productViews',
        String(productId)
    );

    const snap =
    await getDoc(ref);

    if(
        snap.exists()
    ){

        return snap.data().views || 0;

    }

    return 0;

};
window.getTopViewedProduct =
async function(){

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

};
window.getTopProducts =
async function(){

    const snapshot =
    await getDocs(
        collection(
            db,
            'productViews'
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

    return items.sort(
        (a,b) =>
        b.views - a.views
    ).slice(0,5);

};
