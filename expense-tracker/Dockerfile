# Use an official Node.js runtime as a base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Define the command to run your application
CMD ["node", "app.js"]

