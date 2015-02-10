Springworks Yeoman Generator
============================

[![Build Status](https://travis-ci.org/Springworks/generator-springworks.png?branch=master)](https://travis-ci.org/Springworks/generator-springworks)
[![Coverage Status](https://coveralls.io/repos/Springworks/generator-springworks/badge.png?branch=master)](https://coveralls.io/r/Springworks/generator-springworks?branch=master)
[![Dependency Status](https://david-dm.org/springworks/generator-springworks.svg)](https://david-dm.org/springworks/generator-springworks)

This generator helps to setup new projects in the Springworks organization.

And yes, it will add badges and license to the `README.md` file for public projects.

## How do I use it?
First of all you need the `yo` cli tool to run the generators.

```bash
$ npm install -g yo
```

When the cli tool is installed it's time to install the generator.

```bash
$ npm install -g generator-springworks
```

Once all the required packages are installed you can run

```bash
$ mkdir my-awesome-project && cd my-awesome-project
$ yo springworks
```

There are a couple of options for the generators, and those can be listed with

```bash
$ yo springworks --help
```

## What does it do?
The generator will ask you a couple of questions and then setup the project for you.

The files created are the following

```
├─── package.json
├─── README.md
├─── LICENSE (Only in public projects)
├─── .gitignore
├─── .gitattributes
├─── .eslintignore
├─── .eslintrc
├─── .gjslintrc
├─── .npmignore
├─── .travis.yml (Only in public projects)
└─── test/
     └─── .eslintrc
```


## License

MIT
