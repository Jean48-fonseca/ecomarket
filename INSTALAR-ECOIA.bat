@echo off
echo ================================================
echo         ECOIA - INSTALADOR AUTOMATICO
echo ================================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no encontrado
    echo.
    echo Para instalar Node.js:
    echo 1. Ve a: https://nodejs.org/
    echo 2. Descarga la version LTS
    echo 3. Instala y reinicia la terminal
    echo 4. Ejecuta este script nuevamente
    pause
    exit /b
) else (
    echo [OK] Node.js encontrado
)

echo.
echo [2/5] Verificando npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm no encontrado
    pause
    exit /b
) else (
    echo [OK] npm encontrado
)

echo.
echo [3/5] Instalando dependencias...
npm install
if %errorlevel% neq 0 (
    echo [ERROR] Fallo la instalacion de dependencias
    pause
    exit /b
) else (
    echo [OK] Dependencias instaladas correctamente
)

echo.
echo [4/5] Verificando configuracion...
if not exist ".env" (
    echo [INFO] Creando archivo .env desde plantilla...
    copy ".env.example" ".env" >nul
    echo [IMPORTANTE] Configura tu token de Hugging Face en .env
) else (
    echo [OK] Archivo .env encontrado
)

echo.
echo [5/5] Todo listo!
echo.
echo ================================================
echo         CONFIGURACION COMPLETADA
echo ================================================
echo.
echo SIGUIENTE PASO:
echo 1. Edita el archivo .env
echo 2. Agrega tu token de Hugging Face
echo 3. Ejecuta: INICIAR-ECOIA.bat
echo.
echo Para obtener token de Hugging Face:
echo - Ve a: https://huggingface.co/settings/tokens
echo - Crea un token de tipo "Read"
echo - Copialo en el archivo .env
echo.
pause