var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    jsmin = require('gulp-jsmin'),
    del = require('del'),
    nodemon = require('gulp-nodemon');

var PATHS = {};

gulp.task('clean', function(done) {
    del(['public'], done);
});

gulp.task('del-node', function(done) {
    del(['node_modules'], done);
    console.log('Done deleting nodes.. uh oh');
});

gulp.task('dev', function() {
    nodemon({
        script: 'api/server.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'development'
        }
    })
});

gulp.task('build', function() {
 
});
