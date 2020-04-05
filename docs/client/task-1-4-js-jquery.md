**Taakgroep: Javascript Basics**

# Taak: Feedback widget wordt getoond na klik op OK-knop

Na een klik op de button 'OK' wordt er een event afgevuurd waar een eventhandler aan gekoppeld is die de feedback widget toont. Voor het koppelen van de eventhandler wordt jQuery gebruikt. Dit is één van de meest gebruikte javascript libraries die het schrijven van javascript versneld en vereenvoudigd.

## Aanpak

In de html pagina maak je jQuery beschikbaar door een link in de head op te nemen. Daarna voeg je een functie toe die wacht totdat de gehele pagina geladen is. De de 'wacht-functie' wordt een eventhandler opgenomen en toegewezen aan het klik event van de knop.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Voeg onderstaande link toe in de head van de html:
    

```html

//head

//link afkomstig van https://cdnjs.com/libraries/jquery/

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.js"></script>
```

-   Controleer in de developer tools, in het tabblad Network of het bestand succesvol wordt opgehaald.
    
-   Voeg in de javascript de volgende functie [wacht functie](https://learn.jquery.com/using-jquery-core/document-ready/) toe:
    

```html

$( document ).ready(function() {
    console.log( "ready!" );
});
```

of de korte versie:

```html
$(function() {
    console.log( "ready!" );
});
```

-   Controleer in de developer tools of het bericht in de console wordt getoond.
    
-   Voeg onderstaande toewijzing van een eventhandler toe èn wijzig de [selector](https://www.w3schools.com/jquery/jquery_ref_selectors.asp) naar het id van de OK-knop.
    

```javascript
$("<selector-knop>").on("click", function(){
  alert("The button was clicked.");
}); 
```

-   Controleer in de browser of na een klik op de knop het bericht in de console wordt getoond. Vergeet niet de pagina te refreshen (F5) als je een wijziging in de javascript hebt doorgevoerd.
    
-   Maak in de wachtfunctie een instantie van de feedback widget. Voeg in de eventhandler een aanroep naar de show methode toe.