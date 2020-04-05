**Taakgroep: Javascript Basics**

# Taak: Feedback widget toont historie van berichten

De feedback widget houdt de berichten bij in localstorage. In deze opdracht zorg je ervoor dat deze historie getoond wordt op de pagina.

## Aanpak

Eerst maak je een methode `history`. Deze methode haalt de berichten uit localstorage op en toont die in de DOM.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Voeg een methode `history` toe aan de feedbackwidget.
    
-   Test in de console of de methode bestaat.
    
-   Zorg ervoor dat de berichten in de `history` methode uit localstorage worden gehaald en geparst worden met het global [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) object naar een `array`.
    
-   Maak een string van alle berichten volgens volgend formaat:
    

```
<type |success|error|>  -  <berichttekst> <\n>
<type |success|error|>  -  <berichttekst> <\n>
<type |success|error|>  -  <berichttekst>
```

-   Roep de `show` methode aan, en geef string die je hebt opgebouwd mee.
    
-   Test de `history` methode in de console van de browser.
    

## Ondersteunende informatie

Deze taak bevat alleen onderwerpen die in de voorgaande taken zijn behandeld.