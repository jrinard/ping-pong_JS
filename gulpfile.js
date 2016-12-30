//optimizes our code and packages it up in a format that the browser can understand.
//It is also in charge or using all the other npm packages



//requiring the package - assuming this was installed via terminal with npm install gulp-concat --save-dev
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js']) //pulls in all the files used in browser // also * is a wild card grabbing all
    .pipe(concat('allConcat.js')) // calls concat function from above and passes in allConcat we are creating
    .pipe(gulp.dest('./tmp')); // tells gulp to save our new file in tmp. Because allConcat will not be used in the browser. we have to browserify it to pull in any modules it uses
}); // !!! as a result all interface js is packed into a temp file called allconcat.js


gulp.task('jsBrowserify', ['concatInterface'], function() { // jsBrowserify is a task we are telling gulp to run // We are telling gulp.task to run the concatInterface task to put all client-side JavaScript into one file before browserifying it.
  return browserify({ entries: ['./tmp/allConcat.js'] })   // pulling in our front end file not our backend file. because that was taken care of by the require keyword in the interface
    .bundle()   // part of the browserify process
    .pipe(source('app.js')) // Telling browserify to create a new file called app.js. this is done with vinyl-source-stream
    .pipe(gulp.dest('./build/js')); // telling browserify to put it in a new folder called js which is inside a new folder build
}); // build/js will hold our production code
// reason for this is so when you run the index it pulls one file with all the code in it.


// Example of gulp task
// gulp.task('myTask', function(){
//   console.log('hello gulp');
// });


// we are using gulp to run browserify to run concat
