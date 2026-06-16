/* ============================================================
   DA-V1 Hauptskript
   ============================================================ */

const MODULES = [
  { id: 'index',    file: '../index.html',                       title: 'Dashboard',                       color: 'var(--color-start)', cls: 'mod-start' },
  { id: 'm01',      file: '../modules/01-getting-started.html',  title: 'Setup & Tools',                   color: 'var(--color-start)', cls: 'mod-start' },
  { id: 'm01b',     file: '../modules/01b-python-einfuehrung.html', title: 'Python Einführung',            color: 'var(--color-start)', cls: 'mod-start' },
  { id: 'm02',      file: '../modules/02-variablen-datentypen.html', title: 'Variablen & Datentypen',      color: 'var(--color-py1)',   cls: 'mod-py1'   },
  { id: 'm03',      file: '../modules/03-loops-conditions.html', title: 'Loops & Conditions',              color: 'var(--color-py2)',   cls: 'mod-py2'   },
  { id: 'm04',      file: '../modules/04-funktionen-packages.html', title: 'Funktionen & Packages',        color: 'var(--color-py3)',   cls: 'mod-py3'   },
  { id: 'm05',      file: '../modules/05-data-science-prozess.html', title: 'Data Science Prozess',        color: 'var(--color-ds)',    cls: 'mod-ds'    },
  { id: 'm06a',     file: '../modules/06-data-understanding-single.html', title: 'Data Understanding I',  color: 'var(--color-du1)',   cls: 'mod-du1'   },
  { id: 'm06b',     file: '../modules/07-data-understanding-multivariate.html', title: 'Data Understanding II', color: 'var(--color-du2)', cls: 'mod-du2' },
  { id: 'm07',      file: '../modules/08-data-preparation.html', title: 'Data Preparation',               color: 'var(--color-dp)',    cls: 'mod-dp'    },
  { id: 'm08',      file: '../modules/09-machine-learning.html', title: 'Machine Learning Intro',         color: 'var(--color-ml)',    cls: 'mod-ml'    },
];

/* ---------- Fortschritt (localStorage) ---------- */
function getProgress() {
  try { return JSON.parse(localStorage.getItem('da_progress') || '{}'); } catch { return {}; }
}
function markDone(moduleId) {
  const p = getProgress();
  p[moduleId] = true;
  localStorage.setItem('da_progress', JSON.stringify(p));
  updateProgressUI();
}
function isDone(moduleId) { return !!getProgress()[moduleId]; }

function updateProgressUI() {
  const p = getProgress();
  const done = Object.keys(p).filter(k => p[k]).length;
  const total = MODULES.length - 1; // ohne Dashboard (jetzt 10 Module)
  const pct = Math.round((done / total) * 100);

  const fill = document.querySelector('.progress-fill');
  const label = document.querySelector('.progress-count');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${done} / ${total} Module`;

  document.querySelectorAll('.nav-item[data-id]').forEach(el => {
    const id = el.dataset.id;
    if (p[id]) el.classList.add('done'); else el.classList.remove('done');
  });
  document.querySelectorAll('.module-card[data-id]').forEach(el => {
    const id = el.dataset.id;
    if (p[id]) el.classList.add('done'); else el.classList.remove('done');
  });
}

/* ---------- Aktive Seite markieren ---------- */
function markActiveNav() {
  const current = window.location.pathname;
  document.querySelectorAll('.nav-item[data-href]').forEach(el => {
    const href = el.dataset.href;
    if (current.endsWith(href) || (current.endsWith('/') && href === 'index.html')) {
      el.classList.add('active');
    }
  });
}

/* ---------- Coding Yoga: ausklappen ---------- */
function initYogaBoxes() {
  document.querySelectorAll('.yoga-header').forEach(header => {
    header.addEventListener('click', () => {
      const box = header.closest('.yoga-box');
      const body = box.querySelector('.yoga-body');
      const arrow = header.querySelector('.yoga-arrow');
      body.classList.toggle('open');
      arrow.classList.toggle('open');
    });
  });
  document.querySelectorAll('.yoga-reveal').forEach(btn => {
    btn.addEventListener('click', () => {
      const sol = btn.nextElementSibling;
      if (sol && sol.classList.contains('yoga-solution')) {
        sol.classList.toggle('open');
        btn.textContent = sol.classList.contains('open') ? '🙈 Lösung verbergen' : '👀 Lösung anzeigen';
      }
    });
  });
}

/* ---------- Quiz ---------- */
function initQuizzes() {
  document.querySelectorAll('.quiz-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const question = opt.closest('.quiz-question-block');
      if (!question || question.dataset.answered) return;
      question.dataset.answered = '1';

      const correct = opt.dataset.correct === 'true';
      const feedback = question.querySelector('.quiz-feedback');

      opt.classList.add(correct ? 'correct' : 'wrong');
      if (!correct) {
        question.querySelectorAll('.quiz-option[data-correct="true"]').forEach(c => c.classList.add('correct'));
      }
      if (feedback) {
        feedback.textContent = correct ? '✅ Richtig!' : '❌ Nicht ganz – die richtige Antwort ist grün markiert.';
        feedback.style.color = correct ? '#065f46' : '#991b1b';
        feedback.classList.add('show');
      }
    });
  });
}

/* ---------- Code Copy-Buttons ---------- */
function initCodeCopy() {
  document.querySelectorAll('.code-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pre = btn.closest('.code-block').querySelector('pre code');
      if (!pre) return;
      navigator.clipboard.writeText(pre.textContent).then(() => {
        btn.textContent = '✓ Kopiert';
        btn.classList.add('copied');
        setTimeout(() => { btn.textContent = 'Kopieren'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });
}

/* ---------- "Modul gelesen" Button ---------- */
function initDoneButtons() {
  document.querySelectorAll('.mark-done-btn').forEach(btn => {
    const id = btn.dataset.module;
    if (!id) return;
    if (isDone(id)) {
      btn.textContent = '✅ Bereits erledigt';
      btn.style.background = '#10b981';
    }
    btn.addEventListener('click', () => {
      markDone(id);
      btn.textContent = '✅ Modul erledigt!';
      btn.style.background = '#10b981';
    });
  });
}

/* ---------- Slide Navigation ---------- */
function initSlides() {
  const main = document.querySelector('.main');
  if (!main) return;

  const h2s = Array.from(main.querySelectorAll('h2.section-title'));
  if (h2s.length < 2) return;

  // Propagate --mc to .main so slide UI inherits the module color
  const badge = main.querySelector('.module-badge');
  if (badge) {
    const colorMap = {
      'mod-start': 'var(--color-start)',
      'mod-py1':   'var(--color-py1)',
      'mod-py2':   'var(--color-py2)',
      'mod-py3':   'var(--color-py3)',
      'mod-ds':    'var(--color-ds)',
      'mod-du1':   'var(--color-du1)',
      'mod-du2':   'var(--color-du2)',
      'mod-dp':    'var(--color-dp)',
      'mod-ml':    'var(--color-ml)',
    };
    for (const [cls, val] of Object.entries(colorMap)) {
      if (badge.classList.contains(cls)) { main.style.setProperty('--mc', val); break; }
    }
  }

  // Hide the ToC div (first div after page-header containing anchor links)
  const pageHeader = main.querySelector('.page-header');
  if (pageHeader) {
    let sib = pageHeader.nextElementSibling;
    if (sib && sib.tagName === 'DIV' && sib.querySelector('a[href^="#"]')) {
      sib.style.display = 'none';
    }
  }

  // Collect nodes that belong to each section (between consecutive h2.section-titles)
  const sections = h2s.map(h2 => {
    const nodes = [];
    let node = h2;
    while (node) {
      const isNextSection = node !== h2 && node.classList &&
        node.tagName === 'H2' && node.classList.contains('section-title');
      const isPageNav = node.classList && node.classList.contains('page-nav');
      if (isNextSection || isPageNav) break;
      nodes.push(node);
      node = node.nextElementSibling;
    }
    return { title: h2.textContent.trim(), nodes };
  });

  // Wrap each section into a .slide-section div
  const slideEls = sections.map((sec, i) => {
    const el = document.createElement('div');
    el.className = 'slide-section' + (i === 0 ? ' active' : '');
    el.dataset.idx = i;
    sec.nodes[0].parentNode.insertBefore(el, sec.nodes[0]);
    sec.nodes.forEach(n => el.appendChild(n));
    return el;
  });

  const n = sections.length;

  // Build tab bar
  const tabBar = document.createElement('div');
  tabBar.className = 'slide-tabbar';
  tabBar.innerHTML = sections.map((s, i) =>
    `<button class="slide-tab${i === 0 ? ' active' : ''}" data-idx="${i}">${s.title}</button>`
  ).join('');
  slideEls[0].parentNode.insertBefore(tabBar, slideEls[0]);

  // Progress bar
  const progBar = document.createElement('div');
  progBar.className = 'slide-progress';
  progBar.innerHTML = '<div class="slide-progress-fill"></div>';
  tabBar.after(progBar);

  // Bottom nav (dots only when ≤ 12 sections)
  const showDots = n <= 12;
  const dotsHTML = showDots
    ? sections.map((_, i) =>
        `<span class="slide-dot${i === 0 ? ' active' : ''}" data-dot="${i}"></span>`
      ).join('')
    : '';

  const bottomNav = document.createElement('div');
  bottomNav.className = 'slide-bottom-nav';
  bottomNav.innerHTML = `
    <button class="slide-btn slide-btn-prev" disabled>← Zurück</button>
    <div class="slide-meta">
      <div class="slide-dots">${dotsHTML}</div>
      <span class="slide-counter">1 / ${n}</span>
    </div>
    <button class="slide-btn slide-btn-next">Weiter →</button>
  `;

  // Place bottom nav after all slides but before .page-nav
  const pageNav = main.querySelector('.page-nav');
  if (pageNav) main.insertBefore(bottomNav, pageNav);
  else main.appendChild(bottomNav);

  // Keyboard hint (shown once)
  const hint = document.createElement('p');
  hint.className = 'slide-kbd-hint';
  hint.innerHTML = '<kbd>←</kbd> <kbd>→</kbd> Pfeiltasten zum Navigieren';
  bottomNav.after(hint);

  let cur = 0;

  function goTo(idx) {
    if (idx === cur || idx < 0 || idx >= n) return;
    const fwd = idx > cur;
    slideEls[cur].classList.remove('active');
    const anim = fwd ? 's-enter-right' : 's-enter-left';
    slideEls[idx].classList.add('active', anim);
    setTimeout(() => slideEls[idx].classList.remove(anim), 400);
    cur = idx;
    syncUI();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function syncUI() {
    tabBar.querySelectorAll('.slide-tab').forEach((t, i) =>
      t.classList.toggle('active', i === cur)
    );
    bottomNav.querySelectorAll('.slide-dot').forEach((d, i) =>
      d.classList.toggle('active', i === cur)
    );
    bottomNav.querySelector('.slide-counter').textContent = `${cur + 1} / ${n}`;
    bottomNav.querySelector('.slide-btn-prev').disabled = cur === 0;
    const nxt = bottomNav.querySelector('.slide-btn-next');
    if (cur === n - 1) { nxt.textContent = '✓ Fertig'; nxt.disabled = true; }
    else               { nxt.textContent = 'Weiter →'; nxt.disabled = false; }
    const fill = progBar.querySelector('.slide-progress-fill');
    fill.style.width = `${((cur + 1) / n) * 100}%`;
  }

  // Events: tabs
  tabBar.addEventListener('click', e => {
    const t = e.target.closest('.slide-tab');
    if (t) goTo(+t.dataset.idx);
  });

  // Events: bottom nav buttons + dots
  bottomNav.addEventListener('click', e => {
    if (e.target.closest('.slide-btn-prev'))  goTo(cur - 1);
    else if (e.target.closest('.slide-btn-next')) goTo(cur + 1);
    else { const d = e.target.closest('.slide-dot'); if (d) goTo(+d.dataset.dot); }
  });

  // Events: keyboard
  document.addEventListener('keydown', e => {
    const tag = document.activeElement.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON') return;
    if (e.key === 'ArrowRight') goTo(cur + 1);
    if (e.key === 'ArrowLeft')  goTo(cur - 1);
  });

  // Events: touch swipe
  let touchStartX = 0;
  main.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  main.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 50) goTo(dx > 0 ? cur + 1 : cur - 1);
  }, { passive: true });

  // Jump to anchor from URL hash
  if (window.location.hash) {
    const target = main.querySelector(window.location.hash);
    if (target) {
      const parentSlide = target.closest('.slide-section');
      if (parentSlide) {
        cur = +parentSlide.dataset.idx;
        slideEls.forEach((s, i) => s.classList.toggle('active', i === cur));
      }
    }
  }

  syncUI();
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
  markActiveNav();
  initSlides();
  initYogaBoxes();
  initQuizzes();
  initCodeCopy();
  initDoneButtons();
});
