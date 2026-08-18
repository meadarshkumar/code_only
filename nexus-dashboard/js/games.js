/* =====================================================================
   games.js
   Three self-contained mini games: Memory Grid, Rock/Paper/Scissors,
   and Color Guess. Each initializes independently and re-initializes
   cleanly on "restart".
   ===================================================================== */

(function () {
  'use strict';

  /* ------------------------- ARCADE TAB SWITCHING ------------------------- */
  const gameTabs = document.querySelectorAll('[data-game]');
  const gamePanels = document.querySelectorAll('[data-game-panel]');
  gameTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      gameTabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      const target = tab.dataset.game;
      gamePanels.forEach((panel) => { panel.hidden = panel.dataset.gamePanel !== target; });
    });
  });

  /* =====================================================================
     MEMORY GRID
     ===================================================================== */
  const memoryGrid = document.getElementById('memory-grid');
  const memoryMovesEl = document.getElementById('memory-moves');
  const memoryMatchesEl = document.getElementById('memory-matches');
  const memoryRestartBtn = document.getElementById('memory-restart');
  const ICONS = ['🛰️', '🧬', '🔮', '⚡', '🪐', '🧿', '🛡️', '💾'];

  let flippedCards = [];
  let lockBoard = false;
  let moves = 0;
  let matches = 0;

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function buildMemoryGrid() {
    memoryGrid.innerHTML = '';
    flippedCards = []; lockBoard = false; moves = 0; matches = 0;
    memoryMovesEl.textContent = '0';
    memoryMatchesEl.textContent = '0';

    const deck = shuffle([...ICONS, ...ICONS]);
    deck.forEach((icon) => {
      const card = document.createElement('div');
      card.className = 'memory-card';
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', 'Hidden card');
      card.dataset.icon = icon;
      card.innerHTML = `
        <div class="mc-inner">
          <div class="mc-face mc-front">?</div>
          <div class="mc-face mc-back">${icon}</div>
        </div>`;
      card.addEventListener('click', () => flipCard(card));
      card.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipCard(card); } });
      memoryGrid.appendChild(card);
    });
  }

  function flipCard(card) {
    if (lockBoard || card.classList.contains('flipped') || card.classList.contains('matched')) return;
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      moves++;
      memoryMovesEl.textContent = String(moves);
      lockBoard = true;
      const [a, b] = flippedCards;
      if (a.dataset.icon === b.dataset.icon) {
        a.classList.add('matched'); b.classList.add('matched');
        matches++;
        memoryMatchesEl.textContent = String(matches);
        flippedCards = [];
        lockBoard = false;
        if (matches === ICONS.length && window.NEXUS_toast) {
          window.NEXUS_toast(`Solved in ${moves} moves! 🧠`, 'success');
        }
      } else {
        setTimeout(() => {
          a.classList.remove('flipped'); b.classList.remove('flipped');
          flippedCards = [];
          lockBoard = false;
        }, 750);
      }
    }
  }

  if (memoryGrid) {
    buildMemoryGrid();
    memoryRestartBtn.addEventListener('click', buildMemoryGrid);
  }

  /* =====================================================================
     ROCK · PAPER · SCISSORS
     ===================================================================== */
  const rpsButtons = document.querySelectorAll('.rps-btn');
  const rpsResult = document.getElementById('rps-result');
  const rpsPlayerEmoji = document.getElementById('rps-player-emoji');
  const rpsCpuEmoji = document.getElementById('rps-cpu-emoji');
  const rpsScorePlayer = document.getElementById('rps-score-player');
  const rpsScoreCpu = document.getElementById('rps-score-cpu');
  const rpsRestart = document.getElementById('rps-restart');
  const RPS_EMOJI = { rock: '✊', paper: '✋', scissors: '✌️' };
  let playerScore = 0, cpuScore = 0;

  function playRPS(choice) {
    const options = ['rock', 'paper', 'scissors'];
    const cpuChoice = options[Math.floor(Math.random() * options.length)];
    rpsPlayerEmoji.textContent = RPS_EMOJI[choice];
    rpsCpuEmoji.textContent = RPS_EMOJI[cpuChoice];

    let outcome;
    if (choice === cpuChoice) outcome = 'draw';
    else if (
      (choice === 'rock' && cpuChoice === 'scissors') ||
      (choice === 'paper' && cpuChoice === 'rock') ||
      (choice === 'scissors' && cpuChoice === 'paper')
    ) outcome = 'win';
    else outcome = 'lose';

    if (outcome === 'win') { playerScore++; rpsResult.textContent = `You win — ${cap(choice)} beats ${cap(cpuChoice)}.`; }
    else if (outcome === 'lose') { cpuScore++; rpsResult.textContent = `CPU wins — ${cap(cpuChoice)} beats ${cap(choice)}.`; }
    else { rpsResult.textContent = `Draw — both chose ${cap(choice)}.`; }

    rpsScorePlayer.textContent = String(playerScore);
    rpsScoreCpu.textContent = String(cpuScore);
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  rpsButtons.forEach((btn) => btn.addEventListener('click', () => playRPS(btn.dataset.choice)));
  if (rpsRestart) {
    rpsRestart.addEventListener('click', () => {
      playerScore = 0; cpuScore = 0;
      rpsScorePlayer.textContent = '0'; rpsScoreCpu.textContent = '0';
      rpsResult.textContent = 'Choose your weapon.';
      rpsPlayerEmoji.textContent = '❔'; rpsCpuEmoji.textContent = '❔';
    });
  }

  /* =====================================================================
     COLOR GUESS
     ===================================================================== */
  const colorGrid = document.getElementById('color-grid');
  const colorTargetCode = document.getElementById('color-target-code');
  const colorResult = document.getElementById('color-result');
  const colorScoreEl = document.getElementById('color-score');
  const colorRoundEl = document.getElementById('color-round');
  const colorRestartBtn = document.getElementById('color-restart');
  let colorScore = 0, colorRound = 1;

  function randHex() {
    const n = () => Math.floor(Math.random() * 200 + 30).toString(16).padStart(2, '0');
    return `#${n()}${n()}${n()}`.toUpperCase();
  }

  function newColorRound() {
    colorGrid.innerHTML = '';
    const target = randHex();
    colorTargetCode.textContent = target;
    const options = shuffle2([target, randHex(), randHex(), randHex(), randHex(), randHex()]);
    options.forEach((hex) => {
      const swatch = document.createElement('button');
      swatch.className = 'color-swatch';
      swatch.style.background = hex;
      swatch.setAttribute('aria-label', 'Color option');
      swatch.addEventListener('click', () => {
        if (hex === target) {
          colorScore++; colorResult.textContent = `Correct — that was ${target}.`;
          colorResult.style.color = 'var(--green)';
        } else {
          colorResult.textContent = `Not quite — the answer was ${target}.`;
          colorResult.style.color = 'var(--red)';
        }
        colorScoreEl.textContent = String(colorScore);
        colorRound++;
        colorRoundEl.textContent = String(colorRound);
        setTimeout(newColorRound, 900);
      });
      colorGrid.appendChild(swatch);
    });
  }
  function shuffle2(arr) { return arr.map(v => [Math.random(), v]).sort((a, b) => a[0] - b[0]).map(p => p[1]); }

  if (colorGrid) {
    newColorRound();
    colorRestartBtn.addEventListener('click', () => {
      colorScore = 0; colorRound = 1;
      colorScoreEl.textContent = '0'; colorRoundEl.textContent = '1';
      colorResult.textContent = 'Pick the matching color.';
      colorResult.style.color = 'var(--accent)';
      newColorRound();
    });
  }
})();