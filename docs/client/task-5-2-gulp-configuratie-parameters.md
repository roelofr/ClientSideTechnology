**Taakgroep: Installatie tools**

# Taak: Configuratie waarden in Gulp

In de configuratie leg je waarden vast die tijdens het uitvoeren van taken gebruikt kunnen worden.

## Aanpak

Je voegt je voornaam toe aan als configuratie parameter. Daarna maak je de configuratie beschikbaar in het bestand waar je taken staan. Vervolgens gebruik je in de 'hallo'-taak je voornaam.

-   Open het bestand `config.js` en vervang `<jouw naam>` voor je voornaam.
-   Open het bestand `index.js` en maak `config.js` beschikbaar door bovenaan het bestand een 'import' commando te plaatsen:

```javascript
//index.js
const config = require('./config');
```

-   Vervang de groet in de `hello` function:  
    ``console.log(`Groeten van ${config.voornaam}!`)``
    
-   Test de code in de cli: `$ gulp`.
    

## Ondersteunende informatie

#### `require`

NodeJS volgt de CommonJS module systeem om code in verschillende bestanden te kunnen plaatsen. NodeJS heeft een duidelijk uitleg over [require](https://nodejs.org/en/knowledge/getting-started/what-is-require/).