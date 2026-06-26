# ── Stage 1: build ──────────────────────────────────────────
FROM node:24-alpine AS builder

ENV CI=true

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Permitir build scripts (firebase, protobufjs los necesitan)
RUN echo "ignore-scripts=false" > .npmrc && \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ── Stage 2: serve ───────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
