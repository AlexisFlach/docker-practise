FROM node:alpine
WORKDIR /app
ENV PORT=7000
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "index.js"]