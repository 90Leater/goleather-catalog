import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
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
window.setDoc = setDoc;
window.updateDoc = updateDoc;
window.increment = increment;
