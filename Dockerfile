FROM node:4.1.2
COPY . /nogueira-storage
RUN mkdir /code
RUN cd /nogueira-storage && npm install

EXPOSE 13956

CMD ["/bin/sh", "-c", "cd /nogueira-storage && node ."]


