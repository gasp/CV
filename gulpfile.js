var gulp = require('gulp');
var compass = require('gulp-compass');
var livereload = require('gulp-livereload');
 
gulp.task('compass', function() {
  gulp.src('./*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .pipe(gulp.dest('app/assets/temp'));
});

gulp.task('watch', function() {
  livereload.listen(8888);
  gulp.watch('scss/*.scss', ['compass']).on('change', function(e){
  	livereload.changed(e.path);
   });
});

gulp.task('default', ['watch']);
