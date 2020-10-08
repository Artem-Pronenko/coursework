export class RenderModal {

  filter(props) {
    const data = props
    const minPrice = data.reverse()[0]
    const maxPrice = data[data.length - 1].price
    document.body.insertAdjacentHTML('beforeend', this.render(data, minPrice, maxPrice))

  }

  render(data, minPrice, maxPrice) {
    const {mainName, fullName, price, specifications} = minPrice
    const {display, ram, battery, info} = specifications

    return `
    <article class="article goods-bg">
  <button class="goods-close">&#10006;</button>
  <div class="goods-container">
    <h3 class="goods-title">Телефон <span>${mainName}</span></h3>
    <div class="goods-card">
      <div class="goods-card__img">
        <img src="img/phone.jpg" alt="image: phone">
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
          до <strong id="min-price">${maxPrice && price}</strong>грн
        </div>
        <ul class="specifications-list">
          Характеристики:
          <li class="specifications-item">Экран: ${display}</li>
          <li class="specifications-item">Память: ${ram}</li>
          <li class="specifications-item">Емкость ${battery}</li>
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
          <select>
            <option value="cheap">Сначала дешовые</option>
            <option value="expensive">Сначала дорогие</option>
          </select>
        </label>
      </div>
    </div>
    
    <hr>
    
    <div class="shops shops_mb">
      <div class="shops-logo">
        <img src="img/shop-logo.png" alt="image: shop logo">
      </div>
      <div class="shops-info-goods">
        <h4 class="shops-info-goods__title">${mainName}
          <sup class="primary b-fs">${price}</sup><sup>грн</sup>
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
    </div>
    <div class="shops shops_mb">
      <div class="shops-logo">
        <img src="img/shop-logo.png" alt="image: shop logo">
      </div>
      <div class="shops-info-goods">
        <h4 class="shops-info-goods__title">Google Pixel 2
          <sup class="primary b-fs">17 130</sup><sup>грн</sup>
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
    </div>
  </div>
</article>
    
    `
  }
}
