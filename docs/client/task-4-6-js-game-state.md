**Taakgroep: Javascript AJAX**

# Taak: Met AJAX de game state ophalen bij de server applicatie

Tijdens het spelen van de game kan de status van het spel wijzigen: een tegenstander kan uitloggen, het spel beeindigen, opgeven of iets anders. Met behulp van een GET request ga je de game state ophalen bij de server applicatie. Dit is natuurlijk een async operatie.

## Aanpak

De `Game.Data.get` is al in staat om een GET request op te halen bij de server applicatie.

Deze wordt steeds door `Game.Model` gebruikt om gegevens op te halen. Aan `Game.Model` voeg je een methode toe die de game state 'aanvraagt' en deze via `Game.Data` ophaalt. Het resultaat print je voorlopig in de console.

-   Gebruik het project waarin je de `Game` module hebt gemaakt.
    
-   Neem onderstaande code over in de `Game.Model` module:
    

```javascript

//Game.Model

const _getGameState = function(){

  //aanvraag via Game.Data

  //controle of ontvangen data valide is 

}

return {
    getGameState: _getGameState
}

...
```

-   Doe in function `_getGameState` via `Game.Data` een request om de huidige game state op te halen. Gebruik als url `/api/Spel/Beurt/<token>`. Waarbij `<token>` het verplichte token is. Vang de data op in een variabele.
    
-   Voeg in `_getGameState` een controle toe of de ontvangen waarde 0, 1 of 2 is. Hieronder de betekenis van de waarden:
    

0 geen specifieke waarde  
1 wit aan zet  
2 zwart aan zet

Als de waarde buiten de geldige waarden valt, gooi een error.

-   Maak in de module `Game` een private function `_getCurrentGameState` die elke 2 seconden uitgevoerd wordt. De function wordt gestart in `Game.init`. Voor het herhalen kun je een [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) function gebruiken.  
    Sla de ontvangen waarde op in `stateMap.gameState` in de `Game` module.

## Ondersteunende informatie

Alle informatie uit de voorgaande taken.