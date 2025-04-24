$(document).ready(function () {

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

    if (ScrollTrigger.isTouch !== 1) {

        ScrollSmoother.create({
            wrapper: '.wrapper',
            content: '.content',
            smooth: 1.5,
            effects: true
        })

    }

    $('.accordion-header').on("click", function() {
        $('.accordion-item').not($(this).parent()).removeClass('active');
        $('.accordion-item').not($(this).parent()).find('.accordion-content').css('max-height', '0');

        $(this).parent().toggleClass('active');
        if ($(this).parent().hasClass('active')) {
            $(this).next('.accordion-content').css('max-height', $(this).next('.accordion-content').find('.accordion-content-inner').outerHeight() + 'px');
        } else {
            $(this).next('.accordion-content').css('max-height', '0');
        }
    });

    $("a[href*='#']").on("click", function (e) {
        e.preventDefault()

        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 777);

        return false
    })

    $(document).on('click', '.mobile-action', function () {

        if ($(this).hasClass('mdi-menu')) {
            $(this).removeClass('mdi-menu')
            $(this).addClass('mdi-close')
        } else {
            $(this).removeClass('mdi-close')
            $(this).addClass('mdi-menu')
        }

        $('.mobile-menu').fadeToggle(200)
    })

    $(document).on('click', '.shop-button', function () {
        $('.modal').fadeToggle(200)
        $('html').addClass('no-scroll')
    })


    $(document).on('click', '.close-modal', function () {
        $('.modal').fadeToggle(200)
        $('html').removeClass('no-scroll')
    })

    $(document).on('click', '.mobile-menu a', e => {
        e.preventDefault()

        const bth = $('.mobile-action')

        if (bth.hasClass('mdi-menu')) {
            console.log('menu')
            bth.removeClass('mdi-menu')
            bth.addClass('mdi-close')
        } else {
            console.log('menu')
            bth.removeClass('mdi-close')
            bth.addClass('mdi-menu')
        }

        $('.mobile-menu').fadeOut(0)
    })

    const reset = () => {
        $('.label-error').fadeOut(50)
        $('input').removeClass('error')
        $('select').removeClass('error')
        $('input').val('')
        $('.modal').fadeToggle(200)
        $('html').removeClass('no-scroll')
    }

    $(document).on('click', '.send-request', function (e)  {
        e.preventDefault()

        $('.label-error').fadeOut(50)
        $('input').removeClass('error')
        $('select').removeClass('error')

        let err = 0;

        let inputs = document.querySelectorAll('.modal-form input, .modal-form select')

        inputs.forEach(el => {
            let i = el.getAttribute('name')

            if ($.trim(el.value) === '') {
                $(`#${i}`).addClass('error');
                $(`.e-${i}`).fadeIn(50)
                err += 1;
            }
        })

        if (err > 0)
            return

        let bth = $('.send-request')

        bth.html(`
            <svg class="spinner-bth" viewBox="0 0 50 50">
                <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
            </svg>
        `)
        bth.attr('disabled', 'true')

        $.ajax({
            url: '/api/mail.php',
            data: $('.modal-form').serialize(),
            type: 'POST',
            cache: false,
            dataType: 'json',
            success: (response) => {
                if (response.status !== 200) {
                    alert('Ошибка отправки заявки')

                    for (let i in response?.error) {
                        $(`#${i}`).addClass('error');
                        $(`.e-${i}`).fadeIn(50)
                    }
                } else {
                    reset()
                    alert('Заявка отправлена, с вами скоро свяжутся')
                }

                bth.html('Оставить заявку')
                bth.removeAttr('disabled')
            },
            error: ({ responseJSON }) => {
                for (let i in responseJSON?.error) {
                    $(`#${i}`).addClass('error');
                    $(`.e-${i}`).fadeIn(50)
                }

                alert('Ошибка отправки заявки')
                bth.html('Оставить заявку')
                bth.removeAttr('disabled')
            },
        })
    })

})
