**Taakgroep: Javascript AJAX**

# Taak: AJAX opnemen in Data module

In deze opdracht implementeer je een function die gegevens over het huidige weer ophaalt.

## Aanpak

De module `Game.Data` is verantwoordelijk voor de AJAX requests. Je voegt een function `get` toe die verantwoordelijk is voor de afhandeling van de GET requests.  
Om de oefening te kunnen doen heb je weer de apikey nodig van openweathermap.

-   Gebruik het project waarin je de `Game` module hebt gemaakt.
    
-   Neem onderstaande code over in de `Game.Data` module:
    

```javascript

//Game.Data

...

let configMap = {
  apiKey: <plaats hier je apikey>
};

const get = function(url){
    return $.get(url)
        .then(r => {
            return r
            })
        .catch(e => {
            console.log(e.message);
        });  
}

...
```

-   Test je code in de console met:

```javascript

let url = http://api.openweathermap.org/data/2.5/weather?q=zwolle&apikey=<apikey>

Game.Data.get(url).then(data => console.log(data));
```

-   Voeg in `Game.Model` een methode `getWeather` toe die gebruik maakt van `Game.Data.get` om de weergegevens op te halen. Controleer in de `getWeather` methode of de temperatuur is meegeven. Als dit niet het geval is moet er een error gegooid worden.

## Ondersteunende informatie

-   Kijk voor een overzicht van de verschillende javascript modules in de studiehandleiding.