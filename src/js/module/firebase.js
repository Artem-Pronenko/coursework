import * as firebase from "firebase/app"
import "firebase/firestore"
import {RenderModal} from './renderModal';

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


const getGoods = (goods) => {
  db.collection(`goods/phone/phone`).orderBy('price', 'desc')
    .get()
    .then(querySnapshot => {
      outDoc(querySnapshot, goods)
    })
    .catch(err => {
      console.log(err)
    })

}

const render = new RenderModal()

const outDoc = async (data, goods) => {
  let dataGoods = []
  await data.forEach(doc => {
    const data = doc.data()
    for (let i = 0; i < data.name.length; i++) {
      if (data.name[i] === goods) {
        dataGoods.push(data)
      }
    }

  })
  render.filter(dataGoods)
}


const btn = document.getElementById('main-search-button')

btn.addEventListener('click', e => {
  e.preventDefault()
  const searchInputValue = document.getElementById('main-search').value
  getGoods(searchInputValue)

})
