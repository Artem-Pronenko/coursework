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
          fullName: "Мобильный телефон Google Pixel 3 Just Black",
          img: {
            back: "https://i2.rozetka.ua/goods/10373221/69182036_images_10373221646.jpg",
            main: "https://i1.rozetka.ua/goods/10373219/69182036_images_10373219342.png"
          },
          mainName: "Google Pixel 3",
          name: ["Pixel", "Google Pixel", "Google Pixel 3", "Pixel 3"],
          price: 21585,
          shop: "rakozetka",
          specifications: {
            battery: "2915 мАч",
            display: '5,5" • OLED • 1080x2160',
            info: 'Google Pixel 3 – флагман 2018 года от компании Google, соединивший в себе программное и аппаратное виденье того, каким должен быть смартфон. Модель получила последнюю версию ОС Android 9 Pie, а также будет полностью поддерживаться и получать все обновления на протяжении 3-х лет.',
            ram: "64 ГБ, ОЗУ 4 ГБ",
          },
          type: "phone"
        },
      }
    ).catch(err => {
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
