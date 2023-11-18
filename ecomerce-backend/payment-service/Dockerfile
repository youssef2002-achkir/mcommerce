FROM node:18.16.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 5002
CMD ["node", "app.js"]
