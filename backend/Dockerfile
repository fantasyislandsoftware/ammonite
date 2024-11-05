FROM archlinux as backend

ARG HOME_PATH=/home/node
ARG APP_PATH=${HOME_PATH}/app
ARG TOOLS_PATH=${APP_PATH}/tools

RUN pacman -Syu pnpm nano gcc make fontconfig --noconfirm

#RUN apk add --update pnpm nano git wget tar build-base fontconfig

COPY ./backend/package.json ${APP_PATH}/
COPY ./backend/tsconfig.json ${APP_PATH}/
COPY ./backend/src ${APP_PATH}/src
COPY ./backend/tsconfig.json ${APP_PATH}/
COPY ./backend/fonts/ /usr/share/fonts/truetype/

COPY ./backend/tools/hunkinfo ${TOOLS_PATH}/hunkinfo
WORKDIR ${TOOLS_PATH}/hunkinfo
RUN gcc hunkinfo.c -o hunkinfo

COPY ./backend/tools/vda ${TOOLS_PATH}/vda
WORKDIR ${TOOLS_PATH}/vda
RUN make

ENV PATH="${TOOLS_PATH}/hunkinfo:$PATH"
ENV PATH="${TOOLS_PATH}/hunkdump:$PATH"
ENV PATH="${TOOLS_PATH}/vasm:$PATH"
ENV PATH="${TOOLS_PATH}/vda:$PATH"

WORKDIR ${APP_PATH}

RUN pnpm install
