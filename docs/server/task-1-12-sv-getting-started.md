**Taakgroep: C# en unittesten**

# Context

In deze periode ontwikkel je een multiplayer game. Het gedeelte dat je maakt als onderdeel van de Server-module (ict.se.srvr.v19) bestaat uit:

-   een klasse Spel dat voldoet aan de reeds geschreven unittests;
-   een api om de game te ontsluiten;
-   webpagina's voor het registreren, inloggen en het starten van het spel;
-   onderscheid tussen verschillende rollen en bevoegdheden (naast spelers ook moderators en admininistrators)
-   een database voor het vastleggen van de gespeelde games en de resultaten daarvan.

Daarvoor heb je een aantal nieuwe technieken nodig: onder andere Rest, Razor pages, MVC, en het Entity Framework. In dit level ga je het spel programmeren en een Rest-api maken waarmee je kunt communiceren zodat je het spel kunt in een web-omgeving kunt spelen. De eerste taak is het programmeren van het spel, het ontsluiten via de Rest-api komt later.

# Taak: het spel maken

In deze opdracht maak je de klasse Spel welke een gegeven interface implementeert en dat voldoet aan de gegeven testset.

## Aanpak

De applicatie wordt testdriven gebouwd. De Unittesten (NUnit in dit geval) en het Interface voor het spel kun je vinden op de Elo:

-   Maak een solution met de naam ReversiRestApi aan in VisualStudio. Maak gebruik van de api template, zodat je een basis legt voor de volgende opdracht waarin je het spel middels een Rest-api gaat ontsluiten.
-   Op de ELO staat in week 1 een rar-bestand, met daarin een interface, testcode en een enumeratie voor je klaar. Neem een testproject met daarin de testcode op in je solution.
-   Bestudeer de testset. Het zal je onder andere opvallen dat een Bord twee indexen heeft. De eerste index geeft de positie op de y-as aan (van boven naar beneden!; zo wordt het over het algemeen ook gedaan op de voorbeelden die we daarover vinden op het internet) en de tweede index de x-as (van links naar rechts).
-   Implementeer de klasse Spel welke het gegeven interface implementeert, en zorg dat de unittesten probleemloos draaien.
-   Neem je code, inclusief het testproject op in een solution.
-   Lever de solution als een rar-bestand op de Elo in. OP de Elo, onder week 1, staat hiervoor een inlevermogelijk.

## Ondersteunende informatie

#### Unittesten

Unittesten is uitgelegd tijdens de C# lessen in periode 1. In het lesmateriaal dat daar is aangeboden, kun je o.a. vinden hoe je een referentie naar een testproject kunt leggen.