Springworks Yeoman Generator
============================

[![Build Status](https://travis-ci.org/Springworks/generator-springworks.png?branch=master)](https://travis-ci.org/Springworks/generator-springworks)
[![Coverage Status](https://coveralls.io/repos/Springworks/generator-springworks/badge.png?branch=master)](https://coveralls.io/r/Springworks/generator-springworks?branch=master)
[![Dependency Status](https://david-dm.org/springworks/generator-springworks.svg)](https://david-dm.org/springworks/generator-springworks)
[![Greenkeeper badge](https://badges.greenkeeper.io/Springworks/generator-springworks.svg)](https://greenkeeper.io/)

This generator helps to setup new projects in the Springworks organization.

And yes, it will add badges and license to the `README.md` file for public projects.

## How do I use it?
First of all you need the `yo` cli tool to run the generators.

```bash
$ npm install -g yo
```

Install the generator:

```bash
$ cd generator-springworks
$ npm install -g
```

Ensure your project is an NPM project (i.e. run `npm init` unless already initialized). 

Once all the required packages are installed you can run

```bash
$ mkdir my-awesome-project && cd my-awesome-project
```

For example, to generate linting... 

 ```bash
 $ yo springworks:linting
 ```

To list all generate helpers, run:  

```bash
$ yo --help
```


## License

MIT
