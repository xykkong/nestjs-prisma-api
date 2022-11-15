FROM node:16-alpine3.15

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install

EXPOSE $PORT
CMD ["pnpm", "run", "start:dev"]
