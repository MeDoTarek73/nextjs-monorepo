# ---- Build stage ----
  FROM node:20-alpine AS builder
  WORKDIR /app

  COPY package*.json ./
  COPY nx.json ./
  COPY tsconfig.base.json ./
  COPY apps/nextjs-app ./apps/nextjs-app
  COPY libs ./libs

  RUN npm install
  RUN npm run build nextjs-app

  # ---- Run stage ----
  FROM node:20-alpine AS runner
  WORKDIR /app

  COPY --from=builder /app/dist/apps/nextjs-app ./

  EXPOSE 3000

  CMD ["node", "main.js"]
