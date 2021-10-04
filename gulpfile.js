var gulp       	    = require('gulp');
var gulpSass        = require("gulp-sass");
var nodeSass        = require("node-sass");
    
var sass            = gulpSass(nodeSass);

var browserSync 	 = require('browser-sync').create();
var autoprefixer 	 = require('gulp-autoprefixer');
var plumber 		 = require('gulp-plumber');

gulp.task('browser-sync', function(done) { 
  browserSync.init({
    server: {
      baseDir: '.'
    },
    notify: false
  });
  
  browserSync.watch('/').on('change', browserSync.reload);
  
  done();
});	

gulp.task('sass', function(done){
  gulp.src('assets/sass/*.scss')
    .pipe(plumber({
      errorHandler : function(err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({errLogToConsole: true}))
    .pipe(sass({outputStyle: 'compact'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 4 versions'],
        cascade: false
    }))
   .pipe(gulp.dest('assets/css'))
   .pipe(browserSync.reload({stream: true}));
  
  done();
});

gulp.task('watch', gulp.series('sass', 'browser-sync', function(done) {
  gulp.watch('assets/**/*.*', gulp.series('sass'));
  
  done();
}));