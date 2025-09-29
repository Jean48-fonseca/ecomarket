@echo off
echo ================================================
echo         ECOMARKET - INICIADOR AUTOMATICO
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
echo [2/3] Abriendo EcoMarket en el navegador...
start "" "http://localhost:8000/Untitled-1.html"

echo.
echo [3/3] Listo! EcoMarket deberia abrirse automaticamente
echo.
echo ================================================
echo Para cerrar el servidor, cierra la ventana negra
echo ================================================
pause