'use strict';

const generators = require('yeoman-generator');
const path = require('path');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);
  },

  initializing: function() {
    const welcomeMessage = [
      '\nGenerate a Springworks package.json\n',
    ];
    this.log(welcomeMessage.join(''));
  },

  prompting: function() {
    const done = this.async();
    let guessed_name = path.basename(this.destinationRoot());
    if (guessed_name.substring(0, 3) === 'm2h-') {
      guessed_name = guessed_name.substring(4, guessed_name.length - 1);
    }

    const prompts = [
      {
        type: 'input',
        name: 'repository_name',
        message: 'Name of the Github repo',
        default: guessed_name,
      },
      {
        type: 'input',
        name: 'description',
        message: 'description:',
      },
    ];


    this.prompt(prompts, function(answers) {
        this.repository_name = answers.repository_name;
        this.description = answers.description;
      done();
    }.bind(this));
  },

  configuring: function() {
    this.config.set({
      repository_name: this.repository_name,
      description: this.description,
    });
  },

  writing: {

    packageFile: function() {
      this.log('writing npm-init:package.json');
      this.template('_package.json', './package.json');
    },

    docs: function() {
      this.log('writing npm-init:docs');
      this.template('_README.md', `${this.destinationRoot()}/README.md`, {
        repository_name: this.repository_name,
        description: this.description,
      });
    },
  },

});
