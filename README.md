# ncps-mms [![Build Status](https://travis-ci.org/gh0st/ncps-mms.svg?branch=master)](https://travis-ci.org/gh0st/ncps-mms)
---
## Requirements
1. MongoDB
2. NodeJS

## Setup instructions
1. Have MongoDB installed and running, and NodeJS installed.
2. `cd` into the package.
3. Run `npm install` to resolve project dependencies.
4. Run `npm install -g gulp` to install Gulp globally.
5. Run `npm run watch` to start transpile watch. This command will read files under `client/src` and generate a single file under `client/dist/bundle.js` which should be included in the `index.html`.
5. Launch your browser and visit [localhost:3030](localhost:3030).

## Seed Database
* To seed the database run `mongoimport --db ncps --collection members --type json server/members-seed.json --jsonArray --drop`
