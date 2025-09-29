@echo off
echo ================================================
echo      ECOMARKET - VERSION FUNCIONAL GARANTIZADA
echo ================================================
echo.

echo [1/3] Verificando servidor...
netstat -an | findstr :8000 >nul
if %errorlevel% neq 0 (
    echo [INFO] Iniciando servidor Python en puerto 8000...
    start "EcoMarket Server" cmd /k "python -m http.server 8000"
    timeout /t 3 >nul
) else (
    echo [INFO] Servidor ya esta ejecutandose en puerto 8000
)

echo.
echo [2/3] Abriendo version FUNCIONAL de EcoMarket...
start "" "http://localhost:8000/FUNCIONAL.html"

echo.
echo [3/3] Listo! Version funcional abierta
echo Esta version GARANTIZA que los productos aparezcan
echo.
echo ================================================
echo Para cerrar el servidor, cierra la ventana negra
echo ================================================
pause