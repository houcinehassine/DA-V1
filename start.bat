@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"
title Data Analytics - Lernplattform

echo ============================================
echo  Data Analytics - Lernplattform
echo ============================================

set PORT=8080

:: Python-Befehl finden (python, dann py-Launcher, dann python3)
set PYCMD=
where python >nul 2>nul
if %ERRORLEVEL%==0 (
  set PYCMD=python
) else (
  where py >nul 2>nul
  if %ERRORLEVEL%==0 (
    set PYCMD=py
  ) else (
    where python3 >nul 2>nul
    if %ERRORLEVEL%==0 (
      set PYCMD=python3
    )
  )
)

if "%PYCMD%"=="" (
  echo.
  echo FEHLER: Python wurde nicht gefunden.
  echo Bitte installiere Python von https://www.python.org/downloads/
  echo Wichtig: Beim Installer das Haekchen bei "Add python.exe to PATH" setzen.
  echo.
  pause
  exit /b 1
)

:: Pruefen ob Port bereits belegt ist
netstat -ano | findstr ":%PORT% " | findstr "LISTENING" >nul 2>nul
if %ERRORLEVEL%==0 (
  echo Port %PORT% ist bereits belegt - oeffne direkt im Browser...
  start "" "http://localhost:%PORT%/index.html"
  goto :eof
)

echo Starte Server auf http://localhost:%PORT% ...
echo Zum Beenden dieses Fenster schliessen oder Strg+C druecken.
echo.

:: Browser nach kurzer Verzoegerung oeffnen (im Hintergrund)
start "" cmd /c "timeout /t 1 >nul && start http://localhost:%PORT%/index.html"

:: Server im Vordergrund starten (haelt das Fenster offen)
%PYCMD% -m http.server %PORT%
