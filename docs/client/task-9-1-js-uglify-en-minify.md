**Taakgroep: Perfomance**

# Context

Een applicatie die snel geladen wordt is gebruikersvriendelijker. Het snel laden van een applicatie kan beïnvloed worden door de enters en tabs (whitespace) te verwijderen. Verder kunnen de variabel namen zo kort mogelijk worden gemaakt. Dit geldt met name voor de javascript code.  
Het verwijderen van whitespace heet uglify, en het verkorten van variabel namen heet minify. CSS heeft een ander probleem. Er zijn CSS properties die verschillende namen hebben in verschillende browsers. Dit leidt tot veel extra 'schrijfwerk'. Ook zijn de versies van CSS een probleem. Oudere browsers ondersteunen deze versies niet altijd.  
Voor alle situaties en problemen hiervoor genoemd zijn oplossingen die je in dit level gaat bouwen. Het werk wordt vooral gedaan door Gulp en resulteert in productieklare code.

# Taak: Uglify en minify

Met deze opdracht uglify en minify je geautomatiseerd de javascript code. Je installeert de gulp libraries die je nodig hebt voor uglify en minify. Vervolgens breid je de eerder gebouwde js-taak uit. Wanneer je tenslotte de taak `js` uitvoert dan is de code in de map `dist`geuglified en geminified aanwezig.

## Aanpak

Je installeert de libaries: [gulp-uglifyjs](#gulp-uglify). Daarna pas je de taak `gulpfile.js/tasks/js.js` aan. Daarna test je de taak.

-   Installeer de library: `gulp-uglifyjs` en sla deze op in je dev-depencies: `npm install gulp-uglifyjs --save-dev`.
-   Pas de `gulpfile.js/tasks/js.js` aan:

```javascript
  //gulpfile.js/tasks/js.js  

   ...    

     .pipe(uglify({compress: true}))  


   ...  
```

**Let op**: het kan handig zijn om twee versies in `dist` weg te schrijven, in verband met debuggen. Een alternatief is om een environment parameter mee te geven aan de `js.js` taak.

-   Test de taak door het command `gulp js` uit te voeren en in `dist` de code te controleren.

## Ondersteunende informatie

#### gulp uglify

De library [uglifyjs](https://www.npmjs.com/package/gulp-uglify) is een populaire gulp library. Er zijn meer mogelijkheden dan alleen uglify en minify. De library combineert goed met het gebruik van [sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps).