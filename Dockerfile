FROM node:12.18-alpine3.9

RUN mkdir /app
WORKDIR /app

RUN apk update && \
    apk upgrade && \
	apk add git && \
	apk add vim && \
	git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime && \
	sh ~/.vim_runtime/install_awesome_vimrc.sh && \
	sh -c "$(wget -O- https://raw.githubusercontent.com/deluan/zsh-in-docker/master/zsh-in-docker.sh)"

COPY package.json package.json
COPY frontend_ts_v2/package.json frontend_ts_v2/package.json
RUN npm install --silent 
RUN cd frontend_ts_v2/ && npm install --silent

COPY . .

LABEL maintainer="David Campuzano <admin@hoopr.io>"

CMD ./scripts/start.sh