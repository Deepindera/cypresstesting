WeatherApp Deployment and Testing Pipeline
This repository contains the full deployment process for the WeatherApp, including steps for building, testing, and deploying the app to AWS EC2. The process also includes Cypress end-to-end testing during the build phase. Below is an outline of the steps and purpose of the various components of this project.

Project Overview
The WeatherApp is a Next.js-based application that displays weather information. This project automates its deployment using Docker containers and integrates with AWS services for seamless operation.

Key Components:
Next.js: A React framework used for building the WeatherApp.
Cypress: A testing tool used for end-to-end (e2e) testing.
AWS ECR (Elastic Container Registry): A service to store Docker images.
AWS EC2: Cloud instances used for hosting the application.
GitHub Actions: CI/CD pipeline used to automate the process.
Steps Involved in the Workflow
1. Checkout the Repository
The process begins by checking out the repository in the CI/CD pipeline (GitHub Actions).
2. Build the Application
Next.js is built using npm run build, which compiles the app for production.
3. Run Cypress Tests
Cypress is used to perform automated end-to-end testing during the build phase to ensure the application works as expected.
If the tests pass, the build continues. If they fail, the process exits.
4. Dockerize the Application
The application is then packaged into a Docker image. This image is uploaded to AWS ECR for storage.
5. Deploy to AWS EC2
The latest Docker image is pulled from ECR and deployed to an EC2 instance.
Docker container is started, exposing the app on port 3000 for public access.
6. Handling the Container Lifecycle
Depending on the value of the STAY_ALIVE environment variable:
If STAY_ALIVE is true, the container will continue running indefinitely, keeping the application live.
If STAY_ALIVE is false, the container will exit after Cypress tests are completed.
Environment Variables
STAY_ALIVE:

If set to true, the container will stay alive after the application is deployed.
If set to false, the container will exit after the Cypress tests are executed.
AWS ECR Credentials: AWS credentials are used to authenticate and interact with the ECR service to upload and download Docker images.

EC2_PUBLIC_IP: The public IP address of the AWS EC2 instance that will host the application.

GitHub Actions Workflow
The GitHub Actions workflow file (.github/workflows/deploy.yml) automates the following tasks:

Build the Docker image.
Run Cypress tests.
Push the Docker image to AWS ECR.
Deploy the Docker image to AWS EC2.
How to Run Locally
If you wish to run this project locally, follow these steps:

Clone the repository:

bash
Copy
git clone https://github.com/your-username/weatherapp.git
Build the Next.js app:

bash
Copy
npm install
npm run build
Run the app locally:

bash
Copy
npm run start
The app will be available at http://localhost:3000.

Troubleshooting
1. Cypress Tests Fail
Check if the application is running and available at localhost:3000. If not, ensure the Next.js build is successful.
2. Docker Container Exits Immediately
Ensure that the STAY_ALIVE environment variable is set correctly, and verify the logs from the container.
3. Cannot Access the Application on EC2
Verify that the security group for the EC2 instance allows inbound traffic on port 3000.
Check that the application inside the container is listening on all interfaces (0.0.0.0).
License
This project is licensed under the MIT License.