# <%= _.slugify(appname) %>

## Directory Structure

```
├── client                  - All files for the client application. Gulp will build from this.
│   ├── bower_components    - 3rd party libraries. Will be compiled to "bundle-vendor.min.js".
│   ├── fonts               - Web fonts will be copied.
│   ├── i18n                - i18n and i10n files will be copied.
│   ├── images              - Gulp will optimize and copy these.
│   ├── scripts             - Gulp will compile all files here to "bundle.min.js".
│   ├── styles              - Less css files compiles to "style.css".
│   └── views               - Jade templates compiles to .html.
│
├── config                  - Server configuration files.
│
├── gulp                    - Gulp main file. Here you find gulp configs.
│   └── tasks               - All the tasks that can be run with gulp.
│
├── node_modules            - You know what this is.
│
├── server                  - All server logic for the site.
│   ├── lib
│   ├── test
│   └── views               - Jade files that the server serves. This is usually initials.
│
└── www                     - Main distribution directory. Server will serve files from here.
    ├── fonts               - All the web fonts will be served from here. url: '/fonts/*'
    ├── i18n                - All language files will be served from here. url: '/i18n/*'
    ├── images              - Compiled javascript files is housed here. url: '/images/*'
    ├── scripts             - Compiled javascript files is housed here. url: '/scripts/*'
    ├── styles              - Compiled styles lives here. url: '/styles/*'
    └── views               - Compiled html files. url: '/views/*'
```


## Gulp
Gulp is the build tool that will build and compile everything we need for the app. Look in
`gulp/index.js` for configuration options and in `gulp/tasks/*.js` for various tasks.
