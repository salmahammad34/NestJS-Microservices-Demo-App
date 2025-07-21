FROM node:18-alpine

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build
# Generate Prisma Client with Linux binaries
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]