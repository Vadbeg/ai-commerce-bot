#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
EXAMPLE_DIR="$PROJECT_DIR/example"

print_header() {
    echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

show_usage() {
    cat << EOF
${BLUE}ElevenLabs React Chat - Project Runner${NC}

${GREEN}Usage:${NC}
  ./run.sh [command]

${GREEN}Commands:${NC}
  install      Install all dependencies
  build        Build the main package
  dev          Run package in watch mode
  type-check   Check TypeScript types
  example      Install and run example app
  clean        Remove build artifacts
  help         Show this message

${GREEN}Examples:${NC}
  ./run.sh install       # Install dependencies
  ./run.sh build         # Build package
  ./run.sh example       # Run example app
  ./run.sh dev           # Start development mode

EOF
}

install_deps() {
    print_header "Installing Main Package Dependencies"
    cd "$PROJECT_DIR"
    npm install
    print_success "Main package dependencies installed"
}

install_example_deps() {
    print_header "Installing Example App Dependencies"
    cd "$EXAMPLE_DIR"
    npm install
    print_success "Example app dependencies installed"
}

build_package() {
    print_header "Building Main Package"
    cd "$PROJECT_DIR"
    npm run build
    print_success "Package built successfully"
    echo -e "Output: ${BLUE}$PROJECT_DIR/dist${NC}\n"
}

watch_mode() {
    print_header "Running in Watch Mode"
    print_info "Recompiling on file changes... Press Ctrl+C to exit"
    cd "$PROJECT_DIR"
    npm run dev
}

type_check() {
    print_header "Type Checking"
    cd "$PROJECT_DIR"
    npm run type-check
    print_success "Type check passed"
}

run_example() {
    print_header "Running Example Application"

    if [ ! -d "$EXAMPLE_DIR/node_modules" ]; then
        print_info "Example dependencies not installed, installing now..."
        install_example_deps
    fi

    # Make sure main package is built
    if [ ! -d "$PROJECT_DIR/dist" ]; then
        print_info "Building main package first..."
        build_package
    fi

    print_info "Starting dev server on http://localhost:3000"
    print_info "Press Ctrl+C to exit\n"
    cd "$EXAMPLE_DIR"
    npm run dev
}

clean() {
    print_header "Cleaning Build Artifacts"

    if [ -d "$PROJECT_DIR/dist" ]; then
        rm -rf "$PROJECT_DIR/dist"
        print_success "Removed $PROJECT_DIR/dist"
    fi

    if [ -d "$EXAMPLE_DIR/dist" ]; then
        rm -rf "$EXAMPLE_DIR/dist"
        print_success "Removed $EXAMPLE_DIR/dist"
    fi

    if [ -d "$PROJECT_DIR/node_modules" ]; then
        rm -rf "$PROJECT_DIR/node_modules"
        print_success "Removed $PROJECT_DIR/node_modules"
    fi

    if [ -d "$EXAMPLE_DIR/node_modules" ]; then
        rm -rf "$EXAMPLE_DIR/node_modules"
        print_success "Removed $EXAMPLE_DIR/node_modules"
    fi

    print_success "Cleanup complete"
}

full_setup() {
    print_header "Full Setup & Installation"

    print_info "Step 1/4: Installing main package dependencies..."
    install_deps

    print_info "Step 2/4: Building package..."
    build_package

    print_info "Step 3/4: Installing example app dependencies..."
    install_example_deps

    print_header "Setup Complete!"
    echo -e "${GREEN}Next steps:${NC}"
    echo "  • Get your Agent ID from https://elevenlabs.io/app"
    echo "  • Run: ${BLUE}./run.sh example${NC}"
    echo ""
}

# Main script logic
case "${1:-}" in
    install)
        install_deps
        ;;
    build)
        build_package
        ;;
    dev)
        watch_mode
        ;;
    type-check)
        type_check
        ;;
    example)
        run_example
        ;;
    clean)
        clean
        ;;
    help)
        show_usage
        ;;
    *)
        if [ -z "$1" ]; then
            full_setup
        else
            print_error "Unknown command: $1"
            echo ""
            show_usage
            exit 1
        fi
        ;;
esac
