var gulp = require('gulp'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    jsmin = require('gulp-jsmin'),
    del = require('del');

var PATHS = {


};

gulp.task('clean', function(done) {
    del(['public'], done);
});

gulp.task('del-node', function(done){
    del(['node_modules'], done);
});

gulp.task('jsmin', () => {
    gulp.src(PATHS.js)
        .pipe(jsmin())
        .pipe(gulp.dest('public/js'));
});

gulp.task('htmlmin', function() {
    gulp.src(PATHS.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            jsmin: true
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('cssmin', function() {
    gulp.src(PATHS.css)
        .pipe()
        .pipe(gulp.dest('public'));
});

gulp.task('copy', function(){
    gulp.src()
        .pipe();
});

gulp.task('build', ['clean',  'cssmin', 'jsmin', 'htmlmin', 'fonts','copy']);
