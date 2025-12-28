#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

# Configure Git for large files
print_message "Configuring Git for large files..." "$YELLOW"
git config --global http.postBuffer 157286400
git config --global http.maxRequestBuffer 100M
git config --global core.compression 9
git config --global http.lowSpeedLimit 1000
git config --global http.lowSpeedTime 300
check_status "Git configuration"

# Add all changes
print_message "Adding all changes..." "$YELLOW"
git add .
check_status "Git add"

# Show status
print_message "Current Git status:" "$YELLOW"
git status

# Prompt for commit message
read -p "Enter commit message (or press enter for 'Update'): " commit_message
if [ -z "$commit_message" ]; then
    commit_message="Update"
fi

# Commit changes
print_message "Committing changes..." "$YELLOW"
git commit -m "$commit_message"
check_status "Git commit"

# Push to main branch
print_message "Pushing to main branch..." "$YELLOW"
git push origin main
check_status "Git push"

print_message "All operations completed successfully! 🎉" "$GREEN" 