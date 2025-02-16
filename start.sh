#!/bin/bash

# Enable debugging
set -x
echo "Starting start.sh script..."

# Step 1: Output Cypress version for logging purposes
echo "------------------Cypress version:"
npx cypress --version

# Step 2: Ensure the Next.js build process is triggered
echo "Running 'next build' for production build..."
npm run build

# Debugging: Check if .next directory exists after build
echo "Checking for .next directory..."
ls -la .next

# If the build fails and .next is not found, exit
if [ ! -d ".next" ]; then
  echo "Error: .next directory not found. Build failed."
  exit 1
fi

# Step 3: Start the application
echo "Starting Next.js application......................"
npm run start -- -H 0.0.0.0 -p 3000 &

# Capture the Next.js process ID
APP_PID=$!

# Step 4: Wait for the application to be available (use wait-on for better control)
echo "Waiting for application to be available..."
npx wait-on http://localhost:3000 --timeout 10000

# Check if the app is running
if [ $? -eq 0 ]; then
  echo "Next.js app is up and running!"
else
  echo "Next.js app did not start successfully."
  exit 1
fi

# Step 5: Run Cypress e2e tests with the correct configuration path
# Step 6: Run tests only on build stage and Check if STAY_ALIVE is set to true, and decide whether to keep the container alive or exit
if [ "$STAY_ALIVE" = "true" ]; then
  echo "STAY_ALIVE TRUE so Keeping container alive..."
  sleep infinity  # Keep the container alive
else
  echo "Running Cypress tests during build stage..."
  npx cypress run --headless --config-file /app/cypress.config.ts
  # Check if Cypress tests passed
  if [ $? -eq 0 ]; then
    echo "Cypress tests passed!"
    exit 0  # Exit the container after tests
  else
    echo "Cypress tests failed. Killing the container"
    exit 1  # Kills the container if tests fail
  fi
fi

# Kill the Next.js app after Cypress tests finish (only if necessary)
#echo "Killing the Next.js app..."
#kill $APP_PID
