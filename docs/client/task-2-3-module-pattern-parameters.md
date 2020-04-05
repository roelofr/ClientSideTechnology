**Taakgroep: Javascript Advanced**

# Taak: De game module voorzien van parameters

Een module kan vanuit de outerscope parameters ontvangen. Natuurlijk zijn de global variabelen altijd beschikbaar, ook in een module. Door parameters te gebruiken is het duidelijk welke waarden een module nodig heeft. Wat in libraries veel wordt gedaan is het verstrekken van jQuery aan een module.

## Aanpak

Je voegt een parameter toe aan de `Game` module en print die in de module.

-   Een `Game` kan waarden van de outerscope ontvangen voordat de module voor de eerste keer wordt uitgevoerd. De parameters worden verstrekt via de parameter haken `(...)(parameters)`.

Voer de code uit met: `module.init()`:

```javascript

const `Game` = (function(url){

    console.log(url);

})('/api/url')
```

## Ondersteunende informatie

#### Toelichting op module pattern

Een uitstekende en uitgebreide toelichting op het module pattern: [mastering de module pattern](https://ultimatecourses.com/blog/mastering-the-module-pattern).

#### Parameters van een module

Waarden kunnen als parameters aan een module worden verstrekt

```javascript
const apiUrl = 'url/super/duper/game'

const Game = (function(url){  //2. waarde worde als parameter aan functie meegegeven

    let configMap = {
        api : url, //3. parameter url wordt bewaard in een object
    }

    ...

})(apiUrl) //1. waarde wordt aan de module meegegeven

```