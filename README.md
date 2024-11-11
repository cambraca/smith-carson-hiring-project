Hiring Project Exercise
=======================

The project is a super simple API done in [phalcon](https://phalcon.io/en-us)
and an [ember.js](https://emberjs.com/) frontend app.

The model is just one table of `candidates` with name and age.
The API has implemented the GET /api/candidates.

On the client side there is only one route, /candidates
that uses the API to show a list of candidates.

## Requirements
```
docker
docker-compose
```
## Running the projects

This will install dependencies and start both the JS client and PHP server.
```
make install
make start
make seed
```

### Server

This will run the php app and a mariadb database, the php app runs in port 8080.

You will be able to see a couple of records in the db and in this url http://localhost:8080/api/candidates

### Client

This will run the ember app, the front end run in port 4200, and proxy the api requests.

You will be able to see the app running in the browser with http://localhost:4200/

# HOMEWORK

What you need to do, is implement the add new candidate from the front end and backend.

Hints:

from the front end, you need to create a form with name and age using the built in components
https://guides.emberjs.com/release/components/built-in-components/

from the @action defined in app/controllers/candidates.js you can use the variables to create
a new candidate record using this.store.createRecord and then save it.

On the back end, you need to implement `$app->post('/api/candidates', function () use ($app) {});` that will receive the data
in json:api format 
