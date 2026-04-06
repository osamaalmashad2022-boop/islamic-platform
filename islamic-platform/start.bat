@echo off
setlocal EnableExtensions
pushd "%~dp0"

if not exist "package.json" (
  echo [ERROR] package.json not found in this folder.
  popd
  pause
  exit /b 1
)

if not exist "node_modules\" (
  echo Installing npm packages, please wait...
  call npm install
  if errorlevel 1 (
    echo npm install failed. Install Node.js from nodejs.org then try again.
    popd
    pause
    exit /b 1
  )
)

echo.
echo Server: http://localhost:5173
echo Stop: Press Ctrl+C
echo.
call npm run dev

popd
pause
endlocal
