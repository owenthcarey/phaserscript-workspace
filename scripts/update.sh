#!/bin/sh

# Nx migrate
nx migrate latest
npm install
nx migrate --run-migrations

# npm-check-updates
npm install -g npm-check-updates
ncu -u
npm install
