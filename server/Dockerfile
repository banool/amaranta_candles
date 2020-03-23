# Image
FROM python:3.8

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

# Copy project in
COPY . $DIRPATH

# Install vim
# RUN apt-get update && apt-get install vim -y

# Run server
EXPOSE $INTERNAL_PORT
ENTRYPOINT ./run.sh $INTERNAL_PORT

