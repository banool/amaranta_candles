# Amaranta Candles

## Secrets setup
You need .env files like `.env.base`, `.env.dev`, and `.env.prod`. You can see what env vars you need by looking at core/secrets.py.

## Local development
Build the container
```
docker image build -t amaranta_candles .
```

Run the container
```
docker ps -a | c1 | xargs docker rm -f; export EXTERNAL_PORT=42069 && export INTERNAL_PORT=6969 && docker run -it --publish 0.0.0.0:$EXTERNAL_PORT:$INTERNAL_PORT --name amaranta_candles --env-file .env.base --env-file .env.dev amaranta_candles:latest
```

You should now see a site at http://localhost:42069

## Docker setup
Real:
```
# Kill all running containers
docker ps -a | c1 | xargs docker rm -f
# Build image
docker image build -t net_worth .
# To get an interactive terminal
docker run --env-file .env.base --env-file .env.dev -it --entrypoint /bin/bash net_worth -s
# To run the container. Bind port 8000 inside the container to port 8010 on the host
docker run -t --publish 0.0.0.0:8010:8000 --name net_worth --env-file .env.base --env-file .env.dev net_worth:latest -a stdout -a stderr
# To ssh into the container
docker exec -it net_worth /bin/bash
```
If you truly bonk it up, run this:
```
docker system prune --volumes -f
```

This repo is automatically tracked on quay.io, so when you push a commit there, a build will start.

