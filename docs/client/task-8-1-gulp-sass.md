**Taakgroep: Sass**

# Context

Om makkelijker CSS te kunnen schrijven bestaat er een taal die heet SASS. Deze taal compileert naar CSS. Door een watch op te nemen in Gulp wordt de compilatie bij wijzigingen geautomatiseerd.

Je maakt in dit level de gameplay die bestaat uit een grid waar de fiches neer gelegd kunnen worden door de spelers.

# Taak: Installatie Gulp SASS

In deze opdracht installeer je taken voor Gulp voor watch en compilatie.

## Aanpak

-   Open het Webstorm project waarin zich de eerder gemaakte feedback widget zich bevindt.
-   Installeer [gulp-sass](#gulp-sass): `npm install gulp-sass --save-dev`.
-   Neem in `config.js` een verzameling globs op die straks gebruikt worden om te bepalen naar welke files gulp moet 'watchen':

```javascript

//config.js
...
        sass: [
            'css/*.scss',
            '<bepaal zelf andere globs...>',
        ],  
...

```

-   Neem onderstaande taak over in `gulpfile.js/tasks`:

```javascript

//gulpfile.js/tasks/sass.js  

const {src, dest} = require('gulp');
const gulpSass = require('gulp-sass');
const concat = require('gulp-concat');

const sass = function (serverProjectPath, files_sass) {
    return function () {
        return src(files_sass)
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(dest('./dist/sass'))
            .pipe(concat('style.min.css'))
            .pipe(dest('./dist/css'))
            .pipe(dest(serverProjectPath + 'css'));
    }
};

exports.sass = sass;  

```

-   Maak de taak beschikbaar in `gulpfile.js/index.js`:

```javascript

const sass = require('./tasks/sass').sass(serverProjectPath, config.files.sass);
sass.displayName = 'sass';  

```

-   Verwijs naar de sass taak in de `watchFiles` functie:

```javascript

const watchFiles = () => {
   ...

    watch(['./css/*.scss', './features/**/*.scss'], series(sass));

   ...
};   

```

-   Het kan zijn dat `gulp watch` nog niet beschikbaar is, export deze dan:

```javascript

exports.watch = watchFiles;

```

-   Test of de `gulp watch` werkt.
-   Test of de files gecompileert worden door een .scss te wijzigen.

## Ondersteunende informatie

#### Gulp sass

Meer informamtie over deze library vind je op [npmjs](https://www.npmjs.com/package/gulp-sass).