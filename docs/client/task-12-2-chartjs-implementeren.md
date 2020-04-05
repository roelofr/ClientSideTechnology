**Taakgroep: JS grafieken**

# Taak: Chartjs installatie

In deze taak installeer je Chartjs en probeert een voorbeeld grafiek in je applicatie te tonen.

## Aanpak

Je installeert Chartjs en maakt de library in de browser beschikbaar. Vervolgens neem je het voorbeeld van de Chartjs documentatie over een toont dit op de spelpagina.

-   [Installeer Chartjs]('#installatie-chartjs') in vendor. Controleer je glob in config.js.
-   Controleer of chartjs beschikbaar is in `dist/vendor.js.`
-   Neem het [voorbeeld](https://www.chartjs.org/docs/latest/) van de Chartjs documentatie over op je spelpagina. Het zou out of de box moeten werken.

## Ondersteunende informatie

#### installatie Chartjs

Chartjs is een uitgebreide library voor het maken van grafieken, open source en bezit verschillende varianten (javascript, NodeJS, etc).

Voor het gebruik in een SPA zoals de Game module heeft het de voorkeur om chartjs in de vendor map te plaatsen, zoals je ook gedaan hebt met Handlebars. De minified productie versie is hiervoor goed bruikbaar: `/dist/Chart.min.js`. Er zijn verschillende bronnen om Chartjs te implementeren, zoals npm, bower etc. Omdat je in deze opdracht niet afhankelijk bent van een productieomgeving die uptodate moet blijven kun je rechtstreeks van **cdn** de laatste versie downloaden. Chartjs heeft een duidelijke [installatie pagina](https://www.chartjs.org/docs/latest/getting-started/installation.html).