#!/bin/bash

echo "🚀 Advanced Portfolio Setup"
echo "=========================="
echo ""

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✓ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎨 Customization Tips:"
echo "━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Update your information:"
echo "   Edit: lib/constants.ts"
echo ""
echo "2. Change colors:"
echo "   Edit: tailwind.config.js"
echo ""
echo "3. Add your projects:"
echo "   Edit: lib/constants.ts (PROJECTS array)"
echo ""
echo "4. Update skills:"
echo "   Edit: lib/constants.ts (SKILLS_BY_CATEGORY)"
echo ""

echo "📚 Documentation:"
echo "━━━━━━━━━━━━━━━━"
echo "  • Quick Start: QUICKSTART.md"
echo "  • Customization: CUSTOMIZATION.md"
echo "  • Deployment: DEPLOYMENT.md"
echo ""

echo "🏃 Quick Start:"
echo "━━━━━━━━━━━━━━"
echo ""
echo "  npm run dev          - Start development server"
echo "  npm run build        - Build for production"
echo "  npm run lint         - Check code quality"
echo ""

echo "✨ Setup complete! Run 'npm run dev' to start developing."
