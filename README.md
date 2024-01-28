# steps to be consider
1. clone the repository
2. inside utils/config.ts, replace with your firebase keys
 const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};
3. ![rule](https://github.com/SahadevDahit/firebase-tenstack/assets/81854544/233e4d20-9a58-4f8c-be76-e10a66c242f9)
   include delete as well inside your firestore rules to delete your documents 
4. For proper social authentication like email, google, facebook, github, twitter, add the proper valid key with permission in your app
5. Then run npm run dev
