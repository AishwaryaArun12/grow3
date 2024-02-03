import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

    const firebaseConfig = {
        apiKey: "AIzaSyBz9DbkdLKIF5JnUzIJuPoO3GiX6YXWFgY",
        authDomain: "grow3-408614.firebaseapp.com",
        projectId: "grow3-408614",
        storageBucket: "grow3-408614.appspot.com",
        messagingSenderId: "201831658510",
        appId: "1:201831658510:web:cb8d716ee0090847f1785f",
        measurementId: "G-TR24D5EZQS"
      };

      
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app); // Initialize the authentication service
      const db = getFirestore(app);
      const storage = getStorage(app);
      export  { auth,db,storage };
