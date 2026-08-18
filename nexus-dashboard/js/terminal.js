/* =====================================================================
   terminal.js
   A fake but fully interactive terminal. Supports: help, about, skills,
   projects, contact, clear, date, time, whoami, github. Keeps a command
   history (Up/Down arrows) and prints output with a light type-on delay
   so it feels like a real shell rather than an instant dump.
   ===================================================================== */

(function () {
  'use strict';

  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');
  if (!output || !input) return;

  const history = [];
  let historyIndex = -1;

  const COMMANDS = {
    help: () => [
      'Available commands:',
      '  help       show this list',
      '  about      who is Kira Voss',
      '  skills     print the skill matrix',
      '  projects   list deployed builds',
      '  contact    show contact channels',
      '  whoami     current session identity',
      '  github     open GitHub profile',
      '  date       print today\'s date',
      '  time       print current time',
      '  clear      clear the terminal'
    ],
    about: () => [
      'Kira Voss — Full-Stack Engineer & Systems Architect.',
      '6 years building interfaces and the infrastructure under them.',
      'Currently compiling ideas into production at NEXUS Labs.'
    ],
    skills: () => [
      'Frontend  ████████████████████░░  92%',
      'Backend   ██████████████████░░░░  88%',
      'DevOps    ███████████████░░░░░░░  76%',
      'Design    █████████████████░░░░░  84%'
    ],
    projects: () => [
      '01. Aurora Grid       — realtime data-viz platform',
      '02. Pulsewave CMS     — headless content engine',
      '03. Nexus Auth        — zero-trust identity service',
      '04. Driftline         — logistics tracking network',
      '05. Cipher Vault      — end-to-end encrypted notes',
      '06. Glasswing UI      — component design system',
      'Scroll to the Projects section for full detail.'
    ],
    contact: () => [
      'Email    : hello@kiravoss.dev',
      'GitHub   : github.com/kiravoss',
      'LinkedIn : linkedin.com/in/kiravoss',
      'Or just scroll to the Contact section and send a transmission.'
    ],
    whoami: () => ['guest@nexus — session scope: read-only, admiring the view.'],
    github: () => {
      window.open('https://github.com', '_blank', 'noopener');
      return ['Opening github.com in a new tab...'];
    },
    date: () => [new Date().toDateString()],
    time: () => [new Date().toLocaleTimeString()],
    clear: () => { output.innerHTML = ''; return null; }
  };

  function printLine(text, cls) {
    const div = document.createElement('div');
    if (cls) div.className = cls;
    div.textContent = text;
    output.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function printCommandEcho(cmd) {
    const div = document.createElement('div');
    div.className = 'term-line-cmd';
    div.textContent = cmd;
    output.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    printCommandEcho(raw);
    if (!cmd) return;

    history.push(raw);
    historyIndex = history.length;

    if (cmd === 'clear') { COMMANDS.clear(); return; }

    const handler = COMMANDS[cmd];
    if (!handler) {
      printLine(`command not found: ${cmd} — type "help" for a list.`, 'term-line-err');
      return;
    }
    const lines = handler();
    if (!lines) return;
    // Slight staggered reveal per line for a "realistic" terminal feel.
    lines.forEach((line, i) => {
      setTimeout(() => printLine(line, 'term-line-dim'), i * 55);
    });
  }

  function bootSequence() {
    const boot = [
      'NEXUS_OS terminal v2.1.0 — connection established.',
      'Type "help" to list available commands.'
    ];
    boot.forEach((line, i) => setTimeout(() => printLine(line, 'term-line-ok'), i * 220));
  }
  bootSequence();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = input.value;
      input.value = '';
      runCommand(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length) {
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (history.length) {
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || '';
      }
    }
  });

  body.addEventListener('click', () => input.focus());
})();