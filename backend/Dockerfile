FROM oven/bun:latest as backend

RUN apt update && apt install nano fontconfig -y

COPY ./backend/package.json ./
COPY ./backend/bun.lockb ./
COPY ./backend/src ./
COPY ./backend/fonts/ /usr/share/fonts/truetype/

RUN bun install

WORKDIR /home/node/app