@echo off
echo ================================================
echo         ECOMARKET - INICIADOR AUTOMATICO
echo ================================================
echo.

REM Cambiar al directorio del script
cd /d "%~dp0"

echo [1/4] Verificando Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python no encontrado. Abriendo version sin servidor...
    start "" "SIN-SERVIDOR.html"
    echo.
    echo Si quieres instalar Python: https://python.org/downloads
    pause
    exit /b
)

echo [2/4] Verificando servidor...
netstat -an | findstr :8000 >nul
if %errorlevel% neq 0 (
    echo [INFO] Iniciando servidor Python en puerto 8000...
    start "EcoMarket Server" cmd /k "cd /d "%~dp0" && python -m http.server 8000"
    echo [INFO] Esperando que el servidor inicie...
    timeout /t 5 >nul
) else (
    echo [INFO] Servidor ya esta ejecutandose en puerto 8000
)

echo.
echo [3/4] Abriendo EcoMarket en el navegador...
timeout /t 2 >nul
start "" "http://localhost:8000/Untitled-1.html"

echo.
echo [4/4] Listo! EcoMarket deberia abrirse automaticamente
echo.
echo ================================================
echo OPCIONES ADICIONALES:
echo - Version funcional: http://localhost:8000/FUNCIONAL.html
echo - Sin servidor: SIN-SERVIDOR.html
echo Para cerrar el servidor, cierra la ventana negra
echo ================================================
pause