**Taakgroep: Templating**

# Taak: Handlebars Partial

In deze taak maak je alvast een partial voor een fiche. Later kun je deze partial gebruiken in de template van het speelbord. Je kunt een parameter meegeven waarmee je in de partial kunt bepalen welke kleur het fiche moet hebben.

## Aanpak

Eerst pas je de templates task aan zodat deze rekening houdt met partials en templates. Daarna maak je een partial en test je die uit in de browser.

-   Pas de glob in de config aan zodat alleen bestanden die **niet** beginnen met een `_` worden aangemerkt als template. Bijvoorbeeld: `'./features/**/[^_]*.hbs'`.
-   Voeg aan de config een sectie toe met een glob voor het selecteren van partials, dat zijn bestanden die beginnen met een `_`. Bijvoorbeeld: `'./features/**/_*.hbs'`.
-   Geef de gulp taak templates een extra parameter `partialFiles`.
-   Pas de gulp taak templates aan zodat het resultaat van `src` niet gereturned wordt maar toegekend wordt aan de constante templates: `const templates = src(templateFiles)...`.
-   Voeg aan de gulp taak templates onderstaande code toe om de partials aan de constante partials toe te kennen:

```javascript

        const partials = src([partialFiles])
            .pipe(handlebars())
            .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
                imports: {
                    processPartialName: function (fileName) {
                        // Strip the extension and the underscore
                        // Escape the output with JSON.stringify
                        return JSON.stringify(path.basename(fileName, '.js').substr(1));
                    }
                }
            }));
```

-   Nu de partials en templates zijn gecompiled moeten ze worden gemerged en aan `dist` worden toegevoegd. Installeer `merge-stream`.
-   Merge de partials en templates en schrijf ze weg naar `dist` met onderstaande code:

```javascript

return merge(partials, templates)
            .pipe(concat('templates.js'))
            .pipe(dest('dist/js/'));

            //pipe naar serverproject is oefening voor jou :-)

```

-   Maak een bestand `templates/partials/game/_fiche.hbs`. Neem daarin de html over en maak de kleur van je fiche afhankelijk van een meegegeven waarde.
-   Test in de console van de browser of het fiche werkt.

## Ondersteunende informatie

#### Handlebars partials

Handlebars heeft duidelijke voorbeelden hoe je [partials](https://handlebarsjs.com/guide/#partials) kunt gebruiken.