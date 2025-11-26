FROM node:lts-alpine

WORKDIR /home_payment

# copy packages files an install backend dependencies
COPY package*.json ./
RUN npm run install-backend

# copy packages files an install frontend dependencies
COPY frontend/package*.json frontend/
RUN npm run install-frontend

# copy frontend folder and run it
COPY frontend/ frontend/
RUN npm run build --prefix frontend

# copy backend folder and run it
COPY backend/ backend/

USER node

CMD [ "npm", "start" ]

EXPOSE 5060