FROM node:6.3-wheezy

RUN apt-get -y update && apt-get install -y python2.7 git libpcap-dev
RUN mkdir -p /srv/dash-hue-bridge
COPY . /srv/dash-hue-bridge/

WORKDIR /srv/dash-hue-bridge

RUN npm install

ENTRYPOINT ["node", "/srv/dash-hue-bridge/app.js"]
