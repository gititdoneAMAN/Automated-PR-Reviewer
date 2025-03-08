FROM ubuntu:focal

RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get upgrade -y && \
    apt-get install -y nodejs && \
    apt-get install -y git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/app

COPY main.sh .
COPY kafka.js .
COPY script.js .
COPY package*.json .

RUN npm install && \
    chmod +x script.js &&  \
    chmod +x main.sh

ENTRYPOINT [ "/home/app/main.sh" ]