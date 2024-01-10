FROM node:21 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app
FROM base AS prod-deps
RUN apt-get update -y && apt-get install -y openssl
RUN pnpm install --prod --frozen-lockfile
FROM base AS build
RUN pnpm install --frozen-lockfile
RUN pnpm run build
FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD [ "pnpm", "start" ]