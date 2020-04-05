**Taakgroep: Javascript AJAX**

# Taak: Environments in de game

Het is gebruikelijk te werken met verschillende environments, bijvoorbeeld: development, test, staging, production.

Afhankelijk van de environment wordt er door `Game.Data.get` mock data teruggegeven of een request uitgevoerd.

In deze taak bouw je de environment parameter in.

## Aanpak

De `Game.Data` krijgt een variabele `stateMap`. In deze variabele worden waarden opgeslagen die kunnen veranderen, zoals de environment.

In de function `Game.Data.init` wordt bepaald met welke environment gewerkt wordt.

De function `Game.Data.get` bepaalt op basis van de environment of er mock data of een request wordt uitegevoerd.

-   Voeg een variabele `stateMap` toe met als default waarde 'development':

```javascript

//Game.Data

let stateMap = {
    environment : 'development'
}

```

-   Geef `Game.Data.init` een parameter environment mee en in de function wordt de ontvangen waarde opgeslagen in `stateMap.environment`.
    
-   Controleer in `Game.Data.init` of:
    
    -   `environment` de waarde `production` of `development` heeft. Zoniet, gooi een error: `new Error(<error bericht>)`.
    -   als `environment` de waarde `production` heeft, dan een request aan de server doen.
    -   als `environment` de waarde `development` heeft, dan op basis van de url gegevens teruggeven uit de `configMap`, via `getMockData`.
-   Voeg in de function `get` een controle toe op de environment. Is de environment `development`, gebruik dan `getMockData` om een resultaat te retourneren. In geval van een productie omgeving wordt een request gedaan (de comments weghalen :-)).
    

## Ondersteunende informatie

geen