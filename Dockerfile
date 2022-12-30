FROM node:14-stretch
EXPOSE 1050
WORKDIR /WTA-794-csrf
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm install
CMD ["node", "app.js"]