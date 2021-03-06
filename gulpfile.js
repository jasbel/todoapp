/* plugins
    gulp.- principal para el funcionamiento
    imagemin.- minificador de imagenes
    newer.- plugin para procesar solo archivos nuevos o modificados
    sass.- procesador de sass a css
    cleancss.- minificar css (Averigurar)
    browserSync.- Sincroniza y recarga el navegador (F5) por cambios realizados
    minify.- plugin babel minifica javascript moderno
    pug.- Procesador a HTML5
*/

const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  newer = require("gulp-newer"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  minifyJS = require("gulp-babel-minify"),
  pug = require("gulp-pug");

const sassOptions = {
  outputStyle: "compressed",
  errLogToConsole: true
};

/* Estructure
    src.- Carpeta de desarrollo 
    dist.- Carpeta de distribucion y compilado
    gulp.task.- tareas realizadas que son llamadas
    gulp.watch.- mira cambios en una direccion especifica para luego llamar a tareas especificas
    gulp.src direccion principal necesaria
    gulp.pipe. tuberia o proceso de transformacion que usa plugins
    gulp.dest.- direccion de los archivos modificados
    gulp.parallel.- proceso de tareas aleatorio o en paralelo
    gulp.serie.- proceso de tareas una detras de otra, una a una
*/

/************************* */
/*      Primary           */
/************************ */

// Tarea para procesas archive sass  Styles.scss a carpeta dist
gulp.task("sass", () => {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass(sassOptions))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.reload({ stream: true }));
    
});

//Minificafor CSS (only styles)
gulp.task("cssmin", () => {
  return gulp
    .src("dist/css/styles.css")
    .pipe(cleanCSS({ compatibility: "ie8", level: 2 }))
    .pipe(gulp.dest("dist/css/min"));
});

//Minificafor imagenes
gulp.task("images", () => {
  return gulp
    .src("src/images/**/*")
    .pipe(newer("dist/images"))
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"))
    .pipe(browserSync.reload({ stream: true }));
});

//minificador js
gulp.task("minifyjs", () =>
  gulp
    .src("src/js/*")
    .pipe(minifyJS({ mangle: { keepClassName: true } }))
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.reload({ stream: true }))
);

//Pug Preprocesador HTML (only index)
// https://www.npmjs.com/package/gulp-pug
gulp.task("pug", function buildHTML() {
  return gulp
    .src("src/index.pug")
    .pipe(pug())
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.reload({ stream: true }));
});

/******************** */
/*      SERVER        */
/******************** */
gulp.task("serve", () => {
  browserSync.init({
    server: {
      baseDir: "dist",
      index: "index.html"
    },
    notify: false,
    injectChanges: true
  });
  // gulp.watch("src/scss/**/*", gulp.series("sass","cssmin"));
  gulp.watch("src/scss/**/*", gulp.series("sass"));
  gulp.watch("src/images/**/*", gulp.series("images"));
  // gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("src/js/*", gulp.series("minifyjs"));
  gulp.watch("src/**/*.pug", gulp.series("pug"));
  gulp.watch("dist/*").on("change", browserSync.reload);
  gulp.watch("src/scss/**/*").on("change", browserSync.reload);
});

/*********************** */
gulp.task(
  "default",
  gulp.series(
    gulp.parallel(
      "images",
      "minifyjs",
      "sass",
      //"pug",
    ),
    "serve"
  )
);
