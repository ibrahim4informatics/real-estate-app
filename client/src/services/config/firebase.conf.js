import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyBhD6pcj_r9pDCys2YAdlCyUxqbNaIKyGk",
    authDomain: "mern-chat-app-8dac9.firebaseapp.com",
    projectId: "mern-chat-app-8dac9",
    storageBucket: "mern-chat-app-8dac9.appspot.com",
    messagingSenderId: "439666529521",
    appId: "1:439666529521:web:7ea4deae8d7addcfad0550",
    measurementId: "G-W4Z98Z8B6Y"
};


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)