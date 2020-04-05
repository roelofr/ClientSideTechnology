**Taakgroep: Templating**

# Taak: Templates compileren

De templates compileer je met behulp van Handlebars en Gulp. De templates moeten beschikbaar worden in de browser.

## Aanpak

Je maakt een Gulp taak templates. Je maakt een test-template en controleert of deze daadwerkelijk gecompileerd wordt. Vervolgens test je of de template in de browser kan parsen.

-   Maak het bestand `templates/feedbackWidget/body.hbs` en geef het de volgende inhoud:

```hbs
<section class="body">
 {{bericht}}
 </section>
```

-   Installeer `gulp-handlebars`, `gulp-declare` en `gulp-wrap`.
-   Maak een Gulp taak 'templates' en gebruik onderstaande code:

```javascript

...

const handlebars = require('gulp-handlebars');

...

//tip: vergeet niet dat de extensie .hbs is, dus de glob van 
//templateFiles kan er zo uitzien: templates/**/*.hbs 

    return src(templateFiles)
    // Compile each Handlebars template source file to a template function
        .pipe(handlebars())
        // Wrap each template function in a call to Handlebars.template
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        // Declare template functions as properties and sub-properties of MyApp.templates
        .pipe(declare({
            namespace: 'spa_templates',
            noRedeclare: true, // Avoid duplicate declarations
            processName: function(filePath) {
                // Allow nesting based on path using gulp-declare's processNameByPath()
                // You can remove this option completely if you aren't using nested folders
                // Drop the client/templates/ folder from the namespace path by removing it from the filePath
                return declare.processNameByPath(filePath.replace('<parent_map>/templates/', '')); //windows? backslashes: \\
            }
        }))
        .pipe(concat('templates.js'))
        .pipe(dest('dist/js/'))


//meer weten over 'declare': https://github.com/lazd/gulp-handlebars/tree/8e97f01db9edac7068a6402b45f47203841ca705/examples/namespaceByDirectory
```

-   Controleer of `dist/js/templates.js` na het uitvoeren van `gulp templates` bestaat.
-   Neem een link op in de html naar `templates.js` en controleer of het bestand in de browser beschikbaar is.
-   Controleer in de console of `spa_templates` defined is.
-   Controleer in de console of er een error. Een veel voorkomende error is versie verschillen in de [template engine en de compiler](#handlebars-versie-verschillen).
-   Controleer of je in de browser de template van de feedbackwidget kunt parsen:

`$ spa_templates.templates.feedbackWidget.body({bericht: 'Het is een mooie dag'})`.

Het resultaat moet html zijn met daarin het bericht.

## Ondersteunende informatie

#### Handlebars compilation

Er is in de [documentatie](https://handlebarsjs.com/installation/precompilation.html#getting-started) van Handlebars enige informatie beschikbaar over compilatie.

#### Handlebars versie verschillen

De volgende error in de browser console geeft aan dat er een verschil is tussen de compiler en de template engine:

```
Template was precompiled with an older version of Handlebars than the current runtime.
```

De oorzaak is dat de runtime van Handlebars, in `vendor.js` een andere versie is dan `handlebars` die `gulp-handlebars` gebruikt.

De stappen tot de oplossing zijn als volgt:

-   Controleer de versie van de runtime.
-   Ga via de command line naar `<project>/node_modules/gulp-handlebars/package.json`. Controleer de waarde van `handlebars`. Die versie is lager dan de versie van de runtime.
-   Pas de versie van `handlebars` aan, bijvoorbeeld ^4.7.3.
-   Ga via de command line naar`<project>/node_modules/gulp-handlebars' en update handlebars met:`npm update handlebars\`.
-   Controleer in de net geïnstalleerde `handlebars` in het bestand `release-notes.md`of het de juiste versie is.
-   Compileer opnieuw de templates.
-   Controleer in de console van de browser of de error verdwenen is.