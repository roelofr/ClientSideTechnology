**Taakgroep: Javascript Basics**

# Taak: Feedback widget javascript in eigen file

De javascript van de feedback widget hoort in een eigen javascript bestand, dit verbetert de onderhoudbaarheid. In deze opdracht verplaats je de code naar een eigen javascript bestand en zorgt ervoor dat deze code wordt geladen zodra de html pagina in de browser wordt geladen.

## Aanpak

Je maakt een javascript bestand en plaatst daarin javascript uit de vorige opdracht. De html krijgt een link naar het javascript bestand.

-   Gebruik het Webstorm project uit de vorige opdracht.

-   Maak een map `js` in de root van je project.

-   Maak een bestand `js/feedbackWidget.js`.

-   Verplaats de klasse FeedbackWidget naar het bestand `feedbackWidget.js`.

-   Neem een [link op in de head](#link-naar-javascript) van de html die verwijst naar `feedbackWidget.js`.

-   Controleer in de developer tools in het tabblad Network of het `feedbackWidget.js` wordt geladen.


## Ondersteunende informatie

#### Link naar javascript

De head sectie van je pagina bevat de bevat de links naar javascript bestanden:

```html
...
<head>

<script src="/<pad>/<bestandsnaam>.js"></script>

</head>
...
```

## Ondersteuning - wanneer het niet lukt

-   Op dinsdag en donderdag van deze week is een bijles georganiseerd.  
    Deze bijlessen staan in je rooster, je hoeft je **niet** op te geven.

![feedback widget](images/feedback_widgets.png)
