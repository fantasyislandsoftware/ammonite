FROM i386/alpine as backend

ARG HOME_PATH=/home/node
ARG APP_PATH=${HOME_PATH}/app
ARG TOOLS_PATH=${APP_PATH}/tools

RUN apk add --update npm nano git wget tar build-base fontconfig

COPY ./backend/package.json ./
COPY ./backend/src ./
COPY ./backend/fonts/ /usr/share/fonts/truetype/

COPY ./backend/tools/hunkinfo ${TOOLS_PATH}/hunkinfo
WORKDIR ${TOOLS_PATH}/hunkinfo
RUN make hunkinfo

ENV PATH="${TOOLS_PATH}/hunkinfo:$PATH"
ENV PATH="${TOOLS_PATH}/hunkdump:$PATH"
ENV PATH="${TOOLS_PATH}/vasm:$PATH"
ENV PATH="${TOOLS_PATH}/vda:$PATH"

WORKDIR ${APP_PATH}
RUN npm install