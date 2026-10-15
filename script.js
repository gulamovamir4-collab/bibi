
/* Дата начала отношений: укажи свой год, месяц и день.
   В JavaScript месяцы считаются с нуля:
   0 — январь, 1 — февраль, ..., 11 — декабрь. */

const relationshipStart = null;

// Пример даты:
// const relationshipStart = new Date(2021, 9, 15, 0, 0, 0);

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

function updateCounter() {
  if (!relationshipStart) {
    daysElement.textContent = "5 лет";
    hoursElement.textContent = "♡";
    minutesElement.textContent = "♡";
    secondsElement.textContent = "♡";
    return;
  }

  const now = new Date();
  const difference = now - relationshipStart;

  if (difference < 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = days.toLocaleString("ru-RU");
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

updateCounter();
setInterval(updateCounter, 1000);

// Создание плавающих сердечек
const heartsBg = document.getElementById("heartsBg");
const heartSymbols = ["♡", "♥", "❤"];

function createHeart() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heart = document.createElement("span");
  heart.className = "heart-particle";
  heart.textContent =
    heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 12 + Math.random() * 20 + "px";
  heart.style.animationDuration = 7 + Math.random() * 7 + "s";

  heartsBg.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 15000);
}

setInterval(createHeart, 650);

// Кнопка с приятным сюрпризом
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseBtn.addEventListener("click", () => {
  surpriseMessage.hidden = false;
  surpriseBtn.textContent = "Обнимаю сердцем ❤️";

  // Добавляем несколько сердечек в момент нажатия
  for (let i = 0; i < 12; i++) {
    setTimeout(createHeart, i * 100);
  }
});

// Управление фоновой музыкой
const musicBtn = document.getElementById("musicBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

musicBtn.addEventListener("click", async () => {
  // Файл music.mp3 нужно добавить в папку проекта
  const musicSource = backgroundMusic.querySelector("source");

  if (!musicSource.getAttribute("src")) {
    alert("Сначала добавь музыкальный файл music.mp3 в папку сайта.");
    return;
  }

  try {
    if (backgroundMusic.paused) {
      await backgroundMusic.play();
      musicBtn.textContent = "Ⅱ Пауза";
    } else {
      backgroundMusic.pause();
      musicBtn.textContent = "♫ Музыка";
    }
  } catch (error) {
    alert("Не удалось включить музыку. Проверь файл music.mp3.");
  }
});
