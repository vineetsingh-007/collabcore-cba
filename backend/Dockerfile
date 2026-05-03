# Use Node base image (Alpine for optimization)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy remaining source code
COPY . .

# Expose backend port
EXPOSE 5001

# Run server
CMD ["npm", "start"]
