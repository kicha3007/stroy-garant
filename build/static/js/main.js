
/* ------------------- fancybox ------------------- */

$("[data-modal]").fancybox({
    padding: 0,
    helpers: {
        overlay: {
            locked: false
        }
    }

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


    /* ------------------- carousel ------------------- */




        $('.box-carousel').each(function () {
            var $this = $(this);
            var itemsCount = $this.data("items");
            var itemsCountPad = $this.data("itemsPad");

            $this.owlCarousel({

                items: (itemsCount ? itemsCount : 1),
                margin: 20,
                nav: true,
                loop: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: false,
                dots: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    600: {
                        items: itemsCountPad ? itemsCountPad : (itemsCount ? itemsCount : 1)
                    },
                    1000: {
                        items: itemsCount ? itemsCount : 1
                    }
                }
            });
        });



    /* ------------------- ajax ------------------- */

    $(document).on("submit", "[data-it-form]", function (e) {
        e.preventDefault();
        var $form = $(this);
        var $data = new FormData($form[0]);
        console.log($form.attr("action"));
        $.post(
            {
                url: $form.attr("action"),
                data: $data,
                dataType: "json",
                timeout: 30000,
                processData: false,
                contentType: false,
                success: function (data) {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html(data.message);
                },

                error: function() {
                    $form.addClass("success");
                    $form.find($(".it-form__success")).html("Извините, временные проблемы на сервере, попробуйте ещё раз!");

                }
            }
        )
    });




});

/* ------------------- mask ------------------- */

$("[data-phone]").mask("+7 (999) 99-99-999");
