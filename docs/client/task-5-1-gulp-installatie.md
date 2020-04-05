**Taakgroep: Installatie tools**

# Context

[Gulp](https://gulpjs.com/docs/en/getting-started/quick-start) is een library waarmee je geautomatiseerd taken kunt uitvoern.

Gulp wordt veel gebruikt voor het klaarmaken van bestanden/code voor productie. Code kan bijvoorbeeld gecomprimeerd worden (alle spaties en enters verwijderen, of zelf variabelnamen inkorten).

Het doel is om Gulp te gebruiken voor de `javascript` code van het spel productie klaar te maken. Onder productie klaar verstaan we in dit geval:

-   Alle `javascript` code wordt samengevoegd in één bestand
-   Alle `javascript` code wordt gecomprimeerd door whitespace te verwijderen (minify), variabelen in te korten (uglify).
-   Alle `css` in één bestand samen te voegen.
-   De resulterende bestanden weg te schrijven in het client project en weg te schrijven naar het server project.

# Taak: Installatie Gulp

Na het uitvoeren van deze opdracht is Gulp beschikbaar en kunnen taken uitgevoerd worden.

## Aanpak

Eerst controleer je of de benodigde programma's voor Gulp geïnstalleerd zijn. Daarna zet je het project op en installeer je Gulp daarin.

-   Maak een project aan in Webstorm.
-   Controleer in de [Terminal](#terminal) of NodeJS en npm zijn geïnstalleerd: `$ node -v` en `$ npm -v`
-   Installeer `gulp-cli` om `gulp` op de cli beschikbaar te maken: `npm install --global gulp-cli`
-   Maak een [package.json](#packagejson) aan met het command `$ npm init`.
-   Installeer Gulp in het project: `$ npm install --save-dev gulp`
-   Maak in het project een [map gulpfile.js](#map-gulpfilejs).
-   Op de ELO staat een [lab gulp\_getting\_started](#lab-gitlab_getting_started). Kopieer de inhoud van de map in `gulpfile.js`:

```javascript
//root

  gulpfile.js
    - tasks
    - config.js
    - index.js
```

-   Test je project met: `$ gulp`. Op de cli moet een groet van gulp verschijnen: \`Groeten van Gulp!\`.
-   Probeer te ontdekken hoe de taak werkt.

## Ondersteunende informatie

#### `package.json`

`package.json` is het bestand waarin de verwijzingen naar libraries met hun versienummer staan opgeslagen. Hierin wordt de versie van Gulp opgeslagen.

#### `Terminal`

De `Terminal` vindt je onderin het scherm van Webstorm.

#### Map `gulpfile.js`

De map bevat alle taken van Gulp. In de eerste versies van Gulp waren alle taken geplaatst in een bestand `gulpfile.js`. Dit heeft als nadeel dat het bestand erg lang kon worden in geval van veel taken.

#### Lab `gulp_getting_started`

Het lab bestaat uit een aantal bestanden en een map met daarin per taak een bestand. De `config.js` exporteert een plain old javascript object (POJO). Het bestand `index.js` laadt de configuratie POJO en de taken. Het bestand exporteert commands die een taak aanroepen. Default wordt de default taak aangeroepen: `$ gulp` voert het command `default` aan dat vervolgens de gerefereerde taak aanroept.