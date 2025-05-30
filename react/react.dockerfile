# Dockerfile for a React application
# Use the official Node.js image as the base image
FROM node:24.1.0

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

#Start the application
EXPOSE 3000
CMD ["npm", "start"]