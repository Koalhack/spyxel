FROM node:18-alpine

# Create app director
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# If you are building your code for production
RUN npm ci --omit=dev

#Bundle app source
COPY . .

EXPOSE 8080

CMD ["/bin/ash", "-c", "node server/index.js" ]
