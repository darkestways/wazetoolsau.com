FROM ruby:4.0-alpine

RUN apk add --no-cache build-base git nodejs npm

WORKDIR /site

COPY Gemfile Gemfile.lock* ./
RUN bundle install
