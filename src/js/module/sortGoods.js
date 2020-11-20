import {renderInDocument} from './utils'
import {RenderModal} from './RenderModal'
import {getUserLocation} from '../app'

export const filter = props => {
  if (props.length) {  // проверка на ответ от БД
    const minPrice = props.reverse()[0] // массив товара по самой низкой цене
    const maxPrice = props[props.length - 1].price // максимальная цена товара
    renderInDocument(RenderModal.renderModalGoods(props, minPrice, maxPrice))
    const goodsClose = document.querySelector('.goods-close')
    sort()
    goodsClose.addEventListener('click', RenderModal.destroy)
  } else {
    renderInDocument(RenderModal.renderError())
    const goodsClose = document.querySelector('.goods-close')
    goodsClose.addEventListener('click', () => {
      document.querySelector('.search-err-bg').remove()
    })
  }
}


const sort = async () => {
  const location = await getUserLocation()
  const sortSelect = document.getElementById('sort')
  const shopsWrap = document.querySelector('.shops-wrapper')
  const allShops = shopsWrap.querySelectorAll('.price-card')
  const {lat, lng} = location
  const start = `${lat}, ${lng}`
  const $map = document.getElementById('map')
  const map = new google.maps.Map($map)
  const directionsService = new google.maps.DirectionsService()
  const directionsRenderer = new google.maps.DirectionsRenderer()
  const card = document.querySelectorAll('[data-location]')
  const mapOpen = document.querySelectorAll('.map-open')
  directionsRenderer.setMap(map)

  const sortCheap = (arr) => [...arr].sort((a, b) => a.textContent - b.textContent)

  card.forEach(item => {
      const end = item.dataset.location
      const request = {
        origin: start,
        destination: end,
        travelMode: 'WALKING'
      }
      directionsService.route(request, (result, status) => {
        status === 'OK'
          ? item.dataset.loc = result.routes[0].legs[0].distance.value
          : console.error(status)
      })
    }
  )

  mapOpen.forEach(item => {
    item.addEventListener('click', () => {
      const locShop = item.closest('[data-location]').dataset.location
      const request = {
        origin: start,
        destination: locShop,
        travelMode: 'WALKING'
      }
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(result)
          $map.classList.remove('hide')
          RenderModal.destroy()
          window.scrollTo(0, document.body.scrollHeight)
        } else {
          console.error(status)
        }
      })
    })
  })

  const changeHandler = () => {
    if (sortSelect.value === 'cheap') {
      sortCheap(allShops).forEach(i => {
        shopsWrap.append(i.closest('.shops'))
      })
    } else if (sortSelect.value === 'expensive') {
      [...sortCheap(allShops)].reverse().forEach(i => {
        shopsWrap.append(i.closest('.shops'))
      })
    } else if (sortSelect.value === 'nearer') {
      [...document.querySelectorAll('[data-location]')].sort((a, b) => {
        return a.dataset.loc - b.dataset.loc
      }).forEach(i => {
        shopsWrap.append(i)
      })
    }
  }
  sortSelect.addEventListener('change', changeHandler)
}
