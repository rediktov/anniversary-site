// ====== НАСТРОЙКИ — ИЗМЕНИ ПОД СЕБЯ ======
const START_DATE = new Date('2019-10-09'); // Дата начала ваших отношений
// =========================================

// Счётчик дней вместе
function updateCounter() {
  const now = new Date();
  const diff = now - START_DATE;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const months = Math.floor((days % 365) / 30);
  
  let text = `Мы вместе уже ${days} ${declOfNum(days, ['день', 'дня', 'дней'])}`;
  if (years > 0) {
    text += ` — это ${years} ${declOfNum(years, ['год', 'года', 'лет'])}`;
    if (months > 0) text += ` и ${months} ${declOfNum(months, ['месяц', 'месяца', 'месяцев'])}`;
  }
  text += ' ❤️';
  document.getElementById('dateCounter').textContent = text;
}

// Склонение слов
function declOfNum(n, titles) {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
}

updateCounter();
setInterval(updateCounter, 60000);

// Падающие сердечки
function createHearts() {
  const container = document.getElementById('heartsBg');
  const hearts = ['❤️', '💕', '💖', '💗', '🌸', '✨'];
  
  setInterval(() => {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 5 + 7) + 's';
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 12000);
  }, 400);
}
createHearts();

// Плавный скролл
function scrollToGallery() {
  document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
}

// Сюрприз
function showSurprise() {
  const s = document.getElementById('surprise');
  s.classList.toggle('show');
  if (s.classList.contains('show')) {
    // Фейерверк из сердечек
    for (let i = 0; i < 30; i++) {
      setTimeout(() => createBurstHeart(), i * 50);
    }
  }
}

function createBurstHeart() {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = '❤️';
  heart.style.left = (30 + Math.random() * 40) + '%';
  heart.style.top = '50%';
  heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
  heart.style.animation = `burst ${2 + Math.random()}s ease-out forwards`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 3000);
}

// Стиль для burst (добавляем динамически)
const style = document.createElement('style');
style.textContent = `
  @keyframes burst {
    0% { transform: translateY(0) scale(0); opacity: 1; }
    100% { transform: translateY(-500px) scale(1.5); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Модалка фото
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');

document.querySelectorAll('.photo').forEach(photo => {
  photo.addEventListener('click', () => {
    modalImg.src = photo.querySelector('img').src;
    modal.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => modal.classList.remove('active'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

// Появление элементов при скролле
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.letter-content, .photo, .finale h2, .finale p').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.8s ease';
  observer.observe(el);
});
// ===== Музыкальный плеер =====
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = musicBtn.querySelector('.music-icon');

musicBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    musicIcon.textContent = '❚❚';
    musicBtn.classList.add('playing');
  } else {
    music.pause();
    musicIcon.textContent = '▶';
    musicBtn.classList.remove('playing');
  }
});

// Автозапуск при первом клике по сайту (браузеры не дают иначе)
let musicStarted = false;
function startMusicOnFirstInteraction() {
  if (musicStarted) return;
  musicStarted = true;
  music.play().then(() => {
    musicIcon.textContent = '❚❚';
    musicBtn.classList.add('playing');
  }).catch(() => {
    // Если браузер не разрешил — ничего, пользователь нажмёт сам
    musicStarted = false;
  });
  document.removeEventListener('click', startMusicOnFirstInteraction);
  document.removeEventListener('touchstart', startMusicOnFirstInteraction);
}

document.addEventListener('click', startMusicOnFirstInteraction);
document.addEventListener('touchstart', startMusicOnFirstInteraction);