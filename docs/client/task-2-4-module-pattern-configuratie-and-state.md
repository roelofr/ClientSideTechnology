**Taakgroep: Javascript Advanced**

# Taak: De game beschikbaar maken in de browser

De opstart van een game vereist configuratie waarden, bijvoorbeeld de api url. Tijdens de game kunnen waarden wijzigen die de game moet bijhouden. De module moet deze waarden opslaan, dit kan in private variabele. Met deze opdracht zorg je ervoor dat de module in staat is om waarden op te slaan.

## Aanpak

Je voegt een variabele aan de module toe, een object `configMap`. In deze variabele kunnen waarden worden opgeslagen. Deze code test je in de console.

-   Een `Game` kan waarden van de outerscope ontvangen voordat de module voor de eerste keer wordt uitgevoerd. Voer de code uit met: `module.init()`.

```
const `Game` = (function(url){

    //Configuratie en state waarden
    let configMap = {
        apiUrl: url
    }

    // Private function init
    const privateInit = function(){
        console.log(configMap.apiUrl);

    }

    // Waarde/object geretourneerd aan de outer scope
    return {
        init: privateInit
    }
})('/api/url')
```

-   Neem de code van `Game` over in een javascript bestand en maak deze beschikbaar in de `html` pagina.
    
-   Maak een test die controleert of de `Game` variabele beschikt over een `function` init.
    

## Ondersteunende informatie

#### Toelichting op module pattern

Een uitstekende en uitgebreide toelichting op het module pattern: [mastering de module pattern](https://ultimatecourses.com/blog/mastering-the-module-pattern).