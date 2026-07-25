function toggleLinks() {
  var links = document.getElementById("links");
  if (links) {
    links.style.display = links.style.display === "block" ? "" : "block";
  }
}

(function () {
  var slides = [
    "https://i.ibb.co/bghCVL3/IMG-9373.jpg",
    "https://i.ibb.co/cvSbJWw/IMG-9368.jpg",
    "https://i.ibb.co/HTFH29C/IMG-9371.jpg",
    "https://i.ibb.co/hZFs9jz/IMG-9374.jpg",
    "https://i.ibb.co/5Fq1WWK/IMG-9375.jpg",
    "https://i.ibb.co/2P6LBCf/IMG-9378.jpg",
    "https://i.ibb.co/Bc4Cbny/IMG-9383.jpg",
    "https://i.ibb.co/4KrJdtd/IMG-0261.jpg",
    "https://i.ibb.co/9YyPYbP/IMG-0374.jpg",
    "https://i.ibb.co/gVPrfPC/IMG-9627.jpg",
    "https://i.ibb.co/vmH5kyw/IMG-9916.jpg",
    "https://i.ibb.co/Sytf8mJ/IMG-9624.jpg",
    "https://i.ibb.co/7QWbbX7/IMG-8740.jpg",
    "https://i.ibb.co/8Xzgq3Y/IMG-9633.jpg"
  ];
  var current = 0;
  var timer = null;

  function showSlide(index) {
    var allSlides = document.querySelectorAll(".slide");
    var allDots = document.querySelectorAll(".dot");
    if (!allSlides.length || index < 0 || index >= allSlides.length) {
      return;
    }

    allSlides[current].classList.remove("active");
    allDots[current].classList.remove("active");
    allSlides[index].classList.add("active");
    allDots[index].classList.add("active");
    current = index;

    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      showSlide((current + 1) % slides.length);
    }, 3000);
  }

  window.createSlides = function () {
    var slideshow = document.getElementById("slideshow");
    var dots = document.getElementById("dots");
    if (!slideshow || !dots) {
      return;
    }

    slideshow.innerHTML = "";
    dots.innerHTML = "";
    current = 0;

    slides.forEach(function (imageUrl, index) {
      var slide = document.createElement("div");
      slide.className = "slide" + (index === 0 ? " active" : "");

      var image = document.createElement("div");
      image.className = "slide-image";
      image.style.backgroundImage = "url(" + imageUrl + ")";
      slide.appendChild(image);
      slide.addEventListener("click", function () {
        showSlide(index);
      });
      slideshow.appendChild(slide);

      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot" + (index === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show slide " + (index + 1));
      dot.addEventListener("click", function () {
        showSlide(index);
      });
      dots.appendChild(dot);
    });

    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      showSlide(1);
    }, 3000);
  };

  window.slideTo = showSlide;
})();
