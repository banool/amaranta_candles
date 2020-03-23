# Image
FROM python:3.8-alpine

# MySQL
RUN apk update 
RUN apk add --virtual build-deps gcc python3-dev musl-dev mariadb-connector-c-dev
# RUN apk add --virtual mariadb-connector-c-dev


# Build and copy in frontend compiled files
# todo

# Docker specific environment vars
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

ENV DIRPATH /container
ENV INTERNAL_PORT 6969

# Set up project directory
RUN mkdir -p $DIRPATH
WORKDIR $DIRPATH

# Requirements
COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN apk del build-deps

# Copy project in
COPY . $DIRPATH

# Install vim
# RUN apt-get update && apt-get install vim -y

# Run server
EXPOSE $INTERNAL_PORT
ENTRYPOINT ./run.sh $INTERNAL_PORT

