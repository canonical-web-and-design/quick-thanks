# Hacking

How to get this running

1. Create a local database via docker with `docker run --name quick-thanks -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`
2. run `npx prisma studio` and add some users and recognitions via the UI.
