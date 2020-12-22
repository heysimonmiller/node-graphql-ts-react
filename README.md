How to setup a typescript project + node:

1. Install node (npm -v to check you have node)
2. npm init -y //inits project and says yes to everything (makes package.json)
3. yarn add -D @types/node typescript //adds all types for node + typescript
4. npx tsconfig.json // asks what framework - say node => gets tsconfig.json from Ben Awad
5. yarn add -D nodemon //listens for changes in file and reruns it
6. In package.json, add this:
   "scripts": {
   "watch": "tsc -w",
   "start": "node build/dist/index.js"
   "dev": "nodemon build/dist/index.js"
   },
7. In a new terminal, run yarn watch
8. In a new terminal, run yarn dev

---

Setup mikroOrm (helps with interact with database. Create tables, select tables etc.)

1. Install postgresql
2. yarn add @mikro-orm/cli @mikro-orm/core @mikro-orm/migrations @mikro-orm/postgrespsql pg

---

Setup Server

1. yarn add express apollo-server-express graphql type-graphql
2. yarn add -D @types/express
3. yarn add reflect-metadata

OTHER:
to run migrations: npx mikro-orm migration:create
