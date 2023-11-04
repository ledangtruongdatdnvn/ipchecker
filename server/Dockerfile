FROM node:16.16.0-alpine
WORKDIR /app
COPY ./package.json ./
RUN npm install -f
RUN npm install openai
COPY . .
EXPOSE 5000
CMD ["npm", "run", "start"]