FROM oven/bun:latest as backend

RUN apt update && apt install nano -y

COPY ./backend/package.json ./
COPY ./backend/bun.lockb ./
COPY ./backend/src ./

RUN bun install

WORKDIR /home/node/app