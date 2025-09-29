@echo off
echo ================================================
echo      ECOMARKET + ECOIA - COMPLETO
echo ================================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo [1/6] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no encontrado
    echo Abriendo version sin servidor...
    start "" "SIN-SERVIDOR.html"
    pause
    exit /b
)

echo [2/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ADVERTENCIA] Node.js no encontrado. EcoIA no funcionara.
    echo [INFO] Para instalar: https://nodejs.org/
    set ECOIA_DISPONIBLE=false
) else (
    set ECOIA_DISPONIBLE=true
)

echo [3/6] Iniciando servidor web...
netstat -an | findstr :8000 >nul
if %errorlevel% neq 0 (
    echo [INFO] Iniciando servidor Python en puerto 8000...
    start "EcoMarket Server" cmd /k "cd /d "%~dp0" && python -m http.server 8000"
    timeout /t 3 >nul
)

if "%ECOIA_DISPONIBLE%"=="true" (
    echo [4/6] Iniciando backend EcoIA...
    if exist "node_modules" (
        start "EcoIA Backend" cmd /k "cd /d "%~dp0" && node app.js"
        timeout /t 2 >nul
    ) else (
        echo [ADVERTENCIA] Dependencias no instaladas. EcoIA funcionara en modo fallback.
    )
) else (
    echo [4/6] Saltando EcoIA (Node.js no disponible)...
)

echo [5/6] Abriendo EcoMarket en navegador...
timeout /t 3 >nul
start "" "http://localhost:8000/Untitled-1.html"

echo.
echo [6/6] Sistema completo iniciado!
echo.
echo ================================================
echo         ECOMARKET COMPLETO EJECUTANDOSE
echo ================================================
echo.
echo Frontend: http://localhost:8000/Untitled-1.html
if "%ECOIA_DISPONIBLE%"=="true" (
    echo Backend EcoIA: http://localhost:3000
    echo Chat EcoIA: Disponible en la web
) else (
    echo EcoIA: Modo fallback ^(sin IA real^)
)
echo.
echo Para cerrar todo, cierra las ventanas negras
echo.
pause