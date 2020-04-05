**Taakgroep: Javascript Basics**

# Taak: Feedback widget testen met Jasmine

Om de feedback widget te testen maak je gebruik van test framwork Jasmine. In deze taak voeg je Jasmine toe aan het project en voeg je een aantal testen toe in een bestaand testbestand.

## Aanpak

Je voegt [Jasmine](https://jasmine.github.io/) toe als library aan je project. Vervolgens pas je de bestaande testfiles aan om de FeedbackWidget te testen.

-   Gebruik het Webstorm project uit de vorige opdracht.
-   Maak een map `test` in de root van je project.
-   Op de ELO staat een [lab jasmine\_setup](#lab-jasmine_setup). Kopieer de inhoud van de map naar `/test`
-   Test de werking van het lab vanuit het project door `test/index.html` te openen in de browser.
-   Bestudeer de bestaande testen in de testsuite.
-   Voeg in de head van `test/index.html` een link toe naar `feedbackWidget.js`.
-   Voeg in de head van `test/index.html` een link toe naar jQuery.
-   De testen moeten niet starten voordat de DOM gereed is, voeg daarom onderstaande Jasmine functie aanroep toe:

```javascript
beforeAll(function(done) {
  $(function(){
    done();
  });
});
```

-   Voeg een test toe die controleert of de functie om de feedback widget te verbergen werkt. Controleer of het DOM element bestaat, `expect($(selector)).toBeDefined();` waarbij de selector een variabele is. Controleer of de feedbackWidget verborgen is met: `expect($(selector).attr('style')).toBe('display:none');`

## Ondersteunende informatie

#### Lab Jasmine\_setup

Het lab bevat twee bestanden: `test/index.html` en `app.js`. De `head` van de html bevat links naar de library én een link naar `app.js`. De `body` van `test/index.html` bevat de javascript waarin testen zijn beschreven. Het bestand, `app.js`, bevat de code die getest wordt.

```html
...
<head>

//links naar library
//link naar te testen code

</head>

<body>
 <script>

  //tests

</script>
</body>
```