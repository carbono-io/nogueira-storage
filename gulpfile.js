'use strict';
var gulp     = require('gulp');

var JS_PATH  = ['index.js',
                 'gulpfile.js',
                 '{lib, app, test, .gulp}/**/*.{js, json}',
               ];

// Pass along gulp reference to import tasks onto your gulp object
require('./.gulp/gulp')(gulp, JS_PATH);
require('./.gulp/mygulp')(gulp, JS_PATH);