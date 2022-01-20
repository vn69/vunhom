/**
 * Template Name: BizLand - v3.7.0
 * Template URL: https://bootstrapmade.com/bizland-bootstrap-business-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#header");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 16;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;
    const headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add("fixed-top");
        nextElement.classList.add("scrolled-offset");
      } else {
        selectHeader.classList.remove("fixed-top");
        nextElement.classList.remove("scrolled-offset");
      }
    };
    window.addEventListener("load", headerFixed);
    onscroll(document, headerFixed);
  }

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Skills animation
   */
  let skilsContent = select(".skills-content");
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: "80%",
      handler: function (direction) {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
  new Swiper(".product-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    preloadImages: false,
    lazy: true,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on(
        "click",
        "#portfolio-flters li",
        function (e) {
          e.preventDefault();
          portfolioFilters.forEach(function (el) {
            el.classList.remove("filter-active");
          });
          this.classList.add("filter-active");

          portfolioIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          portfolioIsotope.on("arrangeComplete", function () {
            AOS.refresh();
          });
        },
        true
      );
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // text animation
  var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };

  TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

    var that = this;
    var delta = 100 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(function () {
      that.tick();
    }, delta);
  };

  window.onload = function () {
    var elements = document.getElementsByClassName("typewrite");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = elements[i].getAttribute("data-type");
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #555555}";
    document.body.appendChild(css);
  };
})();

// data
const productData = [
  {
    src: "assets/img/src/5.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/6.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/7.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/8.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/9.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/10.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/11.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/12.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/13.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/14.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/15.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/16.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/17.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/19.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/21.jpg",
    type: "filter-card",
  },
  {
    src: "assets/img/src/22.jpg",
    type: "filter-card",
  },
  {
    src: "assets/img/src/33.jpg",
    type: "filter-card",
  },
  {
    src: "assets/img/src/40.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/41.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/42.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/43.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/44.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/45.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/46.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/47.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/48.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/49.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/50.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/51.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/52.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/53.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/54.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/55.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/56.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/57.jpg",
    type: "filter-app",
  },
  {
    src: "assets/img/src/58.jpg",
    type: "filter-app",
  },
];

const dataContainer = document.querySelector(".portfolio-container");
let htmlData = productData
  .splice(0, 17)
  .map((item) => {
    return `
    <div class="col-lg-4 col-md-6 portfolio-item ${item.type}">
      <img src=${item.src} class="img-fluid" alt="">
      <div class="portfolio-info">
        <h4>Ảnh thật</h4>
        <a href="assets/img/src/5.jpg" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link"
          title="Ảnh thật"><i class="bi bi-zoom-in"></i></a>
      </div>
    </div>`;
  })
  .join("");
dataContainer.innerHTML = htmlData;

// swiper

const swiperWrap = document.querySelector(".product-swiper-wrap");

let htmlDataSlide = productData
  .reverse()
  .map((item) => {
    return `
    <div class="swiper-slide">
      <div class="product-item">
        <img data-src=${item.src} class="swiper-lazy" />
        <div class="swiper-lazy-preloader"></div>
      </div>
    </div>`;
  })
  .join("");
swiperWrap.innerHTML = htmlDataSlide;

// scroll
