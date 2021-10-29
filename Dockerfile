# Do the npm install or yarn install in the full image
FROM node:15

ENV LANG=C.UTF-8

# Set a working director
WORKDIR /app

COPY package.json .
COPY yarn.lock .

ENV NODE_OPTIONS=--max_old_space_size=4096

RUN yarn install --force

COPY . .

RUN yarn build

EXPOSE 3000 

CMD ["yarn", "start"]
