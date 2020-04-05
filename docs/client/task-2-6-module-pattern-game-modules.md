**Taakgroep: Javascript Advanced**

# Taak: Game modules opzetten

De Game heb je al voorzien van een submodule: `Game.Reversi`. In deze opdracht zet je de modules op die verder nodig zijn.

## Aanpak

Je geeft de `Game` module twee submodules: `Game.Data` en `Game.Model`. `Game.Data` is verantwoordelijk voor de communicatie met de server. `Game.Model` is verantwoordelijk voor de validatie van de gegevens, bijvoorbeeld: een speler moet beschikken over een `username`.

-   Maak de twee modules als property van `Game.<property>`.
    
-   Geef beide modules een publieke `init` function die verwijst naar een private function.
    
-   Geef submodules private variabele `configMap`.
    
-   Geef beide modules een Jasmine test of de `init` function bestaan.
    

## Ondersteunende informatie

Deze taak bevat alleen onderwerpen die in de voorgaande taken zijn behandeld.