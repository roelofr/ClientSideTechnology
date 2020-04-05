**Taakgroep: Templating**

# Context

In de MVC applicatie voor het vak server maak je gebruik van [view templates](https://docs.microsoft.com/en-us/aspnet/mvc/overview/getting-started/introduction/adding-a-view). De Razor engine parst de view template en data tot de html van de uiteindelijke pagina.  
Deze methodiek is ook bruikbaar voor de client applicatie. In plaats van her en der met behulp van jQuery de DOM te manipuleren is het mogelijk om gebruik te maken van templates. Het voordeel hiervan is dat de view/DOM beheersbaar en centraal manipuleerbaar blijft.  
De view engine die voor de client applicatie gebruikt wordt is [Handlebars](#Handlebars). De template bestanden hebben een extensie `.hbs`. De template bestanden moeten door de [engine](https://handlebarsjs.com/installation/#npm-or-yarn-recommended) worden gecompileerd. Het resultaat is een function, die als parameter de view data kan ontvangen, en als resultaat de geparste template heeft, dus de html.

# Taak: Handlebars in de browser

De code van de Handlebars engine is opgenomen in een javascript bestand. Deze code bevat zowel een compiler als de parser.  
De engine wordt gebruikt door de geparste templates. Dus de moet de engine in `dist` worden opgenomen. In deze opdracht stel je de engine ter beschikking aan de browser.

## Aanpak

Gulp krijgt de taak om bestanden van libraries als één bestand aan `dist` toe te voegen: `vendor.js`. Verder krijgt de pagina een link naar dat bestand.

-   Maak een taak `gulpfile.js/tasks/vendor`. Maak gebruik van onderstaande code:

```javascript

...


    return src(vendorFiles)
        .pipe(concat('vendor.js'))
        .pipe(dest('dist/js'));


... 
```

-   Maak een map `./vendor` en plaats daarin de Handlebars library. Download deze van de [Handlebars installatie pagina](https://handlebarsjs.com/installation/#downloading-handlebars).
-   Neem een link op in de `index.html` en ook op de spel pagina in je server project.
-   Pas de taak aan zodat de vendor bestanden ook beschikbaar zijn in het server project.
-   Test de taak door het commando `gulp vendor` uit te voeren en controleer of `dist/js/vendor.js` beschikbaar is.
-   Test de link in de html pagina door in de browser index.html te openen en in de developer tools te controleren of vendor.js status 200 heeft.

## Ondersteunende informatie

#### Handlebars

Handlebars is één van de veel view engines.Er is gekozen voor Handlebars omdat deze zowel server- als clientside te gebruiken is. Daarnaast is Handlebars vrijwel moeiteloos te leren, omdat de [syntax en werkwijze](https://handlebarsjs.com/guide/) erg eenvoudig is.