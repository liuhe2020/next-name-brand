// // THIS PAGE IS FOR MANUALLY ADDING NEW PRODUCTS TO FB FIRESTORE
// // TYPE IN PRODUCT DETAILS IN CODE BELOW
// // THEN GO TO /ADMIN PAGE AND CLICK ON BUTTONS TO FIRE THE FUNCTIONS

// import db from "../firebase";
// import firebase from "firebase";

// export default function Admin() {
//   //-----------------------------------------ADD PRODUCT-------------------------------------------
//   const add = () => {
//     db.collection("products")
//       .doc("categories")
//       .collection("wearables")
//       .doc("no_name_watch_3_pro")
//       .set({
//         name: "No Name Watch 3 Pro",
//         description:
//           "1.4” colour touchscreen, Personalized watch faces, Smart notifications, Real-time heart rate monitor. Intelligent activity tracker, 14 sport modes, IP68 Water resistant.",
//         image:
//           "https://firebasestorage.googleapis.com/v0/b/name-brand.appspot.com/o/wearables%2Fno_name_watch_3_pro.png?alt=media&token=7d3d3309-e429-4a69-84b2-8fef27a92ab3",
//         price: 179,
//         date_added: firebase.firestore.FieldValue.serverTimestamp(),
//       })
//       .then(() => {
//         console.log("Document successfully written!");
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
//   };

//   //-----------------------------------------COPY PRODUCT TO INDIVIDUAL PRODUCT COLLECTION-------------------------------------------
//   const copyToProductAll = async () => {
//     //get the product to be copied
//     const item = await db
//       .collection("products")
//       .doc("categories")
//       .collection("wearables") // <---- change category
//       .doc("no_name_watch_3_pro") // <---- change product ID
//       .get();

//     // copy the product
//     db.collection("products-all")
//       .doc(item.id)
//       .set({
//         name: item.data().name,
//         description: item.data().description,
//         image: item.data().image,
//         price: item.data().price,
//         date_added: firebase.firestore.FieldValue.serverTimestamp(),
//         category: "wearables", // <---- change category
//         keywords:
//           "wearables smartwatches smartbands wristbands wristwatches fitness monitors no name", //---- change keywords for search
//       })
//       .then(() => {
//         console.log("Document successfully written!");
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
//   };

//   //-----------------------------------------COPY PRODUCT-------------------------------------------
//   const copy = async () => {
//     //get the product to be copied
//     const item = await db
//       .collection("products")
//       .doc("categories")
//       .collection("audio") // <---- change category
//       .doc("no_name_slingshot_x") // <---- change product ID
//       .get();

//     // copy the product
//     db.collection("products")
//       .doc("categories")
//       .collection("feature-banner") // <---- change to new category
//       .doc(item.id)
//       .set({
//         name: item.data().name,
//         description: item.data().description,
//         image: item.data().image,
//         price: item.data().price,
//         date_added: firebase.firestore.FieldValue.serverTimestamp(),
//         type: "Tablet", // <---- change to new category
//       })
//       .then(() => {
//         console.log("Document successfully written!");
//       })
//       .catch((error) => {
//         console.error("Error writing document: ", error);
//       });
//   };

//   return (
//     <div className="grid place-items-center w-full h-88">
//       <button
//         className="w-40 h-10 bg-yellow-500 rounded-lg text-white"
//         onClick={add}
//       >
//         Add
//       </button>
//       <button
//         className="w-40 h-10 bg-yellow-500 rounded-lg text-white"
//         onClick={copyToProductAll}
//       >
//         Copy To Product-All
//       </button>
//       <button
//         className="w-40 h-10 bg-yellow-500 rounded-lg text-white"
//         onClick={copy}
//       >
//         Copy
//       </button>
//     </div>
//   );
// }
