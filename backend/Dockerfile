FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
