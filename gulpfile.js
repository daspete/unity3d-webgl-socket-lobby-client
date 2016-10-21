var gulp = require('gulp'),
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');



//////////////////////////////////////////////////////////////////
// ENV vars
////////////////////////////////////////////////////////////////
var production = (util.env.production ? true : false);


//////////////////////////////////////////////////////////////////
// ES6 Javascript builder
////////////////////////////////////////////////////////////////
gulp.task('js', function(){
    var extension = 'js';
    var presets = [ 'es2015' ];

    var _browserify = browserify({
        entries: 'src/app.' + extension,
        debug: production ? false : true,
        transform: [
            babelify.configure({
                presets: presets
            })
        ]
    });

    return _browserify.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(!production, sourcemaps.init({ loadMaps: true })))
        .pipe(uglify())
        .pipe(gulpif(!production, sourcemaps.write('.')))
        .pipe(gulp.dest('dist'));
});


//////////////////////////////////////////////////////////////////
// Watcher
////////////////////////////////////////////////////////////////
gulp.task('watch', function(){
    gulp.watch('src/**/*.{js,jsx}', ['js']);
});


//////////////////////////////////////////////////////////////////
// Default task
////////////////////////////////////////////////////////////////
gulp.task('default', [
    'js',
    'watch'
]);