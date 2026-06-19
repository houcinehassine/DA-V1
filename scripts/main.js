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
        feedback.style.color = correct ? '#10b981' : '#f87171';
        feedback.classList.add('show');
      }

      // "Mehr Info"-Link nach dem Beantworten einblenden
      const moreInfo = question.querySelector('.quiz-mehr-info');
      if (moreInfo) moreInfo.classList.add('visible');
    });
  });
}

/* ---------- Auto-upgrade pre.ref-code → .code-block wrapper ---------- */
function initRefCodeBlocks() {
  document.querySelectorAll('pre.ref-code, pre:not(.exercise-hl-overlay)').forEach(pre => {
    if (pre.closest('.code-block')) return;
    const codeEl = pre.querySelector('code');
    if (!codeEl) return;

    const block = document.createElement('div');
    block.className = 'code-block';

    const header = document.createElement('div');
    header.className = 'code-header';

    const langSpan = document.createElement('span');
    langSpan.className = 'code-lang';
    langSpan.textContent = 'PYTHON';

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.title = 'Code kopieren';
    copyBtn.textContent = 'Kopieren';

    header.appendChild(langSpan);
    header.appendChild(copyBtn);

    pre.parentNode.insertBefore(block, pre);
    block.appendChild(header);
    block.appendChild(pre);
    pre.classList.remove('ref-code');
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

/* ============================================================
   CODE RUNNER — Python via Pyodide (WebAssembly)
   ============================================================ */

let _pyodide      = null;
let _pyLoading    = false;
let _pyCallbacks  = [];

function _esc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;');
}

/* Lazy-load Pyodide — only on first "Ausführen" click */
async function _getPyodide() {
  if (_pyodide) return _pyodide;
  if (_pyLoading) return new Promise(res => _pyCallbacks.push(res));
  _pyLoading = true;

  // Inject Pyodide CDN script
  await new Promise((res, rej) => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
    s.onload = res; s.onerror = rej;
    document.head.appendChild(s);
  });

  _pyodide = await loadPyodide();

  /* One-time global setup: stdout capture + matplotlib hook */
  await _pyodide.runPythonAsync(`
import sys, io

class _CaptureIO:
    def __init__(self): self._b = []
    def write(self, s): self._b.append(str(s))
    def flush(self): pass
    def getvalue(self): return ''.join(self._b)
    def clear(self): self._b.clear()

_capture = _CaptureIO()
sys.stdout = _capture
sys.stderr = _capture

_figs_b64 = []
_mpl_ready = False

def _setup_mpl():
    global _mpl_ready
    if _mpl_ready: return
    try:
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        def _show(*a, **kw):
            import io as _io, base64 as _b64
            buf = _io.BytesIO()
            plt.savefig(buf, format='png', bbox_inches='tight', dpi=110, facecolor='white')
            plt.close('all')
            buf.seek(0)
            _figs_b64.append(_b64.b64encode(buf.read()).decode())
        plt.show = _show
        _mpl_ready = True
    except ImportError:
        pass
`);

  _pyLoading = false;
  _pyCallbacks.forEach(cb => cb(_pyodide));
  _pyCallbacks = [];
  return _pyodide;
}

/* Detect which packages the code needs */
function _detectPkgs(code) {
  const map = [
    [/\bnumpy\b/,                          'numpy'],
    [/\bpandas\b/,                         'pandas'],
    [/\bmatplotlib\b/,                     'matplotlib'],
    [/\bseaborn\b/,                        'seaborn'],
    [/\bscipy\b/,                          'scipy'],
    [/\bsklearn\b|scikit.?learn/,         'scikit-learn'],
  ];
  return map.filter(([re]) => re.test(code)).map(([,name]) => name);
}

/* Run a single code block */
async function _runBlock(code, outputEl, runBtn) {
  runBtn.textContent = '⏳';
  runBtn.classList.add('running');
  runBtn.disabled = true;

  outputEl.classList.add('visible');
  outputEl.innerHTML = `
    <div class="co-loading">
      <span class="co-spinner"></span>Lade Python-Umgebung…
    </div>`;

  try {
    const py = await _getPyodide();

    /* Load required packages */
    const pkgs = _detectPkgs(code);
    const builtins = pkgs.filter(p => p !== 'seaborn');
    const pipPkgs  = pkgs.filter(p => p === 'seaborn');

    if (pkgs.length) {
      outputEl.innerHTML = `
        <div class="co-loading">
          <span class="co-spinner"></span>Lade Pakete: ${pkgs.join(', ')}…
        </div>`;
      if (builtins.length) await py.loadPackage(builtins);
      if (pipPkgs.length) {
        await py.loadPackage('micropip');
        const micropip = py.pyimport('micropip');
        for (const p of pipPkgs) await micropip.install(p);
      }
    }

    /* Clear buffers + patch matplotlib if needed */
    py.runPython('_capture.clear(); _figs_b64.clear()');
    if (pkgs.includes('matplotlib') || pkgs.includes('seaborn')) {
      await py.runPythonAsync('_setup_mpl()');
    }

    /* Execute user code */
    await py.runPythonAsync(code);

    /* Collect results */
    const text = py.runPython('_capture.getvalue()').trim();
    const figs  = py.runPython('list(_figs_b64)').toJs();

    /* Build output HTML */
    let body = '';
    if (text) body += `<pre class="co-text">${_esc(text)}</pre>`;
    figs.forEach(b64 => {
      body += `<img class="co-img" src="data:image/png;base64,${b64}" alt="Plot">`;
    });
    if (!body) body = '<span class="co-ok">✓ Ausgeführt (keine Ausgabe)</span>';

    outputEl.innerHTML = `
      <div class="co-toolbar">
        <span class="co-toolbar-label">Ausgabe</span>
        <button class="co-clear-btn" title="Ausgabe ausblenden">✕</button>
      </div>
      <div class="co-body">${body}</div>`;

    outputEl.classList.add('visible');
    outputEl.querySelector('.co-clear-btn').addEventListener('click', () => {
      outputEl.classList.remove('visible');
      outputEl.innerHTML = '';
    });

  } catch (err) {
    /* Capture any output printed before the crash */
    let preOutput = '';
    try { preOutput = py.runPython('_capture.getvalue()').trim(); } catch (_) {}

    /* Show full Python traceback as-is */
    const raw = (err.message || String(err)).trim();

    let body = '';
    if (preOutput) body += `<pre class="co-text">${_esc(preOutput)}</pre>`;
    body += `<pre class="co-error">${_esc(raw)}</pre>`;

    outputEl.innerHTML = `
      <div class="co-toolbar co-err">
        <span class="co-toolbar-label">Fehler</span>
        <button class="co-clear-btn" title="Ausblenden">✕</button>
      </div>
      <div class="co-body">${body}</div>`;

    outputEl.classList.add('visible');
    outputEl.querySelector('.co-clear-btn').addEventListener('click', () => {
      outputEl.classList.remove('visible');
      outputEl.innerHTML = '';
    });
  } finally {
    runBtn.textContent = '▶ Ausführen';
    runBtn.classList.remove('running');
    runBtn.disabled = false;
  }
}

/* Inject run buttons into every PYTHON code block */
function initCodeRunner() {
  document.querySelectorAll('.code-block').forEach(block => {
    const langEl = block.querySelector('.code-lang');
    if (!langEl || langEl.textContent.trim() !== 'PYTHON') return;

    const header  = block.querySelector('.code-header');
    const copyBtn = header && header.querySelector('.code-copy-btn');
    if (!header) return;

    /* Separator label — only outside ref-cards and info boxes */
    const inCard = block.closest('.ref-card-body, .ref-card, .qa-a, .info-box, .tip-box, .yoga-body, .exa-box');
    if (!inCard) {
      const sep = document.createElement('div');
      sep.className = 'code-block-sep';
      sep.textContent = 'Code-Beispiel';
      block.parentNode.insertBefore(sep, block);
    }

    /* Build run button */
    const runBtn = document.createElement('button');
    runBtn.className = 'code-run-btn';
    runBtn.textContent = '▶ Ausführen';

    /* Wrap both buttons in a group div */
    const group = document.createElement('div');
    group.className = 'code-btn-group';
    if (copyBtn) {
      header.insertBefore(group, copyBtn);
      group.appendChild(runBtn);
      group.appendChild(copyBtn);
    } else {
      header.appendChild(group);
      group.appendChild(runBtn);
    }

    /* Output area below <pre> */
    const outputEl = document.createElement('div');
    outputEl.className = 'run-output';
    block.appendChild(outputEl);

    runBtn.addEventListener('click', () => {
      const code = block.querySelector('pre code')?.textContent || '';
      _runBlock(code, outputEl, runBtn);
    });
  });
}

/* ============================================================
   EXERCISE BLOCKS — Editierbare Aufgaben + Musterlösung
   ============================================================ */
function initExerciseBlocks() {
  document.querySelectorAll('.code-block').forEach(block => {
    const langEl = block.querySelector('.code-lang');
    if (!langEl || langEl.textContent.trim() !== 'AUFGABE') return;

    const header = block.querySelector('.code-header');
    if (!header) return;

    // Starter-Code aus <pre><code> holen
    const pre = block.querySelector('pre');
    if (!pre) return;
    const starterCode = (pre.querySelector('code') ?? pre).textContent;

    // Editable textarea erstellen
    const textarea = document.createElement('textarea');
    textarea.className = 'exercise-editor';
    textarea.value = starterCode;
    textarea.spellcheck = false;
    textarea.setAttribute('autocomplete', 'off');
    textarea.setAttribute('autocorrect', 'off');
    textarea.setAttribute('autocapitalize', 'off');

    // Auto-Höhe
    function autoHeight() {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight + 4, 480) + 'px';
    }
    setTimeout(autoHeight, 0);
    textarea.addEventListener('input', autoHeight);

    // Tab → 4 Leerzeichen, Ctrl/Cmd+Enter → Ausführen
    textarea.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = textarea.selectionStart, end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, s) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = s + 4;
        autoHeight();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runBtn.click();
      }
    });

    pre.replaceWith(textarea);

    // Bestehenden Kopieren-Button entfernen
    const existingCopy = header.querySelector('.code-copy-btn');
    if (existingCopy) existingCopy.remove();

    // Button-Gruppe: Ausführen + Reset
    const runBtn = document.createElement('button');
    runBtn.className = 'code-run-btn';
    runBtn.textContent = '▶ Ausführen';

    const resetBtn = document.createElement('button');
    resetBtn.className = 'code-copy-btn ex-reset-btn';
    resetBtn.title = 'Starter-Code zurücksetzen';
    resetBtn.textContent = '↺ Reset';

    const group = document.createElement('div');
    group.className = 'code-btn-group';
    header.appendChild(group);
    group.appendChild(runBtn);
    group.appendChild(resetBtn);

    // Output-Bereich
    const outputEl = document.createElement('div');
    outputEl.className = 'run-output';
    block.appendChild(outputEl);

    runBtn.addEventListener('click', () => _runBlock(textarea.value, outputEl, runBtn));

    resetBtn.addEventListener('click', () => {
      textarea.value = starterCode;
      autoHeight();
      outputEl.classList.remove('visible');
      outputEl.innerHTML = '';
    });

    // Separator-Label vor dem Block
    const sep = document.createElement('div');
    sep.className = 'code-block-sep';
    sep.textContent = 'Meine Lösung';
    block.parentNode.insertBefore(sep, block);

    // Musterlösung-Button einfügen (nach exercise-box oder nach dem Block)
    const exerciseBox = block.closest('.exercise-box');
    const anchor = exerciseBox ?? block;
    const solutionEl = anchor.nextElementSibling;
    if (solutionEl && solutionEl.classList.contains('exercise-solution')) {
      const revealBtn = document.createElement('button');
      revealBtn.className = 'solution-reveal-btn';
      revealBtn.textContent = '💡 Musterlösung anzeigen';
      revealBtn.addEventListener('click', () => {
        const open = solutionEl.classList.toggle('visible');
        revealBtn.textContent = open ? '🙈 Musterlösung verbergen' : '💡 Musterlösung anzeigen';
        if (open) solutionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
      anchor.after(revealBtn);
    }
  });
}

/* ---------- Klausurbeispiele: Lösung verdecken ---------- */
function initExaReveal() {
  document.querySelectorAll('.exa-box').forEach(box => {
    const solutionEl = box.querySelector('.exa-solution');
    if (!solutionEl) return;

    const revealBtn = document.createElement('button');
    revealBtn.className = 'exa-reveal-btn';
    revealBtn.textContent = '💡 Lösung anzeigen';
    revealBtn.addEventListener('click', () => {
      const open = solutionEl.classList.toggle('visible');
      revealBtn.textContent = open ? '🙈 Lösung verbergen' : '💡 Lösung anzeigen';
      if (open) solutionEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    box.insertBefore(revealBtn, solutionEl);
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

/* Shorten a slide title for compact tab display */
function _tabLabel(full) {
  // Extract leading emoji (may be multi-char sequences)
  const m = full.match(/^([\u{1F000}-\u{1FFFF}][️⃣]?|[☀-➿][️]?|\p{Emoji_Presentation})/u);
  const emoji = m ? m[0] + ' ' : '';
  const text  = full.replace(/^[\s\S]*?\s/, '').trim(); // drop everything up to first space
  // Keep first 3 words of the text part
  const short = text.split(/\s+/).slice(0, 3).join(' ');
  return (emoji + short).trim() || full;
}

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
      'mod-ex':    'var(--color-ex)',
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

  // Build tab bar — compact underline tabs with shortened labels
  const tabBar = document.createElement('div');
  tabBar.className = 'slide-tabbar';
  tabBar.innerHTML = sections.map((s, i) =>
    `<button class="slide-tab${i === 0 ? ' active' : ''}" data-idx="${i}" title="${s.title}">${_tabLabel(s.title)}</button>`
  ).join('');
  slideEls[0].parentNode.insertBefore(tabBar, slideEls[0]);

  // Progress bar
  const progBar = document.createElement('div');
  progBar.className = 'slide-progress';
  progBar.innerHTML = '<div class="slide-progress-fill"></div>';
  tabBar.after(progBar);

  // Bottom nav — dots (pill style) + counter + kbd hint inline
  const showDots = n <= 14;
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
      <span class="slide-kbd-hint"><kbd>←</kbd><kbd>→</kbd></span>
    </div>
    <button class="slide-btn slide-btn-next">Weiter →</button>
  `;

  // Place bottom nav after all slides but before .page-nav
  const pageNav = main.querySelector('.page-nav');
  if (pageNav) main.insertBefore(bottomNav, pageNav);
  else main.appendChild(bottomNav);

  let cur = 0;

  // Scroll the active tab into view within the tab bar
  function scrollActiveTab() {
    const tab = tabBar.querySelectorAll('.slide-tab')[cur];
    if (tab) tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  function goTo(idx) {
    if (idx === cur || idx < 0 || idx >= n) return;
    const fwd = idx > cur;
    slideEls[cur].classList.remove('active');
    const anim = fwd ? 's-enter-right' : 's-enter-left';
    slideEls[idx].classList.add('active', anim);
    setTimeout(() => slideEls[idx].classList.remove(anim), 350);
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
    progBar.querySelector('.slide-progress-fill').style.width = `${((cur + 1) / n) * 100}%`;
    scrollActiveTab();
  }

  // Events: tabs
  tabBar.addEventListener('click', e => {
    const t = e.target.closest('.slide-tab');
    if (t) goTo(+t.dataset.idx);
  });

  // Events: bottom nav buttons + dots
  bottomNav.addEventListener('click', e => {
    if (e.target.closest('.slide-btn-prev'))       goTo(cur - 1);
    else if (e.target.closest('.slide-btn-next'))  goTo(cur + 1);
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

/* ============================================================
   SYNTAX HIGHLIGHTING — highlight.js (Python)
   ============================================================ */

function initSyntaxHighlighting() {
  const hljs = window.hljs;
  if (!hljs) return; /* highlight.js nicht geladen */

  hljs.configure({ ignoreUnescapedHTML: true });

  /* Alle statischen Code-Blöcke — Sprache aus Header-Label ableiten */
  document.querySelectorAll('.code-block pre code').forEach(el => {
    const block = el.closest('.code-block');
    const lang  = block?.querySelector('.code-lang')?.textContent.trim() ?? '';
    if (['PYTHON', 'AUFGABE', 'LÖSUNG', 'SOLUTION'].includes(lang)) {
      el.classList.add('language-python');
    }
    hljs.highlightElement(el);
  });

  /* Editierbare Aufgaben-Zellen — Overlay-Technik */
  document.querySelectorAll('.exercise-editor').forEach(ta => {
    _overlayHighlight(ta, hljs);
  });
}

/* Legt einen syntax-gefärbten Layer hinter die transparente Textarea */
function _overlayHighlight(textarea, hljs) {
  const wrap = document.createElement('div');
  wrap.className = 'exercise-editor-wrap';
  textarea.parentNode.insertBefore(wrap, textarea);

  /* Overlay: Pre+Code hinter der Textarea */
  const pre  = document.createElement('pre');
  pre.className = 'exercise-hl-overlay';
  pre.setAttribute('aria-hidden', 'true');
  const codeEl = document.createElement('code');
  codeEl.className = 'language-python';
  pre.appendChild(codeEl);
  wrap.appendChild(pre);

  /* Textarea in den Wrap verschieben + transparent machen */
  wrap.appendChild(textarea);
  textarea.classList.add('hl-active');

  function sync() {
    /* Trailing-Newline verhindert dass letzte Zeile abgeschnitten wird */
    codeEl.textContent = textarea.value + '\n';
    hljs.highlightElement(codeEl);
    pre.scrollTop  = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  }

  sync();
  textarea.addEventListener('input',  sync);
  textarea.addEventListener('scroll', () => {
    pre.scrollTop  = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  });
}

/* ---------- Scroll Progress Bar ---------- */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  const main = document.querySelector('.main');
  const target = main || window;

  function update() {
    const el = main || document.documentElement;
    const scrolled = el.scrollTop || window.scrollY;
    const total = el.scrollHeight - (main ? el.clientHeight : window.innerHeight);
    bar.style.width = (total > 0 ? Math.min(scrolled / total * 100, 100) : 0) + '%';
  }

  (main || window).addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Sidebar Collapse (Desktop) ---------- */
function initSidebarCollapse() {
  const sidebar = document.querySelector('.sidebar');
  const app     = document.querySelector('.app');
  if (!sidebar || !app) return;

  const PREF = 'da_sidebar_collapsed';

  // Close button inside sidebar logo
  const closeBtn = document.createElement('button');
  closeBtn.className = 'sidebar-close-btn';
  closeBtn.title = 'Sidebar schließen';
  closeBtn.innerHTML = '‹';
  const logo = sidebar.querySelector('.sidebar-logo');
  if (logo) logo.appendChild(closeBtn);

  // Re-open rail at left edge
  const rail = document.createElement('button');
  rail.className = 'sidebar-open-rail';
  rail.title = 'Sidebar öffnen';
  rail.innerHTML = '›';
  document.body.appendChild(rail);

  function collapse() {
    document.body.classList.add('sidebar-collapsed');
    localStorage.setItem(PREF, '1');
  }
  function expand() {
    document.body.classList.remove('sidebar-collapsed');
    localStorage.removeItem(PREF);
  }

  closeBtn.addEventListener('click', collapse);
  rail.addEventListener('click', expand);

  if (localStorage.getItem(PREF)) {
    document.body.classList.add('sidebar-collapsed');
  }
}

/* ---------- Mobile Sidebar Toggle ---------- */
function initMobileSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // Overlay behind sidebar
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  // Hamburger button
  const btn = document.createElement('button');
  btn.className = 'sidebar-toggle';
  btn.setAttribute('aria-label', 'Menü öffnen');
  btn.innerHTML = '☰';
  document.body.appendChild(btn);

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('visible');
    btn.innerHTML = '✕';
    btn.setAttribute('aria-label', 'Menü schließen');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
    btn.innerHTML = '☰';
    btn.setAttribute('aria-label', 'Menü öffnen');
  }

  btn.addEventListener('click', () => {
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);

  // Close when a nav link is clicked (navigates away)
  sidebar.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  updateProgressUI();
  markActiveNav();
  initSlides();
  initYogaBoxes();
  initQuizzes();
  initRefCodeBlocks();
  initCodeCopy();
  initCodeRunner();
  initExerciseBlocks();
  initExaReveal();
  initDoneButtons();
  initScrollProgress();
  initSidebarCollapse();
  initMobileSidebar();
  initSyntaxHighlighting(); /* async — läuft im Hintergrund */
});
