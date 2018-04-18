export default function() {

  //スライドのアイテムの情報(img src, text)を入れる
  var slideItems = [
    {
      src : '/zoom_slider/img/photo01.jpg',
      text : 'captionが入りますcaptionが入ります'
    },
    {
      src : '/zoom_slider/img/photo02.jpg',
      text : 'textが入りますtextが入ります'
    },
    {
      src : '/zoom_slider/img/photo03.jpg',
      text : 'titleが入りますtitleが入ります'
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

    this.init = function() {
      this.initPager();
      this.initImage();
      this.setCurrent();
      this.on();
    };

    this.initImage = function() {
      var imageItems = '';
      for (var i = 0; i < this.itemLength; i++) {
        imageItems += '<img src="' + this.slideItems[i].src + '", alt="" class="p-zoom-slider__image-item">';
      }
      this.Image.innerHTML = imageItems;
      this.imageItems = document.querySelectorAll('.p-zoom-slider__image-item');
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
      var index = this.index;
      this.imageItems[index].addEventListener('animationend', ()=> {
      this.imageItems[index].classList.remove('is-animate');
      });

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
          this.imageItems[i].classList.add('is-animate');
        } else {
          this.pagerItems[i].classList.remove('is-current');
        }
      }
    };

    this.startSlide = function() {
      setInterval(() => {
        this.switchNext();
      }, 4000);
    };

    this.on = function() {
      for (var i = 0; i < this.itemLength; i++) {
        const index = i;
        this.pagerItems[index].addEventListener('click', (e)=> {
          this.index = index;
          for (var i = 0; i < this.itemLength; i++) {
            this.imageItems[i].classList.remove('is-animate');
          }
          this.setCurrent();
        }, false);
      }
    };

  }

  var zoomSlider = new ZoomSlider(slideItems);
  zoomSlider.init();
  zoomSlider.startSlide();

};
