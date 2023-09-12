import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { setItemsAndCategory } from './productsReducer'; 

export const fetchItems = (category) => {
  return async (dispatch) => {
    const db = getFirestore();
    const itemsCollection = collection(db, 'items');
    const q = category ? query(itemsCollection, where('genre', '==', category)) : itemsCollection;

    try {
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());

      console.log('Productos cargados:', items);
      console.log('Categoría seleccionada', category);
   
     dispatch(setItemsAndCategory({ items, selectedCategory: category }));
    } catch (error) {
      console.error(error);
    
    }
  };
};
