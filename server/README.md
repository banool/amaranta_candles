# Amaranta Candles

## Secrets setup
You need .env files like `.env.base`, `.env.dev`, and `.env.prod`. You can see what env vars you need by looking at core/secrets.py.

## Local development
```
# Source environment.
pipenv shell

# Set up env vars.
export `cat .env.base | xargs`
export `cat .env.dev_sqlite | xargs`

# Make DB file.
touch local.db

# Run the server.
./run.sh 6969
```

## Local development (Docker)
Write a requirements.txt file from the Pipfile:
```
pipenv lock --requirements > requirements.txt
```
Build the container
```
docker image build -t amaranta_candles_server . -f Dockerfile_server
```

Run the container
```
docker ps -a | grep amaranta_candles_server | c1 | xargs docker rm -f; docker run -it --publish 0.0.0.0:6969:6969 --name amaranta_candles_server --env-file .env.base --env-file .env.dev_mysql amaranta_candles_server:latest
```

You should now see a site at http://localhost:6969

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

