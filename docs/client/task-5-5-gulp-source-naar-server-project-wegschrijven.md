**Taakgroep: Installatie tools**

# Taak: Source plaatsen in server project

Het wegschrijven van productie code naar meerdere locatie kan door een extra locatie toe te voegen (dest(...). In deze taak wordt de server locatie geconfigureerd en meegegeven aan de js taak.

## Aanpak

-   In `gulp.js/config.js` staat een property `localServerProjectPath`. Geef als waarde de javascript locatie van het project van server (dus in je MVC applicatie de map `wwwroot`).
-   Het is **niet** de bedoeling dat de js taak rechtstreeks toegang heeft tot `config.js`. Door het serverpad als parameter mee te geven aan de js taak kan de taak ook in andere projecten gebruikt worden. Geef de js taak een parameter `backendPath` en voeg een extra opdracht toe om de javascript te plaatsen in het server project:

```javascript
//gulpfile.js/tasks/js.js

...

.pipe(dest('dist'))
.pipe(dest(backendPath)) <----  

... 
```

-   Geef in `gulpfile.js/index.js` de configuratie waarde mee:

```javascript

const js = require('./tasks/js').js(config.localServerProjectPath);  
```

-   Voer de js taak uit: $ gulp js. Controleer of de javascript wordt weggeschreven op de juiste locatie in het server project.

## Ondersteunende informatie

Deze taak is gebaseerd op de kennis van de voorgaande taken.