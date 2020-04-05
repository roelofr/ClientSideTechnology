**Taakgroep: Javascript AJAX**

# Taak: Mock data ophalen bij de Data module

Het is niet altijd mogelijk kom gebruik te maken van de server, bijvoorbeeld in test situaties of als je aan het ontwikkelen bent.  
De eerste stap om mock (nep) data in de module te plaatsen.

De data kan worden opgehaald door een function `getMockData`.

## Aanpak

De property `configMap` in `Game.Data` krijgt mock (nep) data die terug gegeven kan worden als er geen data bij de server wordt opgehaald.

-   Voeg aan `configMap` de volgende property toe:

```javascript


const configMap = {
    mock: [
            {
                url: api/Spel/Beurt,
                data: 0
          ]

    }
```

-   Maak een private function `getMockData(url)` die de bijpassende gegevens uit de `configMap.mock` teruggeeft als Promise.

```javascript


const getMockData = function(url){

    //filter mock data, configMap.mock ... oei oei, moeilijk moeilijk :-)
    const mockData = ....

    return new Promise((resolve, reject) => {
        resolve(mockData);
    });

}
```

-   Retourneer de mock data in `Game.Data.get`, dus commententarieer de andere code tijdelijk uit:

```javascript

//Game.Data.get

const get = function(url){

    // code voorgaande opdracht, als comment

    return getMockData(url);

}
```