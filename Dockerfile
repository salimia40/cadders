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
ENV DATABASE_URL=postgresql://root:cFVmVpVCRZp3J64quLuc0EOI@cadders-db:5432/postgres
ENV AUTH_SECRET=Ohr4KQnkeinUOBCoJhhIb+xEw9zvnD6tkYtK+goSz2M=
ENV STORAGE_ACCESSKEY=5ehh4cg1d59uc3al
ENV STORAGE_SECRETKEY=a4278927-ef4d-4472-b76f-3bd1ecbefb59
ENV STORAGE_ENDPOINT=https://storage.iran.liara.space
ENV STORAGE_BUCKETNAME=salkood
CMD [ "pnpm", "start" ]