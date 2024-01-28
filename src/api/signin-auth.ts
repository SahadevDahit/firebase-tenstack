import { auth } from "@/utils/config";
import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    createUserWithEmailAndPassword
} from "firebase/auth";


const signIn = async (values: any) => {
    const { email, password } = values;
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        console.log(userCredential);
        alert("User sucessfully signed in");

    } catch (error: any) {
        const errorMessage = error?.message;
        console.log(errorMessage);
    }
};
const signup = async (values: any) => {
    const { email, password } = values;
    await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
            const user = userCredential.user;
            console.log(user);
            alert("User sucessfully signed up");

        })
        .catch((error: any) => {
            console.log(error);
        });
}
const googleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Google login error", error);
    }
};


const facebookLogin = async () => {
    try {
        const provider = new FacebookAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Facebook login success", result);
    } catch (error) {
        console.error("Facebook login error", error);
    }
};

const githubLogin = async () => {
    try {
        const provider = new GithubAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("GitHub login success", result);
    } catch (error) {
        console.error("GitHub login error", error);
    }
};

const twitterLogin = async () => {
    try {
        const provider = new TwitterAuthProvider();
        const result = await signInWithPopup(auth, provider);
        console.log("Twitter login success", result);
    } catch (error) {
        console.error("Twitter login error", error);
    }
};


export { twitterLogin, facebookLogin, githubLogin, googleLogin, signIn, signup }