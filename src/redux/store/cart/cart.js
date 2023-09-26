import { collection, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { auth, fireStore } from "../../../firebase/firebaseConfig.js";

export const addToCartInFirestore = async (product) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("Usuario no autenticado.");
    return;
  }

  try {
    const userCartCollection = collection(fireStore, 'users', user.uid, 'cart');
    const docRef = doc(userCartCollection, product.id.toString());
    await setDoc(docRef, product);
  } catch (error) {
    console.error("Error al agregar al carrito en Firestore:", error);
  }
};

export const removeFromCartInFirestore = async (productId) => {
  const user = auth.currentUser;

  if (!user) {
    console.error("Usuario no autenticado.");
    return;
  }

  try {
    const userCartCollection = collection(fireStore, 'users', user.uid, 'cart');
    const docRef = doc(userCartCollection, productId.toString());
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error al eliminar del carrito en Firestore:", error);
  }
};
