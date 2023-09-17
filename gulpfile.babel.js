import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import minifyCSS from 'gulp-csso';
// import del from 'del';
import bro from 'gulp-browserify';
import babel from 'babelify';


const paths = {
  styles: {
    src: 'assets/scss/style.scss',
    dest: 'src/static/styles',
    watch: 'assets/scss/**/*.scss',
  },
  js: {
    src: 'assets/js/main.js',
    dest: 'src/static/js',
    watch: 'assets/js/**/*.js',
  },
};

// const clean = () => {
//   return del([ 'src/static/styles' ]);
// }

const styles = () => {
  return gulp.src(paths.styles.src)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

const js = () => { 
  return gulp.src(paths.js.src)
    .pipe(bro({
      transform: [
        babel.configure({ presets: ['@babel/preset-env', '@babel/preset-react'] }),
      ]
    }))
    .pipe(gulp.dest(paths.js.dest));
}

const watchFiles = () => { 
  gulp.watch(paths.styles.watch, styles);
  gulp.watch(paths.js.watch, js);
}

const dev = gulp.series([styles, js, watchFiles]);

export const build = gulp.series([styles, js]);

export default dev;