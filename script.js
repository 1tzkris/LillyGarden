const flowers = document.querySelectorAll('.flower');
const score = document.getElementById('score');
let opened = 0;

const player = document.getElementById('player');
let x = 100, y = 100;
const speed = 10;
const interactionBox = document.getElementById('interactionBox');
let currentFlower = null;
let flowersCollected = 0;
const music = document.getElementById('bgMusic');
const favoriteSongs = document.querySelectorAll('.song-audio');

let musicStarted = false;

function startMusic() {
  if (!music || musicStarted) return;

  musicStarted = true;
  music.volume = 0;

music.play();

let fade = setInterval(() => {

    if (music.volume < 0.4) {

        music.volume += 0.02;

    } else {

        clearInterval(fade);

    }

}, 100);
}

flowers.forEach(flower => {
  flower.dataset.collected = 'false';

  flower.addEventListener('click', () => {
    if (flower.dataset.collected === 'true') return;

    const messageText = flower.dataset.message || '';
    const msg = document.createElement('div');
    msg.className = 'message show';
    msg.textContent = messageText;
    msg.style.position = 'absolute';
    msg.style.left = '0';
    msg.style.top = '78px';
    msg.style.pointerEvents = 'none';

    flower.appendChild(msg);
    flower.classList.add('opened');
    flower.dataset.collected = 'true';

      opened++;
      flowersCollected++;
      score.textContent = opened;
      score.classList.remove('score-pop');
      void score.offsetWidth;
      score.classList.add('score-pop');

    if (opened === 9) {
      alert('Woohooo! You have collected all the flowers! 🎉');
    }
  });

});

function checkFlowers() {
  currentFlower = null;

  flowers.forEach(flower => {
    const fx = flower.offsetLeft;
    const fy = flower.offsetTop;
    const distance = Math.hypot(x - fx, y - fy);

    if (distance < 80) {
      interactionBox.style.display = 'block';
      interactionBox.style.left = (fx - 20) + 'px';
      interactionBox.style.top = (fy - 45) + 'px';
      currentFlower = flower;
    }
  });

  if (!currentFlower) {
    interactionBox.style.display = 'none';
  }
}

favoriteSongs.forEach(audio => {
  audio.addEventListener('play', () => {
    if (music && !music.paused) {
      music.pause();
    }
  });

  audio.addEventListener('pause', () => {
    if (music && music.paused && musicStarted) {
      music.currentTime = music.currentTime;
      music.play().catch(() => {});
    }
  });

  audio.addEventListener('ended', () => {
    if (music && musicStarted) {
      music.currentTime = music.currentTime;
      music.play().catch(() => {});
    }
  });
});

document.addEventListener('keydown', function(e) {

    startMusic();

  if (e.key === 'ArrowUp' || e.key === 'w') y -= speed;
  if (e.key === 'ArrowDown' || e.key === 's') y += speed;
  if (e.key === 'ArrowLeft' || e.key === 'a') x -= speed;
  if (e.key === 'ArrowRight' || e.key === 'd') x += speed;

  player.style.left = x + 'px';
  player.style.top = y + 'px';

  checkFlowers();

  if ((e.key === 'e' || e.key === 'E') && currentFlower) {
    currentFlower.click();
  }

  
});

document.getElementById('closeDialogue').onclick = function() {
  document.getElementById('dialogue').style.display = 'none';
};

