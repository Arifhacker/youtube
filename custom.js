jQuery(document).ready(function() {
    $(document).on("click", function(event) {
        if ($(event.target).closest(".navbar-toggler").length) {
            $(".header-menu").toggleClass("collapse");
        } else if (!$(event.target).closest(".header-menu").length) {
            $(".header-menu").removeClass("collapse");
        }
    });
    $(document).on("click", function(event) {
        if ($(event.target).closest(".language").length) {
            $(".dropdown-menu").toggleClass("open");
        } else if (!$(event.target).closest(".dropdown-menu").length) {
            $(".dropdown-menu").removeClass("open");
        }
    });
    jQuery(document).on('click', 'ul#tabs li', function() {
        var tab_id = $(this).find("button").attr('data-tab');
        $('ul#tabs li').removeClass("active");
        $('.tab-panel').removeClass("active");
        $(this).addClass("active");
        $("#" + tab_id).addClass("active");
    })
    jQuery(document).on('click', '.vi_thumimage, .search-info', function() {
        $(this).parents('.result_form').find(".submit-video").click();
    });
    $(".keyword").keyup(function(e) {
        var inputlength = $(this).val().length;
        var code = (e.keyCode || e.which);
        if (code == 37 || code == 38 || code == 39 || code == 40) {
            var index = $('.selected').index();
            if (!index || index === -1) {
                index = 0;
            }
            $('.result_box li').removeClass('selected');
            switch (code) {
            case 38:
                var new_index = index - 1;
                $('.result_box li').eq(new_index).addClass('selected');
                var new_query = $('.result_box li.selected').html();
                $(this).val(new_query);
                break;
            case 40:
                var new_index = index + 1;
                $('.result_box li').eq(new_index).addClass('selected');
                var new_query = $('.result_box li.selected').html();
                $(this).val(new_query);
                break;
            }
        } else if (code == 13) {
            $(".suggesstion-box").hide();
        } else {
            var search_txt = '';
            jQuery.ajax({
                type: "POST",
                url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1",
                dataType: 'jsonp',
                data: $.extend({
                    q: $(this).val(),
                }, {}),
                success: function(data) {
                    $(".suggesstion-box").html('');
                    $(".suggesstion-box").show();
                    obj = data[1];
                    if (obj[0]) {
                        search_txt = "<ul class='result_box'>";
                    }
                    jQuery.each(obj, function(key, value) {
                        search_txt = search_txt + "<li class='search_result'>" + value[0] + "</li>";
                    });
                    if (obj[0]) {
                        search_txt = search_txt + "</ul";
                    }
                    $(".suggesstion-box").append(search_txt);
                }
            });
        }
    });
    $(document).mouseup(function(e) {
        if ($(e.target).closest(".suggesstion-box").length === 0) {
            $(".suggesstion-box").hide();
        }
    });
    jQuery(document).on('click', 'ul.result_box li', function() {
        var valattr = $(this).text();
        $('.keyword').val(valattr);
        $(".suggesstion-box").hide();
        $('.converter-btn').click();
        $('.convert-btn').click();
    });
    $(document).on('mouseenter', '.search_result', function(event) {
        $('.result_box li').removeClass('selected');
        $(this).addClass('selected');
        var new_query = $('.result_box li.selected').text();
        $('.keyword').val(new_query);
    });
});
