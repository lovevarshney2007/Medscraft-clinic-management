FROM node:20-slim

# Install OpenSSL (required for Prisma query engine)
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

# Initialize schema and seed data so database is pre-built into the Docker image
RUN node scripts/init-db.js

ENV PORT=5000
ENV NODE_ENV=production

EXPOSE 5000

CMD ["npm", "start"]
