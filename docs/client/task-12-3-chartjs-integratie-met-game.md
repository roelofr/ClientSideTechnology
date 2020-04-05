**Taakgroep: JS grafieken**

# Taak: Game stats implementatie

De basis voor het in kaart brengen zijn aanwezig: Game.Stats en de installatie van Chartjs. In deze taak ontwikkel je in Game.Stats de statistieken van de game. Je kiest twee statistieken naar keuze en brengt in deze in beeld.  
Een paar ideeën:

-   het aantal fiches dat tegenstanders op elkaar hebben veroverd
-   het aantal bezette velden in de loop van de tijd

Het is **niet toegestaan** om statistieken te tonen die lineair zijn. Zoals het aantal beurten van beide spelers. Of het aantal fiches dat een speler heeft gelegd.

## Aanpak

Je maakt een template die beschikt over de grafiek. Vervolgens gebruik je de template in Game.Stats. Tenslotte laat je de Game.Reversi gebruik maken van Game.Stats.

-   Geef de applicatie een template stats.hbs en controleer je glob in config.js.
-   Controleer of de template beschikbaar is in `dist/template.js`.
-   Neem een methode op in Game.Reversi of Game.Stats om de statistieken als data te verzamelen. Implementeer de methode.
-   Render de template en update de DOM van de spelpagina.
-   Zorg ervoor dat de template geupdate wordt op het juiste moment, bijvoorbeeld na het doen van een zet door de speler of tegenstander.

## Ondersteunende informatie

Geen ondersteunende informatie bij de taak.