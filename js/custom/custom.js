$(document).on("ready", function () {
  "use strict";
  var menu_li = $(".navbar-nav li a");
  var collapse = $(".navbar-collapse");

  const langLink = document.querySelector(".language-switch");
  const url = new URL(window.location.href);
  const parts = url.pathname.split("/").filter(Boolean);

  const currentLang = parts[0] === "en" ? "en" : "az";
  langLink.textContent = currentLang === "en" ? "AZ" : "EN";
  langLink.dataset.lang = currentLang === "en" ? "az" : "en";

  langLink.addEventListener("click", function (e) {
    e.preventDefault();
    const targetLang = this.dataset.lang;

    let pathParts = parts.slice();
    if (["en", "az"].includes(pathParts[0])) pathParts.shift();

    const newPath =
      targetLang === "az"
        ? "/" + pathParts.join("/")
        : "/" + targetLang + "/" + pathParts.join("/");
    url.pathname = newPath;
    window.location.href = url.toString();
  });

  if (menu_li.length) {
    menu_li.on("click", function () {
      if (collapse.hasClass("in")) {
        collapse.collapse("hide");
      }
    });
  }

  var menu_list = $(".navbar-nav");
  if (menu_list.length) {
    menu_list.on("click", ".pagescroll", function (event) {
      event.stopPropagation();
      var hash_tag = $(this).attr("href");
      if ($(hash_tag).length) {
        $("html, body").animate(
          {
            scrollTop: $(hash_tag).offset().top - 50,
          },
          2000
        );
      }
      return false;
    });
  }

  $(".btn").on("click", function (event) {
    var hash_tag = $(this).attr("href");
    if (hash_tag && hash_tag.startsWith("#") && $(hash_tag).length) {
      event.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $(hash_tag).offset().top - 50,
        },
        2000
      );
    }
  });

  var counter = $(".count");
  if (counter.length) {
    counter.counterUp({
      delay: 10,
      time: 1000,
    });
  }

  var gallery = $(".popup-gallery");
  if (gallery.length) {
    $(".popup-gallery").magnificPopup({
      delegate: "a",
      type: "image",
      tLoading: "Loading image #%curr%...",
      mainClass: "mfp-img-mobile",
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1],
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function (item) {
          return item.el.attr("title") + "<small>by Marsel Van Oosten</small>";
        },
      },
    });
  }

  if ($(".contact-form-1").length) {
    $(".contact-form-1").each(function () {
      $(this).validate({
        errorClass: "error",
        submitHandler: function (form) {
          $.ajax({
            type: "POST",
            url: "mail/mail.php",
            data: $(form).serialize(),
            success: function (data) {
              if (data) {
                $(".sucessMessage").html("Mail Sent Successfully !");
                $(".sucessMessage").show();
                $(".sucessMessage").delay(3000).fadeOut();
              } else {
                $(".failMessage").html(data);
                $(".failMessage").show();
                $(".failMessage").delay(3000).fadeOut();
              }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              $(".failMessage").html(textStatus);
              $(".failMessage").show();
              $(".failMessage").delay(3000).fadeOut();
            },
          });
        },
      });
    });
  }

  return false;
});
