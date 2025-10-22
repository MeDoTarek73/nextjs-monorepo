# ---- Build stage ----
  FROM node:20-alpine AS builder
  WORKDIR /app

  COPY package*.json ./
  COPY nx.json ./
  COPY tsconfig.base.json ./
  COPY apps/nextjs-app ./apps/nextjs-app

  RUN npm install
  RUN npm run build nextjs-app

  # ---- Run stage ----
  FROM node:20-alpine AS runner
  WORKDIR /app

  ENV NODE_ENV=production

  # انسخ فقط الملفات المطلوبة للتشغيل
  COPY --from=builder /app/apps/nextjs-app/.next ./.next
  COPY --from=builder /app/apps/nextjs-app/public ./public
  COPY --from=builder /app/package*.json ./

  EXPOSE 3000

  CMD ["npm", "start"]
