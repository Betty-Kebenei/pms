# POPULATION MANAGEMENT SYSTEM (PMS) API
This is a Node JS restful PMS API that manages information about the population in various locations.

## Getting Started

### Prerequisites
You need the following installed/setted-up so as to get the software running:

1. Node

2. Postgresql

3. Sequelize (ORM)


### Installing
Clone the repo by running

> git clone https://github.com/Betty-Kebenei/pms.git

Navigate to the directory containing the project.

Then run the following command to install other required dependancies after cloning:

> npm install

## Database Set-up

Create a database for the api and a database for testing in postgres:

Then add a .env file in the root directory and add the following variables:

> DB_NAME

> DB_USER

> DB_PASS

> DB_PORT

> DB_HOST

> DB_NAME_TEST

Then run the following command to create tables:

> npm run create

## Running the tests

> npm run test

## Run the application

> npm run start

## Endpoints

`BASEURL = '/api/v1' `

| METHOD | ENDPOINT | SUMMARY |
| --- | --- | --- |
| **POST** | /locations | Create a location |
| **GET** | /locations | Get all locatios |
| **PUT** | /locations/{locationId} | Update a location |
| **DELETE** | /locations/{locationId} | Delete a location |
| **GET** | /locations/{locationId} | Get a location |

## Deployment



