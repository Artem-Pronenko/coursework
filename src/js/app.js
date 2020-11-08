import '../sass/style.sass'
import {Slider} from './module/Slider'
import {menu} from './module/headerMenu'
import './module/firebase'
import {authModalShow} from './module/auth'
import {search} from "./module/search";

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
      interval: 5000
    },
    startSlide: 2
  }
)
slider.start()
slider.listener()

menu()
authModalShow()
