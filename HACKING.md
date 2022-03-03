# Hacking

How to get this running

1. Create a local database via docker with `docker run --name quick-thanks -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`

2. add the following to .env: `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"`

3. Run `npx prisma db push`

4. Run `npx prisma studio` and add some users and recognitions via the UI.

5. Run `npm run dev`

6. Make sure you have `GITHUB_ID` `GITHUB_SECRET` `NEXTAUTH_URL` env variablest set in `.env` file.
