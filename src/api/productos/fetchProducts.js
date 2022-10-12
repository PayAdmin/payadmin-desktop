// Dependencias.
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firebaseApp, firebaseAuth, firestore } from "../../firebase/index.js";
import Collections from "../../firebase/config/collections.js";

// Definición...
const fetchProducts = async () => {
  console.log("[] API HANDLER: fetchProducts");
  return new Promise(async (resolve, reject) => {
    try {
      const user = firebaseAuth.currentUser;

      if (user) {
        const userId = user.uid;

        // Consulta a la base de datos.
        const userDoc = doc(firestore, Collections.usuarios, userId);
        const userSnapshot = await getDoc(userDoc);
        const userData = userSnapshot.data();

        const tiendaId = userData.tiendaId;
        let listaProductos = [];

        const productoPath = `${Collections.productos}/${tiendaId}/${Collections.producto}`;
        const productoRef = collection(firestore, productoPath);

        const productoDocs = await getDocs(productoRef);
        productoDocs.forEach((documento) => {
          if (documento.exists()) {
            const producto = documento.data();
            listaProductos.push(producto);
          }
        });

        resolve(listaProductos);
      } else {
        reject();
      }
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

// Exportación.
export default fetchProducts;
