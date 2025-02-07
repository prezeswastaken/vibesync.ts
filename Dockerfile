# Stage 1: Build Stage
FROM oven/bun:latest as build

# Set working directory
WORKDIR /app

# Copy package and lock files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

EXPOSE 3000

# Serve the static files using serve
CMD ["bun", "dev"]
