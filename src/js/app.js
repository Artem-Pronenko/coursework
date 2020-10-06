import '../sass/style.sass'
import {Slider} from './module/slider'

const slider = new Slider(
  {
    sliderClass: 'goods-slide',
    dotsWrapClass: 'goods-slider__dots'
  },
  {
    autoplay: {
      interval: 3000
    },
    startSlide: 2
  }
)
slider.start()
slider.listener()
