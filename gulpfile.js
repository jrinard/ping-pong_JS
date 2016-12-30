//requiring the package - assuming this was installed via terminal ie npm install gulp-concat --save-dev
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js']) //pulls in all the files used in browser // also * is a wild card grabbing all
    .pipe(concat('allConcat.js')) // calls concat function from above and passes in allConcat we are creating
    .pipe(gulp.dest('./tmp')); // tells gulp to save our new file in tmp. Because allConcat will not be used in the browser. we have to browserify it to pull in any modules it uses
});

gulp.task('jsBrowserify', ['concatInterface'], function() { // jsBrowserify is a task we are telling gulp to run
  return browserify({ entries: ['./tmp/allConcat.js'] })   // pulling in our front end file not out backend file. because that was takenc are of by the require keyword in the interface
    .bundle()   // part of the browserify process
    .pipe(source('app.js')) // Telling browserify to create a new file called app.js
    .pipe(gulp.dest('./build/js')); // telling browserify to put it in a new folder called js which is inside a new folder build
}); // jsbuild will hold our production code


// Example of gulp task
// gulp.task('myTask', function(){
//   console.log('hello gulp');
// });
