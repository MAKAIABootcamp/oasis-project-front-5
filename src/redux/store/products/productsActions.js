import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { setItemsAndCategory, setSelectedCategory } from './productsReducer'; 

export const fetchItems = (category) => {
  return async (dispatch) => {
    const db = getFirestore();
    const itemsCollection = collection(db, 'items');

    let q;

    if (category && category !== 'Todo' ) {
      q = query (itemsCollection, where ('genre', '==', category));
    } else {
      q = itemsCollection
    }

    try {
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((doc) => doc.data());
  
   
    dispatch(setItemsAndCategory({ items, selectedCategory: category }));
    dispatch(setSelectedCategory(category));
    } catch (error) {
      console.error(error);
    
    }
  };
};
