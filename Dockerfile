FROM oven/bun:latest as build

WORKDIR /app

COPY package.json bun.lockb ./

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "dev"]
