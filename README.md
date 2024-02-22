# PsyCare API
[![en](https://img.shields.io/badge/lang-en-red.svg)](https://github.com/PsyCare-org/psycare-api/blob/main/README.md)
[![pt-br](https://img.shields.io/badge/lang-pt--br-green.svg)](https://github.com/PsyCare-org/psycare-api/blob/main/README.pt-br.md)

## About
Rest API that provides authentication and CRUD operations to manage data related to the PsyCare application. The main technologies used in the development were:
* [NestJS](https://nestjs.com/)
* [TypeORM](https://typeorm.io/)
* [PostgreSQL](https://www.postgresql.org/)
* [VideoSDK](https://www.videosdk.live/)

## Getting Started
### Prerequisites
You will need [NodeJS](https://nodejs.org/en/download/),  a package manager of your choice and the [PostgreSQL](https://www.postgresql.org/).

### Environment variables
In the root of the project, create a file called .env, with the following content, filling it with your values:
```
PORT=<port where the API will run>
DB_HOST=<database host>
DB_PORT=<database port>
DB_USERNAME=<database user>
DB_PASSWORD=<database user password>
DB_NAME=<database name>
AUTH_PRIVATE_KEY=<secret key for encryption (jwt) and creation of user keys>
AUTH_PUBLIC_KEY=<public key for encryption (jwt) and creation of user keys>
CALL_API_URL=<VideoSDK API url>
CALL_TOKEN=<VideoSDK API Token>
```

The `.env.example` file contains an example of what the environment variables file should look like.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/PsyCare-org/psycare-api
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
4. Run it
   ```sh
   npm start
   ```

NOTE: Before running the application it may be necessary to create a database with the name entered in the environment variables.

## Usage
The API can be used alone, however, it was developed exclusively to be the back-end of the project.

The available routes can be found once the application is running, within swagger. They will be on the `/api` route.

Furthermore, the application also has a seed with fake data for the database. Just run `npm run seed:run`.

## License
Distributed under the MIT License. See `LICENSE.txt` for more information.