## Start back-end

```
docker-compose up
```

## Start front-end

Front-end should be started **without Docker** (you need to have nodejs v8 or greater)

```
cd front && yarn install
```

and then **(make sure that you run `cd front` before)**

```
yarn start-clean
```

after that front-end app is available at http://localhost:3000/employees

## Test commands

Back-end

```
docker-compose run api npm run test
```

Front-end

```
yarn test
```

# Back-end

## Dev links

- Swagger docs: http://localhost:8080/#/
- RockMongo: http://localhost:8081/
