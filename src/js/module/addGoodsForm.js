import {addGoodsDB} from './firebase'
import {destroyEl} from './utils'

// форма добавления товаров
export const addGoodsForm = () => {
  const goodsModal = document.getElementById('added-goods-modal')
  const addGoodsClose = document.getElementById('add-goods-close')

  const submitForm = (e) => {
    try {
      e.preventDefault()
      const {target} = e
      const fullName = target.querySelector('#full-name').value
      const arrName = target.querySelector('#arr-name').value
      const mainName = target.querySelector('#main-name').value
      const priceGoods = target.querySelector('#price-goods').value
      const shopGoods = target.querySelector('#shop-goods').value
      const infoGoods = target.querySelector('#info-goods').value
      const typeGoods = target.querySelector('#type-goods').value
      const specificationsGoods = target.querySelector('#specifications-goods').value

      const data = {
        props: {
          fullName: fullName,
          img: {
            main: "https://pivnoe-delo.info/wp-content/uploads//spetsial-no-dlya-potrebiteley-predpochitayushchikh-boleye-krepkiye-sorta-piva-byla-razrabotana-novinka-baltika-9-vishnevoye.png"
          },
          mainName: mainName,
          name: [arrName],
          price: priceGoods,
          shop: shopGoods,
          specifications: {
            s1: specificationsGoods
          },
          info: infoGoods,
          type: typeGoods
        },
      }

      addGoodsDB(data)
    } catch (e) {
      throw new Error(e)
    }

  }



  addGoodsClose.addEventListener('click', () => destroyEl(goodsModal))
  goodsModal.addEventListener('submit', submitForm)

}
