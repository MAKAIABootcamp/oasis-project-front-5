import { auth } from "../../../firebase/firebaseConfig";
import { setError, setIsLogged, setUserLogged } from "./authReducer";
import {
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile,
    signInWithEmailAndPassword,
} from 'firebase/auth';
import loginFromFirestore from "../../../service/loginFromCollection";
import { createAnUserInCollection, getUserFromCollection } from "../../../service/getUser";

export const loginWithCode = (code) => {
    return async (dispatch) => {
        const confirmationResult = window.confirmationResult;
        try {
            confirmationResult.confirm(code).then((result) => {
                const user = result.user.auth.currentUser;
                const authUser = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    phoneNumber: user.phoneNumber,
                    email: user.email,
                    address: user.address, 
                    accessToken: user.accessToken
                }
                console.log(user);
                dispatch(setUserLogged(authUser));
                dispatch(setIsLogged(true));
                dispatch(setError(false));
            })
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message,
                login: 'en el inicio de sesión'
            }))
        }
    }
}

export const login = () => {
    const provider = new GoogleAuthProvider();
    return async (dispatch) => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log("respuesta de google", userCredential);
            const { user } = userCredential;
            const { user: userLogged, error } = await loginFromFirestore(user);
            if (userLogged) {

                dispatch(setUserLogged(userLogged));
                dispatch(setIsLogged(true));
                dispatch(setError(false));
            } else {
                dispatch(setError({
                    error: true,
                    login: 'en el inicio de sesión',
                    ...error
                }))
            }
        } catch (error) {
            console.log("error", error.error);
            dispatch(setError({
                error: true,
                code: error.code,
                login: 'en el inicio de sesión',
                message: error.message
            }))
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.removeItem('favorites');
            await signOut(auth)
            dispatch(setUserLogged(null));
            dispatch(setIsLogged(false));
            dispatch(setError(null));
        } catch (error) {
            console.log("error", error.error);
            dispatch(
              setError({
                error: true,
                code: error.code,
                login: "en el cierre de sesión",
                message: error.message,
              })
            );
        }
    };
}

export const createAnUser = (newUser) => {
    return async (dispatch) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            await updateProfile(auth.currentUser, {
                displayName: newUser.displayName, photoURL: newUser.photoURL,
            });
            const createdUser = await createAnUserInCollection(user.uid, {...newUser, role:'client'});
            console.log("respuesta firebase", user);
            console.log("respuesta firestore", createdUser);
            dispatch(setUserLogged(createdUser.user));
            dispatch(setIsLogged(true));
            dispatch(setError(false));
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message,
                login: 'en el inicio de sesión'
            }))
        }
    }
}

export const loginWithEmailAndPassword = (loggedUser) => {
    return async(dispatch) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, loggedUser.email, loggedUser.password)
            const foundUser = await getUserFromCollection(user.uid);
            console.log("respuesta firebase", user);
            console.log("respuesta firestore", foundUser);
            dispatch(setError(false));
            dispatch(setUserLogged(foundUser));
            dispatch(setIsLogged(true));
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message,
                login: 'en el inicio de sesión'
            }))
        }
    }
}

export const getUserActionFromCollection = (uid) => {
    return async (dispatch) => {
        try {
            const userLogged = await getUserFromCollection(uid);
            console.log(userLogged);
            dispatch(setUserLogged(userLogged));
            dispatch(setIsLogged(true));
            dispatch(setError(null));
        } catch (error) {
            console.log(error);
            dispatch(setError({
                error: true,
                code: error.code,
                message: error.message            
            }))
        }
    }
}