**Taakgroep: Javascript Basics**

# Taak: Feedback widget in een class

De feedback widget heeft meerdere functionaliteiten. Het is onderhoudbaarder om deze functionaliteit te organiseren in een klasse. In deze opdracht krijgt de feedback widget een eigen klasse.

## Aanpak

De feedback widget krijgt een eigen klasse waaraan de bestaande functie, uit de vorige opdracht, wordt toegekend als methode.

-   Gebruik het Webstorm project uit de vorige opdracht.
    
-   Voeg een [klasse](#javascript-klassen) FeedbackWidget toe, neem de code hieronder over in je `html`:
    

```javascript

class FeedbackWidget{
 constructor(elementId) {
    this._elementId = elementId;
  }

  get elementId() { //getter, set keyword voor setter methode
      return this._elementId;
    }

    show(){
     //code
    }
}
```

-   Neem in de methode `show()` de function `toggleFeedback`, uit de vorige taak, over. En pas de methode aan zodat het een element altijd toont.
    
-   Voeg een methode `hide()` toe, die de FeedbackWidget verbergt.
    
-   Maak een instantie van de FeedbackWidget in de console en test of de getter het `elementId` teruggeeft.
    

## Ondersteunende informatie

#### Javascript klassen

In javascript is een function ook een constructor:

```javascript

let hallo = function(){
    console.log('hallo wereld'); 
}  

hallo(); //hallo
let o = new hallo(); // o is {}
```

Daarnaast heeft javascript ook de beschikking over keyword `class`, dat(veel) later is geïntroduceerd:

```javascript

class FeedbackWidget{
 constructor(elementId) {
    this._elementId = elementId;
  }

  get elementId() { //getter, set keyword voor setter methode
      return this._elementId;
    }

    show(){
     //code
    }
}

const f = new FeedbackWidget('feedback-widget')
```

Uitgebreide informatie vind je bij [Mozilla](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Klasses).