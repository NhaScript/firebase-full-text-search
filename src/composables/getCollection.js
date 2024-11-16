import { collection, query, getDocs } from "firebase/firestore";
import { projectFirestore } from "@/firebase/config";
import { onMounted, ref, watchEffect } from "vue";

export const getCollectionQuery = (collectionName, whereDoc) => {
  const collectionRef = collection(projectFirestore, collectionName);
  const documents = ref([]);
  const isLoading = ref(true)

  // Create a query based on whereDoc (if provided)
  let queryRef = collectionRef;
  if (whereDoc) {
    queryRef = query(collectionRef, ...whereDoc);
  }

  const unsubscribe = async () => {
    try {
        const snapshot = await getDocs(queryRef);
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        documents.value = data;
        console.log(documents.value)
      } catch (error) {
        console.error("Error in getCollectionQuery:", error);
    }finally{
        isLoading.value = false
    }
  }

  onMounted(() => {
    unsubscribe()
  })
  
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsubscribe());
  });

  return {
    documents,
    isLoading
  };
};
