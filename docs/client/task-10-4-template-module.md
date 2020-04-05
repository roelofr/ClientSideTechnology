**Taakgroep: Templating**

# Taak: Template parser

Om te voorkomen dat op verschillende plaatsen in de applicatie de engine wordt aangeroepen krijgt de applicatie een Template module die de interface is voor de andere modules in de applicatie om templates te parsen.

## Aanpak

Je maakt een module Game.Template. De module krijgt een methode 'parse' die de html retourneert. Daarna maak je een template van het speelbord en een partial van een fiche.

-   Maak een module `Game.Template`.
-   Geef de module een methode `getTemplate`. De methode krijgt een parameter templateName. De methode retourneert de template (niet geparst).
-   Geef de module een methode `parseTemplate`. Geef de methode twee parameters: `templateName` en `data`. De methode retourneert de geparste template.
-   Test in de console van de browser of de methodes werken.
-   Maak een template van het speelbord en maak gebruik van de partial fiche.

## Ondersteunende informatie

geen ondersteunende informatie.