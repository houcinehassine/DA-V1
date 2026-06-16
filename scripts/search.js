/* ============================================================
   DA-V1 Suche (Fuse.js basiert)
   ============================================================ */

const SEARCH_INDEX = [
  /* --- 01: Setup & Tools --- */
  { title: 'Anaconda installieren', module: '01 – Setup & Tools', href: '../modules/01-getting-started.html#anaconda', snippet: 'Anaconda Download, python --version, conda --version' },
  { title: 'Virtual Environments', module: '01 – Setup & Tools', href: '../modules/01-getting-started.html#virtualenv', snippet: 'conda activate, pip install, data-science-mit-python' },
  { title: 'JupyterLab Interface', module: '01 – Setup & Tools', href: '../modules/01-getting-started.html#jupyter', snippet: 'Launcher, Zell-Typen: Code, Markdown, Raw, Tastenkürzel' },
  { title: 'Spyder, PyCharm, Google Colab', module: '01 – Setup & Tools', href: '../modules/01-getting-started.html#tools', snippet: 'Weitere Python-Tools, was für welchen Anwendungsfall' },
  { title: 'Dateitypen .py und .ipynb', module: '01 – Setup & Tools', href: '../modules/01-getting-started.html#dateitypen', snippet: 'Python-Skript vs Jupyter Notebook, JSON-Format' },

  /* --- 01b: Python Einführung --- */
  { title: 'Was ist Data Science?', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#datascience', snippet: 'Venn-Diagramm: Programmierung, Mathematik/Statistik, Domänenwissen' },
  { title: 'Why Python?', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#warum-python', snippet: 'Populär, effizient, Clean Code, riesige Community, open source' },
  { title: 'Python Geschichte', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#geschichte', snippet: 'Python 2 vs Python 3, End of Life 2020, Very-High-Level' },
  { title: 'Zen of Python', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#zen', snippet: 'import this, 19 Designprinzipien, Beautiful is better than ugly' },
  { title: 'PEP 8 Style Guide', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#pep8', snippet: 'snake_case, UPPER_CASE, Leerzeichen, 4 Spaces Einrückung' },
  { title: 'Indentation (Einrückung)', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#indentation', snippet: 'Python nutzt Einrückung statt geschweifte Klammern, IndentationError' },
  { title: 'Literatur & Ressourcen', module: '01b – Python Einführung', href: '../modules/01b-python-einfuehrung.html#literatur', snippet: 'VanderPlas, Downey ThinkPython, Kaggle Tutorial, Open Source Bücher' },

  /* --- Variablen & Datentypen --- */
  { title: 'Variablen & Regeln', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#variablen', snippet: 'snake_case, Konstanten, Statement vs Expression' },
  { title: 'Reserved Words', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#reserved', snippet: 'False, None, True, and, def, for, if, import, lambda, return, while' },
  { title: 'Zahlen: int, float, Operatoren', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#zahlen', snippet: '+, -, *, /, **, %, Fließkommazahlen' },
  { title: 'Boolean & Vergleichsoperatoren', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#boolean', snippet: 'True, False, ==, !=, <, >, and, or, not, Kettenvergleiche' },
  { title: 'Strings: Formatierung & Methoden', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#strings', snippet: 'f-Strings, .upper(), .find(), .replace(), .strip(), in-Operator' },
  { title: 'Listen: Indexing, Slicing & Repetition', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#listen', snippet: 'append, pop, remove, sort, * Repetition, List Comprehension' },
  { title: 'Tuples', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#tuples', snippet: 'immutable, (1,2,3), Entpacken, wann Tuple statt List' },
  { title: 'Sets (Mengen)', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#sets', snippet: 'Duplikate entfernen, add, remove, Schnittmenge &, Vereinigung |' },
  { title: 'Dictionaries', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#dictionaries', snippet: 'keys(), values(), items(), get(), del, verschachtelt' },
  { title: 'Typkonvertierung: int(), float(), str()', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#konvertierung', snippet: 'int, float, str, bool, type()' },
  { title: 'Stil & Traceback lesen', module: '02 – Variablen & Datentypen', href: '../modules/02-variablen-datentypen.html#stil', snippet: 'Englische Variablennamen, Kommentare, NameError, StackOverflow' },

  /* --- Loops & Conditions --- */
  { title: 'for-Loop: Definition & Systematik', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#for', snippet: 'Iterable, Iterationsvariable, Loop-Muster: init → body → result' },
  { title: 'range() & Indentation', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#range', snippet: 'range(5), range(1,6), range(1,10,2), Einrück-Ebenen' },
  { title: 'Parallele Listen mit Index', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#parallel', snippet: 'range(len(liste)), zwei Listen gleichzeitig, Fakultäten-Beispiel' },
  { title: 'while-Loop', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#while', snippet: 'while Bedingung, Endlosloop, break, continue' },
  { title: 'for vs. while — Vergleich', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#for-vs-while', snippet: 'for: Iterable, while: Bedingung, wann welchen Loop nutzen' },
  { title: 'if / elif / else', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#if', snippet: 'Bedingte Ausführung, in-Operator, Indentation-Ebenen' },
  { title: 'Mehrere if-Statements hintereinander', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#multiple-if', snippet: 'Pizza-Bestellung, alle Bedingungen prüfen, vs if-elif-else' },
  { title: 'break, continue & reversed()', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#break', snippet: 'Loop beenden, Durchlauf überspringen, reversed() rückwärts' },
  { title: 'List Comprehensions', module: '03 – Loops & Conditions', href: '../modules/03-loops-conditions.html#comprehension', snippet: '[x**2 for x in range(10) if x % 2], ternärer Ausdruck' },

  /* --- Funktionen & Packages --- */
  { title: 'Warum Funktionen? Store & Reuse', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#warum', snippet: 'Built-in vs self-defined, 3-Mal-Regel, Top-Down Prinzip' },
  { title: 'Funktionen definieren (def)', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#def', snippet: 'def, return, Docstring :param :return, Calls/Invokes' },
  { title: 'Die 4 Formen von Funktionen', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#vier-formen', snippet: 'mit/ohne Ein- und Ausgabeargumenten, hello_world, simulate_dice' },
  { title: 'Argument-Typen: Positional, Keyword, Default', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#argumente', snippet: 'Reihenfolge, benannte Argumente, Standardwerte' },
  { title: 'return & mehrere Rückgabewerte', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#return', snippet: 'return mean, variance — Tuple entpacken, deskriptive Statistik' },
  { title: 'Top-Down Prinzip & Code-Organisation', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#topdown', snippet: 'Funktionen für Wiederholungen, Paragraphen, 3-Mal-Regel' },
  { title: 'Lambda-Funktionen & Higher-Order Functions', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#lambda', snippet: 'lambda x: x**2, filter(), map(), Funktionen als First-Class Objects' },
  { title: 'Module & Packages: pip & PyPI', module: '04 – Funktionen & Packages', href: '../modules/04-funktionen-packages.html#packages', snippet: '__init__.py, pip install, !pip install, PyPI, import numpy as np' },

  /* --- Data Science Prozess --- */
  { title: 'CRISP-DM Prozess', module: '05 – Data Science Prozess', href: '../modules/05-data-science-prozess.html#crisp', snippet: 'Business Understanding, Data Understanding, Preparation, Modeling' },
  { title: 'Business Understanding', module: '05 – Data Science Prozess', href: '../modules/05-data-science-prozess.html#business', snippet: 'Ziel definieren, KPI, Problemformulierung' },

  /* --- Data Understanding I --- */
  { title: 'NumPy Arrays', module: '06 – Data Understanding I', href: '../modules/06-data-understanding-single.html#numpy', snippet: 'np.array, ndarray, reshape, Mathematische Operationen' },
  { title: 'Pandas DataFrames', module: '06 – Data Understanding I', href: '../modules/06-data-understanding-single.html#pandas', snippet: 'pd.DataFrame, pd.read_csv, .head(), .info(), .describe()' },
  { title: 'Histogramme', module: '06 – Data Understanding I', href: '../modules/06-data-understanding-single.html#histogramm', snippet: 'plt.hist(), Verteilung, Bins, Häufigkeit' },
  { title: 'Boxplots & Quantile', module: '06 – Data Understanding I', href: '../modules/06-data-understanding-single.html#boxplot', snippet: 'Median, Q1, Q3, IQR, Ausreißer' },
  { title: 'Deskriptive Statistik', module: '06 – Data Understanding I', href: '../modules/06-data-understanding-single.html#statistik', snippet: 'mean, std, min, max, describe()' },

  /* --- Data Understanding II --- */
  { title: 'Scatter Plot', module: '07 – Data Understanding II', href: '../modules/07-data-understanding-multivariate.html#scatter', snippet: 'px.scatter, plt.scatter, Joint Plot' },
  { title: 'Korrelationskoeffizient', module: '07 – Data Understanding II', href: '../modules/07-data-understanding-multivariate.html#korrelation', snippet: 'Pearson r, df.corr(), np.corrcoef, Korrelationsmatrix' },
  { title: 'Pair Plot (pairplot)', module: '07 – Data Understanding II', href: '../modules/07-data-understanding-multivariate.html#pairplot', snippet: 'sns.pairplot, multivariate Analyse, hue' },
  { title: 't-Test & Hypothesentest', module: '07 – Data Understanding II', href: '../modules/07-data-understanding-multivariate.html#ttest', snippet: 'scipy.stats.ttest_ind, p-value, statistic' },
  { title: "Anscombe's Quartet", module: '07 – Data Understanding II', href: '../modules/07-data-understanding-multivariate.html#anscombe', snippet: 'Warnung: gleiche Statistik, verschiedene Verteilung' },

  /* --- Data Preparation --- */
  { title: 'Label-Encoding & One-Hot-Encoding', module: '08 – Data Preparation', href: '../modules/08-data-preparation.html#encoding', snippet: 'LabelEncoder, OneHotEncoder, sklearn.preprocessing' },
  { title: 'Bag of Words', module: '08 – Data Preparation', href: '../modules/08-data-preparation.html#bow', snippet: 'CountVectorizer, TF-IDF, Textvektoren' },
  { title: 'Feature Selection (SelectKBest)', module: '08 – Data Preparation', href: '../modules/08-data-preparation.html#selection', snippet: 'SelectKBest, Merkmalswahl, Relevanz' },
  { title: 'Feature Scaling (MinMax, Standardisierung)', module: '08 – Data Preparation', href: '../modules/08-data-preparation.html#scaling', snippet: 'MinMaxScaler, StandardScaler, Power Transformations' },

  /* --- Machine Learning --- */
  { title: 'sklearn Prozess: fit/predict/score', module: '09 – Machine Learning', href: '../modules/09-machine-learning.html#sklearn', snippet: 'model.fit(X, y), model.predict(X), model.score' },
  { title: 'Lineare Regression', module: '09 – Machine Learning', href: '../modules/09-machine-learning.html#linear', snippet: 'LinearRegression, Koeffizient, Intercept, R²' },
  { title: 'Polynomiale Regression', module: '09 – Machine Learning', href: '../modules/09-machine-learning.html#polynomial', snippet: 'PolynomialFeatures, Overfitting vs. Underfitting' },
];

let fuse = null;

function initSearch() {
  if (typeof Fuse === 'undefined') return;
  fuse = new Fuse(SEARCH_INDEX, {
    keys: ['title', 'snippet', 'module'],
    threshold: 0.35,
    includeScore: true,
    minMatchCharLength: 2,
  });

  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');
  if (!input || !results) return;

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { results.classList.remove('open'); results.innerHTML = ''; return; }

    const hits = fuse.search(q).slice(0, 8);
    if (hits.length === 0) {
      results.innerHTML = '<div class="sr-empty">Keine Ergebnisse gefunden.</div>';
    } else {
      results.innerHTML = hits.map(h => `
        <a class="search-result-item" href="${h.item.href}">
          <div class="sr-title">${h.item.title}</div>
          <div class="sr-module">${h.item.module}</div>
          <div class="sr-snippet">${h.item.snippet}</div>
        </a>
      `).join('');
    }
    results.classList.add('open');
  });

  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('open');
    }
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') { results.classList.remove('open'); input.blur(); }
  });
}

document.addEventListener('DOMContentLoaded', initSearch);
