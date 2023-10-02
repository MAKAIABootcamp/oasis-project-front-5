export const createAnItemInCollection = async (uid, newItem) => {
    try {
        const newItemRef = doc(fireStore, collectionName, uid);
        await setDoc(newItemRef, newItem);
        return {
            ok: true,
            item: {
                id: uid,
                ...newItem
            }
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}