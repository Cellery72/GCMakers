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


gulp.task('uncss', function () {
    return gulp.src('app/assets/css/**/*')
        .pipe(uncss({
            html: ['index.html', 'app/site/partials/**/*.html', 'http://localhost:8080']
        }))
        .pipe(gulp.dest('./out'));
});
