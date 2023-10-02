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

      console.log('Productos cargados:', items);
      console.log('Categoría seleccionada', category);
   
   
    dispatch(setItemsAndCategory({ items, selectedCategory: category }));
    dispatch(setSelectedCategory(category));
    } catch (error) {
      console.error(error);
    
    }
  };
};

export const createAnItem = (newItem) => {
  return async (dispatch) => {
      try {
          const createdItem = await createAnItemInCollection(item.uid, {...newItem, state:'enRevision'});
          console.log("respuesta firebase", item);
          console.log("respuesta firestore", createdItem);
      } catch (error) {
          console.log(error);
          dispatch(setError({
              error: true,
              code: error.code,
              message: error.message,
          }))
      }
  }
}

