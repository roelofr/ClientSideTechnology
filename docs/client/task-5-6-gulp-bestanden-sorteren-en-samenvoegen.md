**Taakgroep: Installatie tools**

# Taak: Source bestanden sorteren en samenvoegen

De javascript code van de Reversi game moet over meerdere bestanden verdeeld worden om het leesbaar en georganiseerd te houden.  
In productie is dit onwenselijk omdat het laden langer duurt. Daarom moeten de source bestanden samengevoegd worden. Dit kan echter niet zonder de juist volgorde aan te houden. Bijvoorbeeld:

```javascript
Game.Model = ....  
```

Bovenstaande code vereist het bestaan van een `Game` object. De code hiervan moet dus eerst geladen worden.

In deze taak sorteer je de code in mappen en voegt ze vervolgens samen.

## Aanpak

-   Installeer de npm packages: `gulp-order`, `gulp-babel` en `gulp-concat`. Zoek op [https://www.npmjs.com/](https://www.npmjs.com/) naar de instructies voor installatie en voer ze uit.
-   Neem onderstaande code over:

```javascript

//gulpfile.js/tasks/js

...
return src(filesJs)
            .pipe(order(filesJsOrder, {base: './'}))
            .pipe(concat('app.js'))
            .pipe(babel({
                presets: ['@babel/preset-env']
            }))
            .pipe(dest('./dist/js'))
            .pipe(dest(<server project pad> + 'js'));

...  
```

-   De code bevat drie parameters:`filesJs`, `filesJsOrder` en het pad naar het server project. Zorg ervoor dat de parameters netjes worden meegegven in `gulpfile.js/index.js`. De waarden die worden meegegeven moeten afkomstig zijn uit `gulpfile.js/config.js`.
    
-   Zorg ervoor dat bestanden in submappen ook worden meegenomen. Doe dit door het glob pattern aan te passen.
    
-   Voer de js taak uit: $ gulp js. Controleer of de javascript wordt weggeschreven als één file, app.js, in /dist en op de juiste locatie in het server project.
    

## Ondersteunende informatie

Deze taak is gebaseerd op de kennis van de voorgaande taken.