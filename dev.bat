@echo off
set "PATH=%ProgramFiles%\nodejs;%PATH%"
cd /d "%~dp0"
echo Instalando dependencias se necessario...
call npm.cmd install
echo.
echo Iniciando servidor em http://localhost:3000
echo Abra tambem http://localhost:3000/pt
echo.
call npm.cmd run dev
pause
