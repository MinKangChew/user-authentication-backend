# backend

1. Pre-requisite <br />
   Install postgresql and pgadmin

2. Git clone

3. Install dependencies <br />

```
npm install
```

4. Create database in postgres, (can either use pgadmin or command line) and run migration for the first time.

```
npx prisma migrate dev --name init
```

5. Create `.env` at parent dir <br />

```
PORT=<port>
DATABASE_URL="postgresql://<dbUsername>:<password>@localhost:<dbPort>/<dbname>?schema=<schema>"
CLIENT_SECRET_EXPRESS=<random_key>
PRIVATE_KEY_PATH=./config/privateKey.pem
PUBLIC_KEY_PATH=./config/publicKey.pem
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=1y
SALT_WORK_FACTOR=10
```

By default, dbPort is `5432`; schema is `public`
