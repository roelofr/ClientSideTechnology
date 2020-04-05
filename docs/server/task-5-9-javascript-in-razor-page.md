**Taakgroep: Javascript opnemen in Razor page**

# Context

ASP.NET Core kent eigenlijk twee architecturen waaruit gekozen kan worden. Namelijk werken met Razor-pages, of de MVC-architectuur. Beide architecturen komen in het lesmateriaal aan bod. In week 2 heb je geleerd te werken met Razor-pages, en in week 3 ga je aan de gang met de MVC-architecuur.

Je gaat deze periode een MVC applicatie maken met het ASP.NET Core 3.1 framework. Standaard betekent dit dat veel van de code uitgevoerd wordt aan de server kant. Aan serverzijde worden de pagina's gegenereerd en deze worden aan de clientzijde getoond. Hierop is in dit project één uitzondering, en dat is de pagina waarop het spel getoond wordt. Voor de modele Client schrijft je javascriptcode voor het tonen van het spel. In de javascript neem je ajax-calls op die via de Rest-api die je reeds geschreven hebt, communiceert. De javascriptcode neem je op in de pagina waarin het spel getoond wordt. Je applicatie wordt dus slechts ten dele een SPA.

# Taak: experimenteren met javascript in Razor pages

In deze opdracht neem je je javascript dat je in het kader van client gemaakt hebt op in een Razor-page en ga je kijken of dit werkt. Dit om te oefenen met het opnemen en werkend krijgen van javascript in een ASP.NET webpagina. Vooralsnog doe je dit in een Razor-page, later zul je dit herhalen voor de spelpagina van je MVC-applicatie.

## Aanpak

-   Open de solution ReversiRestApi.
-   Neem in het project ReversiRestApi een folder Pages op.
-   Genereer een Razor page en geef deze als naam 'SpelMetJavaScript'
-   Neem de javascriptcode voor het tonen van het spel, voor zover je dat af hebt, op in de Razor page en check of de javascript code werkt.
-   Als je al ajax-calls in je javascript heb opgenomen, check dan ook of dit werkt vanuit de Razor page waarin je javascript is opgenomen.

## Ondersteunende informatie

#### Javascript in Razor-pages

Ook als je pagina's genereerd (scaffolding) met behulp van visualstudio, wordt er al javascript in je web-pagina's opgenomen. Je kunt de gegenereerde pagina's onderzoeken, om te kijken hoe dit werkt. Msdn geeft over dit onderwerp ook informatie.