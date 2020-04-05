**Taakgroep: Javascript Callbacks**

# Taak: Callback aan Game.init

In deze opdracht implementeer je een callback function die uitgevoerd zodra de Game geinitialiseerd is.

## Aanpak

Eerst definieer je een functie. Vervolgens geef je de functie als argument mee aan `Game.init`. Zodra `Game.init` voltooid is wordt de callback uitgevoerd.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Neem onderstaande callback code over in index.html
    

```
function afterInit() {
 console.log('Game init voltooid')
}
```

-   Initialiseer de Game met onderstaande code:

```
Game.init(afterInit);
```

-   Roep de callback als laatste aan in `Game.init`:

```
//Game.init
  ...
    afterInit()
  ...
```

-   Controleer de output in de console.
    
-   Initaliseer de game in de DOM:
    

```
$(function(){
 Game.init(afterInit);
})
```

## Ondersteunende informatie

#### Eenvoudige tutorial over callbacks

[What the heck is a callback](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)