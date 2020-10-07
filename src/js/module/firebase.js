import * as firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBmrFlz3jYKxOModg8V5CQu_NmfO18tUn0",
  authDomain: "artem-pronenko-coursework.firebaseapp.com",
  databaseURL: "https://artem-pronenko-coursework.firebaseio.com",
  projectId: "artem-pronenko-coursework",
  storageBucket: "artem-pronenko-coursework.appspot.com",
  messagingSenderId: "159186888442",
  appId: "1:159186888442:web:b07589a08983ce00698b43"
}

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore()


export const func = () => {
  // db.collection('goods').add({
  //   name: 'Pixel 3',
  //   price: 3000,
  //   color: 'white'
  // }).then(docRef => {
  //   console.log("Document written with ID: ", docRef.id);
  // }).catch(error => {
  //   console.error("Error adding document: ", error);
  // })

  db.collection('goods').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log()
      advantages.textContent += JSON.stringify(doc.data())
    });
  })

}


const getGoods = (collection = 'goods') => {
  db.collection('goods')
    .get()
    .then(querySnapshot => {
      outDoc(querySnapshot)
    })

}

const out = document.querySelector('.out')
const outDoc = (data) => {
  data.forEach(doc => {
    renderCard(doc.data())
  })

}

const renderCard = ({name, price, color}) => {
  const card = document.createElement('div')
  card.innerHTML = `
    <h3>${name}</h3><br>
    <span>цена: ${price}</span><br>
    <span>цвет: ${color}</span>
  `
  out.append(card)
}

document.addEventListener('click', () => {
  getGoods()

})