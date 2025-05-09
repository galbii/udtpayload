#!/bin/bash

# Cleanup script for removing old landing page components
# This script will:
# 1. Create a backup of the oldlanding directory
# 2. Remove the oldlanding directory
# 3. Update any remaining references to oldlanding in the codebase

echo "Starting cleanup of old landing page components..."

# Create a timestamp for the backup
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="backup_oldlanding_${TIMESTAMP}"

# Create a backup of the oldlanding directory
echo "Creating backup of oldlanding directory to ${BACKUP_DIR}..."
mkdir -p ${BACKUP_DIR}
cp -r app/oldlanding ${BACKUP_DIR}/

# Check if backup was successful
if [ $? -eq 0 ]; then
  echo "Backup created successfully in ${BACKUP_DIR}"
  
  # Remove the oldlanding directory
  echo "Removing oldlanding directory..."
  rm -rf app/oldlanding
  
  if [ $? -eq 0 ]; then
    echo "Successfully removed oldlanding directory"
  else
    echo "Error: Failed to remove oldlanding directory. Please check permissions."
    exit 1
  fi
else
  echo "Error: Failed to create backup. Aborting cleanup."
  exit 1
fi

echo "Cleanup completed successfully!"
echo "If you need to restore the old files, they are available in: ${BACKUP_DIR}" 