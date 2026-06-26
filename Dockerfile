# ── Stage 1: build ──────────────────────────────────────────
FROM node:24-alpine AS builder

ENV CI=true

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --prefer-offline 2>/dev/null || npm install

COPY . .
RUN npm run build

# ── Stage 2: serve ───────────────────────────────────────────
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
