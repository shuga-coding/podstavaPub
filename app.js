
//===== Прелоадер =====
window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.addEventListener("transitionend", () => {
      preloader.remove();
    });
  }, 800);
});

// ===== Анимация fade-up (появление элементов при скролле) =====
  const items = document.querySelectorAll('.fade-up');
  const obsserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15 // Элемент появляется когда 15% его видно
  });

  items.forEach(item => obsserver.observe(item));

// ================= HERO SLIDER =================

const slides = document.querySelectorAll('.hero__slide');
let currentSlide = 0;
let touchStartX = 0;
let touchEndX = 0;

// Создаем точки навигации
const sliderContainer = document.querySelector('.hero__right');
const dotsContainer = document.createElement('div');
dotsContainer.className = 'slider-dots';

slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
  dot.addEventListener('click', () => goToSlide(index));
  dotsContainer.appendChild(dot);
});

sliderContainer.appendChild(dotsContainer);

function updateDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    if (index === currentSlide) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function goToSlide(index) {
  slides[currentSlide].classList.remove('is-active');
  currentSlide = index;
  slides[currentSlide].classList.add('is-active');
  updateDots();
}

function showNextSlide() {
  slides[currentSlide].classList.remove('is-active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('is-active');
  updateDots();
}

function showPrevSlide() {
  slides[currentSlide].classList.remove('is-active');
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  slides[currentSlide].classList.add('is-active');
  updateDots();
}

// Запускаем автоматическую смену слайдов
let slideInterval = setInterval(showNextSlide, 5000);

// Обработчики свайпов для мобильных устройств
sliderContainer.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
  // Останавливаем автопрокрутку на время свайпа
  clearInterval(slideInterval);
}, { passive: true });

sliderContainer.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  // Возобновляем автопрокрутку через небольшую задержку
  slideInterval = setInterval(showNextSlide, 5000);
}, { passive: true });

// Обработчики для мыши (для десктопов, если нужно)
sliderContainer.addEventListener('mousedown', (e) => {
  touchStartX = e.screenX;
  clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseup', (e) => {
  touchEndX = e.screenX;
  handleSwipe();
  slideInterval = setInterval(showNextSlide, 5000);
});

sliderContainer.addEventListener('mouseleave', () => {
  // Если мышь ушла за пределы слайдера, возобновляем автопрокрутку
  slideInterval = setInterval(showNextSlide, 5000);
});

function handleSwipe() {
  const swipeThreshold = 50; // Минимальное расстояние для свайпа в пикселях
  
  if (touchEndX < touchStartX - swipeThreshold) {
    // Свайп влево - следующий слайд
    showNextSlide();
  }
  
  if (touchEndX > touchStartX + swipeThreshold) {
    // Свайп вправо - предыдущий слайд
    showPrevSlide();
  }
}

// Останавливаем автопрокрутку при наведении мыши (опционально)
sliderContainer.addEventListener('mouseenter', () => {
  clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
  slideInterval = setInterval(showNextSlide, 5000);
});


// ================= MODAL MENU =================

const openMenuBtn = document.getElementById('openMenu');
const openMenuHeroBtn = document.getElementById('openMenuHero');
const closeMenu = document.getElementById('closeMenu');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const menuModal = document.getElementById('menuModal');

function openModal() {
  menuModal.classList.add('is-open');
  document.body.style.overflow = 'hidden'; // Блокируем скролл фона
}

function closeModal() {
  menuModal.classList.remove('is-open');
  document.body.style.overflow = ''; // Возвращаем скролл
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuModal.classList.contains('is-open')) {
    closeModal();
  }
});

openMenuBtn.addEventListener('click', openModal);
openMenuHeroBtn.addEventListener('click', openModal);
closeMenu.addEventListener('click', closeModal);
closeMenuBtn.addEventListener('click', closeModal);


// Анимации


const animatedItems = document.querySelectorAll(
  '.about__decor--beer, .about__decor--pizza, .footer__decor--glass'
);

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target); // чтобы сработало один раз
    }
  });
}, {
  threshold: 0.6
});

animatedItems.forEach(item => observer.observe(item));



