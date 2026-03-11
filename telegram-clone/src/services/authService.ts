import { createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { auth } from "./firebase";
import { createCometChatUser, loginCometChat, logoutCometChat } from "./cometchat";
import { signOut } from "firebase/auth";

export const register = async (email: string, password: string, avatar?: string) => {
    // Cria usuário no Firebase
    const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password);

    const uid = userCredential.user.uid;

    // Cria usuário no CometChat
    await createCometChatUser(uid, email);

    return userCredential.user;
}

export const login = async (email: string, password: string) => {
    // Login no Firebase
    const userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password);


    const uid = userCredential.user.uid;
    
    // Login no CometChat
    await loginCometChat(uid);

    return userCredential.user;
};

export const logout = async () => {
    await signOut(auth);
};