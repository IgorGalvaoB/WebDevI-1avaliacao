// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATuAItvzsL9Bmia1HBnk-8TqJljasyX-o",
  authDomain: "projeto-2---web1.firebaseapp.com",
  projectId: "projeto-2---web1",
  storageBucket: "projeto-2---web1.appspot.com",
  messagingSenderId: "683984012468",
  appId: "1:683984012468:web:bb32e562d6c3a3d8fe83e1",
  measurementId: "G-ZJ8RXF01WJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };
