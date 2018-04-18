export default function() {

  //スライドのアイテムの情報(img src, text)を入れる
  var slideItems = [
    {
      src : '/zoom_slider/img/photo01.jpg',
      text : '<span>captionが入ります</span><br class="u-dn-more-mobile"><span>captionが入ります</span><br class="u-dn-more-mobile"><span>captionが入ります</span>'
    },
    {
      src : '/zoom_slider/img/photo02.jpg',
      text : '<span>textが入ります</span><br class="u-dn-more-mobile"><span>textが入ります</span>'
    },
    {
      src : '/zoom_slider/img/photo03.jpg',
        text : '<span>titleが入ります</span><br class="u-dn-more-mobile"><span>titleが入ります</span>'
    }
  ]


  var ZoomSlider = function(slideItems) {
    this.slideItems = slideItems;
    this.itemLength = slideItems.length;
    this.index = 0;
    this.Image = document.querySelector('.p-zoom-slider__image');
    this.imageItems = [];
    this.itemText = document.querySelector('.p-zoom-slider__text');
    this.pager = document.querySelector('.p-zoom-slider__pager');
    this.pagerItems = [];
    this.timerId = null;
    this.transition = false;

    this.init = function() {
      this.initPager();
      this.initImage();
      this.on();
      setTimeout(()=> {
        this.setCurrent();
      }, 100);
    };

    this.initImage = function() {
      var imageItems = '';
      for (var i = 0; i < this.itemLength; i++) {
        imageItems += '<div class="p-zoom-slider__image-item"></div>';
      }
      this.Image.innerHTML = imageItems;
      this.imageItems = document.querySelectorAll('.p-zoom-slider__image-item');
      for (var i = 0; i < this.imageItems.length; i++) {
        this.imageItems[i].style.backgroundImage = 'url("' + this.slideItems[i].src + '")';
      }
    };

    this.initPager = function() {
      var pagerItem = '<div class="p-zoom-slider__pager-item"></div>';
      var pagerItems = '';
      for (var i = 0; i < this.itemLength; i++) {
        pagerItems += pagerItem;
      }
      this.pager.innerHTML = pagerItems;
      this.pagerItems = document.querySelectorAll('.p-zoom-slider__pager-item');
    };

    this.switchNext = function() {
      if (this.transition) {
        return;
      }
      var index = this.index;
      this.imageItems[index].style.zIndex = '1';
      setTimeout(()=> {
        this.imageItems[index].style.transition = '';
        this.imageItems[index].style.opacity = '';
        this.imageItems[index].style.transform = '';
        this.imageItems[index].classList.remove('is-visible');
      }, 800);


      this.index ++;
      if (this.index === 3) {
        this.index = 0;
      }

      this.setCurrent();
    };

    this.setCurrent = function() {
      this.itemText.innerHTML =  this.slideItems[this.index].text;
      for (var i = 0; i < this.itemLength; i++) {
        if ( i === this.index ) {
          this.pagerItems[i].classList.add('is-current');
          this.imageItems[i].style.transition = 'transform 8000ms ease-out, opacity 800ms';
          this.imageItems[i].style.opacity = '1';
          this.imageItems[i].style.transform = 'scale(1.2, 1.2)';
          this.imageItems[i].style.zIndex = '2';
          this.imageItems[i].classList.add('is-visible');
        } else {
          this.pagerItems[i].classList.remove('is-current');
        }
      }
    };

    this.startSlide = function() {
      this.timerId = setInterval(() => {
        this.switchNext();
      }, 4500);
    };

    this.on = function() {
      for (var i = 0; i < this.itemLength; i++) {
        const index = i;
        this.pagerItems[index].addEventListener('click', (e)=> {
          if (this.transition) {
            return;
          }
          this.transition = true;
          const thisIndex = this.index;
          this.imageItems[thisIndex].style.zIndex = '1';
          setTimeout(()=> {
            this.imageItems[thisIndex].style.transition = '';
            this.imageItems[thisIndex].style.opacity = '';
            this.imageItems[thisIndex].style.transform = '';
            this.imageItems[thisIndex].classList.remove('is-visible');
            this.transition = false;
          }, 600)
          this.index = index;
          this.setCurrent();
        }, false);
      }
    };

  }

  var zoomSlider = new ZoomSlider(slideItems);
  zoomSlider.init();
  zoomSlider.startSlide();

};
