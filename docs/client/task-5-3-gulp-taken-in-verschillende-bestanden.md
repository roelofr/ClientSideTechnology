**Taakgroep: Installatie tools**

# Taak: Taken in verschillende bestanden

Om te voorkomen dat er één bestand ontstaat met erg veel code worden taken doorgaans verdeeld over meerdere bestanden. In deze taak werk je een taak uit in een apart bestand. De taak krijgt een eigen commando: `$ gulp js`.

## Aanpak

In de map `tasks` voeg je een bestand `js.js` toe waarin de javascript taken geplaatst worden. In `index.js` voeg je een commando toe die de javascript taken uitvoert. Vervolgens bouw je de taak functie uit zodat een `javascript` bestand verplaatst wordt.

-   Voeg in de map `tasks` een bestand `js.js` toe.
-   Plaats in het bestand tasks/js.js de volgende code:

```javascript
const fn = function (voornaam) {  
return function () {  
    console.log(`Taak js is uitgevoerd, ${voornaam}!`);  
    return Promise.resolve('Klaar');  
    }  
};  
exports.js = fn;   
```

-   Neem in bestand `/gulpfile.js/index.js` een verwijzing op naar de taak js:

```javascript
const config = require('./config');

const js = require('./tasks/js').js(config.voornaam); <---------
js.displayName = 'js'; <---------

const hello = function (done) {
    console.log(`Groeten van ${config.voornaam}!`)
    done();
}


exports.default = hello;

exports.js = js;  <--------
```

-   Achterhaal hoe de voornaam wordt meegegeven aan de js function taak.

## Ondersteunende informatie

#### Curry functions

In `tasks/js.js` wordt in de fn function een function geretourneerd. Dit heet currying. Een abstract onderwerp dat op [Bits and pieces](https://blog.bitsrc.io/understanding-currying-in-javascript-ceb2188c339) uitstekend wordt uitgelegd.