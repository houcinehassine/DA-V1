#!/bin/zsh
# Startet einen lokalen Server und öffnet die Webseite im Browser

cd "$(dirname "$0")"

# Port
PORT=8080

# Prüfen ob Port schon belegt ist
if lsof -i :$PORT -sTCP:LISTEN &>/dev/null; then
  echo "Port $PORT ist bereits belegt – öffne direkt im Browser..."
  open "http://localhost:$PORT"
  exit 0
fi

echo "Starte Server auf http://localhost:$PORT ..."

# Python-Server im Hintergrund starten
python3 -m http.server $PORT &
SERVER_PID=$!

# Kurz warten, dann Browser öffnen
sleep 0.8
open "http://localhost:$PORT"

echo "Webseite geöffnet. Server läuft (PID $SERVER_PID)."
echo "Fenster schließen beendet den Server."

# Server läuft weiter solange dieses Fenster offen ist
wait $SERVER_PID
