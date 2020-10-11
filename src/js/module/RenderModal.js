export class RenderModal {

  filter(props) {
    if (props.length) { // проверка на ответ от БД
      const minPrice = props.reverse()[0] // массив товара по самой низкой цене
      const maxPrice = props[props.length - 1].price // максимальная цена товара
      document.body.insertAdjacentHTML('beforeend', this.render(props, minPrice, maxPrice))
      this.listener()
    } else {
      document.body.insertAdjacentHTML('beforeend', this.renderError())
      this.listener()
    }
  }
  // удаление модального окна с товарами
  destroy() {
    document.querySelector('.article').remove()
  }
  // сортировка карточек товара
  sort() {
    const shopsWrap = document.querySelector('.shops-wrapper')
    const shopsReverse = [...shopsWrap.querySelectorAll('.shops ')].reverse()
    const shops = [...shopsWrap.querySelectorAll('.shops ')]
    for (let i = 0; i < shops.length; i++) {
      shops[i].remove()
    }
    shopsWrap.append(...shopsReverse)

  }
  // рендер смс ошибки если товар не найден
  renderError() {
    return `
      <article class="article goods-bg">
      <button class="goods-close">&#10006;</button>
      <div class="goods-container">
        <h3 class="goods-title"><span>Упс. Такого товара нет!</span></h3>
        <hr>
        <h4>Убедитесь в правильности введенных данных!</h4>
    </article>
    `
  }
  // рендер мадального окна с товарами
  render(data, minPrice, maxPrice) {
    const {mainName, fullName, price, specifications} = minPrice
    const {display, ram, battery, info} = specifications

    return `
    <article class="article goods-bg">
  <button class="goods-close">&#10006;</button>
  <div class="goods-container">
    <h3 class="goods-title"><span>${mainName}</span></h3>
    <div class="goods-card">
      <div class="goods-card__img">
        <img src="${minPrice.img.main}" alt="image: phone">
        <span class="goods-card__title">${fullName}</span>
        <div class="goods-card__star">
          <img src="img/star-gold.png" alt="icon: gold star">
          <img src="img/star-gold.png" alt="icon: gold star">
          <img src="img/star-gold.png" alt="icon: gold star">
          <img src="img/star-black.png" alt="icon: gold black">
          <img src="img/star-black.png" alt="icon: gold black">
        </div>
        <div class="goods-price">
          <span class="goods-price__title">Мин. цена</span>
          <strong class="price">${price}<span>грн</span></strong>
        </div>
      </div>
      <div class="goods-info">
        <div class="goods-info__price">
          от <strong id="max-price">${minPrice.price}</strong>
          до <strong id="min-price">${maxPrice || price}</strong>грн
        </div>
        <ul class="specifications-list">
          Характеристики:
          <li class="specifications-item">Экран: ${display}</li>
          <li class="specifications-item">Память: ${ram}</li>
          <li class="specifications-item">Емкость: ${battery}</li>
        </ul>
        <div class="goods-info__description">
          <span>Описание</span>
          <p>
            ${info}
          </p>
        </div>
      </div>
    </div>
    
    <div class="goods-shops">
      <div class="goods-sort goods-sort__shop">
        <h3 class="goods-sort__title">Магазины в вашем городе</h3>
        <label>
          Сортировать по:
          <select id="sort">
            <option value="cheap">Сначала дешовые</option>
            <option value="expensive">Сначала дорогие</option>
          </select>
        </label>
      </div>
    </div>
    
    <hr>
    
    <div class="shops-wrapper">
      ${data.map(item => 
      /*рендер всех карточек товара из разных магазинов*/
       `<div class="shops shops_mb">
        <div class="shops-logo">
          <img src="img/shop-logo.png" alt="image: shop logo">
        </div>
        <div class="title-shop">${item.shop}</div>
        <div class="shops-info-goods">
          <h4 class="shops-info-goods__title">${item.mainName}
            <sup class="primary b-fs">${item.price}</sup><sup>грн</sup>
          </h4>
          <div class="shops-info-goods-footer">
            <div class="shops-info-rating">
              <span class="shops-info-rating__text">Рейтинг:</span>
              <div class="shops-info-star">
                <img src="img/star-gold.png" alt="icon: gold star">
                <img src="img/star-gold.png" alt="icon: gold star">
                <img src="img/star-gold.png" alt="icon: gold star">
                <img src="img/star-black.png" alt="icon: gold black">
                <img src="img/star-black.png" alt="icon: gold black">
              </div>
            </div>
            <button class="shops-open">В магазин</button>
          </div>
        </div>
      </div>`
    ).join('')}
    </div>
  </div>
</article>
    `
  }
  // слушатель событий ? запуск методов
  listener() {
    const goodsClose = document.querySelector('.goods-close')
    document.getElementById('sort')
    && document.getElementById('sort').addEventListener('change', this.sort)
    goodsClose.addEventListener('click', this.destroy)
  }
}
