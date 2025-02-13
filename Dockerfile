# Stage 1: Build the Next.js app and install Cypress dependencies
FROM node:20 AS build

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies including Cypress and TypeScript
RUN npm install --legacy-peer-deps

# Copy application source files
COPY . .

# Debugging: List files to ensure app directory exists
RUN ls -R /app

# Run build
RUN npm run build

# Stage 2: Set up runtime environment and install necessary runtime dependencies
FROM node:20 AS runtime

WORKDIR /app

# Install necessary system dependencies for Cypress and Xvfb
RUN apt-get update && apt-get install -y \
    bash \
    curl \
    ca-certificates \
    libpng-dev \
    libjpeg-dev \
    libgtk-3-0 \
    libx11-xcb1 \
    libxkbcommon0 \
    libgbm1 \
    libnss3 \
    libasound2 \
    xvfb

# Copy built .next folder and necessary files from the build stage
COPY --from=build /app/.next /app/.next
COPY --from=build /app/package.json /app/package-lock.json /app/

# Install runtime dependencies including Cypress (if needed) and TypeScript
RUN npm install --production --legacy-peer-deps

# Install Cypress for runtime if you plan to run tests during container runtime
RUN npm install cypress --save-dev

# Copy Cypress config and Cypress folder to /app in the runtime stage
COPY cypress.config.ts /app/cypress.config.ts
COPY cypress /app/cypress

# Copy the start.sh script
COPY start.sh /app/start.sh
RUN echo "Copied the start.sh file to /app/start.sh............Done"

# Make the script executable
RUN chmod +x /app/start.sh
RUN echo "Made start file executable using chmod............Done"

# Expose the port for Next.js
EXPOSE 3000
RUN echo "EXPOSE 3000............Done"

# Override the ENTRYPOINT to use your custom start.sh script
ENTRYPOINT ["/bin/sh", "/app/start.sh"]

# Optional: If you want to run tests after the app starts, use CMD for testing phase.
# CMD ["/bin/sh", "/app/start.sh"]
# RUN echo "Finished running the end command in dockerfile............Done"
