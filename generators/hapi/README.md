# hapi

Installs and configures a Hapi application. Composes with the babel-builder and new-relic generators.

## Usage

```
mkdir m2h-my-brand-new-api && cd $_
yo springworks:npm-init
yo springworks:hapi
```

## Result

- resources/api/index.js including a `ping` route and an example route `my-awesome-endpoint`
- lib/server/handlers/ping.js with a handler for `GET`
- lib/bootstrap.js with stubbed method for starting/stopping server. This is where you need to add
    code for creating the server, configuring routing, database connection, plugin registration etc.
- server.js requiring babel-core, new-relic and bootstrap
