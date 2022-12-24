<h1 align="center">Authentication App</h1>

<div align="center">
   Solution for a challenge from  <a href="http://devchallenges.io" target="_blank">Devchallenges.io</a>.
</div>

<div align="center">
  <h3>
    <a href="https://authentication-app.fly.dev" target="_blank">
      Demo
    </a>
    <span> | </span>
    <a href="https://github.com/vanaldito/authentication-app" target="_blank">
      Solution
    </a>
    <span> | </span>
    <a href="https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw" target="_blank">
      Challenge
    </a>
  </h3>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
  - [Built With](#built-with)
- [Features](#features)
- [How To Use](#how-to-use)
- [Contact](#contact)

## Overview

[![authentication-app-fly-dev.png](https://i.postimg.cc/15gSmxBH/authentication-app-fly-dev.png)](https://postimg.cc/KRywfHdk)

### Built With

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Verex](https://www.npmjs.com/package/verex/)

## Features

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges) challenge. The [challenge](https://devchallenges.io/challenges/N1fvBjQfhlkctmwj1tnw) was to build an application to complete the given user stories.

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/vanaldito/authentication-app

$ cd authentication-app

# Add environment variables
$ echo "PGHOST=[your postgres db host]
PGPASSWORD=[your postgres db password]
PGUSER=[your postgres db user]
JWT_SECRET=[the jsonwebtoken secret]
GITHUB_CLIENT_ID=[your github client id]
GITHUB_CLIENT_SECRET=[your github client secret]" >> server/.env.local
$ echo "VITE_GITHUB_CLIENT_ID=[your github client id]" >> client/.env.local

# Install dependencies and run the app
# For npm users:
$ npm install && cd client && npm install && cd ../server && npm install && cd ..
$ npm run dev

# For yarn users:
$ yarn && cd client && yarn && cd ../server && yarn && cd ..
$ yarn dev
```

## Contact

- GitHub [@vanaldito](https://github.com/vanaldito)
