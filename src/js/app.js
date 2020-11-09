import '../sass/style.sass'
import {Slider} from './module/Slider'
import {menu} from './module/headerMenu'
import './module/firebase'
import {authModalShow} from './module/auth'
import {search} from './module/search'

document.addEventListener('DOMContentLoaded', () => {
  const searchForms = document.querySelectorAll('.search-forms')

  searchForms.forEach(form => {
    form.addEventListener('submit', e => {
      search(e, form)
    })
  })

  const userPozSuccess = async () => {
    const res = await fetch('http://api.sypexgeo.net/json/')
    const data = await res.json()
    const userLocation = data.city.name_ruq || 'Полтава'
    document
      .querySelectorAll('.location-user')
      .forEach(item => item.textContent = userLocation)
  }
  userPozSuccess()

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

