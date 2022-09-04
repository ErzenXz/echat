// const db = firebase.firestore();
// let roomNameOLD = "publicroom";
// let roomName = roomNameOLD.replace(/\s+/g, "");

// function sendMessage(message){
//     db.collection('rooms').doc(roomName).collection('chats').add({
//     "message": message,
//     "time": new Date()
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });
// }


// let uuid = "skjfajsds938983jdfs";

// function createRoom(name) {

//         // Create the room
//         var t = new Date();
//         let time = t.getDate() + " " + t.getMonth() + " " + t.getFullYear();

//         let realName = "Test room";



//         db.collection("rooms").doc(roomName).set({
//             owner: uuid,
//             time: time,
//             joins: 0,
//             roomRealName: realName
//         })
// }

// newQuery.get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.id, " => ", doc.data());
//         let postKey = doc.id;
//         roomID.push(postKey);
//     });
// });