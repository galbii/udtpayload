#!/bin/bash

# Script to automate migration of assets from old landing page to new Next.js structure
# Run this from the project root

echo "Starting asset migration..."

# Create required directories if they don't exist
mkdir -p public/images
mkdir -p public/videos

# Copy image assets 
echo "Copying image assets..."
cp -r app/oldlanding/assets/images/* public/images/

# Copy video assets
echo "Copying video assets..."
cp -r app/oldlanding/assets/videos/* public/videos/

# Copy logo files
echo "Copying logo files..."
cp app/oldlanding/assets/images/logo.png public/images/

# Set proper permissions
echo "Setting proper permissions..."
chmod -R 644 public/images/*
chmod -R 644 public/videos/*
find public/images -type d -exec chmod 755 {} \;
find public/videos -type d -exec chmod 755 {} \;

# Optimize images (requires imagemin)
# echo "Optimizing images..."
# npx imagemin public/images/* --out-dir=public/images

echo "Asset migration complete!"
echo "Please verify that all assets have been copied correctly."
echo "The assets are now available at /images/* and /videos/* paths in your components."

# Show the current assets count
echo ""
echo "Assets migrated:"
echo "Images: $(find public/images -type f | wc -l)"
echo "Videos: $(find public/videos -type f | wc -l)" 