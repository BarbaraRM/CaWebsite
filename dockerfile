# Etapa 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# 👇 Aquí agregamos la variable antes de compilar
ENV NEXT_DISABLE_ESLINT=true

RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3050
CMD ["npm", "start"]
