# Use the official Node.js image version 22 (Alpine) as a base
FROM node:22-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the ngnix.conf to the container
COPY ngnix.conf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 5173
EXPOSE 5173

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
