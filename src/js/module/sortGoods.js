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
  const sortSelect = document.getElementById('sort')
  const shopsWrap = document.querySelector('.shops-wrapper')
  const allShops = shopsWrap.querySelectorAll('.price-card')
  let map

  const sortCheap = (arr) => {
   return [...arr].sort((a, b) => a.textContent - b.textContent)
  }

  ymaps.ready(() => {
    const mapCenter = [55.76, 37.64]
    map = new ymaps.Map('map', {center: mapCenter, zoom: 10})
  })

  const location = await getUserLocation()
  const A = `${location.userLocationLat}, ${location.userLocationLon}`
  const card = document.querySelectorAll('[data-location]')
  await card.forEach(item => {
    ymaps.route([A, item.dataset.location]).then(route => {
      const distance = route.getHumanLength()
      map.geoObjects.add(route)
      item.dataset.loc = distance.replace(/&#.+/, '')
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
