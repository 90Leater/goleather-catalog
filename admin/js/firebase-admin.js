import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    getDocs,
    onSnapshot,
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
    runTransaction
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
    onSnapshot,
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
    deleteObject,
    runTransaction
};
