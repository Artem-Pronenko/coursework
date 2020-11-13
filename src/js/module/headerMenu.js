import {getGoods} from './firebase'

export const menu = () => {
  const menuButton = document.getElementById('menu-button')
  const menu = document.getElementById('menu')

  const toggleMenu = () => menu.classList.toggle('show-menu')

  const search = e => {
    e.preventDefault()
    const {target: {dataset}} = e
    if (dataset.goodsName) {
      getGoods(dataset.goodsName, true)
        .then()
    }
  }

  menu.addEventListener('click', search)
  menuButton.addEventListener('click', toggleMenu)
  menu.addEventListener('mouseleave', toggleMenu)
}
