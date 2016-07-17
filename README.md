# dash-hue-bridge

An Amazon Dash Button to Phillips Hue Bridge

## Usage:

```bash
git clone git@git://github.com:/JamesAwesome/dash-hue-bridge
cd ./dash-hue-bridge
npm install
./app.js -h
```

## Docker:

```bash
docker build .
docker run --net=host imageId [options] [arguments]
```

NOTE: Only works w/ native docker daemon (Not docker for mac/docker-machine etc...)

### Known Issues

On OSX you have to use sudo. Listen, I didn't write BSD.
