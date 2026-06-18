/* ============================================================
   DA-V1 Suche (Fuse.js)
   ============================================================ */

const SEARCH_INDEX = [
  /* --- 01: Setup & Tools --- */
  { title: 'Anaconda installieren', module: '01 – Setup & Tools', tag: 'python', href: '../modules/01-getting-started.html#anaconda', snippet: 'Anaconda Download, python --version, conda --version, Paketmanager' },
  { title: 'Virtual Environments', module: '01 – Setup & Tools', tag: 'python', href: '../modules/01-getting-started.html#virtualenv', snippet: 'conda create, conda activate, pip install, data-science-mit-python' },
  { title: 'JupyterLab Interface', module: '01 – Setup & Tools', tag: 'python', href: '../modules/01-getting-started.html#jupyter', snippet: 'Launcher, Zell-Typen: Code, Markdown, Raw, Kernel, Tastenkürzel Shift+Enter' },
  { title: 'Spyder, PyCharm, Google Colab', module: '01 – Setup & Tools', tag: 'python', href: '../modules/01-getting-started.html#tools', snippet: 'Weitere Python-Tools, Vergleich der IDEs, wann welches Tool nutzen' },
  { title: 'Dateitypen .py und .ipynb', module: '01 – Setup & Tools', tag: 'python', href: '../modules/01-getting-started.html#dateitypen', snippet: 'Python-Skript vs Jupyter Notebook, JSON-Format, Unterschied' },

  /* --- 01b: Python Einführung --- */
  { title: 'Was ist Data Science?', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#datascience', snippet: 'Venn-Diagramm: Programmierung, Mathematik/Statistik, Domänenwissen, Anwendungen' },
  { title: 'Why Python?', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#warum-python', snippet: 'Populär, effizient, Clean Code, riesige Community, open source, Bibliotheken' },
  { title: 'Python Geschichte & Versionen', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#geschichte', snippet: 'Python 2 vs Python 3, End of Life 2020, Very-High-Level-Language' },
  { title: 'Zen of Python', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#zen', snippet: 'import this, 19 Designprinzipien, Beautiful is better than ugly, Readability counts' },
  { title: 'PEP 8 Style Guide', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#pep8', snippet: 'snake_case, UPPER_CASE, Leerzeichen um Operatoren, 4 Spaces Einrückung, Namenskonventionen' },
  { title: 'Indentation (Einrückung)', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#indentation', snippet: 'Python nutzt Einrückung statt geschweifte Klammern, IndentationError, 4 Spaces' },
  { title: 'Literatur & Ressourcen', module: '01b – Python Einführung', tag: 'python', href: '../modules/01b-python-einfuehrung.html#literatur', snippet: 'VanderPlas, Downey ThinkPython, Kaggle Tutorial, Open Source Bücher, Empfehlungen' },

  /* --- 02: Variablen & Datentypen --- */
  { title: 'Variablen & Regeln', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#variablen', snippet: 'snake_case, Konstanten, Statement vs Expression, Zuweisung mit =, Bezeichner' },
  { title: 'Reserved Words (Schlüsselwörter)', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#reserved', snippet: 'False, None, True, and, def, for, if, import, lambda, return, while, class' },
  { title: 'Zahlen: int, float, Operatoren', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#zahlen', snippet: '+, -, *, /, **, %, //, Fließkommazahlen, ganzzahlige Division, Modulo' },
  { title: 'Boolean & Vergleichsoperatoren', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#boolean', snippet: 'True, False, ==, !=, <, >, <=, >=, and, or, not, Kettenvergleiche' },
  { title: 'Strings: Formatierung & Methoden', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#strings', snippet: 'f-Strings, .upper(), .lower(), .find(), .replace(), .strip(), .split(), in-Operator' },
  { title: 'Listen: Indexing, Slicing & Methoden', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#listen', snippet: 'append, pop, remove, sort, reverse, Slicing [1:3], * Repetition, List Comprehension' },
  { title: 'Tuples', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#tuples', snippet: 'immutable, (1,2,3), Entpacken, wann Tuple statt List verwenden' },
  { title: 'Sets (Mengen)', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#sets', snippet: 'Duplikate entfernen, add, remove, Schnittmenge &, Vereinigung |, Differenz -' },
  { title: 'Dictionaries', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#dictionaries', snippet: 'keys(), values(), items(), get(), del, .update(), verschachtelte Dicts, Key-Value' },
  { title: 'Typkonvertierung: int(), float(), str()', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#konvertierung', snippet: 'int(), float(), str(), bool(), type(), explizite Konvertierung' },
  { title: 'Stil & Traceback lesen', module: '02 – Variablen & Datentypen', tag: 'python', href: '../modules/02-variablen-datentypen.html#stil', snippet: 'Englische Variablennamen, Kommentare, NameError, TypeError, StackOverflow' },

  /* --- 03: Loops & Conditions --- */
  { title: 'for-Loop: Definition & Systematik', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#for', snippet: 'Iterable, Iterationsvariable, Loop-Muster: init → body → result, for x in liste' },
  { title: 'range() & Indentation', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#range', snippet: 'range(5), range(1,6), range(1,10,2), Einrück-Ebenen, Schrittweite' },
  { title: 'Parallele Listen mit Index', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#parallel', snippet: 'range(len(liste)), zip(), zwei Listen gleichzeitig iterieren, Fakultäten' },
  { title: 'while-Loop', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#while', snippet: 'while Bedingung:, Endlosloop vermeiden, break, continue, Abbruchbedingung' },
  { title: 'for vs. while — Vergleich', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#for-vs-while', snippet: 'for: bekannte Iteration, while: Bedingung, wann welchen Loop nutzen' },
  { title: 'if / elif / else', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#if', snippet: 'Bedingte Ausführung, elif-Kette, in-Operator, Indentation-Ebenen, Vergleiche' },
  { title: 'Mehrere if-Statements hintereinander', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#multiple-if', snippet: 'Alle Bedingungen werden geprüft, vs if-elif-else, Pizza-Beispiel' },
  { title: 'break, continue & reversed()', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#break', snippet: 'break: Loop beenden, continue: Durchlauf überspringen, reversed() rückwärts' },
  { title: 'List Comprehensions', module: '03 – Loops & Conditions', tag: 'python', href: '../modules/03-loops-conditions.html#comprehension', snippet: '[x**2 for x in range(10) if x % 2], ternärer Ausdruck, kompakte Loops' },

  /* --- 04: Funktionen & Packages --- */
  { title: 'Warum Funktionen? Store & Reuse', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#warum', snippet: 'Built-in vs self-defined, 3-Mal-Regel, Top-Down Prinzip, Code-Wiederverwendung' },
  { title: 'Funktionen definieren (def)', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#def', snippet: 'def funktionsname(params):, return, Docstring, Calls, Invokes, runde Klammern' },
  { title: 'Die 4 Formen von Funktionen', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#vier-formen', snippet: 'mit/ohne Ein- und Ausgabeargumenten, hello_world(), simulate_dice()' },
  { title: 'Argument-Typen: Positional, Keyword, Default', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#argumente', snippet: 'Reihenfolge der Parameter, benannte Argumente, Standardwerte, c=1, d=2' },
  { title: 'return & mehrere Rückgabewerte', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#return', snippet: 'return mean, variance, Tuple entpacken, deskriptive Statistik berechnen' },
  { title: 'Top-Down Prinzip & Code-Organisation', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#topdown', snippet: 'Hilfsfunktionen, 3-Mal-Regel, Paragraphen-Prinzip, sauberer Code' },
  { title: 'Lambda-Funktionen & Higher-Order Functions', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#lambda', snippet: 'lambda x: x**2, filter(), map(), sorted(), Funktionen als First-Class Objects' },
  { title: 'Module & Packages: pip & PyPI', module: '04 – Funktionen & Packages', tag: 'python', href: '../modules/04-funktionen-packages.html#packages', snippet: '__init__.py, pip install, !pip install in Jupyter, PyPI, import numpy as np' },

  /* --- 05: Data Science Prozess --- */
  { title: 'CRISP-DM Prozess', module: '05 – Data Science Prozess', tag: 'datascience', href: '../modules/05-data-science-prozess.html#crisp', snippet: 'Business Understanding, Data Understanding, Preparation, Modeling, Evaluation, Deployment' },
  { title: 'Business Understanding', module: '05 – Data Science Prozess', tag: 'datascience', href: '../modules/05-data-science-prozess.html#business', snippet: 'Ziel definieren, KPI, Problemformulierung, Stakeholder, Deliverables, Erfolgskriterien' },
  { title: 'Wissenschaftliche Methode', module: '05 – Data Science Prozess', tag: 'datascience', href: '../modules/05-data-science-prozess.html#methode', snippet: 'Hypothese, Experiment, Inferenzstatistik, Kausalität vs Korrelation, p-Wert' },
  { title: 'Daten-Ethik & Bias', module: '05 – Data Science Prozess', tag: 'datascience', href: '../modules/05-data-science-prozess.html#ethik', snippet: 'Fairness, Diskriminierung, Daten-Bias, Verzerrung, Stichprobenprobleme' },

  /* --- 06: Data Understanding I --- */
  { title: 'NumPy Arrays', module: '06 – Data Understanding I', tag: 'datascience', href: '../modules/06-data-understanding-single.html#numpy', snippet: 'np.array, ndarray, reshape, Vektorisierung, Broadcasting, Mathematische Operationen' },
  { title: 'Pandas DataFrames', module: '06 – Data Understanding I', tag: 'datascience', href: '../modules/06-data-understanding-single.html#pandas', snippet: 'pd.DataFrame, pd.read_csv, .head(), .tail(), .info(), .describe(), Spaltenzugriff' },
  { title: 'Histogramme', module: '06 – Data Understanding I', tag: 'datascience', href: '../modules/06-data-understanding-single.html#histogramm', snippet: 'plt.hist(), Verteilung visualisieren, Bins, Häufigkeit, Schiefe, Normalverteilung' },
  { title: 'Boxplots & Quantile', module: '06 – Data Understanding I', tag: 'datascience', href: '../modules/06-data-understanding-single.html#boxplot', snippet: 'Median, Q1, Q3, IQR, Ausreißer erkennen, plt.boxplot(), sns.boxplot()' },
  { title: 'Deskriptive Statistik', module: '06 – Data Understanding I', tag: 'datascience', href: '../modules/06-data-understanding-single.html#statistik', snippet: 'mean(), std(), min(), max(), describe(), Lage- und Streuungsmaße' },

  /* --- 07: Data Understanding II --- */
  { title: 'Scatter Plot', module: '07 – Data Understanding II', tag: 'datascience', href: '../modules/07-data-understanding-multivariate.html#scatter', snippet: 'px.scatter, plt.scatter, Joint Plot, zwei Variablen visualisieren, Trend' },
  { title: 'Korrelationskoeffizient', module: '07 – Data Understanding II', tag: 'datascience', href: '../modules/07-data-understanding-multivariate.html#korrelation', snippet: 'Pearson r, df.corr(), np.corrcoef, Korrelationsmatrix, Heatmap, -1 bis +1' },
  { title: 'Pair Plot (pairplot)', module: '07 – Data Understanding II', tag: 'datascience', href: '../modules/07-data-understanding-multivariate.html#pairplot', snippet: 'sns.pairplot, multivariate Analyse, hue, alle Variablenpaare auf einmal' },
  { title: 't-Test & Hypothesentest', module: '07 – Data Understanding II', tag: 'datascience', href: '../modules/07-data-understanding-multivariate.html#ttest', snippet: 'scipy.stats.ttest_ind, p-value, Signifikanz, Nullhypothese, Alternativhypothese' },
  { title: "Anscombe's Quartet", module: '07 – Data Understanding II', tag: 'datascience', href: '../modules/07-data-understanding-multivariate.html#anscombe', snippet: 'Gleiche Statistiken, verschiedene Verteilungen, immer visualisieren!' },

  /* --- 08: Data Preparation --- */
  { title: 'Label-Encoding & One-Hot-Encoding', module: '08 – Data Preparation', tag: 'datascience', href: '../modules/08-data-preparation.html#encoding', snippet: 'LabelEncoder, OneHotEncoder, sklearn.preprocessing, kategoriale Variablen' },
  { title: 'Bag of Words', module: '08 – Data Preparation', tag: 'datascience', href: '../modules/08-data-preparation.html#bow', snippet: 'CountVectorizer, TF-IDF, Textvektoren, NLP, Textvorverarbeitung' },
  { title: 'Feature Selection (SelectKBest)', module: '08 – Data Preparation', tag: 'datascience', href: '../modules/08-data-preparation.html#selection', snippet: 'SelectKBest, f_classif, Merkmalswahl, Relevanz, chi2, Dimensionsreduktion' },
  { title: 'Feature Scaling', module: '08 – Data Preparation', tag: 'datascience', href: '../modules/08-data-preparation.html#scaling', snippet: 'MinMaxScaler, StandardScaler, Normalisierung, Standardisierung, [0,1]' },

  /* --- 09: Machine Learning --- */
  { title: 'sklearn Prozess: fit/predict/score', module: '09 – Machine Learning', tag: 'datascience', href: '../modules/09-machine-learning.html#sklearn', snippet: 'model.fit(X, y), model.predict(X), model.score, Pipeline, API' },
  { title: 'Train/Test Split', module: '09 – Machine Learning', tag: 'datascience', href: '../modules/09-machine-learning.html#split', snippet: 'train_test_split, Trainingsdaten, Testdaten, Overfitting erkennen' },
  { title: 'Lineare Regression', module: '09 – Machine Learning', tag: 'datascience', href: '../modules/09-machine-learning.html#linear', snippet: 'LinearRegression, Koeffizient, Intercept, R², MSE, Vorhersage' },
  { title: 'Polynomiale Regression', module: '09 – Machine Learning', tag: 'datascience', href: '../modules/09-machine-learning.html#polynomial', snippet: 'PolynomialFeatures, Grad 2/3, Overfitting vs. Underfitting, Bias-Variance' },

  /* --- Übungsblätter --- */
  { title: 'Übung 01 – Variablen & Datentypen', module: 'Übungsblatt 01', tag: 'uebung', href: '../modules/ex-01-variablen.html', snippet: 'Aufgaben zu Variablen, Zahlen, Boolean, Strings, Listen, Dictionaries' },
  { title: 'Übung 02 – Loops & Conditions', module: 'Übungsblatt 02', tag: 'uebung', href: '../modules/ex-02-loops.html', snippet: 'for-Loop, while-Loop, if/elif/else, List Comprehensions, range()' },
  { title: 'Übung 03 – Funktionen', module: 'Übungsblatt 03', tag: 'uebung', href: '../modules/ex-03-funktionen.html', snippet: 'def, return, Parameter, Lambda, Higher-Order Functions' },
  { title: 'Übung 05 – NumPy & Pandas', module: 'Übungsblatt 05', tag: 'uebung', href: '../modules/ex-05-numpy.html', snippet: 'np.array, pd.DataFrame, Slicing, Aggregation, Visualisierung' },
  { title: 'Übung 06 – Multivariate Analyse', module: 'Übungsblatt 06', tag: 'uebung', href: '../modules/ex-06-multivariate.html', snippet: 'Korrelation, Scatter, Pairplot, EEG-Daten, Heatmap' },
  { title: 'Übung 08 – Machine Learning', module: 'Übungsblatt 08', tag: 'uebung', href: '../modules/ex-08-ml.html', snippet: 'LinearRegression, KNN, Entscheidungsbaum, sklearn, Accuracy' },

  /* --- Prüfungsvorbereitung --- */
  { title: 'Variablen & Typen – Cheatsheet', module: 'Prüfung', tag: 'python', href: '../modules/pruefung.html#variablen', snippet: 'Naming snake_case, Falsy-Werte, Typkonvertierung int() float() str(), f-String, Operatoren // % **' },
  { title: 'Listen & Dictionaries – Cheatsheet', module: 'Prüfung', tag: 'python', href: '../modules/pruefung.html#listen', snippet: 'Indexing -1, Slicing [1:3] [::2], append remove pop, dict.get() KeyError, items()' },
  { title: 'Loops & Conditions – Cheatsheet', module: 'Prüfung', tag: 'python', href: '../modules/pruefung.html#loops', snippet: 'for while break continue, range zip enumerate, List Comprehension, if elif else' },
  { title: 'Funktionen & Error Handling – Cheatsheet', module: 'Prüfung', tag: 'python', href: '../modules/pruefung.html#funktionen', snippet: 'def return, Default-Parameter, mehrere Rückgabewerte, try except ValueError, lambda, sorted map filter' },
  { title: 'NumPy Arrays – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#numpy', snippet: 'np.dot Matrixmultiplikation, Boolean Indexing, reshape -1, std mean argmax, vstack axis' },
  { title: 'Pandas DataFrames – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#pandas', snippet: 'read_csv, groupby, rolling, describe info head, fillna dropna, to_datetime' },
  { title: 'Korrelation & Heatmap – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#korrelation', snippet: 'np.corrcoef data.T, sns.heatmap annot=True vmin=-1 vmax=1 cmap coolwarm, clustermap' },
  { title: 'Hypothesentest t-Test – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#ttest', snippet: 'scipy.stats.ttest_ind, p-Wert p < 0.05 signifikant, H0 H1 Nullhypothese ablehnen' },
  { title: 'sklearn Prozess – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#sklearn', snippet: 'train_test_split test_size=0.2, model.fit, model.predict, model.score R², cross_val_score cv=5' },
  { title: 'Polynomiale Regression + Pipeline – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#polynom', snippet: 'PolynomialFeatures degree, make_pipeline, Grid Search über Grad, bester Polynomgrad' },
  { title: 'Overfitting & Modellbewertung – Cheatsheet', module: 'Prüfung', tag: 'datascience', href: '../modules/pruefung.html#overfitting', snippet: 'Train R² vs Test R², Overfitting Underfitting, cross_val_score, Bias-Variance Tradeoff' },
  { title: 'Theoriefragen – Prüfungsvorbereitung', module: 'Prüfung', tag: 'python', href: '../modules/pruefung.html#theorie', snippet: 'Expression Statement, = vs ==, Falsy, Mutable Immutable, p-Wert, R², Overfitting, Cross-Validation, 2D-Array reshape' },
];

/* Suchbegriffe im Text hervorheben */
function _highlight(text, query) {
  if (!query || query.length < 2) return text;
  const words = query.trim().split(/\s+/).filter(w => w.length >= 2);
  if (!words.length) return text;
  const pattern = new RegExp(
    '(' + words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|') + ')',
    'gi'
  );
  return text.replace(pattern, '<mark>$1</mark>');
}

let _fuse = null;

function _getFuse() {
  if (_fuse) return _fuse;
  if (typeof Fuse === 'undefined') return null;
  _fuse = new Fuse(SEARCH_INDEX, {
    keys: [
      { name: 'title',   weight: 0.5 },
      { name: 'snippet', weight: 0.3 },
      { name: 'module',  weight: 0.2 },
    ],
    threshold: 0.38,
    includeScore: true,
    minMatchCharLength: 2,
  });
  return _fuse;
}

/* ---------- Sidebar-Dropdown Suche ---------- */
function initSearch() {
  const input   = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  let activeIdx = -1;

  function renderDropdown(q) {
    const fuse = _getFuse();
    if (!fuse) return;

    if (q.length < 2) {
      results.classList.remove('open');
      results.innerHTML = '';
      activeIdx = -1;
      return;
    }

    const hits = fuse.search(q).slice(0, 7);
    if (hits.length === 0) {
      results.innerHTML = '<div class="sr-empty">Keine Ergebnisse.</div>';
    } else {
      results.innerHTML = hits.map((h, i) => `
        <a class="search-result-item" href="${h.item.href}" data-idx="${i}">
          <div class="sr-title">${_highlight(h.item.title, q)}</div>
          <div class="sr-module">${h.item.module}</div>
          <div class="sr-snippet">${_highlight(h.item.snippet, q)}</div>
        </a>
      `).join('') + `
        <a class="sr-all-link" href="${_searchPageUrl(q)}">
          🔍 Alle Ergebnisse für „${q}" anzeigen →
        </a>`;
    }
    results.classList.add('open');
    activeIdx = -1;
  }

  function _searchPageUrl(q) {
    const base = window.location.pathname.includes('/modules/') ? '../modules/search.html' : 'modules/search.html';
    return `${base}?q=${encodeURIComponent(q)}`;
  }

  input.addEventListener('input', () => renderDropdown(input.value.trim()));

  input.addEventListener('keydown', e => {
    const items = results.querySelectorAll('.search-result-item');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIdx = Math.min(activeIdx + 1, items.length - 1);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIdx = Math.max(activeIdx - 1, -1);
      items.forEach((el, i) => el.classList.toggle('active', i === activeIdx));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIdx >= 0 && items[activeIdx]) {
        items[activeIdx].click();
      } else {
        window.location.href = _searchPageUrl(input.value.trim());
      }
    } else if (e.key === 'Escape') {
      results.classList.remove('open');
      input.blur();
    }
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });

  /* / Taste fokussiert die Suche */
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      input.focus();
      input.select();
    }
  });
}

document.addEventListener('DOMContentLoaded', initSearch);
