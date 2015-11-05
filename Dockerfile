FROM node:4.1.2
COPY . /nogueira-storage
WORKDIR /nogueira-storage
RUN npm install

EXPOSE 13956

CMD ["/bin/sh", "-c", "node ."]


