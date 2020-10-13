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
    document.getElementById('search-goods-modal').remove()
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
        </div>
      </article>
    `
  }

  // рендер мадального окна с товарами
  render(data, minPrice, maxPrice) {
    const {mainName, fullName, price, specifications, info} = minPrice

    return `
    <article class="article goods-bg article-bg" id="search-goods-modal">
      <button class="goods-close article-close">&#10006;</button>
      <div class="article-container">
        <h3 class="article-title"><span>${mainName}</span></h3>
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
              ${Object.values(specifications).map(item =>
      `<li class="specifications-item">${item}</li>`).join('')}
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
          </div>`).join('')}
        </div>
      </div>
    </article>
    `
  }

  static renderModalEddGoods() {

    return `
    <article class="article article-bg added-goods-modal" id="added-goods-modal">
      <button class="article-close" id="add-goods-close">&#10006;</button>
      <div class="article-container">
        <h3 class="article-title">Добавить новый товар</h3>
      </div>
      <hr>
      <div class="article-container added-container">
        <form class="added-goods-form" id="added-goods-form">
          <div class="added-group-line">
            <div class="auth-group">
              <input value="Пиво Оболонь 7.3%" class="auth-input" type="text" id="full-name" required maxlength="30">
              <span class="auth-bar"></span>
              <label class="floating-label" for="full-name">Полное имя товара*</label>
            </div>
            <div class="auth-group">
              <input value="Пиво Оболонь" class="auth-input" type="text" id="main-name" required maxlength="20">
              <span class="auth-bar"></span>
              <label class="floating-label" for="main-name">Краткое имя товара*</label>
            </div>
          </div>
          <div class="added-group-line">
            <div class="auth-group">
              <input value="Оболонь" class="auth-input" type="text" id="arr-name" required maxlength="40">
              <span class="auth-bar"></span>
              <label class="floating-label" for="arr-name">Перечислите имена товара через ','*</label>
            </div>
            <div class="auth-group">
              <input value="100" class="auth-input" type="number" id="price-goods" required>
              <span class="auth-bar"></span>
              <label class="floating-label" for="price-goods">Цена товара грн*</label>
            </div>
          </div>
          <div class="added-group-line">
            <div class="auth-group">
              <input value="zaraza" class="auth-input" type="text" id="shop-goods" required maxlength="15">
              <span class="auth-bar"></span>
              <label class="floating-label" for="shop-goods">Магазин поставщика*</label>
            </div>
            <div class="auth-group">
              <input value="Нереально прет" class="auth-input" type="text" id="info-goods" required maxlength="300">
              <span class="auth-bar"></span>
              <label class="floating-label" for="info-goods">Описание товара*</label>
            </div>
          </div>
          <div class="added-group-line">
            <div class="auth-group">
              <input value="beer" class="auth-input" type="text" id="type-goods" required maxlength="10">
              <span class="auth-bar"></span>
              <label class="floating-label" for="type-goods">Тип товара на Английском*</label>
            </div>
            <div class="auth-group">
              <div class="input__wrapper">
                <input type="file" name="file" id="input__file" class="input input__file" multiple>
                <label for="input__file" class="input__file-button">
                  <span class="input__file-icon-wrapper">
                    <img class="input__file-icon" src="./img/file-download-solid.svg" alt="Выбрать файл" width="25">
                  </span>
                  <span class="input__file-button-text">Выберите файл</span>
                </label>
              </div>
            </div>
          </div>
          <div class="added-specifications-group">
            <div class="auth-group" id="specifications-goods-group">
              <input value="Спирт: 7.3%" class="auth-input" type="text" id="specifications-goods" required>
              <span class="auth-bar"></span>
              <label class="floating-label" for="specifications-goods">Свойства товара*</label>
            </div>
            <button class="added-goods-specification" id="added-specification">+</button>
          </div>
          <button class="added-goods-button auth-button"><span>Отправить </span></button>
        </form>
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
