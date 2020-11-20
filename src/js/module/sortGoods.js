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
  const directionsService = new google.maps.DirectionsService()
  const card = document.querySelectorAll('[data-location]')

  const sortCheap = (arr) => [...arr].sort((a, b) => a.textContent - b.textContent)

  card.forEach(item => {
    const end = item.dataset.location
    var request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }
    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        const myRoute = result.routes[0].legs[0];
        item.dataset.loc = myRoute.distance.value
      } else {
        console.error(status)
      }
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
