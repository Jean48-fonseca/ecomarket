@echo off
echo ================================================
echo         ECOIA - SERVIDOR BACKEND
echo ================================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado. Ejecuta INSTALAR-ECOIA.bat primero
    pause
    exit /b
)

echo [2/4] Verificando dependencias...
if not exist "node_modules" (
    echo [ERROR] Dependencias no instaladas. Ejecuta INSTALAR-ECOIA.bat primero
    pause
    exit /b
)

echo [3/4] Verificando configuracion...
if not exist ".env" (
    echo [ADVERTENCIA] Archivo .env no encontrado. Usando configuracion por defecto.
    echo [INFO] Para usar Hugging Face, configura tu token en .env
)

echo.
echo [4/4] Iniciando servidor EcoIA...
echo.
echo ================================================
echo  SERVIDOR ECOIA EJECUTANDOSE
echo ================================================
echo.
echo Backend disponible en: http://localhost:3000
echo EcoIA endpoint: http://localhost:3000/ecoia
echo Estado del servidor: http://localhost:3000/health
echo.
echo Para detener el servidor, presiona Ctrl+C
echo.
echo ================================================

node app.js

pause