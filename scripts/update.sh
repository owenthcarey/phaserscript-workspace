#!/bin/sh
nx migrate latest
npm install
nx migrate --run-migrations
