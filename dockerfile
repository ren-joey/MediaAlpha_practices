FROM node:20-alpine

RUN apk update && apk add --no-cache bash curl
RUN apk add --no-cache perl;

# check Node.js version
RUN node -v

# check Perl version
RUN perl -v

# set the working directory
WORKDIR /usr/media-alpha

# copy files into working directory
COPY . .

# set default command
CMD ["bash"]

# install npm requirements
RUN cd 02_parenthesis_removal && npm install