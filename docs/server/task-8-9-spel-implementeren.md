**Taakgroep: ASP.Net MVC**

# Context

Je maakt een applicatie met een redelijk eenvoudig domeinmodel. Eigenlijk onderscheiden we alleen spelers en spellen. Een speler kan hooguit aan één spel gekoppeld zijn, namelijk het spel dat hij of zij op dit moment aan het spelen is. Een spel wordt door twee spelers gespeeld. Een nieuw spel zal in eerste instantie aan slechts één speler gekoppeld zijn, in afwachting van de tegenspeler. Er wordt geen historie vastgelegd van spelen die gespeeld zijn. Wel zal van iedere speler het aantal gewonnen, verloren, remisie en afgebroken partijen worden vastgelegd.

Daarvoor heb je een aantal nieuwe technieken nodig: onder andere MVC, en het Entity Framework.

# Taak: het spel maken

In deze opdracht maak je CRUD functionaliteit voor een spel en leg je de koppeling met spelers.

## Aanpak

Je gaat gebruik maken van de scaffolding mogelijkheden die het framwework je biedt.

-   Open het project ReversiApp;
-   Neem in de folder 'models' een klasse Spel op.
-   In week 1 heb je al een klasse Spel gemaakt. Neem de code daarvan nu over in de zojuist aangemaakte klasse.
-   Neem het eerder gemaakte testproject ook op in de solution ReversiApp en check of de unittesten nog steeds voldoen.
-   Kopieer ook de eerder gemaakte Rest-api naar het project ReversiApp en zorg dat de Rest-api ook in dit project goed functioneert;
-   Neem in de DbContext een DbSet voor Spellen op.
-   Implementeer nu een '0/1 op veel' relatie met Spelers. Dus een spel kan één of meerdere spelers bevatten en een een speler kan gekoppeld zijn aan nul of één Spel. Hiervoor dien je code aan Spel en Spelers toe te voegen. Een spel kan eigenlijk maar aan maximaal twee spelers gekoppeld worden. Dit zou je kunnen modelleren, en hier door het EF een juiste database bij laten genereren, maar dat is redelijk complex. Daarom is het voor nu beter om uit te gaan van een 0/1 op veel relatie en vang je het feit dat er maximaal twee spelers aan een spel gekoppeld kunnen worden, later in dit project, softwarematig af.
-   Verwijder de eerder gegenereerde CRUD functionaliteit voor Speler.
-   Maak gebruik van scaffolding om de CRUD functionaliteit voor Spel te generen.
-   Maak gebruik van scaffolding om de CRUD functionaliteit voor Speler te generen.
-   Drop de eerder aangemaakte database en genereer een nieuwe.
-   Test je applicatie. Dus kijk of je spellen en spelers kunt aanmaken. Bekommer je nu niet om het feit dat je meer dan twee spelers aan een spel kunt koppelen, dat gaan we later in de programmacode oplossen.

## Ondersteunende informatie

#### MVC

In week 4 leer je met MVC te werken. MSDN heeft hiervoor een tutorial beschikbaar.