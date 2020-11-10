export class RenderModal {

  // удаление модального окна с товарами
  static destroy() {
    document.getElementById('search-goods-modal').remove()
  }

  // рендер смс ошибки если товар не найден
  static renderError() {
    return `
      <article class="article search-err-bg">
        <button class="goods-close article-close">&#10006;</button>
        <div class="goods-container">
          <h3 class="goods-title"><span>Упс. Такого товара нет!</span></h3>
          <hr>
          <h4>Убедитесь в правильности введенных данных!</h4>
        </div>
      </article>
    `
  }

  // рендер мадального окна с товарами
  static renderModalGoods(data, minPrice, maxPrice) {
    const {mainName, fullName, price, specifications, info} = minPrice

    return `
    <article class="article goods-bg article-bg" id="search-goods-modal">
      <button class="goods-close article-close">&#10006;</button>
      <div class="article-container">
        <h3 class="article-title"><span>${mainName}</span></h3>
        <div class="goods-card">
          <div class="goods-card__img">
            <img src="${minPrice.img}" alt="image: goods">
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
                <option value="nearer">Ближе ко мне</option>
              </select>
            </label>
          </div>
        </div>
        
        <hr>
        
        <div class="shops-wrapper">
       ${data.map(item =>
      /*рендер всех карточек товара из разных магазинов*/
      `<div class="shops shops_mb" data-location="${item.location}">
        <div class="shops-logo">
          <img src="${item.shopImg}" alt="shop logo">
        </div>
        <div class="title-shop">${item.shop}</div>
          <div class="shops-info-goods">
            <h4 class="shops-info-goods__title">${item.mainName}
              <sup class="primary b-fs price-card">${item.price}</sup><sup>грн</sup>
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
              <input value="Пиво Оболонь 7.3%" class="auth-input" type="text" id="full-name" required maxlength="35">
              <span class="auth-bar"></span>
              <label class="floating-label" for="full-name">Полное имя товара*</label>
            </div>
            <div class="auth-group">
              <input value="Пиво Оболонь" class="auth-input" type="text" id="main-name" required maxlength="25">
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
              <input value="" class="auth-input" type="text" id="shop-goods" required maxlength="15">
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
              <input class="auth-input" type="text" id="goods-img" required maxlength="350">
              <span class="auth-bar"></span>
              <label class="floating-label" for="shop-goods">Ссылка на изображение товара*</label>
            </div>
            <div class="auth-group">
              <input class="auth-input" type="text" id="shop-img" required maxlength="350">
              <span class="auth-bar"></span>
              <label class="floating-label" for="shop-goods">Ссылка на изображение магазина*</label>
            </div>
          </div>
          
          <div class="added-group-line">
            <div class="auth-group">
              <input value="beer" class="auth-input" type="text" id="type-goods" required maxlength="10">
              <span class="auth-bar"></span>
              <label class="floating-label" for="type-goods">Тип товара на Английском*</label>
            </div>
            <div class="auth-group">
              <input class="auth-input" type="text" id="shop-location" required maxlength="200">
              <span class="auth-bar"></span>
              <label class="floating-label" for="shop-goods">Местоположение магазина</label>
            </div>
            <!--<div class="auth-group">
              <div class="input__wrapper">
                <input type="file" name="file" id="input__file" class="input input__file" multiple>
                <label for="input__file" class="input__file-button">
                  <span class="input__file-icon-wrapper">
                    <img class="input__file-icon" src="./img/file-download-solid.svg" alt="Выбрать файл" width="25">
                  </span>
                  <span class="input__file-button-text">Выберите файл</span>
                </label>
              </div>
            </div>-->
            
          </div>
          <div class="added-specifications-group">
            <div class="auth-group" data-specifications-goods-group>
              <div>
                <input value="" class="auth-input" type="text" data-specifications-goods required>
                <span class="auth-bar"></span>
                <label class="floating-label" for="specifications-goods">Свойства товара*</label>
              </div>
              
            </div>
            <div role="button" class="added-goods-specification" id="added-specification">+</div>
          </div>
          <button class="added-goods-button auth-button"><span>Отправить </span></button>
        </form>
      </div>
    </article>
    `
  }

  static renderAutModal(email) {
    if (!email) {
      return `
      <article class="article article-auth" id="modal-auth">
        <div class="auth-modal-wrapper">
          <div class="auth-modal">
            <div class="auth-modal-head">
              <h4 class="auth-modal-title">Войти в аккаунт</h4>
              <a class="auth-modal-btn-close" id="modal-auth-close" href="#">&#10006;</a>
            </div>
            <div class="auth-modal-content">
              <form id="auth-form">
                <div class="auth-group">
                  <input class="auth-input" type="text" id="auth-email" required>
                  <span class="auth-bar"></span>
                  <label class="floating-label" for="auth-email">Email</label>
                </div>
                <div class="auth-group">
                  <input class="auth-input" type="text" id="auth-password" required>
                  <span class="auth-bar"></span>
                  <label class="floating-label" for="auth-password">Password</label>
                </div>
                <button class="auth-button"><span>Вход </span></button>
              </form>
            </div>
          </div>
        </div>
      </article>
    `
    } else {
      return `
      <article class="article article-auth" id="modal-admin">
        <div class="auth-modal-wrapper">
          <div class="auth-modal">
            <div class="auth-modal-head">
              <h4 class="auth-modal-title">Добро пожаловать ${email}</h4>
              <a class="auth-modal-btn-close" id="modal-admin-close" href="#">&#10006;</a>
            </div>
            <div class="auth-modal-content">
              <button class="auth-button" id="log-out" style="max-width: 270px">
                <span>Выход с аккаунта </span>
              </button>
              <button class="auth-button" id="added-goods" style="max-width: 270px">
                <span>Добавить товар </span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `
    }

  }

  static renderWarning(title, warningText) {
    return `
        <article class="article article-auth" id="modal-warning">
          <div class="auth-modal-wrapper open">
            <div class="auth-modal">
              <div class="auth-modal-head">
                <h4 class="auth-modal-title">${title}</h4>
              </div>
              <div class="auth-modal-content" id="warning-content">
                <h3>${warningText}</h3>
                <button class="auth-button" id="warning-proceed" style="max-width: 220px">
                  <span>Продолжить</span>
                </button>
                <br>
                <button class="auth-button" id="warning-abolition" style="max-width: 220px">
                  <span>Отмена</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `
  }

}
