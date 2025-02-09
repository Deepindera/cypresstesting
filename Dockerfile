# Step 1: Use the Cypress image to run tests
FROM cypress/included:13.17.0

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to install app dependencies
COPY package*.json ./

# Install the app dependencies
RUN npm install
RUN echo "npminstall is finished...........Done"

# Copy the rest of the app
COPY . .

# Copy the start.sh script
COPY start.sh /app/start.sh
RUN echo "Copied the start sh file to app startsh............Done"

# Make the script executable
RUN chmod +x /app/start.sh
RUN echo "Made start file executable using chmod............Done"

# Expose the port for Next.js
EXPOSE 3000
# Print logs after installation
RUN echo "EXPOSE 3000............Done"

# Override the ENTRYPOINT to use your own start.sh script
ENTRYPOINT ["/bin/sh", "/app/start.sh"]

# Start the application and run Cypress tests
#CMD ["/bin/sh", "/app/start.sh"]
#RUN echo "Finished running the end command in dockerfile............Done"
