# ============================================
# Stage 1: Install dependencies
# ============================================

ARG NODE_VERSION=22-slim

FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

# Install bun to use bun.lock for dependency resolution
RUN npm install -g bun

# Copy workspace manifests to leverage Docker cache
COPY package.json bun.lock ./
COPY apps/user/package.json apps/user/package.json
COPY packages/ui/package.json packages/ui/package.json

# Install dependencies with frozen lockfile for reproducible builds
RUN --mount=type=cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

# ============================================
# Stage 2: Build the Next.js application
# ============================================

FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build-time env vars — override these with --build-arg or in compose.yml
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up
ARG NEXT_PUBLIC_SENTRY_DISABLED=true

ENV BUILD_STANDALONE=true

RUN bun run build:user

# ============================================
# Stage 3: Production runner
# ============================================

FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NEXT_TELEMETRY_DISABLED=1

# Copy public assets
COPY --from=builder --chown=node:node /app/apps/user/public ./apps/user/public

# Create .next dir with correct permissions for prerender cache
RUN mkdir -p apps/user/.next && chown -R node:node apps/user/.next

# Copy standalone output and static files
COPY --from=builder --chown=node:node /app/apps/user/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/user/.next/static ./apps/user/.next/static

# Run as non-root user
USER node

EXPOSE 3000

WORKDIR /app/apps/user

CMD ["node", "server.js"]
