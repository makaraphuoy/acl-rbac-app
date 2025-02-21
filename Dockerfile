FROM node:22.9.0-bullseye


WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3001
ENV NODE_ENV=production

# Expose the application port
EXPOSE 3001

CMD ["npm", "run", "start"]
