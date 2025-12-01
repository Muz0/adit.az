$(document).on("ready", function () {
  "use strict";
  var menu_li = $(".navbar-nav li a");
  var collapse = $(".navbar-collapse");

  // Language switch link is optional on some pages; guard before touching it.
  // If you ever add multiple switches you'll need to update this logic to loop.
  const langLink = document.querySelector(".language-switch");
  if (langLink) {
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
  }

  // Let Bootstrap own the open/close animation; we just auto-hide after a tap.
  if (menu_li.length) {
    menu_li.on("click", function () {
      if (collapse.hasClass("in")) {
        collapse.collapse("hide");
      }
    });
  }

  // Smooth-scroll in-page anchors. NOTE: hash targets must exist, otherwise
  // nothing happens; adjust the offset (currently 50px) if header height changes.
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

  // Any .btn with an in-page href (#section) also scrolls smoothly.
  // Restrict this selector if you later add external .btn links.
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

  // Counter animation requires the counterUp plugin (currently not loaded
  // anywhere). Either include the script before this file or remove this block.
  var counter = $(".count");
  if (counter.length && $.fn.counterUp) {
    counter.counterUp({
      delay: 10,
      time: 1000,
    });
  }

  // Popup gallery uses Magnific Popup; make sure its JS/CSS are loaded on
  // pages that include .popup-gallery or this will throw.
  var gallery = $(".popup-gallery");
  if (gallery.length && $.fn.magnificPopup) {
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

  // Contact form relies on jQuery Validate + EmailJS.
  // Validate is not bundled anywhere right now, so include it or expect errors.
  var contactForms = $(".contact-form-1");
  if (contactForms.length && $.fn.validate) {
    contactForms.each(function () {
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
