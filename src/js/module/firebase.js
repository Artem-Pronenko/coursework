import * as firebase from "firebase/app"
import "firebase/firestore"
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
let db = firebase.firestore()

// функция добавления товаров в БД
export const addGoods = () => {
  db.collection('goo').doc()
    .set({
        props: {
          fullName: "Пиво Балтика 9 8.1%",
          img: {
            back: "https://pivnoe-delo.info/wp-content/uploads//spetsial-no-dlya-potrebiteley-predpochitayushchikh-boleye-krepkiye-sorta-piva-byla-razrabotana-novinka-baltika-9-vishnevoye.png",
            main: "https://pivnoe-delo.info/wp-content/uploads//spetsial-no-dlya-potrebiteley-predpochitayushchikh-boleye-krepkiye-sorta-piva-byla-razrabotana-novinka-baltika-9-vishnevoye.png"
          },
          mainName: "Пиво Балтика 9",
          name: ["Пиво", "Пивас", "Балтика", "Балтика 9"],
          price: 250,
          shop: "rakozetka",
          specifications: {
            s1: 'Сорт: Ячменное',
            s2: 'Спирт 8.1%',
          },
          info: 'Класическое порошковое пиво Балтика. Обладает нереальным вкусом. 8.1% спирта.',
          type: "beer"
        },
      }
    )
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
    outDoc(res, goods)
  } catch (e) {
    throw new Error(e)
  }

}

const render = new RenderModal()

const outDoc = (data, goods) => {
  let dataGoods = []
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
