/* ============================================================
   script.js — Para minha pequena ❤️
   ============================================================ */

// ── Data de início ────────────────────────────────────────────
const START_DATE = new Date('2025-06-02T00:00:00');

// ── Mensagem ──────────────────────────────────────────────────
const MESSAGE = `Gleicy te amooo um muitão assim oh 🌍

Minha meninha conversa cmg, n fica nesse silêncio, parece que vc ta pensando em fazer algo ruim e n to gostando de ver vc quietinha. Quando te olho, n é so pra ver, é pra admirar a que esta em minha frente e que posso levar em minha vida, igual na sexta eu te olhando la fora e vc perguntou oq foi, gosto de te olhar e ainda mais em teus olhos, quero ve-los de pertinho.

Quando se olhamos vem aquela musica e um silencio na mente, quando vejo uma mensagem sua da aquele gelo por conta doq vc ira responder. Vc me falou que me ama e que gosta de mim mas n quer nada por agr, respeito isso mas n consigo parar de te olhar e nao pensar em como te conquistar, como te fazer feliz, tirar uma risada de vc quando esta seria ou triste, amo vc garota.

Tenho ciumes seu sim, quando a jai falou daquele menino la, fiquei pensando 'ela gostou ou so deu risada msm?' e tbm quando a maria alice falou do canalha la com respeito, pq ela n sabia oq vc passou com ele, te ajudei nisso e em outras coisas tbm.

Não deixe o passado te representar agora, no passado vc fez sua parte e nada mais, n se julgue por n ser a mulher ideal pra ninguém, pq pra mim é, sempre foi. Vi em seus olhos q vc ama de vdd e tbm amo, se for preciso vou atras em qualquer lugar.

Outros olham com olhar de desejo, eu n, olho com admiração e olho assim pra vc.

N sei se sou a pessoa ideal pra vc por conta de vc ser responsável mais q eu, ser mais estudiosa, eu burlo esse sistema, facilito as coisas mas percebo que vc é diferente n só nesses pontos mas em varios.

Meu bem amo coisas nesse mundo: vc, deus, familia e carros e com eles eu te descrevo:

Seu olhar igual de uma BMW,
Raridade de uma Porsche 918 Spyder,
Linda como uma Bugatti,
Sorriso de uma McLaren P1,
E difícil de se encontrar igual a um Pagani Zonda R.

Te amo muito. ❤️`;

// ── DOM refs ──────────────────────────────────────────────────
const cntMonths    = document.getElementById('cnt-months');
const cntDays      = document.getElementById('cnt-days');
const cntHours     = document.getElementById('cnt-hours');
const cntMins      = document.getElementById('cnt-mins');
const cntSecs      = document.getElementById('cnt-secs');
const cntTotal     = document.getElementById('cnt-total');
const letterText   = document.getElementById('letter-text');
const canvas       = document.getElementById('stars-canvas');
const ctx          = canvas.getContext('2d');

// ── CONTADOR ─────────────────────────────────────────────────
function updateCounter() {
  const now  = new Date();
  const diff = now - START_DATE;
  if (diff < 0) return;

  const totalSecs = Math.floor(diff / 1000);
  const totalDays = Math.floor(diff / 86400000);

  // months & remaining days
  let months = (now.getFullYear() - START_DATE.getFullYear()) * 12
             + (now.getMonth()    - START_DATE.getMonth());
  let tempDate = new Date(START_DATE);
  tempDate.setMonth(tempDate.getMonth() + months);
  if (tempDate > now) { months--; tempDate.setMonth(tempDate.getMonth() - 1); }
  const remDays = Math.floor((now - tempDate) / 86400000);

  // hh:mm:ss
  const secsToday = totalSecs % 86400;
  const h = Math.floor(secsToday / 3600);
  const m = Math.floor((secsToday % 3600) / 60);
  const s = secsToday % 60;

  cntMonths.textContent = months;
  cntDays.textContent   = remDays;
  cntHours.textContent  = String(h).padStart(2, '0');
  cntMins.textContent   = String(m).padStart(2, '0');
  cntSecs.textContent   = String(s).padStart(2, '0');
  cntTotal.textContent  = totalDays;
}

updateCounter();
setInterval(updateCounter, 1000);

// ── TEXTO — aparece tudo de uma vez com fade ─────────────────
if (letterText) {
  letterText.textContent = MESSAGE;
  letterText.style.animation = 'fadeUp 1.2s ease both';
}

// ── STARS CANVAS ─────────────────────────────────────────────
let stars = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  resizeCanvas();
  stars = [];
  for (let i = 0; i < 130; i++) {
    stars.push({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     0.4 + Math.random() * 1.6,
      alpha: Math.random(),
      speed: 0.003 + Math.random() * 0.009,
      dir:   Math.random() > 0.5 ? 1 : -1,
    });
  }
}

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.alpha += s.speed * s.dir;
    if (s.alpha >= 1 || s.alpha <= 0) s.dir *= -1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(220,180,255,${s.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
initStars();
animateStars();
