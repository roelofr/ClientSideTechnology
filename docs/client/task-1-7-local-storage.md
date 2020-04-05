**Taakgroep: Javascript Basics**

# Taak: Feedback widget slaat berichten op in localstorage

Naast het tonen van berichten in de feedback widget moeten de berichten in de browser opgeslagen worden. Daarvoor gebruik je localstorage. Dit is een opslag in de browser, zodat data tussen requests op te halen zijn. In tegenstelling tot cookies wordt de data niet verzonden aan de server.

## Aanpak

Eerst maak je methodes die berichten aan localstorage kunnen toevoegen en verwijderen. Vervolgens wordt de 'toevoeg-methode' aangeroepen in de `show` methode van de feedback widget.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Voeg twee methodes toe aan de feedbackwidget: `log` en `removeLog`.
    
-   Test in de console of beide methodes bestaan.
    
-   Geef de `log` methode een parameter `message`.
    
-   Roep de `log` methode aan met onderstaande object:
    

```
//parameter message
{
    message: 'Bijna klaar, tijd voor koffie',
    type: 'success'
}
```

-   De parameter `message` moet in deze methode worden opgeslagen in [localstorage](#waarden-opslaan-en-verwijderen-in-localstorage). Gebruik als key `feedback_widget`. Gebruik het global object [JSON](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) om de waarde als `string` op te slaan.
    
-   Breid het opslaan van de log methode uit door de laatste 10 berichten op te slaan.
    
-   Roep in de `show` methode de `log` methode aan. Zorg ervoor dat de gegevens als object worden meegegeven.
    
-   Implementeer de methode `removeLog`. Deze methode verwijderd de feedback log in localStorage.
    

## Ondersteunende informatie

#### Waarden opslaan en verwijderen in localstorage

Localstorage is te vinden in de developer tools onder het tabblad Application.

De scope van localstorage is global: `localStorage`. Waarden worden toegevoegd als key value pairs. De waarden worden als `string` opgeslagen.

```javascript

//toevoegen waarde
localStorage.setItem('<key>', '<value>')
```

Het verwijderen van een waarde werkt als volgt:

```javascript

//verwijderen waarde
localStorage.removeItem('<key>')
```

Het ophalen van een waarde werkt als volgt:

```javascript
localStorage.getItem('<key>')
```