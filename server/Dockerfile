FROM node:17

ENV PORT=8080
ENV COLOR=green

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src

EXPOSE $PORT
CMD ["npm", "start"]
