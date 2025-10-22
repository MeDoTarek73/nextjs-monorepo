# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY tsconfig.json ./

# Copy the entire workspace structure
COPY . .

# Install dependencies
RUN npm ci --only=production

# Build the application
RUN npx nx build nextjs-app

# ---- Run stage ----
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy package files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/.next/static ./apps/nextjs-app/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/nextjs-app/public ./apps/nextjs-app/public

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000

# Start the application
CMD ["node", "apps/nextjs-app/server.js"]
