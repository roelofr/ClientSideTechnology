**Taakgroep: Javascript Basics**

# Taak: Feedback widget toont styling afhankelijk van type bericht

De feedback widget ontvangt berichten met een status: success of error. De styling van de feedback widget is afhankelijk van de status van het bericht. In de stylesheet van de feedback widget zijn klassen aanwezig die de styling van de feedback widget kunnen aanpassen. Door middel van javascript kunnen klassen worden toegevoegd/verwijderd worden van de feedback widget in de DOM. De styling van de feedback widget wordt direct aangepast door de browser.

## Aanpak

Aan de javascript van de feedback widget voeg je een aantal mogelijkheden toe zodat css klassen worden toegevoegd en verwijderd op het juist moment.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Geef de `show` methode van de feedback widget twee parameter: `message` en `type`.
    
-   De parameter `message` is het bericht dat getoond wordt in de feedback widget. [Toon de tekst](#tekst-wijzigen-met-jquery) van de `message`, in de feedback widget.
    
-   De parameter `type` is bedoeld om te bepalen welke styling de feedback widget moet krijgen. Als `type` gelijk is aan 'success' dan is de achtergrond groen, en anders is het rood. Voeg de juiste [CSS class](#css-classes-wijzigen-met-jquery) toe aan de feedback widget afhankelijk van de waarde van de `type` parameter.
    

## Ondersteunende informatie

#### Tekst wijzigen met jQuery

Met jquery kun je tekst van een DOM element aanpassen:

```javascript

$("<id>").text('<tekstbericht>');

//Voorbeeld selector voor een id: '#abc'.
```

#### Css-classes-wijzigen-met-jquery

Met jQuery kun je elk attribuut van een DOM element wijzigen. Een CSS class kun je toevoegen en verwijderen.

```javascript
//css class toevoegen
$('<selector>').addClass('123')
```

```javascript
//css class toevoegen
$('<selector>').attr('class', '<value>')
```

```javascript
//css class verwijderen
$('<selector>').removeClass('123')
```