import firebase from 'firebase/app'
import 'firebase/firestore'
import {filter} from './sortGoods'
import {RenderModal} from "./RenderModal";
import {destroyEl, renderInDocument} from "./utils";

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
const db = firebase.firestore()

// функция добавления товаров в БД
export const addGoodsDB = data => {
  db.collection('goo').doc()
    .set(data)
    .then(() => {
      renderInDocument(RenderModal.renderWarning('Успех!', 'Товар успешно добавлен!', false))
      setTimeout(() => destroyEl(document.getElementById('modal-warning')), 2500)
    })
    .catch(err => console.error("Error adding document: ", err))

}

// полчение товаров и сортировка по цене
export const getGoods = async (goods, type) => {
  try {
    const res = await db.collection(`goo`)
      .orderBy('props.price', 'desc')
      .get()
    productNameFilter(res, goods, type)
  } catch (e) {
    throw new Error(e)
  }

}

const productNameFilter = (data, goods, type = false) => {
  const dataGoods = []
  data.forEach(doc => {
    const {props} = doc.data()
    if (type) {
      props.type.toLowerCase() === goods && dataGoods.push(props)
    } else {
      for (let i = 0; i < props.name.length; i++) {
        if (props.name[i].toLowerCase() === goods) {
          dataGoods.push(props)
        }
      }
    }
  })
  filter(dataGoods)
}
