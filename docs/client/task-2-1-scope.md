**Taakgroep: Javascript Advanced**

# Context

In dit level maak je de setup voor de multiplayer game. De game wordt gespeeld in de browser. Daar is dan ook een client side applicatie die communiceert met de server. In de browser is de game beschikbaar, in dit level zorg je ervoor dat de global scope niet vervuild wordt.

# Taak: De game beschikbaar maken in de browser

Met deze opdracht zorg je ervoor dat de browser beschikt over één variabele: `Game`. Deze variabele heeft toegang tot de scope van de game waarin zich alle klassen en andere onderdelen van de game zich bevinden. In deze opdracht maak je gebruik van het module pattern.

## Aanpak

Een aantal voorbeelden probeer je uit in de console. Daarna neem je de code over in een `javascript` bestand en maak je deze beschikbaar in de html van het vorige project.

-   Neem onderstaande code over in de console van je browser:

```
(function(){
    console.log('hallo, vanuit een module')
})()
```

Als het goed is valt je op dat de code direct wordt uitgevoerd! Normaal gesproken wordt na declaratie een functie niet direct uitgevoerd:

```
let f = function(){
    console.log('hallo, vanuit een functie')
}
```

-   Breid de code in de console uit met onderstaande code:

```
const Game = (function(){
    console.log('hallo, vanuit een module')
})()
```

-   Neem de code van `Game` over in een javascript bestand en maak deze beschikbaar in de `html` pagina.
    
-   Maak een test die controleert of de `Game` variabele beschikbaar is in de global scope.
    

## Ondersteunende informatie

#### Toelichting op module pattern

Een uitstekende en uitgebreide toelichting op het module pattern: [mastering de module pattern](https://ultimatecourses.com/blog/mastering-the-module-pattern).