import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, fireStore } from "../../../firebase/firebaseConfig.js";

export const addToFavoritesInFirestore = async (product) => {
  const user = auth.currentUser;

  if (!user) {

    console.error("Usuario no autenticado.");
    return;
  }

  try {
    const userFavoritesCollection = collection(fireStore, 'users', user.uid, 'favorites');
    const docRef = doc(userFavoritesCollection, product.id.toString());
    await setDoc(docRef, product);
  } catch (error) {
    console.error("Error al agregar a favoritos en Firestore:", error);
  }
};

export const removeFromFavoritesInFirestore = async (productId) => {
  const user = auth.currentUser;

  if (!user) {

    console.error("Usuario no autenticado.");
    return;
  }

  try {
    const userFavoritesCollection = collection(fireStore, 'users', user.uid, 'favorites');
    const docRef = doc(userFavoritesCollection, productId.toString());
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar de favoritos en Firestore:", error);
  }
};
