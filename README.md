## Commands
```sh
$ yarn start

# Start dev server
$ yarn run dev

# Start dev databse
$ sudo docker compose up -d
# PGAdmin URL: http://localhost:5051

# Prisma studio
$ npx prisma studio --browser none

# Swagger UI
# http://localhost:4000/api-docs/

# For testing
$ yarn test

# Build image locally
$ docker build -t onushthan/backend:dev .

# Commit without migration
$ git add -- . ':!prisma/migrations'
```


### Generating Key
```js
require("crypto").randomBytes(64).toString('hex')
```

### Migrations
```sh
$ npx prisma migrate dev
$ prisma db pull
$ npx prisma generate # Update migration
$ npx prisma format
```
### Generate Seeds
```sh
$ npx prisma db seed
```

### In production
```sh
# Seeding Prod data
$ npx prisma db seed -- --env prod

# Use cluster
$ yarn run prod

# Start Server
$ pm2 start app.js
```
