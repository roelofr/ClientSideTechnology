**Taakgroep: Perfomance**

# Taak: HTML en CSS performance

Met deze opdracht minify je geautomatiseerd de HTML en CSS. Verder houd je rekening met oudere browsers.

## Aanpak

Je installeert de benodigde libraries, past de HTML en CSS/SASS taken aan. Tenslotte test je de taken.

-   installeer de volgende libraries:

```html

    //voor de html taak  
    gulp-htmlmin
    gulp-rename  

    //voor de css taak
    gulp-clean-css
    gulp-rename
    gulp-autoprefixer

```

-   maak een gulp taak `html`. Het bestand waarop deze taak betrekking heeft is alleen `index.html`, regel dit in `config.js`. Maak de taak beschikbaar in `gulpfile.js/index.js`.
-   pas onderstaande code toe in de `html` taak, vergeet niet de benodige libraries beschikbaar te stellen (require):

```javascript

 return src(['index.html'])
                .pipe(htmlmin({
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true
                }))
                .pipe(rename(function (path) {
                    path.dirname += "/";
                    path.basename = 'index';
                    path.extname = ".html";
                }))
                ...  
```

-   pas onderstaande code toe in de `sass` taak. Vergeet niet `<sass/css source>` aan te passen naar het pad naar je source code:

```javascript

return src('<sass/css source>')
                ...
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(rename('style.min.css'))
                .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
                ...
```

-   Test de html- en css-taak en controleer of in `dist` de bestanden correct zijn toegevoegd.
-   Test de html door (tijdelijk) javascript toe te voegen:

```javascript
 const hello = function(groet){

    console.log(`Gegroet: ${groet}`);

 }

 const groet = 'Gij grootheid van het wilde westen';


```

De code moet in `dist` zijn geminified en geuglified.

-   Test de css door (tijdelijk) onderstaande code toe te voegen aan je css source:

```css

div {
    display: flex;
} 
```

De output in `dist` moet als volgt zijn:

```css
  div {
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
}
```

## Ondersteunende informatie

Er is geen ondersteunende informatie bij deze taak.