jQuery(document).ready(function ($) {
  // Smooth scroll
  $('a[href^="#"]').click(function () {
    if (!$(this).hasClass("filter_lbox-link")) {
      var speed = 800;
      var href = $(this).attr("href");
      var target = $(href == "#" || href == "" ? "html" : href);
      var position = target.offset().top;
      $("body,html").animate(
        {
          scrollTop: position,
        },
        speed,
        "swing"
      );
      return false;
    }
  });

  // ハンバーガーメニューのクリックイベント
  $("#js-humberger").click(function () {
    $(this).toggleClass("-active");
    $("#sp-gmenu-area").toggleClass("-active");

    if ($(this).hasClass("-active")) {
      $("body").addClass("body-fixed");
      $("html").css("overflow", "hidden");
    } else {
      $("body").removeClass("body-fixed");
      $("html").css("overflow", "auto");
    }
    var expanded = $(this).attr("aria-expanded") === "true" || false;
    $(this).attr("aria-expanded", !expanded);
  });

  // .body-fixed:after 要素をクリックした際のイベント
  $(document).click(function (e) {
    if (!$(e.target).closest("#js-humberger, #sp-gmenu-area").length) {
      if ($("#js-humberger").hasClass("-active")) {
        $("#js-humberger").removeClass("-active");
        $("#sp-gmenu-area").removeClass("-active");
        $("body").removeClass("body-fixed");
        $("html").css("overflow", "auto");
        $("#js-humberger").attr("aria-expanded", false);
      }
    }
  });

  $(".expand").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open");
    $(this).next(".ex-list").slideToggle();
  });

  $(".sl-ttl-two").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("open");
    $(this).next(".sl-detail-list").slideToggle();
  });

});
