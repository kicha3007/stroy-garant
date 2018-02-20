var close_popup, masks, scrollWidth, show_popup, submit_form, submit_form_wf, uploads;

jQuery.validator.messages.required = "Заполните это поле";

$('html').on("focus", 'input[data-mask=phone]', function() {
    if ($(this).val() === '') {
        return $(this).val("+7 (");
    }
});

$('html').on("blur", 'input[data-mask=phone]', function() {
    if ($(this).val() === '+7 (') {
        return $(this).val("");
    }
});

masks = {};

window.data_masks = masks;

masks.phone = function(inp) {
    return inp.mask("+7 (000) 000 00 00");
};

window.is = {};

window.is.phone_valid = function(val) {
    if (val.match(/\+7\ \(\d{3}\) \d{3}\ \d{2}\ \d{2}/)) {
        return true;
    } else {
        return false;
    }
};

$.validator.addMethod("mobile_phone", function(value, element) {
    return window.is.phone_valid(value);
}, "Введите телефон в правильном формате");

jQuery(function() {
    return $("input[data-mask]").each(function() {
        var mask;
        mask = $(this).attr("data-mask");
        return typeof masks[mask] === "function" ? masks[mask]($(this)) : void 0;
    });
});

$("html").on("click", ".work-more-button", function() {
    $(".work-list.state-second").slideToggle(700);
    return $(".work-more-block").hide();
});

$('html').on('click', '.calc-section__select-button', function() {
    if ($(this).parents('.calc-section__select').hasClass('state-open')) {
        return $(this).parents('.calc-section__select').removeClass('state-open');
    } else {
        $('.calc-section__select').removeClass('state-open');
        return $(this).parents('.calc-section__select').addClass('state-open');
    }
});

$('html').on('click', '.calc-section__select-item', function() {
    var text, val;
    val = $(this).attr('data-value');
    text = $(this).text();
    console.log(val);
    $(".calc-section__slider-block").removeClass("state-disabled");
    if (val === "2") {
        $(".calc-section__slider-block.width-second-slider").addClass("state-disabled");
    }
    if (val === "3") {
        $(".calc-section__slider-block.width-second-slider").addClass("state-disabled");
        $(".calc-section__slider-block.width-slider").addClass("state-disabled");
    }
    $(".calc-section__kitchen-image").hide();
    $(".calc-section__kitchen-image[data-index=" + val + "]").show();
    $(this).parents('.calc-section__select').find('.calc-section__select-title').text(text);
    $(this).parents('.calc-section__select').find('input[type=hidden]').val(val);
    return $(this).parents('.calc-section__select').removeClass('state-open');
});

$(document).click(function(e) {
    if ($(e.target).closest('.calc-section__select').length) {
        return;
    }
    return $('.calc-section__select').removeClass('state-open');
});

$('html').on('click', '.site-select__button', function() {
    if ($(this).parents('.site-select').hasClass('state-open')) {
        return $(this).parents('.site-select').removeClass('state-open');
    } else {
        $('.site-select').removeClass('state-open');
        return $(this).parents('.site-select').addClass('state-open');
    }
});

$('html').on('click', '.site-select__dropdown-item', function() {
    var text, val;
    val = $(this).attr('data-value');
    text = $(this).text();
    $(this).parents('.site-select').find('.site-select__button-title').text(text);
    $(this).parents('.site-select').find('input[type=hidden]').val(val);
    return $(this).parents('.site-select').removeClass('state-open');
});

$(document).click(function(e) {
    if ($(e.target).closest('.site-select').length) {
        return;
    }
    return $('.site-select').removeClass('state-open');
});

$("html").on("click", ".advantages-ask__item-header", function() {
    $(this).siblings(".advantages-ask__item-body").slideToggle(500);
    return $(this).parents(".advantages-ask__item").toggleClass("state-open");
});

$("html").on("click", ".review-info__tab-item", function() {
    var index;
    index = $(this).data("index");
    $(".review-photo-container").hide();
    $(".review-photo-container[data-index=" + index + "]").show();
    $(".review-info__body").hide();
    $(".review-info__body[data-index=" + index + "]").show();
    $(".review-info__tab-item").removeClass("state-active");
    $(this).addClass("state-active");
    $(".review-photo__list").slick('reinit');
    return $(".review-photo__main").slick('reinit');
});

uploads = [];

// submit_form_wf = function(form) {
//     var form_data, i, j, name, phone, ref, section;
//     section = $(form).find("input[name=section]").val();
//     name = $(form).find("input[name=name]").val();
//     phone = $(form).find("input[name=phone]").val();
//     form_data = new FormData();
//     for (i = j = 0, ref = uploads.length; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
//         form_data.append("file[" + (i + 1) + "]", uploads[i]);
//     }
//     form_data.append("form[section]", section);
//     form_data.append("form[name]", name);
//     form_data.append("form[phone]", phone);
//     $.ajax({
//         data: form_data,
//         type: "POST",
//         processData: false,
//         contentType: false,
//         url: "/send_mail.php",
//         dataType: "json",
//         success: function(result) {
//             if (result.status === "success") {
//                 close_popup(".form-popup");
//                 show_popup(".thank-popup");
//             }
//             if (result.message) {
//                 return $(".thank-popup .popup-paragraph").text(result.message);
//             }
//         }
//     });
//     $(form).trigger("reset");
//     $(".file-field__button-name").text("Файл не выбран");
//     uploads.length = 0;
//     return false;
// };

submit_form = function(form) {
    $.ajax({
        data: $(form).serialize(),
        type: "POST",
        url: "send_mail.php",
        dataType: "json",
        success: function(result) {
            if (result.status === "success") {
                close_popup(".form-popup");
                show_popup(".thank-popup");
            }
            if (result.message) {
                return $(".thank-popup .popup-paragraph").text(result.message);
            }
        }
    });
    $(form).trigger("reset");
    return false;
};

jQuery(function() {
    var calc_length_input, calc_width_input, calc_width_second_input, length_slider, width_second_slider, width_slider;
    $("#add_file").on("change", function() {
        var file, j, len, name, ref;
        name = this.files[0].name;
        ref = this.files;
        for (j = 0, len = ref.length; j < len; j++) {
            file = ref[j];
            uploads.push(file);
        }
        if (name) {
            return $(".file-field__button-name").text(name);
        } else {
            return $(".file-field__button-name").text("Файл не выбран");
        }
    });
    length_slider = document.getElementById("length_slider");
    calc_length_input = document.getElementById("calc_length_input");
    width_slider = document.getElementById("width_slider");
    calc_width_input = document.getElementById("calc_width_input");
    width_second_slider = document.getElementById("width_second_slider");
    calc_width_second_input = document.getElementById("calc_width_second_input");
    noUiSlider.create(length_slider, {
        start: [400],
        range: {
            'min': [200],
            'max': [600]
        },
        step: 1,
        tooltips: wNumb({
            decimals: 0
        }),
        format: wNumb({
            decimals: 0
        })
    });
    length_slider.noUiSlider.on("update", function(values, handle) {
        return calc_length_input.value = values[handle];
    });
    calc_length_input.addEventListener('change', function() {
        length_slider.noUiSlider.set(this.value);
    });
    noUiSlider.create(width_slider, {
        start: [400],
        range: {
            'min': [200],
            'max': [600]
        },
        step: 1,
        tooltips: wNumb({
            decimals: 0
        }),
        format: wNumb({
            decimals: 0
        })
    });
    width_slider.noUiSlider.on("update", function(values, handle) {
        return calc_width_input.value = values[handle];
    });
    calc_width_input.addEventListener('change', function() {
        width_slider.noUiSlider.set(this.value);
    });
    noUiSlider.create(width_second_slider, {
        start: [400],
        range: {
            'min': [200],
            'max': [600]
        },
        step: 1,
        tooltips: wNumb({
            decimals: 0
        }),
        format: wNumb({
            decimals: 0
        })
    });
    width_second_slider.noUiSlider.on("update", function(values, handle) {
        return calc_width_second_input.value = values[handle];
    });
    calc_width_second_input.addEventListener('change', function() {
        return width_second_slider.noUiSlider.set(this.value);
    });
    $("#calc_form").validate({
        submitHandler: submit_form,
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true,
                mobile_phone: true
            },
            check: {
                required: true
            }
        }
    });
    $('.review-photo__main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.review-photo__list'
    });
    $('.review-photo__list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.review-photo__main',
        dots: false,
        arrows: false,
        focusOnSelect: true,
        vertical: true,
        infinite: true,
        centerPadding: 0
    });

    $('.production-photo__main').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.production-photo__list'
    });
    $('.production-photo__list').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.production-photo__main',
        dots: false,
        arrows: true,
        focusOnSelect: true,
        vertical: true,
        infinite: true,
        centerPadding: 0
    });


    return ymaps.ready(function() {
        var MyBalloonLayout, place, the_map;
        the_map = new ymaps.Map('location_map', {
            center: [57.12710556754515, 65.54021149999998],
            zoom: 17,
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        });
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass('<div class="new-request-ballon-block top">' + '<div class="cabinet-baloon-inner">' + '$[[options.contentLayout observeSize minWidth=160 max-width=350 maxHeight=500]]' + '</div>' + '</div>', {
            build: function() {
                this.constructor.superclass.build.call(this);
                this._$element = $('.new-request-ballon-block', this.getParentElement());
                this.applyElementOffset();
            },
            applyElementOffset: function() {
                return this._$element.css({
                    left: -(this._$element[0].offsetWidth / 2),
                    top: -this._$element[0].offsetHeight
                });
            },
            clear: function() {}
        });
        place = new ymaps.Placemark([57.12710556754515, 65.54021149999998], {}, {
            balloonShadow: false,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: ymaps.templateLayoutFactory.createClass('<div class="new-request-ballon__title">улица Николая Чаплина, 117</div>'),
            hideIconOnBalloonOpen: false,
            balloonOffset: [44, -20],
            iconLayout: 'default#image',
            iconImageHref: 'static/img/map_point.png',
            iconImageSize: [74, 79],
            iconImageOffset: [-25, -25]
        });
        the_map.geoObjects.add(place);
        return the_map.behaviors.disable('scrollZoom');
    });
});

scrollWidth = function() {
    var div, width;
    div = $('<div>').css({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100px',
        height: '100px',
        visibility: 'hidden',
        overflow: 'scroll'
    });
    $('body').eq(0).append(div);
    width = div.get(0).offsetWidth - (div.get(0).clientWidth);
    div.remove();
    return width;
};


/* ------------------- calculation ----------------------- */

var stepCounter = 1;


var btnPrev = $("[data-it-btn='prev']");
var btnNext = $("[data-it-btn='next']");
var btnSend = $("[data-it-btn='send']");

function calculation() {

    $("[data-it-step-counter]").text(stepCounter);

    $("[data-it-calculation-item]").hide();
    $("[data-it-calculation-item='" + stepCounter + "']").show();


    switch (stepCounter) {
        case 1:
            btnPrev.removeClass("active");
            break;
        case 2:
            btnPrev.addClass("active");
            break;

        case 3:

            btnPrev.addClass("active");
            btnNext.addClass("active");
            btnSend.removeClass("active");
            break;

        case 4:
            btnNext.removeClass("active");
            btnSend.addClass("active");
            break;
    }
}


btnNext.on("click", function (e) {
    $(".it-validate-color").removeClass("it-validate-color");
    $(".it-validate-error").removeClass("active");

    $("[data-it-calculation-item='" + stepCounter + "'] [required]").each(function () {
        var calcValidate = $(this).val();

        if (calcValidate == null || calcValidate == "") {
            $(this).addClass("it-validate-color");
            $(".it-validate-error").addClass("active");

        }
    });

    if (!$(".it-validate-error").hasClass("active")) {

        stepCounter++;
        calculation();
    }
});


btnPrev.on("click", function (e) {
    stepCounter--;
    calculation();
});


/* ****************************** accordion ****************************** */


$(function () {
    var $accordWrap = $("[data-it-accord-wrap]");
    var $accordItem = $("[data-it-accord-item]");
    var $accordToggle = $("[data-it-accord-toggle]");

    $accordItem.hide();
    $accordToggle.on("click", function () {
        var x = this;
        if ($(this).next($accordItem).css("display") === "none") {
            $(this).closest("[data-it-accord-wrap]").find("[data-it-accord-item]").fadeOut(500);

            $(this).closest("[data-it-accord-wrap]").find("[data-it-sign]").removeClass("active");

        }

        $(this).next($accordItem).slideToggle(200, function () {
            //window.scrollTo(0,this.offsetTop - 200);
        });
        $(this).parent().find("[data-it-sign]").toggleClass("active");

        /* $(this).parent().find("[]").toggle();
         $(this).parent().find("[]").toggle();*/
    });

    /* ****************************** add-file ****************************** */

    $(".it-callback__file").change(function () {
        var f_name = [];

        for (var i = 0; i < $(this).get(0).files.length; ++i) {
            f_name.push(' ' + $(this).get(0).files[i].name);
        }

        $(this).parent().find(".it-callback__file-name").text(f_name.join(', '));
    });

    /* ------------------- fancybox ------------------- */




    $("[data-modal]").fancybox({
        padding: 0,
        helpers: {
            overlay: {
                locked: false
            }
        }

    });




});