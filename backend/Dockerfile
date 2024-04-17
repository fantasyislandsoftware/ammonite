FROM i386/alpine as backend

RUN apk add --update npm nano fontconfig

COPY ./backend/package.json ./
COPY ./backend/src ./
COPY ./backend/fonts/ /usr/share/fonts/truetype/

WORKDIR /home/node/app
RUN npm install