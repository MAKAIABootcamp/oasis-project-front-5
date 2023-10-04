import { collection, doc, getDoc, getDocs, orderBy, query, setDoc,  where } from "firebase/firestore";
import { fireStore } from "../firebase/firebaseConfig";

const collectionName = "users";

export const getUserFromCollection = async (uid) => {
    try {
        const userRef = doc(fireStore, collectionName, uid);
        const user = await getDoc(userRef);
        if (user.exists()) {
            return {
                id: user.id,
                ...user.data()
            }
        } else {

            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const createAnUserInCollection = async (uid, newUser) => {
    try {
        const newUserRef = doc(fireStore, collectionName, uid);
        await setDoc(newUserRef, newUser);
        return {
            ok: true,
            user: {
                id: uid,
                ...newUser
            }
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const searchDoc = async ({ collectionName, fieldName, searchTerm }) => {   

    const collectionRef = collection(fireStore, collectionName);
    const q = query(collectionRef, where(fieldName, ">=", searchTerm), where(fieldName, "<=", searchTerm + '\uf8ff'), orderBy(fieldName));    
    const result = []
    try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            result.push({
                id: doc.id,
                ...doc.data()
            })
        });
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}