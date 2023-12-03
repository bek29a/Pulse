$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1000,
        // adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left.svg"> </button>',
        nextArrow: '<button type="button" class="slick-next"> <img src="icons/right.svg"> </button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                },
                breakpoint: 820,
                settings: {
                    dots: true,
                    arrows: false
                },
                breakpoint: 601,
                settings: {
                    dots: true,
                    arrows: false,
                    dotsClass: 'slick-dots',
                },
            }
        ]
    });

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function() {
        $(this)
          .addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
      });

      function toggleSlide(item) {
        $(item).each(function(i){
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list-active');   
            })
          });
      };

      toggleSlide('.catalog-item__link');
      toggleSlide('.catalog-item__back');

      // Modal section

      $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn();
      });
      $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut();
      });

      $('.button-mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn();
        })
      });

      function valideForms(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Минимальное количество символо {0}")
                },
                phone: "Пожалуйста, введите свой номер",
                email: {
                    required: "Пожалуйста, введите свою почту",
                    email: "Неправильно введен адрес почты"
                }
            }
          });
      };

      valideForms('#consultation-form');
      valideForms('#consultation form');
      valideForms('#order form');

      $('input[name=phone]').mask("+7 (999) 999-99-99");

      $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
      });

      // Smooth scroll and pageup
      $(window).scroll(function() {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
      });

      $("a[href^='#']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
      });
});