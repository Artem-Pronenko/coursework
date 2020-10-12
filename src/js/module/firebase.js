import * as firebase from "firebase/app"
import "firebase/firestore"
import {RenderModal} from './RenderModal';

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
export const func = () => {
  db.collection('goo').doc()
    .set({
        props: {
          fullName: "Пиво темное Ригань 8.2%",
          img: {
            back: "https://cdn.27.ua/799/52/aa/2445994_1.jpeg",
            main: "https://cdn.27.ua/799/52/aa/2445994_1.jpeg"
          },
          mainName: "Пиво Рыгань темное",
          name: ["Пиво", "Пивас", "Рыгань", "Темное пиво"],
          price: 200,
          shop: "rakozetka",
          specifications: {
            // battery: "2915 мАч",
            // display: '5,5" • OLED • 1080x2160',
            info: 'Класическое темное пиво Рыгань. Обладает очень стойким ароматом. 8.2% спирта. Разрывают твое' +
              ' сознание на куски при каждом глотке.',
            // ram: "",

          },
          type: "beer"
        },
      }
    )
    .then(() => {
      console.log('Товар добавлен')
    })
    .catch(err => {
    console.error("Error adding document: ", err);
  })

}


//document.addEventListener('click', func)
// полчение товаров и сортировка по цене
const getGoods = (goods) => {
  db.collection(`goo`).orderBy('props.price', 'desc')
    .get()
    .then(querySnapshot => {
      btn.disabled = false
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
    for (let i = 0; i < data.props.name.length; i++) {
      if (data.props.name[i].toLowerCase() === goods) {
        dataGoods.push(data.props)
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

})
