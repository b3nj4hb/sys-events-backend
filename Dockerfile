
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm
LABEL maintainer="David Rey"
# Install tslint, typescript, pnpm. eslint is installed by javascript image
ARG NODE_MODULES="tslint-to-eslint-config typescript pnpm bun"
RUN su node -c "umask 0002 && npm install -g ${NODE_MODULES}" \
    && npm cache clean --force > /dev/null 2>&1

WORKDIR /app
COPY start-container /usr/local/bin/start-container
RUN chmod +x /usr/local/bin/start-container

# listen on all interfaces inside the container
ENV HOST=0.0.0.0