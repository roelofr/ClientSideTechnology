**Taakgroep: MVC aanpassingen op de standaard scaffolding**

# Context

Je hebt inmiddels voor de klassen Spel en Speler middels scaffolding pagina's gegenereerd. Ook het registreren, inloggen, wijzigen wachtwoord, en het toekennen van een nieuw wachtwoord heb je reeds geimplementeerd. Je gaat hier nu aanpassingen en uitbreidingen op maken die nodig zijn om te voldoen aan de specificaties.

# Taak: specificaties implementeren

In deze opdracht ga je je MVC-applicatie aanpassen, zodat je voldoet aan de specificaties.

## Aanpak

De specificaties ga je stap voor stap implementeren:

-   Default komt een gebruiker op de registeer/inlog pagina. Dat heb je waarschijnlijk al zo geimplementeerd.
-   Als een speler inlogt zijn er twee mogelijke situaties, namelijk wel of niet gekoppeld aan een spel. Als een speler nog niet aan een spel gekoppeld is, dient deze speler te kunnen kiezen uit spellen waaraan nog maar éen speler gekoppeld is, of dient deze speler zelf een spel te definieren. Daarna dient direct de pagina met het betreffende spel getoond te worden. Als een Speler al wel gekoppeld is aan een spel, dient het betreffende spel getoond te worden.
-   Als de speler nog de enige speler is, dient deze te wachten tot een andere speler zich gemeld heeft. Er moet dan echter ook een knop beschikbaar zijn, waarmee de speler kan kiezen om het spel te wijzigen en/of zich aan te sluiten bij een ander spel. Als de speler kiest om toch aan te sluiten bij een ander spel, dient het spel dat hij of zij zelf heeft klaar gezet, automatisch verwijderd te worden.
-   Op de pagina waar het spel getoond wordt, dient de voor client gemaaktje javascript code te draaien. Neem dus de javascript code op in deze pagina. Voor het verversen van de pagina mag je polling gebruiken, maar als je wilt mag je ook SignalR inzetten. Dat is natuurlijk nog mooier!
-   Op de pagina waar het spel getoond wordt, dient naast het spel in javascript, ook de omschrijving van het spel en de naam van de spelers getoond te worden.
-   Als het spel is afgelopen, dient de uitslag op de spelpagina getoond te worden. Ook moet er dan een knop verschijnen waarmee de speler de mogelijkheid krijgt om een nieuw spel aan te maken, of zich bij een bestaand spel aan te sluiten.

## Ondersteunende informatie

#### ASP.NET MVC

De msdn ASP.NET MVC tutorial geeft genoeg voorbeelden van aanpassingen op gegenereerde pagina's.