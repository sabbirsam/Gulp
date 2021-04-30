var gulp = require( 'gulp' ); //is must require
var rename = require( 'gulp-rename' ); //rename use to add .min to style.css and make style.min.css
var sass = require( 'gulp-sass' ); //convert sass file to css

var autoprefixer = require( 'gulp-autoprefixer'); //added auto all browser code to support
var sourcemaps = require( 'gulp-sourcemaps'); //identify source file on inspect

// var cli = require('gulp-cli');


var  styleSRC = './src/scss/style.scss';  //source file where i write the code of scss
var  styleDIST = './dist/css/';  //here is the added css automatically

var styleWatch = './src/scss/**/*.scss'; //** means every file then/*.scss mean every folder and scss file

var  jsSRC = './src/js/script.js';  //source file where i write the code of scss
var  jsDIST = './dist/js/';  //here is the added css automatically

var jWatch = './src/js/**/*.js';

gulp.task('style', function(){
    gulp.src( styleSRC )  //set the source file
        .pipe(sourcemaps.init())
        .pipe( sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind( console ))

        .pipe( autoprefixer({

            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))

        .pipe( rename({suffix: '.min'}))

        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest( styleDIST ));
});
//5 no vieo auto prefexier and soruce mapping


gulp.task('js', function (){
    gulp.src( jsSRC )
        .pipe( gulp.dest( jsDIST ));
});




gulp.task('build', ['js', 'style'], function () {
    console.log("Build Success");
});


gulp.task('default',['style','js']);

gulp.task('watch', ['default', 'build'], function () {
    gulp.watch(styleWatch , ["style"]);
    gulp.watch(jWatch,["js"]);
});

// gulp.task('watch', gulp.series(style, js), function () {
//     gulp.watch(styleWatch , ["style"]);
//     gulp.watch(jWatch,["js"]);
// });

























