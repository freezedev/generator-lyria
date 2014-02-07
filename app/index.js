'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var LyriaGenerator = module.exports = function LyriaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(LyriaGenerator, yeoman.generators.Base);

LyriaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What do you want to call your project?'
  }, {
    name: 'version',
    message: 'The default version of the project',
    'default': '1.0.0'
  }];

  this.prompt(prompts, function(props) {
    this.projectName = props.projectName;
    this.version = props.version;

    cb();
  }.bind(this));
};

LyriaGenerator.prototype.app = function app() {
  var cb = this.async();

  var appPath = this.appPath;
  console.log(appPath);
  console.log(this.sourceRoot());

  this.remote('freezedev', 'lyria-template', function(err, remote) {
    if (err) {
      return cb(err);
    }

    remote.directory('.', appPath);

    //remote.template('_bower.json', 'bower.json');
    //remote.template('_package.json', 'package.json');
    
    cb();
  });
};

LyriaGenerator.prototype.projectfiles = function projectfiles() {
  //this.copy('editorconfig', '.editorconfig');
  //this.copy('jshintrc', '.jshintrc');
};
