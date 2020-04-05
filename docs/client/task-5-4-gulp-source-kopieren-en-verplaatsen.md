**Taakgroep: Installatie tools**

# Taak: Source in productie map plaatsen

Gulp heeft methoden/functions om source code in te lezen en weg te schrijven. In deze taak lees je source code in en plaatst die in de productie map `/dist`.

## Aanpak

-   Voeg op het root niveau (dus de map waar `package.json` staat) een map `js` met daarin een bestand `game.js`.
-   In bestand `/js/game.js` kun je eerder gemaakte modules van je game al overnemen. Als je snel door wilt, plaats dan een eenvoudig `console.log('hallo wereld')`.
-   Voeg in `/gulpfile.js/tasks/js.js` onderstaande code toe:

```javascript

// gulpfile.js/tasks/js.js  

const {src, dest} = require('gulp'); <----

const fn = function (voornaam) {
    return function () {

            //console.log(`Taak js is uitgevoerd, ${voornaam}!`);
            //return Promise.resolve('Klaar');

            return src('js/*.js') <----
            .pipe(dest('dist'));  <----
    }
};  
```

**Let op: het file pattern gaat uit van de positie waar gulp wordt gestart, in dit geval de root van het project.**

-   Voer de js taak uit: `$ gulp js`. Het resultaat is de productie map (dist, staat voor distributie) met daarin de game code: /dist/game.js

## Ondersteunende informatie

#### glob

In de taak wordt source code geselecteerd op basis van een pattern:

```javascript

...

src('js/*.js')

... 
```

Het gebruikte pattern heet [glob](https://gulpjs.com/docs/en/getting-started/explaining-globs). Met behulp van glob kunnen ook geneste mappen/bestanden worden geselecteerd en specifieke mappen worden uitgesloten.