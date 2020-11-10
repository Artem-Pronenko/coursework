import '../sass/style.sass'
import {Slider} from './module/Slider'
import {menu} from './module/headerMenu'
import './module/firebase'
import {authModalShow} from './module/auth'
import {search} from './module/search'


export const getUserLocation = async () => {
  const res = await fetch('http://api.sypexgeo.net/json/')
  const data = await res.json()
  const userLocationLat = data.city.lat1 || '49.59373'
  const userLocationLon = data.city.lon1 || '34.54073'
  const userLocationCity = data.city.name_ru1 || 'Полтава'
  return {
    userLocationCity,
    userLocationLat,
    userLocationLon
  }
}
getUserLocation().then(location => {
  document
    .querySelectorAll('.location-user')
    .forEach(item => item.textContent = location.userLocationCity)
})

document.addEventListener('DOMContentLoaded', () => {
  const searchForms = document.querySelectorAll('.search-forms')

  searchForms.forEach(form => {
    form.addEventListener('submit', e => {
      search(e, form)
    })
  })

  const slider = new Slider(
    // 2 обязательных параметра
    {
      sliderClass: 'goods-slide',
      dotsWrapClass: 'goods-slider__dots'
    },
    // настройки по желанию
    {
      autoplay: {
        interval: 10000
      },
      startSlide: 2
    }
  )
  slider.start()
  slider.listener()

  menu()
  authModalShow()
})

