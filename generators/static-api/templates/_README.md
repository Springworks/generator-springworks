# Static API
Expects Swagger spec (`api.json`) to be copied into this package's directory, e.g. with `npm run static-api`.

## API

### `createApiServer({ host = 'localhost', port = 3001 })`
Creates a [static server](https://www.npmjs.com/package/@springworks/static-api-server) based on the copied Swagger API spec. Maps fixtures to paths in API spec.


### `provideFixtures()`
Returns [fixture loader](https://www.npmjs.com/package/fixture-loader) configured to load fixtures for this API.

## CLI
There are two CLI functions available to start and stop the static api server from the command line.

**start-server \<host> \<port>**

Example:
```bash
start-<%=appname%>-static localhost 3001
```

**stop-server**

Example:
```bash
stop-<%=appname%>-static
```
