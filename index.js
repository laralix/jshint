var gulp = require('gulp');
var jshint = require('gulp-jshint');
var Elixir = require('laravel-elixir');
var config = Elixir.config;

Elixir.extend('jshint', function(src, options) {
  'use strict';

  var paths = new Elixir.GulpPaths().src(src || [
    config.get('assets.js.folder') + '/**/*.js',
    '!' + config.get('assets.js.folder') + '/vendor/**/*.js',
  ]);

  paths.output = [];

  new Elixir.Task('jshint', function() {
      return gulp
        .src(paths.src.path)
        .pipe(jshint(options || {}))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .on('error', function(e) {
          new Elixir.Notification().error(e, 'JSHint Failed!');
          this.emit('end');
        })
        .pipe(new Elixir.Notification('JSHint Passed!'));
    }, paths)
    .watch(paths.src.path);
});
