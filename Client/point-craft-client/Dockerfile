FROM node:22-alpine AS build
WORKDIR /src
RUN npm install -g npm@11.6.2

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
RUN npm install -g npm@11.6.2

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /src/dist/point-craft-client ./dist/point-craft-client

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ENV PORT=4000
EXPOSE 4000

CMD ["node", "dist/point-craft-client/server/server.mjs"]
