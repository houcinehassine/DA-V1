#!/bin/bash
# Lädt Pyodide (Python-Runtime für den Browser) + benötigte Pakete lokal herunter,
# damit der "▶ Ausführen"-Button in main.js komplett offline funktioniert.
# Einmalig ausführen (braucht Internet), danach läuft alles ohne CDN.
#
# Nutzung:  bash scripts/download-pyodide.sh

set -e
cd "$(dirname "$0")"
mkdir -p pyodide
cd pyodide

BASE="https://cdn.jsdelivr.net/pyodide/v0.26.4/full"
echo "Lade Pyodide Core-Runtime..."
for f in pyodide.js pyodide.mjs pyodide.asm.js pyodide.asm.wasm pyodide-lock.json python_stdlib.zip; do
  [ -f "$f" ] && { echo "  überspringe $f (existiert)"; continue; }
  echo "  $f"
  curl -sL --max-time 120 -o "$f" "$BASE/$f"
done

echo "Lade Pakete (numpy, pandas, matplotlib, scipy, scikit-learn + Abhängigkeiten)..."
PKGS="cycler-0.12.1-py3-none-any.whl
fonttools-4.51.0-py3-none-any.whl
joblib-1.4.0-py3-none-any.whl
kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl
matplotlib-3.5.2-cp312-cp312-pyodide_2024_0_wasm32.whl
matplotlib_pyodide-0.2.2-py3-none-any.whl
micropip-0.6.0-py3-none-any.whl
numpy-1.26.4-cp312-cp312-pyodide_2024_0_wasm32.whl
openblas-0.3.26.zip
packaging-23.2-py3-none-any.whl
pandas-2.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl
pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl
pyparsing-3.1.2-py3-none-any.whl
python_dateutil-2.9.0.post0-py2.py3-none-any.whl
pytz-2024.1-py2.py3-none-any.whl
scikit_learn-1.4.2-cp312-cp312-pyodide_2024_0_wasm32.whl
scipy-1.12.0-cp312-cp312-pyodide_2024_0_wasm32.whl
six-1.16.0-py2.py3-none-any.whl
threadpoolctl-3.4.0-py3-none-any.whl"

echo "$PKGS" | while IFS= read -r f; do
  [ -z "$f" ] && continue
  [ -f "$f" ] && { echo "  überspringe $f (existiert)"; continue; }
  echo "  $f"
  curl -sL --max-time 120 -o "$f" "$BASE/$f"
done

echo "Lade seaborn (von PyPI, kein Pyodide-Kernpaket)..."
SEABORN="seaborn-0.13.2-py3-none-any.whl"
if [ ! -f "$SEABORN" ]; then
  curl -sL --max-time 60 -o "$SEABORN" \
    "https://files.pythonhosted.org/packages/83/11/00d3c3dfc25ad54e731d91449895a79e4bf2384dc3ac01809010ba88f6d5/seaborn-0.13.2-py3-none-any.whl"
fi

echo ""
echo "Fertig. Größe: $(du -sh . | cut -f1)"
echo "Der '▶ Ausführen'-Button funktioniert jetzt vollständig offline."
