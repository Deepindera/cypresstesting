#!/bin/bash

# Enable debugging
set -x
echo "Starting start.sh script..."

# Step 1: Install Cypress and wait-on
npm install wait-on --save-dev

# Output Cypress version for logging purposes
echo "------------------Cypress version:"
npx cypress --version

# Step 2: Start the application
echo "Starting Next.js application......................"
npm run start -- -H 0.0.0.0 -p 3000 &

# Sleep for a few seconds to give the app time to start
sleep 20

# Capture the Next.js process ID
APP_PID=$!

# Step 3: Wait for the application to be available
echo "Waiting for application to be available..."
npx wait-on http://localhost:3000

# Check if the app is running
if [ $? -eq 0 ]; then
  echo "Next.js app is up and running!"
else
  echo "Next.js app did not start successfully."
fi

# Step 4: Run Cypress e2e tests
echo "Running Cypress tests..."
npx cypress run --headless

# Kill the Next.js app after Cypress tests finish
echo "Killing the Next.js app..."
kill $APP_PID
