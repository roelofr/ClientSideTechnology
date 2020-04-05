**Taakgroep: API integratie**

# Taak: API in eigen module

Om te voorkomen dat er in je applicatie een grote afhankelijkheid ontstaat 'wrap' je de API in een module.De module is de interface voor de rest van de applicatie. De module zelf 'weet' hoe met de API om te gaan.

## Aanpak

De ontkoppeling van applicatie en API doe je in twee stappen, eerst de setup van de module en daarna de concrete implementatie van de verschillende methoden.

-   Maak een module Game.API. Geef deze module een init.
-   Breid de module uit met een methode die aan Game.Data vraagt om informatie van de API op te halen. Geef de methode een benaming die past bij de API. Maak de methode publiek.

## Ondersteunende informatie

Er is geen ondersteunende informatie bij de taak.