backend

using fastify zod dotenv 
prisma client
prisma nodemon

prisma dev to start loval prisma postfres server 
define models in the schema.prisma file
run prisma migrate dev to migrate local prisma postgres database


npx nodemon src/server.js


// Fastify fundamentals 
- Creating a server, registering routes/plugins
- Request lifecycle, hooks, and reply API
- Async error handling and adding a gloabl error handler
- CORS and env-driven config

Zod for validaiton and types
- defining schemas for params, querystring, and body
- narrowing types at runtime and inferring ts types from zoe
- building reusable validators and returnign typed errors


Prisma data layer
