@echo off
setlocal enabledelayedexpansion

echo.
echo 🚀 Advanced Portfolio Setup
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Get Node version
for /f "tokens=1" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✓ Node.js version: %NODE_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% equ 0 (
    echo ✓ Dependencies installed successfully
) else (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo 🎨 Customization Tips:
echo ================================
echo.
echo 1. Update your information:
echo    Edit: lib\constants.ts
echo.
echo 2. Change colors:
echo    Edit: tailwind.config.js
echo.
echo 3. Add your projects:
echo    Edit: lib\constants.ts (PROJECTS array)
echo.
echo 4. Update skills:
echo    Edit: lib\constants.ts (SKILLS_BY_CATEGORY)
echo.

echo 📚 Documentation:
echo ================================
echo   • Quick Start: QUICKSTART.md
echo   • Customization: CUSTOMIZATION.md
echo   • Deployment: DEPLOYMENT.md
echo.

echo 🏃 Quick Start:
echo ================================
echo.
echo   npm run dev          - Start development server
echo   npm run build        - Build for production
echo   npm run lint         - Check code quality
echo.

echo ✨ Setup complete! Run 'npm run dev' to start developing.
echo.
pause
