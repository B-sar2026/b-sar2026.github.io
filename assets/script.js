// Hamburger menu functionaliteit
const toggle = document.getElementById('navToggle');
const nav = document.querySelector('nav.main-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    nav.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('header')) {
      toggle.classList.remove('open');
      nav.classList.remove('open');
    }
  });
}

// Slider functionaliteit (enkel uitvoeren op de fotos-pagina waar sliderTrack aanwezig is)
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('sliderDots');

if (track && slides.length > 0) {
  let currentIndex = 0;
  const slideIntervalTime = 4000; // Tijd in ms (4 seconden per slide)
  let autoSlideInterval;

  // Dynamisch navigatiepuntjes aanmaken
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.dot');

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlider();
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetTimer();
  }

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetTimer();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetTimer();
  });

  function startTimer() {
    autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
  }

  function resetTimer() {
    clearInterval(autoSlideInterval);
    startTimer();
  }

  // Automatisch roteren starten
  startTimer();

  // Pauzeren tijdens muis-hover
  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    sliderContainer.addEventListener('mouseleave', startTimer);
  }
}