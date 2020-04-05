**Taakgroep: Rest api**

# Context

In deze periode ontwikkel je een multiplayer game. Het gedeelte dat je maakt als onderdeel van de Server-module (ict.se.srvr.v19) bestaat uit:

-   een klasse Spel dat voldoet aan de reeds geschreven unittests;
-   een api om de game te ontsluiten;
-   webpagina's voor het registreren, inloggen en het starten van het spel;
-   een database voor het vastleggen van de gespeelde games en de resultaten daarvan.

Daarvoor heb je een aantal nieuwe technieken nodig: onder andere Rest, Razor pages, MVC, en het Entity Framework. In dit level ga je het spel programmeren en een Rest-api maken waarmee je kunt communiceren zodat je het spel kunt in een web-omgeving kunt spelen. De eerste taak was het programmeren van het spel, nu ga het spel ontsluiten via de Rest-api.

# Taak: het spel ontsluiten middels een Rest api

In deze opdracht ga je het spel ontsluiten middels een Rest api

## Aanpak

Je gaat verder met de solution die je in de vorige taak begonnen bent. De naam van de solution is ReversiRestApi. Als je de default-naam van je project niet gewijzigd hebt, heeft het project dezelfde naam, namelijk ReversiRestApi

-   Maak in de map met de naam Controllers een ApiController op. Noem deze ReversiController
-   Je bent vrij in het ontwerpen van je api. Om je op weg te helpen hebben we in een bijlage van de globale opdrchtomschrijving drie services opgenomen die als voorbeeld kunnen dienen. Je kunt het geheel waarschijnlijk nog niet goed overzien, dus het kan best zijn dat je later nog aanpassingen moet doen op de REST API.

## Ondersteunende informatie

#### REST api

Het schrijven van een Rest api heb je geleerd in week 1 van de Server lessen. Als je in de eerste taak gekozen hebt voor een API project template, dan is in de solution reeds een voorbeeld Controller voor een RESTfull HTTP services opgenomen. Het tool Postman kun je gebruiken om een put request te plaatsen.