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


export const func = () => {
  db.collection('goods')
    .doc(`Google Pixel 5 #${Math.floor(Math.random() * 8888444)}`)
    .set({
        fullName: 'Мобильный телефон Google Pixel 2 Black',
        mainName: 'Google Pixel 2',
        model: '3',
        name: ['Pixel', 'Google Pixel 2', 'Google Pixel', 'Pixel 2'],
        price: 20343,
        shop: 'rakozetka',
        specifications: {
          battery: '3520 мАч',
          display: '6 ", 2880х1440 (18:9), 538 ppi',
          info: 'Модельные отличия: 64 ГБ или 128 ГБ встроенной памяти. Существует две модификации  (Pixel 2/XL): Pixel 2 это 5" AMOLED дисплей, 1920х1080 пикс, аккум 2700 мАч, у Pixel 2 XL  это 6" P-OLED дисплей, 2880х1440 пикс, аккум 3520 мАч. Нет 3.5 мм разъема.',
          ram: '64 ГБ, ОЗУ 4 ГБ'
        }
      }
    ).catch(err => {
    console.error("Error adding document: ", err);
  })

}

/*
{
      fullName: 'Мобильный телефон Google Pixel 3 Just Black',
      mainName: 'Google Pixel 3',
      model: '3',
      name: ['Pixel', 'Google Pixel 3', 'Google Pixel', 'Pixel 3'],
      price: 13585,
      shop: 'rakozetka',
      specifications: {
        battery: '2915 мАч',
        display: '5,5" • OLED • 1080x2160',
        info: 'Google Pixel 3 – флагман 2018 года от компании Google, соединивший в себе программное и аппаратное виденье того, каким должен быть смартфон. Модель получила последнюю версию ОС Android 9 Pie, а также будет полностью поддерживаться и получать все обновления на протяжении 3-х лет.',
        ram: '64 ГБ, ОЗУ 4 ГБ'
      }

    }
*/

//document.addEventListener('click', func)

const getGoods = (goods) => {
  db.collection(`goods`).orderBy('price', 'desc')
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
    for (let i = 0; i < data.name.length; i++) {
      if (data.name[i].toLowerCase() === goods) {
        dataGoods.push(data)
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
