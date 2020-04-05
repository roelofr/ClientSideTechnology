**Taakgroep: Javascript AJAX**

# Context

Code kan asynchroon worden uitgevoerd. Dit is ook het geval bij het uitvoeren van een request naar een server. Het is maar de vraag hoe snel er een response wordt teruggegeven. Het doen van een request naar een server en het ontvangen van een response kan uitgevoerd door middel van AJAX: Asynchronous JavaScript And XML. In een notendop: Het uitvoeren van een request aan een server zonder van pagina te wisselen. Natuurlijk is het van groot belang om de reponse op te vangen en vervolgens een callback aan te roepen.

# Taak: API data ophalen

In deze opdracht verken je de mogelijkheden van AJAX met behulp van de OpenWeatherAPI.  
Je haalt op verschillende manieren met AJAX de gegevens op.

## Aanpak

Je registreert je bij OpenWeatherAPI en haalt een apikey op (voor authenticatie van je requests). Eer\\st probeer je de apikey uit in de browser. Daarna gebruik je verschillende AJAX methoden: window.fetch, $.json, $.get. Daarna maak je kennis met het opvangen van het resultaat een callback uitvoeren.

-   Registreer je bij [OpenWeatherAPI](https://openweathermap.org/) en haal een apikey op.
    
-   Probeer in de browser in de adresbalk weergegevens op te halen, vergeet niet de `<apikey>` te vervangen voor jouw apikey:
    

```javascript

//in de adresbalk
http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=<apikey>


//resultaat, response

{"coord":{"lon":6.09,"lat":52.51},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"base":"stations","main":{"temp":278.3,"feels_like":275.74,"temp_min":277.15,"temp_max":279.26,"pressure":1024,"humidity":100},"visibility":10000,"wind":{"speed":2.1,"deg":270},"clouds":{"all":75},"dt":1578082000,"sys":{"type":1,"id":1526,"country":"NL","sunrise":1578037567,"sunset":1578065593},"timezone":3600,"id":2743477,"name":"Zwolle","cod":200}

```

-   Maak een project met een index.html aan. Zorg ervoor dat [jQuery](https://cdnjs.com/libraries/jquery/) beschikbaar is.
    
-   Voeg onderstaande code toe en probeer deze uit:
    

**Let op: de tweede parameter van de `get` function is een callback**

```javascript

<div class="result"></div>

const url = 

$.get( url, function( data ) {
  $( ".result" ).html( JSON.stringify(data) );
  alert( "Load was performed." );
});  
```

## Ondersteunende informatie

#### JQuery shorthand AJAX methods

JQuery heeft een aantal [handige methodes](https://api.jquery.com/category/ajax/shorthand-methods/) om AJAX uit te voeren.