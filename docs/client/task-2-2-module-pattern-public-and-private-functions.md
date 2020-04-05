**Taakgroep: Javascript Advanced**

# Taak: Public en private function in game

Een module heeft eigen scope, function binnen de scope zijn private. In deze taak maak je een private function beschikbaar voor de outerscope.

## Aanpak

Je voegt een private function toe aan de module en geeft een referentie naar deze function aan de outerscope door deze te retourneren.

-   Breid de code in `game.js` uit met onderstaande code, zodat de variabele `Game` toegang heeft tot een **private function** `privateInit`:

```
const Game = (function(){
    console.log('hallo, vanuit een module');

    // Private function init
    const privateInit = function(){
        console.log('Private information!');
    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})()
```

## Ondersteunende informatie

#### Toelichting op module pattern

Een uitstekende en uitgebreide toelichting op het module pattern: [mastering de module pattern](https://ultimatecourses.com/blog/mastering-the-module-pattern).

#### Private function in module

Een private function is alleen in de scope van de module beschikbaar:

```
const Game = (function(){

    const privateInit = function(){
            // doing private things...
    }

})()
```

#### Function publiek vanuit module

Door een waarde te retourneren vanuit de module kan een functie beschikbaar worden gemaakt voor de outer scope:

```
const Game = (function(){

    const privateInit = function(){ ... }

    return {
        publicInit : privateInit
    }

})()
```