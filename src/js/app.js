import '../sass/style.sass'
import {Slider} from './module/Slider'
import {menu} from './module/headerMenu'
import './module/firebase'
import {authModalShow} from './module/auth'
import {search} from './module/search'


export const getUserLocation = async () => {
  const res = await fetch('https://api.sypexgeo.net/json/')
  const data = await res.json()
  const lat = data.city.lat || '49.59373'
  const lng = data.city.lon || '34.54073'
  const userLocationCity = data.city.name_ru || 'Неопределено'
  return {
    userLocationCity,
    lat,
    lng
  }
}
getUserLocation().then(location => {
  const {lat, lng} = location
  const script = document.createElement('script')
  document
    .querySelectorAll('.location-user')
    .forEach(item => item.textContent = location.userLocationCity)

  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBmrFlz3jYKxOModg8V5CQu_NmfO18tUn0&callback=initMap'
  script.defer = true
  window.initMap = function () {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: {lat, lng},
    })
    const directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map);
  }
  document.head.appendChild(script)
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

