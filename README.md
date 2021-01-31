# SSR Svelte + Flask

What this example does:

- An example of using Flask to:
  - serve a SSR-capable Svelte app with lazy route and offline-capable support
  - used as a backend server with basic error handling (404 returns as app and other exceptions returned as json)
- Procfile is provided so Heroku deployment is straightforward
- `yarn install` downloads all necessary js dependencies & python dependencies listed in requirements.txt (within a virtual env called vflask)
- `yarn start` rebuild web app in production & run python server in dev (hot reload & debug log level)
- `yarn serve` run python server

Currently, there are still some bugs with this example:

- webpack cannot build server (hence server is built using rollup)
- rollup cannot build client (hence client is built using webpack)
- client cannot hydrate 'Cannot read property 'parentNode' of undefined'

There are also still some TODOs:

- create a separate script for webpack (or rollup) watch mode for easier dev development

References: 
- https://github.com/sveltejs/sapper
- https://github.com/cabreraalex/svelte-flask-example
- https://github.com/mefechoel/svelte-navigator/tree/main/example/ssr
