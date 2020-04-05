**Taakgroep: ASP.Net MVC**

# Context

Je maakt een applicatie met een redelijk eenvoudig domeinmodel. Eigenlijk onderscheiden we alleen spelers en spellen. Een speler kan hooguit aan één spel gekoppeld zijn, namelijk het spel dat hij of zij op dit moment aan het spelen is. Een spel wordt door twee spelers gespeeld. Een nieuw spel zal in eerste instantie aan slechts één speler gekoppeld zijn, in afwachting van de tegenspeler. Er wordt geen historie vastgelegd van spelen die gespeeld zijn. Wel zal van iedere speler het aantal gewonnen, verloren, remisie en afgebroken partijen worden vastgelegd.

Daarvoor heb je een aantal nieuwe technieken nodig: onder andere MVC, en het Entity Framework. ASP.Net ondersteund de ontwikkelaar met scaffolding.

# Taak: een speler klasse implementeren, inclusief een eerste opzet voor de schermen en bijbehorende database.

In deze opdracht maak je CRUD functionaliteit voor een speler.

## Aanpak

Je gaat gebruik maken van de scaffolding mogelijkheden die het framwework je biedt.

-   Maak een solution met de naam ReversiApp aan in VisualStudio. Maak gebruik van de MVC template, zodat er automatisch een goede MVC structuur voor je neergezet wordt.
-   Neem in de folder 'models' een klasse Speler op, met minimaal de volgende properties:
    -   Id
    -   Naam
    -   Wachtwoord
    -   Token
    -   Kleur (opties: Geen, Wit, Zwart)
-   Maak een DbContext en neem daarin een DbSet voor Spelers op.
-   Maak een ConnectionString en geef daarin aan dat je gebruik gaat maken van mssqllocaldb.
-   Maak gebruik van scaffolding om de CRUD functionaliteit voor Speler te generen.
-   Test je applicatie
-   Zorg er nu voor dat je applicatie i.p.v. localdb, gebruik gaat maken van SqlServer onder Skylab

## Ondersteunende informatie

#### MVC

In week 4 leer je met MVC te werken. MSDN heeft hiervoor een tutorial beschikbaar.