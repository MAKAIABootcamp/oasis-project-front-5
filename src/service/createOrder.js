import { collection, addDoc } from 'firebase/firestore';
import { fireStore} from "../firebase/firebaseConfig";

const createOrder = async (orderData) => {
    try {
      const ordersCollection = collection(fireStore, 'orders');
      await addDoc(ordersCollection, orderData);
      return true; // La orden se creó con éxito
    } catch (error) {
      console.error("Error al crear la orden:", error);
      return false; // Error al crear la orden
    }
  };
  
  export default createOrder;

