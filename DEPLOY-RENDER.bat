@echo off
chcp 65001 >nul
echo.
echo ================================
echo 🚀 DEPLOY ECOIA A RENDER
echo ================================
echo.

echo 📋 Preparando deploy...

REM Verificar si Git está configurado
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git no está instalado o no está en PATH
    pause
    exit /b 1
)

echo ✅ Git detectado

REM Verificar si estamos en un repo de Git
if not exist ".git" (
    echo 📁 Inicializando repositorio Git...
    git init
    git add .
    git commit -m "Initial commit - EcoIA con Hugging Face"
) else (
    echo 📁 Repositorio Git existente detectado
)

echo.
echo 📦 Verificando archivos importantes...

REM Verificar archivos críticos
if not exist "app.js" (
    echo ❌ app.js no encontrado
    pause
    exit /b 1
)

if not exist "package.json" (
    echo ❌ package.json no encontrado
    pause
    exit /b 1
)

if not exist "render.yaml" (
    echo ❌ render.yaml no encontrado
    pause
    exit /b 1
)

echo ✅ Archivos necesarios presentes

echo.
echo 📤 Subiendo cambios a Git...
git add .
git commit -m "Deploy: EcoIA con Hugging Face API - Ready for Render"

echo.
echo ================================
echo 🎯 PRÓXIMOS PASOS PARA RENDER:
echo ================================
echo.
echo 1. 🌐 Ve a: https://render.com
echo 2. 🔑 Conéctate con tu cuenta GitHub
echo 3. ➕ Crea un nuevo Web Service
echo 4. 📂 Selecciona este repositorio
echo 5. ⚙️  Configuración automática con render.yaml
echo 6. 🔐 En Environment Variables, agrega:
echo    HUGGINGFACE_TOKEN=tu_token_aquí
echo 7. 🚀 Haz Deploy!
echo.
echo 📋 INFORMACIÓN DEL TOKEN:
echo    - Ve a: https://huggingface.co/settings/tokens
echo    - Crea un token de lectura (Read)
echo    - Cópialo y pégalo en Render
echo.
echo ⚠️  IMPORTANTE: Sin el token, EcoIA no funcionará
echo.

pause
echo.
echo 🎉 ¡Preparación completa! Sigue los pasos de arriba.
echo.