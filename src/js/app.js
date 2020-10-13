import '../sass/style.sass'
import {Slider} from './module/Slider'
import {menu} from './module/headerMenu'
import './module/firebase'
import {authModalShow} from './module/auth'

const slider = new Slider(
  // 2 обязательных параметра
  {
    sliderClass: 'goods-slide',
    dotsWrapClass: 'goods-slider__dots'
  },
  // настройки по желанию
  {
    // autoplay: {
    //   interval: 3000
    // },
    startSlide: 2
  }
)
slider.start()
slider.listener()

menu()
authModalShow()

/*
 transform: scale(2);
 margin-left: 250px;
*/

//document.addEventListener('click', func)
/*
  https://i8.rozetka.ua/goods/19540605/241118425_images_19540605931.jpg
  https://i8.rozetka.ua/goods/19294071/235967803_images_19294071433.jpg
  Google Pixel 4 XL 6/128GB Just Black
 */

/*
 https://i8.rozetka.ua/goods/19823891/246933217_images_19823891101.jpg
 https://i8.rozetka.ua/goods/19823892/246933217_images_19823892871.jpg
 Google Pixel 4 64GB Oh So Orange
 */

/*
https://i2.rozetka.ua/goods/15947471/166300359_images_15947471968.jpg
https://i8.rozetka.ua/goods/15947474/166300359_images_15947474159.jpg
Google Pixel 2 128GB Clearly White
 */