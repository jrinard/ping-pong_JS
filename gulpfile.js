var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');


gulp.task('jsBrowserify', function() { // jsBrowserify is a task we are telling gulp to run
  return browserify({ entries: ['./js/pingpong-interface.js'] })   // pulling in our front end file not out backend file. because that was takenc are of by the require keyword in the interface
    .bundle()   // part of the browserify process
    .pipe(source('app.js')) // Telling browserify to create a new file called app.js
    .pipe(gulp.dest('./build/js')); // telling browserify to put it in a new folder called js which is inside a new folder build
}); // jsbuild will hold our production code



// Example of gulp task
// gulp.task('myTask', function(){
//   console.log('hello gulp');
// });
