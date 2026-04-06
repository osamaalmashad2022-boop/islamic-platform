@echo off
setlocal EnableExtensions

rem Go to islamic-platform next to this script
pushd "%~dp0islamic-platform"
if errorlevel 1 (
  echo [ERROR] Could not open islamic-platform folder.
  pause
  exit /b 1
)

if not exist "package.json" (
  echo [ERROR] package.json not found. Expected: islamic-platform\package.json
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
