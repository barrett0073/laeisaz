#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print with color
print_message() {
    echo -e "${2}${1}${NC}"
}

# Function to check if command was successful
check_status() {
    if [ $? -eq 0 ]; then
        print_message "✓ $1" "$GREEN"
    else
        print_message "✗ $1" "$RED"
        exit 1
    fi
}

# Function to check if command was successful (non-fatal)
check_status_soft() {
    if [ $? -eq 0 ]; then
        print_message "✓ $1" "$GREEN"
    else
        print_message "⚠ $1 (continuing...)" "$YELLOW"
    fi
}

# Get current branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
print_message "Current branch: $current_branch" "$BLUE"

# Show current status
print_message "Checking current Git status..." "$YELLOW"
git status
echo ""

# Fetch latest changes
print_message "Fetching latest changes from remote..." "$YELLOW"
git fetch origin
check_status "Git fetch"

# Check if there are local changes
if ! git diff-index --quiet HEAD --; then
    print_message "Local changes detected. Stashing changes..." "$YELLOW"
    git stash
    check_status_soft "Git stash"
fi

# Pull latest changes
print_message "Pulling latest changes from origin/$current_branch..." "$YELLOW"
git pull origin $current_branch
check_status "Git pull"

# Restore stashed changes if any
if git stash list | grep -q .; then
    print_message "Restoring stashed changes..." "$YELLOW"
    git stash pop
    check_status_soft "Git stash pop"
fi

# Install/update dependencies if package.json exists
if [ -f "package.json" ]; then
    print_message "Installing/updating dependencies..." "$YELLOW"
    npm install
    check_status_soft "npm install"
fi

# Build the project if needed (uncomment if you use build step)
# print_message "Building project..." "$YELLOW"
# npm run build
# check_status_soft "npm build"

# Show final status
print_message "Final Git status:" "$YELLOW"
git status

print_message "Code update completed successfully! 🎉" "$GREEN"
print_message "Don't forget to restart your application if needed!" "$BLUE"

