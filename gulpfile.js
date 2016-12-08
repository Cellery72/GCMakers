var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    jsmin = require('gulp-jsmin'),
    del = require('del'),
    nodemon = require('gulp-nodemon'),
    uncss = require('gulp-uncss');


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

gulp.task('prod', function() {
    nodemon({
        script: 'api/temp-server.js',
        ext: 'js html',
        env: {
            'NODE_ENV': 'production'
        }
    })
});

gulp.task('build', function() {

});

//reduce to only used css. Must have project running on specified port in order to work
gulp.task('uncss', function() {
    return gulp.src([
            'app/assets/css/main.css',
            'app/assets/css/lightbox.css',
            'app/assets/css/prettyPhoto.css',
            'app/assets/css/responsive.css'
        ])
        .pipe(uncss({
            html: [
                'http://localhost:8080/#/',
                'http://localhost:8080/#/about',
                'http://localhost:8080/#/gallery',
                'http://localhost:8080/#/signup',
                'http://localhost:8080/#/contact',
                'http://localhost:8080/#/signup',
                'http://localhost:8080/#/admin',
                'http://localhost:8080/#/login'
            ]
        }))
        .pipe(gulp.dest('css/'));

});
