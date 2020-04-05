**Taakgroep: API integratie**

# Taak: Template voor API data

De data die Game.API ontvangt wordt getoond op de pagina met behulp van een eigen template. In deze opdracht ontwikkel je de template en gebruikt die in de game.

## Aanpak

In je project plaats je een template bestand. Deze moet meegecompileerd worden met de andere template bestanden. In de module Game.API wordt de template gebruikt.

-   Plaats in je project een .hbs bestand. De locatie bepaal je zelf.
-   Controleer `gulpfile.js/config.js` of glob zo staat ingesteld dat de nieuwe template file ook meegenomen wordt in de template taak.
-   Geef de module Game.Reversi een methode die verantwoordelijk is voor de gegevens van Game.API.
-   De implementatie van de methode uit de vorige stap bestaat uit drie onderdelen: 1) gegevens ophalen 2) template parsen via Game.Template 3) DOM updaten. Je kunt overwegen om dit in drie private methoden uit te voeren. Implementeer de methode.
-   Maak de methode publiek en test de werking in de console.
    
    ## Ondersteunende informatie
    
    Er is geen ondersteunende informatie bij de taak.