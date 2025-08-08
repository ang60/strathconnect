#!/bin/bash

# StrathConnect Backend Startup Script
# This script helps you set up and run the StrathConnect backend

set -e

echo "🚀 StrathConnect Backend Setup"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
check_node() {
    print_status "Checking Node.js installation..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js v18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) is installed"
}

# Check if npm is installed
check_npm() {
    print_status "Checking npm installation..."
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    print_success "npm $(npm -v) is installed"
}

# Check if MongoDB is running
check_mongodb() {
    print_status "Checking MongoDB connection..."
    
    # Try to connect to MongoDB
    if command -v mongosh &> /dev/null; then
        if mongosh --eval "db.runCommand('ping')" &> /dev/null; then
            print_success "MongoDB is running"
            return 0
        fi
    fi
    
    # Try alternative connection methods
    if command -v mongo &> /dev/null; then
        if mongo --eval "db.runCommand('ping')" &> /dev/null; then
            print_success "MongoDB is running"
            return 0
        fi
    fi
    
    print_warning "MongoDB connection failed. Please ensure MongoDB is running."
    print_status "To start MongoDB:"
    echo "  - macOS: brew services start mongodb-community"
    echo "  - Ubuntu/Debian: sudo systemctl start mongod"
    echo "  - Windows: net start MongoDB"
    echo "  - Or run: mongod"
    
    read -p "Do you want to continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Dependencies installed"
    else
        print_status "Dependencies already installed"
    fi
}

# Setup environment
setup_environment() {
    print_status "Setting up environment..."
    
    if [ ! -f ".env" ]; then
        if [ -f "env.example" ]; then
            cp env.example .env
            print_success "Environment file created from template"
            print_warning "Please edit .env file with your configuration"
        else
            print_error "env.example file not found"
            exit 1
        fi
    else
        print_status "Environment file already exists"
    fi
}

# Generate JWT secrets
generate_secrets() {
    print_status "Generating JWT secrets..."
    
    # Check if secrets are already set
    if grep -q "your-super-secret-jwt-key-here" .env 2>/dev/null; then
        print_warning "Default JWT secrets detected. Generating new ones..."
        
        # Generate new secrets
        JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
        JWT_REFRESH_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
        
        # Update .env file
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i '' "s/your-super-secret-jwt-key-here/$JWT_SECRET/g" .env
            sed -i '' "s/your-super-secret-refresh-key-here/$JWT_REFRESH_SECRET/g" .env
        else
            # Linux
            sed -i "s/your-super-secret-jwt-key-here/$JWT_SECRET/g" .env
            sed -i "s/your-super-secret-refresh-key-here/$JWT_REFRESH_SECRET/g" .env
        fi
        
        print_success "JWT secrets generated and updated"
    else
        print_status "JWT secrets already configured"
    fi
}

# Build the application
build_app() {
    print_status "Building the application..."
    npm run build
    print_success "Application built successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    if npm test; then
        print_success "Tests passed"
    else
        print_warning "Some tests failed"
    fi
}

# Start the application
start_app() {
    print_status "Starting the application..."
    
    # Check if we should run in development or production mode
    if [ "$1" = "prod" ]; then
        print_status "Starting in production mode..."
        npm run start:prod
    else
        print_status "Starting in development mode..."
        npm run start:dev
    fi
}

# Main function
main() {
    echo
    print_status "Starting StrathConnect Backend setup..."
    
    # Check prerequisites
    check_node
    check_npm
    check_mongodb
    
    # Setup
    install_dependencies
    setup_environment
    generate_secrets
    
    # Build and test
    build_app
    run_tests
    
    echo
    print_success "Setup completed successfully!"
    echo
    print_status "Next steps:"
    echo "1. Edit .env file with your configuration"
    echo "2. Start the application:"
    echo "   - Development: npm run start:dev"
    echo "   - Production: npm run start:prod"
    echo "3. Access the API at: http://localhost:3000"
    echo "4. View API documentation at: http://localhost:3000/api"
    echo
    
    # Ask if user wants to start the application
    read -p "Do you want to start the application now? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Start in production mode? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            start_app "prod"
        else
            start_app "dev"
        fi
    fi
}

# Handle command line arguments
case "${1:-}" in
    "dev")
        start_app "dev"
        ;;
    "prod")
        start_app "prod"
        ;;
    "test")
        run_tests
        ;;
    "build")
        build_app
        ;;
    "setup")
        main
        ;;
    *)
        main
        ;;
esac
