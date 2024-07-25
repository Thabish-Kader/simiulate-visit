# Use the official Node.js image from the Docker Hub
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    gconf-service \
    libasound2 \
    libatk1.0-0 \
    libcups2 \
    libgconf-2-4 \
    libnspr4 \
    libnss3 \
    libxss1 \
    fonts-liberation \
    libappindicator1 \
    libappindicator3-1 \
    libfontconfig1 \
    libgbm1 \
    xdg-utils \
    lsb-release \
    wget \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
