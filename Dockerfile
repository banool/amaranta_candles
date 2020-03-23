# Frontend
FROM node:10 as builder
WORKDIR /npm
COPY ./ui/ ./
RUN npm ci --only=production
RUN npm run build

# Build actual image
FROM python:3.8-alpine

RUN mkdir /container

ADD server/requirements.txt /container

# Set up project directory
WORKDIR /container

# Copy in npm artifacts from previous iamge
RUN mkdir -p templates/ui
COPY --from=builder /npm/dist/ ./dist/

# MySQL
RUN apk update 
RUN apk add --virtual build-deps gcc python3-dev musl-dev mariadb-connector-c-dev

# Docker specific environment vars
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ENV INTERNAL_PORT 6969

COPY ./server/ ./

# Requirements
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN apk del build-deps

# Run server
EXPOSE $INTERNAL_PORT
ENTRYPOINT ./run.sh $INTERNAL_PORT

