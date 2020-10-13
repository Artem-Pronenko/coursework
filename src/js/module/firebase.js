import firebase from 'firebase/app'
import 'firebase/firestore'
import {RenderModal} from './RenderModal'

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
    .then(() => console.log('Товар добавлен'))
    .catch(err => console.error("Error adding document: ", err))

}


//document.getElementById('addGoods').addEventListener('click', addGoods)
// полчение товаров и сортировка по цене
const getGoods = async goods => {
  try {
    const res = await db.collection(`goo`)
      .orderBy('props.price', 'desc')
      .get()
    productNameFilter(res, goods)
  } catch (e) {
    throw new Error(e)
  }

}

const render = new RenderModal()

const productNameFilter = (data, goods) => {
  const dataGoods = []
  data.forEach(doc => {
    const {props} = doc.data()
    for (let i = 0; i < props.name.length; i++) {
      if (props.name[i].toLowerCase() === goods) {
        dataGoods.push(props)
      }
    }

  })
  render.filter(dataGoods)
}


const btn = document.getElementById('main-search-button')

btn.addEventListener('click', e => {
  e.preventDefault()
  btn.disabled = true
  const searchInputValue = document.getElementById('main-search').value
  getGoods(searchInputValue.toLowerCase().split(' ').filter(i => i).join(' '))
    .then(() => btn.disabled = false)

})
