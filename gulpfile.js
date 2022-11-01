const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin')
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const del = require('del');


gulp.task('css', function(done){
    console.log('minifiest css..')
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))

    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'))

    done()

});


gulp.task('js', function(done){
    console.log('minifiest js...');

    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))

    done()
})


gulp.task('images', function(done){
    console.log('manifest images...')

    gulp.src('./assets/images/**/*.+(png | jpeg | svg | jpg | gif)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'))

    done();
})

gulp.task('clean', function(){
    del.deleteAsync(['public/assets/**'], {force: true}) 
})

gulp.task('build', gulp.series( 'clean','css', 'js', 'images'), function(done){
    console.log('building assets')
    done()
})